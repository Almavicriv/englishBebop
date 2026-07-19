/* =====================================================================
   ATC English Trainer - app logic (role-aware content)
   ===================================================================== */
(function () {
  'use strict';

  var D = window.ATC_DATA;
  var PRON = D.PRON, READ = D.READ;
  var roleInfo = D.roleInfo, POSITIVE = D.POSITIVE, GAMES = D.GAMES, RADIO_GAME = D.RADIO_GAME;
  var MEMORY_LEVELS_FALLBACK = [
    { id: 'easy',   he: 'קל',    sub: '6 זוגות · ללא טיימר', pairs: 6,  seconds: null, dot: '#2E9E5B' },
    { id: 'medium', he: 'בינוני', sub: '8 זוגות · 90 שניות',  pairs: 8,  seconds: 90,   dot: '#F2A100' },
    { id: 'hard',   he: 'קשה',   sub: '12 זוגות · 60 שניות', pairs: 12, seconds: 60,   dot: '#E5484D' }
  ];
  var MEMORY_POOL_FALLBACK = [
    ['Say again', 'אמור שנית'], ['Roger', 'קיבלתי'], ['Affirm', 'חיובי'], ['Negative', 'שלילי'],
    ['Standby', 'מיד אתך'], ['Disregard', 'התעלם'], ['Unable', 'לא מסוגל'], ['Readback', 'חזור על'],
    ['Climb', 'טפס'], ['Descend', 'הנמך'], ['Maintain', 'שמור'], ['Taxi', 'הסע'],
    ['Hold short', 'עצור לפני'], ['Cleared to land', 'רשאי לנחות'], ['Go around', 'לך סביב'],
    ['Traffic', 'תנועה'], ['Wind calm', 'רוח קלה'], ['QNH', 'לחץ ברומטרי'], ['Visibility', 'ראות'],
    ['Overcast', 'שמים מכוסים'], ['Mayday', 'מצוקה'], ['Pan-Pan', 'תקלה'],
    ['Vacate the runway', 'פנה את המסלול'], ['Line up and wait', 'התיישר והמתן']
  ];
  var MEMORY_LEVELS = (D.MEMORY_LEVELS && D.MEMORY_LEVELS.length) ? D.MEMORY_LEVELS : MEMORY_LEVELS_FALLBACK;

  /* ---- תוכן תלוי-תפקיד: כל אחת מהפונקציות הבאות מחזירה את המידע השייך
     לתפקיד הנוכחי (בקר/פקח) בהתאם ל-role() הפעיל ---- */
  function curMetaList()  { return (D.metaListByRole && D.metaListByRole[role()]) || D.metaList; }
  function curStagesMap() { return (D.stagesByRole && D.stagesByRole[role()]) || D.stages; }
  function curCATS()      { return (D.CATSByRole && D.CATSByRole[role()]) || D.CATS; }
  function curDictChips()  { return (D.DICT_CHIPSByRole && D.DICT_CHIPSByRole[role()]) || D.DICT_CHIPS; }
  function curMemoryPool() {
    var p = (D.MEMORY_POOLByRole && D.MEMORY_POOLByRole[role()]) || D.MEMORY_POOL;
    return (p && p.length) ? p : MEMORY_POOL_FALLBACK;
  }

  /* ---- מספר השלבים הכולל (ללא המבחן המסכם) - תלוי מסלול, לא קבוע ---- */
  function totalStepsForRole(r) {
    var ml = (D.metaListByRole && D.metaListByRole[r]) || D.metaList || [];
    var count = 0;
    for (var i = 0; i < ml.length; i++) { if (!ml[i].final) count++; }
    return count;
  }
  function curTotalSteps() { return totalStepsForRole(role()); }

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
    exStates: [],
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

  var spTimer, toastTimer, celTimer, autoT, memTimer, memFlipTimer, flightMapTimer;

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
    var ml = curMetaList(); var stg = curStagesMap();
    for (var i = 0; i < ml.length; i++) {
      var m = ml[i];
      if (stg[m.id] && done.indexOf(m.id) < 0) return m.id;
    }
    return null;
  }
  function curEx() { return curStagesMap()[state.stageId].exercises[state.exIndex]; }

  function exVoice(ex) {
    if (ex.type === 'listen') return ex.audio;
    if (ex.type === 'dnd') return fillSentence(ex);
    return maskPronunciationAudio(ex.en) || '';
  }

  function fillSentence(ex) {
    var parts = ex.template.split('__'); var out = '';
    for (var i = 0; i < parts.length; i++) { out += parts[i]; if (i < ex.answer.length) out += ex.answer[i]; }
    return out.replace(/\s+/g, ' ').trim();
  }

  /* ---- מיסוך TTS: בשאלות "כיצד הוגים/קוראים/משדרים X" אין להקריא את המילה/המספר
     המבוקש בעצמו (זה בדיוק התשובה) - הטקסט המוצג על המסך נשאר שלם,
     רק תוכן האודיו (מה שנשלח ל-speechSynthesis) מוחלף ב-"..." ---- */
  function maskPronunciationAudio(text) {
    if (!text) return text;
    var cueRe = /(pronounce|pronunciation|spelled|spell|how do you read|how is it transmitted|how do you transmit)/i;
    if (!cueRe.test(text)) return text;
    if (/"[^"]+"/.test(text)) {
      return text.replace(/"[^"]+"/g, '"..."');
    }
    if (/\d[\d,.:]*\d|\b\d\b/.test(text)) {
      return text.replace(/\d[\d,.:]*\d|\b\d\b/g, '...');
    }
    var wordMatch = text.match(/\b(?:number|digit|word)\s+["']?([A-Za-z0-9]+)["']?/i);
    if (wordMatch) {
      return text.replace(wordMatch[1], '...');
    }
    return text;
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

  /* כניסה ישירה ללומדה  ללא אימות */
  function enter() { set({ screen: 'welcome' }); }

  function startWelcome() { set({ screen: state.role ? 'home' : 'role', tab: 'home' }); }
  function pickRole(r) { setL({ pendingRole: r }); }
  function confirmRole() { var r = state.pendingRole || 'ctrl'; set({ role: r, pendingRole: null, screen: 'home', tab: 'home' }); }

  function setTab(tb) {
    if (tb !== 'practice') { clearInterval(memTimer); clearTimeout(memFlipTimer); }
    if (tb === 'home') set({ screen: 'home', tab: 'home', pracView: 'hub', memView: 'levels' });
    else if (tb === 'dict') set({ screen: 'dictionary', tab: 'dict', pracView: 'hub', memView: 'levels' });
    else if (tb === 'practice') set({ screen: 'practice', tab: 'practice', pracView: 'hub' });
    else if (tb === 'profile') set({ screen: 'profile', tab: 'profile', pracView: 'hub', memView: 'levels' });
  }

  function toggleSound() { set({ soundOn: !state.soundOn }); }

  function startStage(id) {
    var st = curStagesMap()[id];
    if (!st) { toast('השלב יהיה זמין בקרוב ✈'); return; }
    setL({ screen: 'lesson', stageId: id, exIndex: 0, xp: 0, correct: 0, total: 0,
      startTime: Date.now(), selected: null, placed: [], feedback: null, revealed: false,
      exStates: new Array(st.exercises.length).fill(null) });
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
    var title = ok ? POSITIVE[Math.floor(Math.random() * POSITIVE.length)] : 'לא מדויק , נסה/י לזכור';
    setL({ feedback: ok ? 'ok' : 'no', feedbackTitle: title, speaking: false,
      total: state.total + 1, correct: state.correct + (ok ? 1 : 0), xp: state.xp + (ok ? 10 : 0) });
  }

  function next() {
    saveCurrentExState();
    var exs = curStagesMap()[state.stageId].exercises; var ni = state.exIndex + 1;
    if (ni >= exs.length) {
      var secs = Math.max(1, Math.round((Date.now() - state.startTime) / 1000));
      var mm = Math.floor(secs / 60), ss = String(secs % 60); if (ss.length < 2) ss = '0' + ss;
      var acc = state.total ? Math.round(state.correct / state.total * 100) : 0;
      var passed = acc >= 50;
      var r = role(); var rd = rdata();
      var beforeCount = rd.completed.length;
      var completed = (passed && rd.completed.indexOf(state.stageId) < 0)
        ? rd.completed.concat([state.stageId]) : rd.completed;
      var afterCount = completed.length;
      var roleData = Object.assign({}, state.roleData);
      roleData[r] = { completed: completed, xp: rd.xp + state.xp };
      if (passed) { playSound('stageComplete'); }
      else        { playSound('stageFailed');   }
      set({ screen: 'complete', roleData: roleData,
        gems: state.gems + (passed ? 5 : 0),
        finalStats: { xp: state.xp, acc: acc, time: mm + ':' + ss, passed: passed,
          progressBefore: beforeCount, progressAfter: afterCount } });
    } else {
      setL({ exIndex: ni, selected: null, placed: [], feedback: null, revealed: false });
      autoSpeak();
    }
  }

  function goHome() { cancelSpeech(); setL({ screen: 'home', tab: 'home', feedback: null, speaking: false }); }
  function autoSpeak() { var ex = curEx(); clearTimeout(autoT); autoT = setTimeout(function () { speak(exVoice(ex)); }, 360); }

  function saveCurrentExState() {
    state.exStates[state.exIndex] = {
      selected: state.selected,
      placed: state.placed.slice(),
      feedback: state.feedback,
      feedbackTitle: state.feedbackTitle,
      revealed: state.revealed
    };
  }

  function navPrev() {
    if (state.exIndex === 0) return;
    saveCurrentExState();
    var ni = state.exIndex - 1;
    var saved = state.exStates[ni];
    var patch = { exIndex: ni, selected: null, placed: [], feedback: null, feedbackTitle: '', revealed: false };
    if (saved) { patch.selected = saved.selected; patch.placed = saved.placed.slice(); patch.feedback = saved.feedback; patch.feedbackTitle = saved.feedbackTitle; patch.revealed = saved.revealed; }
    cancelSpeech();
    setL(patch);
    if (!patch.feedback) autoSpeak();
  }

  function navNext() {
    var exs = curStagesMap()[state.stageId].exercises;
    if (state.exIndex >= exs.length - 1) return;
    saveCurrentExState();
    var ni = state.exIndex + 1;
    var saved = state.exStates[ni];
    var patch = { exIndex: ni, selected: null, placed: [], feedback: null, feedbackTitle: '', revealed: false };
    if (saved) { patch.selected = saved.selected; patch.placed = saved.placed.slice(); patch.feedback = saved.feedback; patch.feedbackTitle = saved.feedbackTitle; patch.revealed = saved.revealed; }
    cancelSpeech();
    setL(patch);
    if (!patch.feedback) autoSpeak();
  }

  function openGame(id) {
    if (id === 'memory') openMemory();
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

  /* ---- מעבר תפקיד: מאפס תצוגות שתלויות בתוכן התפקיד הקודם (מילון/הקפה) ---- */
  function switchRole(r) {
    set({ role: r, dictCat: 'all', dictQuery: '', pracView: 'hub', memView: 'levels' });
  }

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
    if (!document.getElementById('pracMemory') || !document.getElementById('tplMemLevel')) {
      toast('חסר markup של משחק הזיכרון ב-index.html עדכן/י את הקובץ');
      return;
    }
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
    var pool = shuffleArr(curMemoryPool()).slice(0, lvl.pairs);
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
    setL({ pracView: 'hub', memView: 'levels' });
  }

  /* ----------------------------- TOWER BUILDER ----------------------------- */
  function buildTower(floorsDone, building, maxSteps) {
    var wrap = document.createElement('div'); wrap.className = 'tower';
    var beacon = document.createElement('div'); beacon.className = 'tower__beacon';
    var beaconLight = document.createElement('div'); beaconLight.className = 'tower__beacon-light';
    beacon.appendChild(beaconLight);
    var roof = document.createElement('div'); roof.className = 'tower__roof';
    var cab = document.createElement('div'); cab.className = 'tower__cab';
    var cabWindow = document.createElement('div'); cabWindow.className = 'tower__cab-window';
    cab.appendChild(cabWindow);
    var floors = document.createElement('div'); floors.className = 'tower__floors';
    var cap = (typeof maxSteps === 'number' && maxSteps > 0) ? maxSteps : 10;
    var total = Math.max(0, Math.min(cap, floorsDone));
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

  /* ----------------------------- FLIGHT MAP (stage-complete) -----------------------------
     קו טיסה מקווק ופין לכל שלב, מצוירים ב-SVG שקוף שיושב מעל גרפיקת מפת העולם
     האמיתית (רקע CSS, לא בתוך תיבה). ה-viewBox קבוע ומתוח ל-100% רוחב, כך שכל
     הפינים תמיד נראים בבת אחת בלי גלילה - גם ב-10 שלבים וגם ב-14. המטוס הוא
     תמונה אמיתית (assets/planeIcon.png), גולש עם הטיה מהפין הקודם לחדש. ---------------------------- */
  var FM_VB_W = 261, FM_VB_H = 130, FM_PAD = 20, FM_AMP = 22; /* יחס 744:371 של assets/worldMapBg.png */
  var PLANE_W = 34, PLANE_H = 16.1; // אותו יחס רוחב-גובה של assets/planeIcon.png

  function fmSmoothPath(points) {
    if (points.length < 2) return '';
    var d = 'M ' + points[0].x + ' ' + points[0].y;
    for (var i = 0; i < points.length - 1; i++) {
      var p0 = points[i - 1] || points[i];
      var p1 = points[i];
      var p2 = points[i + 1];
      var p3 = points[i + 2] || p2;
      var c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      var c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += ' C ' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ', ' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ', ' + p2.x + ' ' + p2.y;
    }
    return d;
  }

  function fmPlaneGroup() {
    var ns = 'http://www.w3.org/2000/svg';
    var g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'complete__flightmap-plane');
    var img = document.createElementNS(ns, 'image');
    img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'assets/planeIcon.png');
    img.setAttribute('href', 'assets/planeIcon.png');
    img.setAttribute('x', -PLANE_W / 2); img.setAttribute('y', -PLANE_H / 2);
    img.setAttribute('width', PLANE_W); img.setAttribute('height', PLANE_H);
    g.appendChild(img);
    return g;
  }

  function buildFlightMap(prevCount, newCount, total) {
    var ns = 'http://www.w3.org/2000/svg';
    total = Math.max(1, total || 1);
    prevCount = Math.max(0, Math.min(prevCount || 0, total));
    newCount = Math.max(0, Math.min(newCount || 0, total));

    var gap = total > 1 ? (FM_VB_W - FM_PAD * 2) / (total - 1) : 0;
    var pts = [];
    for (var i = 0; i < total; i++) {
      pts.push({ x: FM_PAD + i * gap, y: FM_VB_H / 2 + Math.sin(i * 0.85) * FM_AMP });
    }

    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + FM_VB_W + ' ' + FM_VB_H);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    var full = document.createElementNS(ns, 'path');
    full.setAttribute('d', fmSmoothPath(pts));
    full.setAttribute('fill', 'none'); full.setAttribute('stroke', '#ffffff');
    full.setAttribute('stroke-opacity', '0.75'); full.setAttribute('stroke-width', '1.6');
    full.setAttribute('stroke-dasharray', '1 6'); full.setAttribute('stroke-linecap', 'round');
    svg.appendChild(full);

    if (newCount > 0) {
      var doneSeg = document.createElementNS(ns, 'path');
      doneSeg.setAttribute('d', fmSmoothPath(pts.slice(0, newCount)));
      doneSeg.setAttribute('fill', 'none'); doneSeg.setAttribute('stroke', '#2E9E5B');
      doneSeg.setAttribute('stroke-width', '2'); doneSeg.setAttribute('stroke-linecap', 'round');
      svg.appendChild(doneSeg);
    }

    pts.forEach(function (p, idx) {
      var done = idx < newCount;
      var isNew = idx === newCount - 1;
      var isDestination = idx === total - 1;
      var g = document.createElementNS(ns, 'g');
      g.setAttribute('id', 'fm-pin-' + idx);

      if (isDestination) {
        var halo = document.createElementNS(ns, 'circle');
        halo.setAttribute('cx', p.x); halo.setAttribute('cy', p.y); halo.setAttribute('r', '11');
        halo.setAttribute('fill', 'none'); halo.setAttribute('stroke', '#F2A100');
        halo.setAttribute('stroke-width', '1.2'); halo.setAttribute('stroke-dasharray', '2.5 3');
        halo.setAttribute('opacity', done ? '0.85' : '0.5');
        g.appendChild(halo);
      }

      var c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', p.x); c.setAttribute('cy', p.y);
      c.setAttribute('r', isDestination ? 7.4 : (isNew ? 6.2 : 4.3));
      c.setAttribute('fill', done ? '#2E9E5B' : (isDestination ? '#0E2A47' : 'rgba(255,255,255,.65)'));
      c.setAttribute('stroke', isNew ? '#F2A100' : (isDestination ? '#F2A100' : '#ffffff'));
      c.setAttribute('stroke-width', isNew || isDestination ? 1.7 : 1);
      if (isNew) c.setAttribute('class', 'complete__flightmap-pin-new');
      g.appendChild(c);

      if (done) {
        var check = document.createElementNS(ns, 'path');
        check.setAttribute('d', 'M ' + (p.x - 2.2) + ' ' + p.y + ' l 1.3 1.6 l 2.8 -3.4');
        check.setAttribute('stroke', '#fff'); check.setAttribute('stroke-width', '1.1');
        check.setAttribute('fill', 'none'); check.setAttribute('stroke-linecap', 'round'); check.setAttribute('stroke-linejoin', 'round');
        g.appendChild(check);
      } else if (isDestination) {
        var flagPole = document.createElementNS(ns, 'path');
        flagPole.setAttribute('d', 'M ' + p.x + ' ' + (p.y - 16) + ' L ' + p.x + ' ' + (p.y - 4));
        flagPole.setAttribute('stroke', '#fff'); flagPole.setAttribute('stroke-width', '1');
        g.appendChild(flagPole);
        var flag = document.createElementNS(ns, 'text');
        flag.setAttribute('x', p.x + 0.5); flag.setAttribute('y', p.y - 10.5);
        flag.setAttribute('font-size', '9.5'); flag.textContent = '🏁';
        g.appendChild(flag);
      }
      svg.appendChild(g);
    });

    var startPt = pts[Math.max(0, prevCount - 1)] || pts[0];
    var endPt = pts[Math.max(0, newCount - 1)] || pts[0];
    var refPt = pts[Math.max(0, prevCount - 2)] || startPt;
    var heading = Math.atan2(endPt.y - startPt.y, endPt.x - startPt.x) * 180 / Math.PI;
    if (startPt === endPt) heading = Math.atan2(startPt.y - refPt.y, startPt.x - refPt.x) * 180 / Math.PI;

    var plane = fmPlaneGroup();
    plane.style.transform = 'translate(' + startPt.x + 'px,' + startPt.y + 'px) rotate(0deg)';
    plane.style.transition = 'none';
    svg.appendChild(plane);

    clearTimeout(flightMapTimer);
    flightMapTimer = setTimeout(function () {
      plane.style.transition = 'transform 900ms cubic-bezier(.4,0,.2,1)';
      plane.style.transform = 'translate(' + endPt.x + 'px,' + endPt.y + 'px) rotate(' + heading + 'deg)';
      setTimeout(function () { plane.style.transform = 'translate(' + endPt.x + 'px,' + endPt.y + 'px) rotate(0deg)'; }, 950);
    }, 500);

    return svg;
  }

  /* ----------------------------- RENDER ----------------------------- */
  var navScreens = ['home', 'dictionary', 'profile', 'practice'];

  function render() {
    var screens = root.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.toggle('is-active', screens[i].getAttribute('data-screen') === state.screen);
    }

    /* רשת ביטחון: אם לא נמצאים בעמוד התרגול, לוודא שחלונות התרגול (רדיו/זיכרון) סגורים לגמרי
       ולא נשארים גלויים בעמודים אחרים, בלי קשר למקום שבו הם ממוקמים ב-HTML */
    if (state.screen !== 'practice') {
      ['pracHub', 'pracRadio', 'pracMemory'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
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
    var metaList = curMetaList(); var stagesMap = curStagesMap();
    var cur = curId();
    var done = rdata().completed;
    var floorsDone = done.length;
    var totalSteps = curTotalSteps();
    document.getElementById('homeFloorsCount').textContent = floorsDone + '/' + totalSteps;
    var visual = document.getElementById('towerCardVisual');
    clearEl(visual);
    var visualImg = document.createElement('img');
    var isInsp = role() === 'insp';
    visualImg.className = 'tower-card__fixed-img ' + (isInsp ? 'tower-card__fixed-img--tower' : 'tower-card__fixed-img--ball');
    visualImg.alt = '';
    visualImg.src = isInsp ? 'assets/towerGraphics.png' : 'assets/ball.png';
    visual.appendChild(visualImg);
    var curMeta = null;
    for (var i = 0; i < metaList.length; i++) if (metaList[i].id === cur) curMeta = metaList[i];
    document.getElementById('towerCardKicker').textContent = curMeta ? ('שלב ' + (curMeta.final ? 'מסכם' : curMeta.id) + ' מתוך ' + totalSteps) : 'הושלם';
    document.getElementById('towerCardTitle').textContent = curMeta ? curMeta.label : 'כל השלבים הושלמו!';
    document.getElementById('towerCardMeta').textContent = (role() === 'insp' ? 'המגדל שלך' : 'הכדור שלך') + ' · ' + floorsDone + '/' + totalSteps + ' שלבים';
    document.getElementById('towerCardBarFill').style.width = Math.round(floorsDone / totalSteps * 100) + '%';
    var nodesWrap = document.getElementById('homeNodes');
    clearEl(nodesWrap);
    metaList.forEach(function (m) {
      var isDone = done.indexOf(m.id) >= 0;
      var isCur = m.id === cur;
      var isAvailable = !isDone && !isCur && !!stagesMap[m.id];
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
    var CATS = curCATS(); var DICT_CHIPS = curDictChips();
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
    hub.style.display = (isRadio || isMemory) ? 'none' : 'flex';
    radio.style.display = isRadio ? 'flex' : 'none';
    memory.style.display = isMemory ? 'flex' : 'none';
    if (isRadio) renderPracRadio();
    else if (isMemory) {
      try { renderMemory(); }
      catch (err) {
        toast('שגיאה בטעינת משחק הזיכרון  בדוק/י שכל 4 הקבצים עודכנו');
        setL({ pracView: 'hub' });
      }
    }
    else renderPracHub();
  }

  function renderPracHub() {
    var grid = document.getElementById('pracGamesGrid'); clearEl(grid);
    GAMES.forEach(function (g) {
      var card = cloneTpl('tplGameCard');
      card.setAttribute('data-a', g.id);
      card.classList.toggle('is-disabled', g.id !== 'memory');
      card.querySelector('.game-card__top').style.background = g.bg;
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
      var title = ok ? POSITIVE[Math.floor(Math.random() * POSITIVE.length)] : 'לא מדויק , נסה/י שוב';
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
    levelsEl.style.display = isBoard ? 'none' : 'flex';
    boardEl.style.display = isBoard ? 'flex' : 'none';
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
      var rTotal = totalStepsForRole(r);
      var toggle = cloneTpl('tplRoleToggle');
      toggle.setAttribute('data-a', r);
      toggle.classList.toggle('is-active', sel);
      toggle.style.setProperty('--rt-tint', ri.tint);
      toggle.style.setProperty('--rt-accent', ri.accent);
      toggle.querySelector('.role-toggle__img').src = ri.idle;
      toggle.querySelector('.role-toggle__name').textContent = ri.he;
      toggle.querySelector('.role-toggle__meta').textContent = 'שלב ' + Math.min(rd.completed.length + 1, rTotal) + ' · ' + rd.completed.length + '/' + rTotal + ' הושלמו';
      togglesWrap.appendChild(toggle);
    });
    document.getElementById('soundSwitch').classList.toggle('is-on', state.soundOn);
  }

  function renderLesson() {
    var st = curStagesMap()[state.stageId];
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
    play.setAttribute('data-act', 'speak'); play.setAttribute('data-speak', maskPronunciationAudio(ex.en)); play.textContent = '🔊';
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
    var replayRow = document.createElement('div'); replayRow.className = 'exercise-dnd__replay-row';
    var play = document.createElement('button'); play.className = 'exercise-mcq__play';
    play.setAttribute('data-act', 'speak'); play.setAttribute('data-speak', fillSentence(ex)); play.textContent = '🔊';
    replayRow.appendChild(play); wrap.appendChild(replayRow);
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
      footer.appendChild(btn);
    } else {
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
      if (ex.tip) {
        var tip = document.createElement('div'); tip.className = 'lesson-feedback__tip';
        var tipIcon = document.createElement('span'); tipIcon.className = 'lesson-feedback__tip-icon'; tipIcon.textContent = '💡';
        var tipText = document.createElement('span'); tipText.textContent = ex.tip;
        tip.appendChild(tipIcon); tip.appendChild(tipText);
        footer.appendChild(row); footer.appendChild(tip);
      } else {
        footer.appendChild(row);
      }
      var nextBtn = document.createElement('button');
      nextBtn.className = 'lesson-feedback__next ' + (ok ? 'is-ok' : 'is-no');
      nextBtn.setAttribute('data-act', 'next'); nextBtn.textContent = 'המשך/י';
      footer.appendChild(nextBtn);
    }
    var exs = curStagesMap()[state.stageId].exercises;
    var nav = document.createElement('div'); nav.className = 'lesson-nav';
    var prevBtn = document.createElement('button'); prevBtn.className = 'lesson-nav__btn';
    prevBtn.setAttribute('data-act', 'navPrev'); prevBtn.textContent = '▶ הקודם';
    if (state.exIndex === 0) prevBtn.disabled = true;
    var nextNavBtn = document.createElement('button'); nextNavBtn.className = 'lesson-nav__btn';
    nextNavBtn.setAttribute('data-act', 'navNext'); nextNavBtn.textContent = 'הבא ◀';
    if (state.exIndex >= exs.length - 1 || !state.feedback) nextNavBtn.disabled = true;
    nav.appendChild(prevBtn); nav.appendChild(nextNavBtn);
    footer.appendChild(nav);
  }

  function renderComplete() {
    var stagesMap = curStagesMap();
    var fs = state.finalStats || { xp: 0, acc: 0, time: '0:00', passed: true };
    var passed = fs.passed !== false;
    var num = stagesMap[state.stageId] ? stagesMap[state.stageId].num : '';
    var sub = stagesMap[state.stageId] ? stagesMap[state.stageId].title : '';
    var fd = rdata().completed.length;
    document.getElementById('completeSub').textContent = sub;
    document.getElementById('completeTitle').textContent = passed ? ('שלב ' + num + ' הושלם!') : 'כמעט! נסה/י שוב';

    var totalSteps = curTotalSteps();
    var beforeCount = (fs.progressBefore != null) ? fs.progressBefore : Math.max(0, fd - (passed ? 1 : 0));
    var afterCount = (fs.progressAfter != null) ? fs.progressAfter : fd;
    var flightWrap = document.getElementById('completeFlightMap');
    if (flightWrap) {
      clearEl(flightWrap);
      flightWrap.appendChild(buildFlightMap(beforeCount, afterCount, totalSteps));
    }

    var msgEl = document.getElementById('completeMsg');
    msgEl.textContent = passed
      ? (afterCount >= totalSteps ? 'הגעת ליעד הסופי! 🏁 המסלול הושלם' : 'המטוס התקדם צעד נוסף לעבר היעד ✈')
      : ('צריך 50% לפחות כדי לעבור · קיבלת ' + fs.acc + '%');
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

  /* ---- כפתורי סגירה (✕) בעמוד התרגול - חיווט ישיר בנוסף ל-delegation ---- */
  function wireCloseButtons() {
    var radioClose = document.getElementById('pracRadioCloseBtn');
    if (radioClose) radioClose.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); pracBack(); });
    var memLevelsClose = document .getElementById('memLevelsCloseBtn');
    if (memLevelsClose) memLevelsClose.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); memBack(); });
    var memBoardClose = document.getElementById('memBoardCloseBtn');
    if (memBoardClose) memBoardClose.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); memBack(); });
  }
  wireCloseButtons();

  function showInstall() { document.getElementById('installModal').hidden = false; }
  function closeInstall() { document.getElementById('installModal').hidden = true; }

  var ACTS = {
    enter: enter, start: startWelcome, confirmRole: confirmRole,
    toggleSound: toggleSound, check: check, next: next, reveal: reveal,
    navPrev: navPrev, navNext: navNext,
    goHome: goHome, closeLesson: goHome,
    pracBack: pracBack, pracCheck: pracCheck, pracReset: pracReset,
    showInstall: showInstall, closeInstall: closeInstall
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
