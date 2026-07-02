/* =====================================================================
   ATC English Trainer — app logic
   ===================================================================== */
(function () {
  'use strict';

  var D = window.ATC_DATA;
  var metaList = D.metaList, stages = D.stages, PRON = D.PRON, READ = D.READ, CATS = D.CATS;
  var roleInfo = D.roleInfo, POSITIVE = D.POSITIVE, GAMES = D.GAMES, RADIO_GAME = D.RADIO_GAME, DICT_CHIPS = D.DICT_CHIPS;
  var MEMORY_LEVELS = D.MEMORY_LEVELS, MEMORY_POOL = D.MEMORY_POOL;

  var root = document.getElementById('app');

  /* ----------------------------- SOUNDS ----------------------------- */
  var sounds = {
    correct:       new Audio('sounds/duolingo-correct (1).mp3'),
    wrong:         new Audio('sounds/duolingo-wrong.mp3'),
    stageComplete: new Audio('sounds/duolingo-completed-lesson.mp3'),
    stageFailed:   new Audio('sounds/duolingo-wrong.mp3')
  };

  function playSound(name) {
    if (!state.soundOn) return;
    var s = sounds[name];
    if (!s) return;
    s.currentTime = 0;
    s.play().catch(function() {});
  }
  var defRoleData = { ctrl: { completed: [], xp: 0 }, insp: { completed: [], xp: 0 } };

  var state = {
    screen: 'loading',
    tab: 'home',
    role: null,
    pendingRole: null,
    roleData: defRoleData,
    streak: 0, gems: 0, soundOn: true,
    stageId: 1, exIndex: 0, xp: 0, correct: 0, total: 0, startTime: 0,
    selected: null, placed: [], feedback: null, feedbackTitle: '', revealed: false, finalStats: null,
    speaking: false, toast: null, dictQuery: '', dictCat: 'all',
    pracView: 'hub', pracSel: null, pracDone: false, pracCelebrate: false,
    memView: 'levels', memLevel: null, memCards: [], memFlipped: [], memMatched: [],
    memMoves: 0, memSeconds: null, memLocked: false
  };

  var gestured = false;
  document.addEventListener('pointerdown', function () { gestured = true; }, true);
  document.addEventListener('keydown', function () { gestured = true; }, true);

  /* ---- טעינה ראשונית: מסך loading לשלוש שניות ואז landing ---- */
  setTimeout(function () {
    if (state.screen === 'loading') set({ screen: 'landing' });
  }, 1500);

  /* ----------------------------- HELPERS ----------------------------- */
  function set(patch) { Object.assign(state, patch); render(); }
  function setL(patch) { Object.assign(state, patch); render(); }

  function role() { return state.role || 'ctrl'; }
  function rdata() { return state.roleData[role()] || { completed: [], xp: 0 }; }

  var spTimer, toastTimer, celTimer, autoT, memTimer, memFlipTimer;

  function speak(text) {
    if (!state.soundOn || !text || !gestured) { setSpeaking(false); return; }
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.82;
      u.onend = function () { setSpeaking(false); };
      u.onerror = function () { setSpeaking(false); };
      setSpeaking(true);
      window.speechSynthesis.speak(u);
      clearTimeout(spTimer);
      spTimer = setTimeout(function () { setSpeaking(false); }, Math.max(1700, text.split(/\s+/).length * 430));
    } catch (e) { setSpeaking(false); }
  }
  function setSpeaking(v) { if (state.speaking !== v) { state.speaking = v; render(); } }
  function cancelSpeech() { try { window.speechSynthesis.cancel(); } catch (e) {} state.speaking = false; }

  function toast(m) {
    state.toast = m; render();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { state.toast = null; render(); }, 1900);
  }

  function curId() {
    var done = rdata().completed;
    for (var i = 0; i < metaList.length; i++) {
      var m = metaList[i];
      if (stages[m.id] && done.indexOf(m.id) < 0) return m.id;
    }
    return null;
  }
  function curEx() { return stages[state.stageId].exercises[state.exIndex]; }

  function exVoice(ex) {
    if (ex.type === 'listen') return ex.audio;
    if (ex.type === 'dnd') return fillSentence(ex);
    return ex.en || '';
  }

  function fillSentence(ex) {
    var parts = ex.template.split('__'); var out = '';
    for (var i = 0; i < parts.length; i++) { out += parts[i]; if (i < ex.answer.length) out += ex.answer[i]; }
    return out.replace(/\s+/g, ' ').trim();
  }

  function canCheck() {
    var ex = curEx();
    if (ex.type === 'mcq') return state.selected !== null;
    if (ex.type === 'dnd') return state.placed.length === ex.answer.length;
    if (ex.type === 'listen') {
      if (ex.template) return state.placed.length === ex.answer.length;
      return state.revealed;
    }
    return false;
  }

  function clearEl(el) { while (el.firstChild) el.removeChild(el.firstChild); }
  function cloneTpl(id) { return document.getElementById(id).content.firstElementChild.cloneNode(true); }

  /* ----------------------------- ACTIONS ----------------------------- */

  /* כניסה ישירה ללומדה — ללא אימות */
  function enter() { set({ screen: 'welcome' }); }

  function startWelcome() { set({ screen: state.role ? 'home' : 'role', tab: 'home' }); }
  function pickRole(r) { setL({ pendingRole: r }); }
  function confirmRole() { var r = state.pendingRole || 'ctrl'; set({ role: r, pendingRole: null, screen: 'home', tab: 'home' }); }

  function setTab(tb) {
    if (tb === 'home') set({ screen: 'home', tab: 'home' });
    else if (tb === 'dict') set({ screen: 'dictionary', tab: 'dict' });
    else if (tb === 'practice') set({ screen: 'practice', tab: 'practice', pracView: 'hub' });
    else if (tb === 'profile') set({ screen: 'profile', tab: 'profile' });
  }

  function toggleSound() { set({ soundOn: !state.soundOn }); }

  function startStage(id) {
    var st = stages[id];
    if (!st) { toast('השלב יהיה זמין בקרוב ✈'); return; }
    setL({ screen: 'lesson', stageId: id, exIndex: 0, xp: 0, correct: 0, total: 0,
      startTime: Date.now(), selected: null, placed: [], feedback: null, revealed: false });
    autoSpeak();
  }

  function select(i) { if (state.feedback) return; setL({ selected: i }); }

  function place(bankId) {
    if (state.feedback) return;
    var ex = curEx();
    if (state.placed.length >= ex.answer.length) return;
    for (var i = 0; i < state.placed.length; i++) if (state.placed[i].bankId === bankId) return;
    state.placed.push({ bankId: bankId, word: ex.bank[bankId] }); render();
  }

  function removeSlot(i) { if (state.feedback) return; state.placed.splice(i, 1); render(); }
  function reveal() { setL({ revealed: true }); }

  function check() {
    var ex = curEx(); var ok = false;
    if (ex.type === 'mcq') ok = !!ex.opts[state.selected][1];
    else if (ex.type === 'dnd') ok = state.placed.map(function (p) { return p.word; }).join('|') === ex.answer.join('|');
    else if (ex.type === 'listen') {
      if (ex.template) ok = state.placed.map(function (p) { return p.word; }).join('|') === ex.answer.join('|');
      else ok = true;
    }
    cancelSpeech();
    if (ok) playSound('correct');
    else    playSound('wrong');
    var title = ok ? POSITIVE[Math.floor(Math.random() * POSITIVE.length)] : 'לא מדויק — נסה/י לזכור';
    setL({ feedback: ok ? 'ok' : 'no', feedbackTitle: title, speaking: false,
      total: state.total + 1, correct: state.correct + (ok ? 1 : 0), xp: state.xp + (ok ? 10 : 0) });
  }

  function next() {
    var exs = stages[state.stageId].exercises; var ni = state.exIndex + 1;
    if (ni >= exs.length) {
      var secs = Math.max(1, Math.round((Date.now() - state.startTime) / 1000));
      var mm = Math.floor(secs / 60), ss = String(secs % 60); if (ss.length < 2) ss = '0' + ss;
      var acc = state.total ? Math.round(state.correct / state.total * 100) : 0;
      var passed = acc >= 50;
      var r = role(); var rd = rdata();
      var completed = (passed && rd.completed.indexOf(state.stageId) < 0)
        ? rd.completed.concat([state.stageId]) : rd.completed;
      var roleData = Object.assign({}, state.roleData);
      roleData[r] = { completed: completed, xp: rd.xp + state.xp };
      if (passed) { playSound('stageComplete'); }
      else        { playSound('stageFailed');   }
      set({ screen: 'complete', roleData: roleData,
        gems: state.gems + (passed ? 5 : 0),
        finalStats: { xp: state.xp, acc: acc, time: mm + ':' + ss, passed: passed } });
    } else {
      setL({ exIndex: ni, selected: null, placed: [], feedback: null, revealed: false });
      autoSpeak();
    }
  }

  function goHome() { cancelSpeech(); setL({ screen: 'home', tab: 'home', feedback: null, speaking: false }); }
  function autoSpeak() { var ex = curEx(); clearTimeout(autoT); autoT = setTimeout(function () { speak(exVoice(ex)); }, 360); }

  function openGame(id) {
    if (id === 'radio') setL({ pracView: 'radio', pracSel: null, pracDone: false, pracCelebrate: false });
    else if (id === 'memory') openMemory();
    else toast('המשחק ייפתח בקרוב 🎮');
  }
  function pracBack() { cancelSpeech(); setL({ pracView: 'hub' }); }
  function pracSelect(i) { if (state.pracDone) return; setL({ pracSel: i }); }
  function pracCheck() {
    state.pracDone = true;
    if (state.pracSel === 0) {
      state.pracCelebrate = true;
      clearTimeout(celTimer);
      celTimer = setTimeout(function () { state.pracCelebrate = false; render(); }, 1900);
    }
    render();
  }
  function pracReset() { set({ gems: state.gems + 5, pracSel: null, pracDone: false, pracCelebrate: false }); toast('+25 XP · +5 💎 נוספו!'); }
  function switchRole(r) { set({ role: r }); }

  /* ----------------------------- MEMORY GAME ----------------------------- */
  function shuffleArr(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function openMemory() {
    clearInterval(memTimer); clearTimeout(memFlipTimer);
    setL({ pracView: 'memory', memView: 'levels' });
  }

  function memPickLevel(id) {
    var lvl = null;
    for (var i = 0; i < MEMORY_LEVELS.length; i++) if (MEMORY_LEVELS[i].id === id) lvl = MEMORY_LEVELS[i];
    if (!lvl) return;
    startMemoryGame(lvl);
  }

  function startMemoryGame(lvl) {
    var pool = shuffleArr(MEMORY_POOL).slice(0, lvl.pairs);
    var cards = [];
    pool.forEach(function (p, i) {
      cards.push({ pairId: i, text: p[0] });
      cards.push({ pairId: i, text: p[1] });
    });
    cards = shuffleArr(cards);
    clearInterval(memTimer); clearTimeout(memFlipTimer);
    state.memLevel = lvl;
    state.memView = 'board';
    state.memCards = cards;
    state.memFlipped = [];
    state.memMatched = [];
    state.memMoves = 0;
    state.memLocked = false;
    state.memSeconds = lvl.seconds;
    if (lvl.seconds) memTimer = setInterval(memoryTick, 1000);
    render();
  }

  function memoryTick() {
    if (state.memSeconds === null) return;
    state.memSeconds -= 1;
    if (state.memSeconds <= 0) {
      state.memSeconds = 0;
      clearInterval(memTimer);
      memoryEnd(false);
      return;
    }
    render();
  }

  function memFlip(idx) {
    if (state.memView !== 'board' || state.memLocked) return;
    if (state.memFlipped.indexOf(idx) >= 0 || state.memMatched.indexOf(idx) >= 0) return;
    if (state.memFlipped.length >= 2) return;
    state.memFlipped.push(idx);
    render();
    if (state.memFlipped.length === 2) {
      state.memMoves += 1;
      var a = state.memCards[state.memFlipped[0]];
      var b = state.memCards[state.memFlipped[1]];
      state.memLocked = true;
      var isMatch = a.pairId === b.pairId;
      clearTimeout(memFlipTimer);
      memFlipTimer = setTimeout(function () {
        if (isMatch) {
          state.memMatched = state.memMatched.concat(state.memFlipped);
          state.memFlipped = [];
          state.memLocked = false;
          if (state.memMatched.length === state.memCards.length) { memoryEnd(true); return; }
        } else {
          state.memFlipped = [];
          state.memLocked = false;
        }
        render();
      }, isMatch ? 450 : 800);
      render();
    }
  }

  function memoryEnd(won) {
    clearInterval(memTimer);
    if (won) {
      playSound('stageComplete');
      state.gems += 5;
      toast('כל הכבוד! השלמת/ה את המשחק 🎉 +5 💎');
    } else {
      playSound('stageFailed');
      toast('נגמר הזמן! נסה/י שוב');
    }
    setTimeout(function () { setL({ memView: 'levels' }); }, 1300);
  }

  function memBack() {
    clearInterval(memTimer); clearTimeout(memFlipTimer);
    if (state.memView === 'board') setL({ memView: 'levels' });
    else setL({ pracView: 'hub' });
  }

  /* ----------------------------- TOWER BUILDER ----------------------------- */
  function buildTower(floorsDone, building) {
    var wrap = document.createElement('div'); wrap.className = 'tower';
    var beacon = document.createElement('div'); beacon.className = 'tower__beacon';
    var beaconLight = document.createElement('div'); beaconLight.className = 'tower__beacon-light';
    beacon.appendChild(beaconLight);
    var roof = document.createElement('div'); roof.className = 'tower__roof';
    var cab = document.createElement('div'); cab.className = 'tower__cab';
    var cabWindow = document.createElement('div'); cabWindow.className = 'tower__cab-window';
    cab.appendChild(cabWindow);
    var floors = document.createElement('div'); floors.className = 'tower__floors';
    var total = Math.max(0, Math.min(10, floorsDone));
    for (var i = 1; i <= total; i++) {
      var fl = cloneTpl('tplTowerFloor');
      if (building && i === total) fl.classList.add('is-new');
      floors.appendChild(fl);
    }
    var base = document.createElement('div'); base.className = 'tower__base';
    var ground = document.createElement('div'); ground.className = 'tower__ground';
    wrap.appendChild(beacon); wrap.appendChild(roof); wrap.appendChild(cab);
    wrap.appendChild(floors); wrap.appendChild(base); wrap.appendChild(ground);
    return wrap;
  }

  function gameIconSVG(kind, accent) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '60'); svg.setAttribute('height', '60'); svg.setAttribute('viewBox', '0 0 60 60');
    svg.style.filter = 'drop-shadow(0 4px 6px rgba(14,42,71,.18))';
    var inner;
    if (kind === 'memory') {
      inner = '<rect x="8" y="20" width="22" height="30" rx="4" fill="#fff" stroke="' + accent + '" stroke-width="2.5" transform="rotate(-10 19 35)"/><rect x="30" y="20" width="22" height="30" rx="4" fill="' + accent + '" transform="rotate(8 41 35)"/><path d="M30 6c-6 0-10 4-10 9 0 4 3 6 3 9h14c0-3 3-5 3-9 0-5-4-9-10-9z" fill="#FFB4C2"/><path d="M30 6c-6 0-10 4-10 9 0 4 3 6 3 9h14c0-3 3-5 3-9 0-5-4-9-10-9z" fill="none" stroke="' + accent + '" stroke-width="2.4"/><path d="M24 24v4M30 24v5M36 24v4" stroke="' + accent + '" stroke-width="2" stroke-linecap="round"/>';
    } else if (kind === 'radio') {
      inner = '<path d="M14 34a16 16 0 0 1 32 0" fill="none" stroke="' + accent + '" stroke-width="4" stroke-linecap="round"/><rect x="8" y="32" width="12" height="20" rx="5" fill="' + accent + '"/><rect x="40" y="32" width="12" height="20" rx="5" fill="' + accent + '"/><path d="M44 44v6a6 6 0 0 1-6 6h-6" fill="none" stroke="' + accent + '" stroke-width="3.4" stroke-linecap="round"/><circle cx="30" cy="56" r="3.4" fill="#FFD27A" stroke="' + accent + '" stroke-width="1.5"/>';
    } else if (kind === 'radar') {
      inner = '<circle cx="30" cy="30" r="24" fill="#062a1c" stroke="' + accent + '" stroke-width="3"/><circle cx="30" cy="30" r="16" fill="none" stroke="#2E9E5B" stroke-width="1.4" opacity=".6"/><circle cx="30" cy="30" r="8" fill="none" stroke="#2E9E5B" stroke-width="1.4" opacity=".6"/><path d="M30 30 L30 8 A22 22 0 0 1 49 21 Z" fill="#54c47e" opacity=".45"/><path d="M30 30 L49 21" stroke="#7CF0A8" stroke-width="2" stroke-linecap="round"/><circle cx="22" cy="38" r="2.2" fill="#7CF0A8"/>';
    } else {
      inner = '<path d="M34 4 16 32h12l-4 24 22-30H32z" fill="#FFD86B" stroke="' + accent + '" stroke-width="2.8" stroke-linejoin="round"/><circle cx="48" cy="12" r="2.5" fill="' + accent + '"/><circle cx="12" cy="46" r="2.5" fill="' + accent + '"/>';
    }
    svg.innerHTML = inner;
    return svg;
  }

  /* ----------------------------- RENDER ----------------------------- */
  var navScreens = ['home', 'dictionary', 'profile', 'practice'];

  function render() {
    var screens = root.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.toggle('is-active', screens[i].getAttribute('data-screen') === state.screen);
    }
    var navbar = document.getElementById('navbar');
    navbar.classList.toggle('is-visible', navScreens.indexOf(state.screen) >= 0);
    var navBtns = navbar.querySelectorAll('.navbar__btn');
    for (var n = 0; n < navBtns.length; n++) {
      navBtns[n].classList.toggle('is-active', navBtns[n].getAttribute('data-a') === state.tab);
    }
    var toastEl = document.getElementById('toast');
    if (state.toast) {
      toastEl.hidden = false; toastEl.textContent = state.toast;
      toastEl.style.animation = 'none'; void toastEl.offsetWidth; toastEl.style.animation = '';
    } else { toastEl.hidden = true; }

    if      (state.screen === 'loading')    renderLoading();
    else if (state.screen === 'landing')    {} // סטטי
    else if (state.screen === 'welcome')    renderWelcome();
    else if (state.screen === 'role')       renderRole();
    else if (state.screen === 'home')       renderHome();
    else if (state.screen === 'dictionary') renderDict();
    else if (state.screen === 'practice')   renderPractice();
    else if (state.screen === 'profile')    renderProfile();
    else if (state.screen === 'lesson')     renderLesson();
    else if (state.screen === 'complete')   renderComplete();
  }

  function renderLoading() {
    document.getElementById('loadingMsg').textContent = 'טוען...';
  }

  function renderWelcome() {
    var img = document.getElementById('welcomePhoto');
    img.src = 'assets/ChatGPT Image Jun 24, 2026, 04_33_09 PM.png';
    img.className = 'welcome__phenix';
  }

  function renderRole() {
    var picked = state.pendingRole;
    var wrap = document.getElementById('roleCards');
    clearEl(wrap);
    ['ctrl', 'insp'].forEach(function (r) {
      var info = roleInfo[r];
      var sel = picked === r;
      var dim = picked && !sel;
      var card = cloneTpl('tplRoleCard');
      card.setAttribute('data-a', r);
      card.classList.toggle('is-selected', sel);
      card.classList.toggle('is-dimmed', dim);
      var img = card.querySelector('.role-card__img');
      img.src = sel ? info.salute : info.idle;
      card.querySelector('.role-card__badge').textContent = info.he;
      card.querySelector('.role-card__en').textContent = info.en;
      wrap.appendChild(card);
    });
    var confirmWrap = document.getElementById('roleConfirmWrap');
    clearEl(confirmWrap);
    if (picked) {
      var desc = document.createElement('div'); desc.className = 'role-confirm-desc';
      desc.textContent = roleInfo[picked].desc;
      var btn = document.createElement('button'); btn.className = 'role-confirm-btn';
      btn.setAttribute('data-act', 'confirmRole');
      btn.textContent = 'המשך/י כ' + roleInfo[picked].he;
      confirmWrap.appendChild(desc); confirmWrap.appendChild(btn);
    }
  }

  function renderHome() {
    var cur = curId();
    var done = rdata().completed;
    var floorsDone = done.length;
    document.getElementById('homeFloorsCount').textContent = floorsDone + '/10';
    var visual = document.getElementById('towerCardVisual');
    clearEl(visual); visual.appendChild(buildTower(floorsDone, false));
    var curMeta = null;
    for (var i = 0; i < metaList.length; i++) if (metaList[i].id === cur) curMeta = metaList[i];
    document.getElementById('towerCardKicker').textContent = curMeta ? ('שלב ' + (curMeta.final ? 'מסכם' : curMeta.id) + ' מתוך 10') : 'הושלם';
    document.getElementById('towerCardTitle').textContent = curMeta ? curMeta.label : 'כל השלבים הושלמו!';
    document.getElementById('towerCardMeta').textContent = 'המגדל שלך · ' + floorsDone + '/10 קומות';
    document.getElementById('towerCardBarFill').style.width = Math.round(floorsDone / 10 * 100) + '%';
    var nodesWrap = document.getElementById('homeNodes');
    clearEl(nodesWrap);
    metaList.forEach(function (m) {
      var isDone = done.indexOf(m.id) >= 0;
      var isCur = m.id === cur;
      var isAvailable = !isDone && !isCur && !!stages[m.id];
      var node = cloneTpl('tplStageNode');
      node.classList.toggle('is-done', isDone);
      node.classList.toggle('is-current', isCur);
      node.classList.toggle('is-final', !!m.final);
      node.classList.toggle('is-available', isAvailable);
      node.querySelector('.stage-node__btn').setAttribute('data-a', m.id);
      node.querySelector('.stage-node__circle').textContent = m.final ? '★' : String(m.id);
      node.querySelector('.stage-node__label').textContent = m.label;
      nodesWrap.appendChild(node);
    });
  }

  function renderDict() {
    var q = (state.dictQuery || '').trim().toLowerCase();
    var cat = state.dictCat;
    var chipsWrap = document.getElementById('dictChips');
    clearEl(chipsWrap);
    DICT_CHIPS.forEach(function (c) {
      var chip = cloneTpl('tplChip');
      chip.setAttribute('data-a', c[0]); chip.textContent = c[1];
      chip.classList.toggle('is-active', cat === c[0]);
      chipsWrap.appendChild(chip);
    });
    function matchItem(it) { return it[0].toLowerCase().indexOf(q) >= 0 || it[1].indexOf(q) >= 0 || (it[2] || '').indexOf(q) >= 0; }
    var showNumbers = (cat === 'all' || cat === 'numbers') && (!q || PRON.some(function (p) { return p[1].toLowerCase().indexOf(q) >= 0 || p[0].indexOf(q) >= 0; }));
    var showRead    = (cat === 'all' || cat === 'read')    && (!q || READ.some(function (r) { return r[1].toLowerCase().indexOf(q) >= 0 || r[2].indexOf(q) >= 0; }));
    var srcSections = (cat === 'all') ? CATS : CATS.filter(function (c) { return c.id === cat; });
    var body = document.getElementById('dictBody'); clearEl(body);
    if (showNumbers) {
      var nb = document.createElement('div'); nb.className = 'numbers-block';
      var nbTitle = document.createElement('div'); nbTitle.className = 'numbers-block__title'; nbTitle.textContent = 'הגיית ספרות ומספרים';
      var nbHint = document.createElement('div'); nbHint.className = 'numbers-block__hint'; nbHint.textContent = 'הקש/י לשמיעה';
      var nbGrid = document.createElement('div'); nbGrid.className = 'numbers-block__grid';
      PRON.forEach(function (p) {
        var card = cloneTpl('tplPronCard');
        card.setAttribute('data-speak', p[1].replace(/-/g, ''));
        card.querySelector('.pron-card__num').textContent = p[0];
        card.querySelector('.pron-card__word').textContent = p[1];
        nbGrid.appendChild(card);
      });
      nb.appendChild(nbTitle); nb.appendChild(nbHint); nb.appendChild(nbGrid); body.appendChild(nb);
    }
    if (showRead) {
      var rb = document.createElement('div'); rb.className = 'read-block';
      var rbTitle = document.createElement('div'); rbTitle.className = 'read-block__title'; rbTitle.textContent = 'סולם בדיקת קשר';
      var rbList = document.createElement('div'); rbList.className = 'read-block__list';
      READ.forEach(function (r) {
        var row = cloneTpl('tplReadRow');
        var numEl = row.querySelector('.read-row__num');
        numEl.textContent = r[0]; numEl.style.background = r[3];
        row.querySelector('.read-row__en').textContent = r[1];
        row.querySelector('.read-row__he').textContent = r[2];
        rbList.appendChild(row);
      });
      rb.appendChild(rbTitle); rb.appendChild(rbList); body.appendChild(rb);
    }
    var anySection = false;
    srcSections.forEach(function (c) {
      var its = q ? c.items.filter(matchItem) : c.items;
      if (!its.length) return;
      anySection = true;
      var sec = cloneTpl('tplDictSection');
      sec.querySelector('.dict-section__title').textContent = c.label;
      var list = sec.querySelector('.dict-section__list');
      its.forEach(function (it) {
        var row = cloneTpl('tplDictRow');
        row.querySelector('.dict-row__speak').setAttribute('data-speak', it[0]);
        row.querySelector('.dict-row__en').textContent = it[0];
        row.querySelector('.dict-row__he').textContent = it[1];
        row.querySelector('.dict-row__note').textContent = it[2] || '';
        list.appendChild(row);
      });
      body.appendChild(sec);
    });
    if (!anySection && !showNumbers && !showRead) {
      var empty = document.createElement('div'); empty.className = 'dict-empty';
      var icon = document.createElement('div'); icon.className = 'dict-empty__icon'; icon.textContent = '🔎';
      var txt = document.createElement('div'); txt.className = 'dict-empty__text';
      txt.textContent = 'לא נמצאו מונחים עבור "' + state.dictQuery + '"';
      empty.appendChild(icon); empty.appendChild(txt); body.appendChild(empty);
    }
    var input = document.getElementById('dictInput');
    if (input.value !== state.dictQuery) input.value = state.dictQuery;
  }

  function renderPractice() {
    var hub = document.getElementById('pracHub');
    var radio = document.getElementById('pracRadio');
    var memory = document.getElementById('pracMemory');
    var isRadio = state.pracView === 'radio';
    var isMemory = state.pracView === 'memory';
    hub.hidden = isRadio || isMemory;
    radio.hidden = !isRadio;
    memory.hidden = !isMemory;
    if (isRadio) renderPracRadio();
    else if (isMemory) renderMemory();
    else renderPracHub();
  }

  function renderPracHub() {
    document.getElementById('pracStreak').textContent = state.streak;
    var grid = document.getElementById('pracGamesGrid'); clearEl(grid);
    GAMES.forEach(function (g) {
      var card = cloneTpl('tplGameCard');
      card.setAttribute('data-a', g.id);
      card.querySelector('.game-card__top').style.background = g.bg;
      var meta = card.querySelector('.game-card__meta'); meta.textContent = g.meta; meta.style.color = g.accent;
      card.querySelector('.game-card__icon').appendChild(gameIconSVG(g.kind, g.accent));
      card.querySelector('.game-card__he').textContent = g.he;
      var en = card.querySelector('.game-card__en'); en.textContent = g.en; en.style.color = g.accent;
      card.querySelector('.game-card__desc').textContent = g.desc;
      var fill = card.querySelector('.game-card__progress-fill'); fill.style.width = g.prog; fill.style.background = g.accent;
      card.querySelector('.game-card__arrow').style.color = g.accent;
      grid.appendChild(card);
    });
  }

  function renderPracRadio() {
    document.getElementById('pracRadioStreak').textContent = state.streak;
    var optsWrap = document.getElementById('pracRadioOpts'); clearEl(optsWrap);
    var done = state.pracDone, sel = state.pracSel;
    RADIO_GAME.opts.forEach(function (o, i) {
      var opt = cloneTpl('tplRadioOpt');
      opt.setAttribute('data-a', i);
      opt.querySelector('.radio-opt__text').textContent = o[0];
      if (done) {
        if (o[1]) opt.classList.add('is-correct');
        else if (i === sel) opt.classList.add('is-wrong');
        else opt.classList.add('is-dim');
      } else if (i === sel) opt.classList.add('is-selected');
      optsWrap.appendChild(opt);
    });
    var confetti = document.getElementById('pracConfetti'); clearEl(confetti);
    if (state.pracCelebrate) {
      for (var d = 0; d < 7; d++) {
        var gem = cloneTpl('tplGem');
        gem.style.left = (10 + d * 12) + '%';
        gem.style.fontSize = (16 + (d % 3) * 6) + 'px';
        gem.style.animationDelay = (d * 0.12).toFixed(2) + 's';
        confetti.appendChild(gem);
      }
    }
    var footer = document.getElementById('pracRadioFooter'); clearEl(footer);
    if (!done) {
      var btn = document.createElement('button');
      btn.className = 'check-btn' + (sel !== null ? ' is-enabled' : '');
      btn.setAttribute('data-act', 'pracCheck'); btn.textContent = 'בדוק/י תשובה';
      footer.appendChild(btn);
    } else {
      var ok = sel === 0;
      var title = ok ? POSITIVE[Math.floor(Math.random() * POSITIVE.length)] : 'לא מדויק — נסה/י שוב';
      var fb = document.createElement('div'); fb.className = 'prac-feedback';
      var row = document.createElement('div'); row.className = 'prac-feedback__row';
      var icon = document.createElement('div'); icon.className = 'prac-feedback__icon ' + (ok ? 'is-ok' : 'is-no'); icon.textContent = ok ? '✓' : '!';
      var textWrap = document.createElement('div'); textWrap.className = 'prac-feedback__text';
      var titleEl = document.createElement('div'); titleEl.className = 'prac-feedback__title ' + (ok ? 'is-ok' : 'is-no'); titleEl.textContent = title;
      textWrap.appendChild(titleEl);
      if (ok) { var xp = document.createElement('div'); xp.className = 'prac-feedback__xp'; xp.textContent = '+25 XP · +5 💎'; textWrap.appendChild(xp); }
      else { var corr = document.createElement('div'); corr.className = 'prac-feedback__correct'; corr.textContent = 'Cleared to land runway 26'; textWrap.appendChild(corr); }
      row.appendChild(icon); row.appendChild(textWrap);
      var nextBtn = document.createElement('button');
      nextBtn.className = 'prac-feedback__next ' + (ok ? 'is-ok' : 'is-no');
      nextBtn.setAttribute('data-act', 'pracReset'); nextBtn.textContent = 'בקשה הבאה';
      fb.appendChild(row); fb.appendChild(nextBtn); footer.appendChild(fb);
    }
  }

  function renderMemory() {
    var levelsEl = document.getElementById('memLevels');
    var boardEl = document.getElementById('memBoard');
    var isBoard = state.memView === 'board';
    levelsEl.hidden = isBoard;
    boardEl.hidden = !isBoard;
    if (isBoard) renderMemBoard(); else renderMemLevels();
  }

  function renderMemLevels() {
    var list = document.getElementById('memLevelsList'); clearEl(list);
    MEMORY_LEVELS.forEach(function (l) {
      var row = cloneTpl('tplMemLevel');
      row.setAttribute('data-a', l.id);
      row.querySelector('.mem-level__he').textContent = l.he;
      row.querySelector('.mem-level__sub').textContent = l.sub;
      row.querySelector('.mem-level__dot').style.background = l.dot;
      list.appendChild(row);
    });
  }

  function renderMemBoard() {
    var lvl = state.memLevel;
    var timerChip = document.getElementById('memTimerChip');
    if (lvl && lvl.seconds) { timerChip.hidden = false; timerChip.textContent = state.memSeconds + 's ⏱'; }
    else { timerChip.hidden = true; }
    var total = state.memCards.length;
    document.getElementById('memStatsLabel').textContent =
      'זוגות: ' + (state.memMatched.length / 2) + ' · מהלכים: ' + state.memMoves + '/' + (lvl ? lvl.pairs : 0);
    var pct = total ? Math.round(state.memMatched.length / total * 100) : 0;
    document.getElementById('memProgressFill').style.width = pct + '%';
    var grid = document.getElementById('memGrid'); clearEl(grid);
    state.memCards.forEach(function (c, idx) {
      var card = cloneTpl('tplMemCard');
      card.setAttribute('data-a', idx);
      var isMatched = state.memMatched.indexOf(idx) >= 0;
      var isFlipped = isMatched || state.memFlipped.indexOf(idx) >= 0;
      card.classList.toggle('is-flipped', isFlipped);
      card.classList.toggle('is-matched', isMatched);
      card.querySelector('.mem-card__text').textContent = c.text;
      grid.appendChild(card);
    });
  }

  function renderProfile() {
    var info = roleInfo[role()];
    var photoWrap = document.getElementById('profilePhotoWrap'); clearEl(photoWrap);
    var fb2 = document.createElement('div'); fb2.className = 'profile__photo-fallback';
    var fbImg = document.createElement('img'); fbImg.src = info.idle; fbImg.alt = '';
    fb2.appendChild(fbImg); photoWrap.appendChild(fb2);
    document.getElementById('profileBadge').textContent = info.badge;
    var statsWrap = document.getElementById('profileStats');
    clearEl(statsWrap);
    statsWrap.style.display = 'none';
    var togglesWrap = document.getElementById('profileRoleToggles'); clearEl(togglesWrap);
    ['ctrl', 'insp'].forEach(function (r) {
      var ri = roleInfo[r]; var sel = role() === r;
      var rd = state.roleData[r] || { completed: [] };
      var toggle = cloneTpl('tplRoleToggle');
      toggle.setAttribute('data-a', r);
      toggle.classList.toggle('is-active', sel);
      toggle.style.setProperty('--rt-tint', ri.tint);
      toggle.style.setProperty('--rt-accent', ri.accent);
      toggle.querySelector('.role-toggle__img').src = ri.idle;
      toggle.querySelector('.role-toggle__name').textContent = ri.he;
      toggle.querySelector('.role-toggle__meta').textContent = 'שלב ' + Math.min(rd.completed.length + 1, 10) + ' · ' + rd.completed.length + ' הושלמו';
      togglesWrap.appendChild(toggle);
    });
    document.getElementById('soundSwitch').classList.toggle('is-on', state.soundOn);
  }

  function renderLesson() {
    var st = stages[state.stageId];
    var ex = st.exercises[state.exIndex];
    var info = roleInfo[role()];
    document.getElementById('lessonProgressFill').style.width = Math.round(state.exIndex / st.exercises.length * 100) + '%';
    document.getElementById('lessonKicker').textContent = 'שלב ' + st.num + ' · ' + st.title;
    var charImg = (state.exIndex % 2 === 1) ? info.salute : info.idle;
    var charImgEl = document.getElementById('lessonCharImg');
    if (charImgEl) {
      charImgEl.src = charImg;
      charImgEl.classList.toggle('is-speaking', state.speaking);
    }
    document.getElementById('lessonCharBtn').setAttribute('data-speak', exVoice(ex));
    document.getElementById('lessonRoleLabel').textContent = info.he;
    document.getElementById('lessonSpeakState').textContent = '· ' + (state.speaking ? 'מדבר/ת…' : 'הקש/י לשמיעה');
    document.getElementById('lessonHeText').textContent = ex.he;
    var exWrap = document.getElementById('lessonExercise'); clearEl(exWrap);
    if (ex.type === 'mcq') exWrap.appendChild(buildExerciseMcq(ex));
    else if (ex.type === 'dnd') exWrap.appendChild(buildExerciseDnd(ex));
    else if (ex.type === 'listen') exWrap.appendChild(buildExerciseListen(ex));
    renderLessonFooter(ex);
  }

  function buildExerciseMcq(ex) {
    var wrap = document.createElement('div');
    var prompt = document.createElement('div'); prompt.className = 'exercise-mcq__prompt';
    var play = document.createElement('button'); play.className = 'exercise-mcq__play';
    play.setAttribute('data-act', 'speak'); play.setAttribute('data-speak', ex.en); play.textContent = '🔊';
    var en = document.createElement('div'); en.className = 'exercise-mcq__en'; en.textContent = ex.en;
    prompt.appendChild(play); prompt.appendChild(en);
    var optsWrap = document.createElement('div'); optsWrap.className = 'exercise-mcq__opts';
    var ltr = ex.opts.every(function (o) { return /^[\x00-\x7F\s'.()-]+$/.test(o[0]); });
    ex.opts.forEach(function (o, i) {
      var opt = cloneTpl('tplMcqOpt');
      opt.setAttribute('data-a', i); opt.classList.add(ltr ? 'is-ltr' : 'is-rtl');
      opt.querySelector('.mcq-opt__text').textContent = o[0];
      if (state.feedback) { if (o[1]) opt.classList.add('is-correct'); else if (i === state.selected) opt.classList.add('is-wrong'); else opt.classList.add('is-dim'); }
      else if (i === state.selected) opt.classList.add('is-selected');
      optsWrap.appendChild(opt);
    });
    wrap.appendChild(prompt); wrap.appendChild(optsWrap); return wrap;
  }

  function buildExerciseDnd(ex) {
    var wrap = document.createElement('div');
    var sentence = document.createElement('div'); sentence.className = 'exercise-dnd__sentence';
    var tx = document.createElement('div'); tx.className = 'exercise-dnd__tx'; tx.textContent = '● TX';
    sentence.appendChild(tx);
    var segs = ex.template.split('__'); var slot = 0;
    for (var si = 0; si < segs.length; si++) {
      var segTxt = segs[si].trim();
      if (segTxt) { var segEl = document.createElement('span'); segEl.className = 'exercise-dnd__seg'; segEl.textContent = segTxt; sentence.appendChild(segEl); }
      if (si < segs.length - 1) {
        var idx = slot++; var filled = idx < state.placed.length;
        var slotBtn = document.createElement('button');
        slotBtn.className = 'exercise-dnd__slot' + (filled ? ' is-filled' : '');
        slotBtn.setAttribute('data-act', 'removeSlot'); slotBtn.setAttribute('data-a', idx);
        slotBtn.textContent = filled ? state.placed[idx].word : '＿＿';
        sentence.appendChild(slotBtn);
      }
    }
    var hint = document.createElement('div'); hint.className = 'exercise-dnd__hint'; hint.textContent = 'הקש/י על מילה כדי לשבץ אותה';
    var bank = document.createElement('div'); bank.className = 'exercise-dnd__bank';
    ex.bank.forEach(function (w, i) {
      var used = state.placed.some(function (p) { return p.bankId === i; });
      var wordBtn = document.createElement('button');
      wordBtn.className = 'exercise-dnd__word' + (used ? ' is-used' : '');
      wordBtn.setAttribute('data-act', 'place'); wordBtn.setAttribute('data-a', i); wordBtn.textContent = w;
      bank.appendChild(wordBtn);
    });
    wrap.appendChild(sentence); wrap.appendChild(hint); wrap.appendChild(bank); return wrap;
  }

  function buildExerciseListen(ex) {
    var wrap = document.createElement('div'); wrap.className = 'exercise-listen';

    var play = document.createElement('button'); play.className = 'exercise-listen__play';
    play.setAttribute('data-act', 'speak'); play.setAttribute('data-speak', ex.audio); play.textContent = '▶';
    var bars = document.createElement('div'); bars.className = 'exercise-listen__bars';
    var delays = ['0s', '.15s', '.3s', '.45s', '.6s'];
    var cols = ['#9cc3ea', '#6aa6e0', '#2E78C7', '#6aa6e0', '#9cc3ea'];
    for (var b = 0; b < 5; b++) {
      var bar = document.createElement('div'); bar.className = 'exercise-listen__bar';
      bar.style.background = cols[b]; bar.style.animationDelay = delays[b]; bars.appendChild(bar);
    }
    var hint = document.createElement('div'); hint.className = 'exercise-listen__hint';
    hint.textContent = ex.template ? 'האזן/י ואז השלם/י את המשפט' : 'הקש/י לשמיעת התשדורת';
    wrap.appendChild(play); wrap.appendChild(bars); wrap.appendChild(hint);

    if (ex.template) {
      /* --- בניית משפט עם חסרות --- */
      var sentence = document.createElement('div'); sentence.className = 'exercise-dnd__sentence';
      var tx = document.createElement('div'); tx.className = 'exercise-dnd__tx'; tx.textContent = '● RX';
      sentence.appendChild(tx);
      var segs = ex.template.split('__'); var slot = 0;
      for (var si = 0; si < segs.length; si++) {
        var segTxt = segs[si].trim();
        if (segTxt) { var segEl = document.createElement('span'); segEl.className = 'exercise-dnd__seg'; segEl.textContent = segTxt; sentence.appendChild(segEl); }
        if (si < segs.length - 1) {
          var idx = slot++;
          var filled = idx < state.placed.length;
          var slotBtn = document.createElement('button');
          var slotCls = 'exercise-dnd__slot';
          if (filled) {
            if (state.feedback) {
              slotCls += (state.placed[idx].word === ex.answer[idx]) ? ' is-listen-correct' : ' is-listen-wrong';
            } else {
              slotCls += ' is-filled';
            }
          }
          slotBtn.className = slotCls;
          slotBtn.setAttribute('data-act', 'removeSlot'); slotBtn.setAttribute('data-a', idx);
          slotBtn.textContent = filled ? state.placed[idx].word : '＿＿';
          if (state.feedback) slotBtn.disabled = true;
          sentence.appendChild(slotBtn);
        }
      }
      wrap.appendChild(sentence);

      if (!state.feedback) {
        var bankHint = document.createElement('div'); bankHint.className = 'exercise-dnd__hint'; bankHint.textContent = 'הקש/י על מילה כדי לשבץ אותה';
        var bank = document.createElement('div'); bank.className = 'exercise-dnd__bank';
        ex.bank.forEach(function (w, i) {
          var used = state.placed.some(function (p) { return p.bankId === i; });
          var wordBtn = document.createElement('button');
          wordBtn.className = 'exercise-dnd__word' + (used ? ' is-used' : '');
          wordBtn.setAttribute('data-act', 'place'); wordBtn.setAttribute('data-a', i); wordBtn.textContent = w;
          bank.appendChild(wordBtn);
        });
        wrap.appendChild(bankHint); wrap.appendChild(bank);
      }

    } else {
      /* --- התנהגות ישנה: כפתור חשיפה --- */
      if (state.revealed) {
        var block = document.createElement('div'); block.className = 'exercise-listen__reveal-block';
        var enLine = document.createElement('div'); enLine.className = 'exercise-listen__reveal-en'; enLine.textContent = '"' + ex.audio + '"';
        var divider = document.createElement('div'); divider.className = 'exercise-listen__reveal-divider';
        var heLine = document.createElement('div'); heLine.className = 'exercise-listen__reveal-he'; heLine.textContent = ex.he2;
        block.appendChild(enLine); block.appendChild(divider); block.appendChild(heLine); wrap.appendChild(block);
      } else {
        var revealBtn = document.createElement('button');
        revealBtn.className = 'exercise-listen__reveal-btn'; revealBtn.setAttribute('data-act', 'reveal');
        revealBtn.textContent = 'חשוף/י תרגום'; wrap.appendChild(revealBtn);
      }
    }
    return wrap;
  }

  function renderLessonFooter(ex) {
    var footer = document.getElementById('lessonFooter'); clearEl(footer);
    footer.className = 'lesson__footer';
    if (!state.feedback) {
      var btn = document.createElement('button');
      btn.className = 'check-btn' + (canCheck() ? ' is-enabled' : '');
      btn.setAttribute('data-act', 'check'); btn.textContent = 'בדוק/י';
      footer.appendChild(btn); return;
    }
    var ok = state.feedback === 'ok';
    var correctText = '';
    if (ex.type === 'mcq') { for (var ci = 0; ci < ex.opts.length; ci++) if (ex.opts[ci][1]) correctText = ex.opts[ci][0]; }
    else if (ex.type === 'dnd') correctText = ex.answer.join('  ·  ');
    else if (ex.type === 'listen' && ex.template) correctText = ex.answer.join('  ·  ');
    footer.classList.add('lesson-feedback', ok ? 'is-ok' : 'is-no');
    var row = document.createElement('div'); row.className = 'lesson-feedback__row';
    var icon = document.createElement('div'); icon.className = 'lesson-feedback__icon ' + (ok ? 'is-ok' : 'is-no'); icon.textContent = ok ? '✓' : '!';
    var textWrap = document.createElement('div'); textWrap.className = 'lesson-feedback__text';
    var title = document.createElement('div'); title.className = 'lesson-feedback__title ' + (ok ? 'is-ok' : 'is-no'); title.textContent = state.feedbackTitle;
    textWrap.appendChild(title);
    if (!ok && (ex.type !== 'listen' || ex.template)) { var corr = document.createElement('div'); corr.className = 'lesson-feedback__correct'; corr.textContent = correctText; textWrap.appendChild(corr); }
    row.appendChild(icon); row.appendChild(textWrap);
    var tip = document.createElement('div'); tip.className = 'lesson-feedback__tip';
    var tipIcon = document.createElement('span'); tipIcon.className = 'lesson-feedback__tip-icon'; tipIcon.textContent = '💡';
    var tipText = document.createElement('span'); tipText.textContent = ex.tip;
    tip.appendChild(tipIcon); tip.appendChild(tipText);
    var nextBtn = document.createElement('button');
    nextBtn.className = 'lesson-feedback__next ' + (ok ? 'is-ok' : 'is-no');
    nextBtn.setAttribute('data-act', 'next'); nextBtn.textContent = 'המשך/י';
    footer.appendChild(row); footer.appendChild(tip); footer.appendChild(nextBtn);
  }

  function renderComplete() {
    var fs = state.finalStats || { xp: 0, acc: 0, time: '0:00', passed: true };
    var passed = fs.passed !== false;
    var num = stages[state.stageId] ? stages[state.stageId].num : '';
    var sub = stages[state.stageId] ? stages[state.stageId].title : '';
    var fd = rdata().completed.length;
    document.getElementById('completeSub').textContent = sub;
    document.getElementById('completeTitle').textContent = passed ? ('שלב ' + num + ' הושלם!') : 'כמעט! נסה/י שוב';
    var sparks = document.getElementById('completeSparks'); clearEl(sparks);
    if (passed) { for (var s = 0; s < 3; s++) sparks.appendChild(cloneTpl('tplSpark')); }
    var towerWrap = document.getElementById('completeTower'); clearEl(towerWrap);
    towerWrap.appendChild(buildTower(fd, passed));
    var msgEl = document.getElementById('completeMsg');
    msgEl.textContent = passed ? ('קומה ' + fd + ' נבנתה! המגדל גדל 🏗️') : ('צריך 50% לפחות כדי לעבור · קיבלת ' + fs.acc + '%');
    msgEl.className = 'complete__msg ' + (passed ? 'is-passed' : 'is-failed');
    var statsWrap = document.getElementById('completeStats'); clearEl(statsWrap);
    [['XP', '+' + fs.xp, true], ['דיוק', fs.acc + '%', false], ['זמן', fs.time, false]].forEach(function (s) {
      var card = cloneTpl('tplCompleteStat');
      card.querySelector('.complete-stat__label').textContent = s[0];
      var val = card.querySelector('.complete-stat__value'); val.textContent = s[1];
      if (s[2]) val.classList.add('is-xp');
      statsWrap.appendChild(card);
    });
  }

  /* ----------------------------- EVENTS ----------------------------- */
  var dictInputWired = false;
  function wireDictInput() {
    if (dictInputWired) return; dictInputWired = true;
    var input = document.getElementById('dictInput');
    input.addEventListener('input', function (e) {
      state.dictQuery = e.target.value;
      var caret = e.target.selectionStart; render();
      var fi = document.getElementById('dictInput'); fi.focus();
      try { fi.setSelectionRange(caret, caret); } catch (x) {}
    });
  }
  wireDictInput();

  var ACTS = {
    enter: enter, start: startWelcome, confirmRole: confirmRole,
    toggleSound: toggleSound, check: check, next: next, reveal: reveal,
    goHome: goHome, closeLesson: goHome,
    pracBack: pracBack, pracCheck: pracCheck, pracReset: pracReset
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]'); if (!el) return;
    var act = el.getAttribute('data-act');
    var a = el.getAttribute('data-a');
    if (act === 'speak')      { speak(el.getAttribute('data-speak')); return; }
    if (act === 'pickRole')   { pickRole(a); return; }
    if (act === 'startStage') { startStage(parseInt(a, 10)); return; }
    if (act === 'select')     { select(parseInt(a, 10)); return; }
    if (act === 'place')      { place(parseInt(a, 10)); return; }
    if (act === 'removeSlot') { removeSlot(parseInt(a, 10)); return; }
    if (act === 'dictCat')    { setL({ dictCat: a }); return; }
    if (act === 'tab')        { setTab(a); return; }
    if (act === 'openGame')   { openGame(a); return; }
    if (act === 'pracSelect') { pracSelect(parseInt(a, 10)); return; }
    if (act === 'switchRole') { switchRole(a); return; }
    if (act === 'memPickLevel') { memPickLevel(a); return; }
    if (act === 'memFlip')      { memFlip(parseInt(a, 10)); return; }
    if (act === 'pracBack')     { if (state.pracView === 'memory') memBack(); else pracBack(); return; }
    if (ACTS[act]) ACTS[act]();
  });

  render();
})();