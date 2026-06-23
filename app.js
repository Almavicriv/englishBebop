/* =====================================================================
   ATC English Trainer — vanilla JS + Firebase Auth + Firestore
   ===================================================================== */
(function () {
  'use strict';
  var root = document.getElementById('app');

  /* ----------------------------- DATA ----------------------------- */
  var STORE = 'atc_trainer_v4';

  var metaList = [
    { id: 1, label: 'מספרים ואיות' }, { id: 2, label: 'פקודות בסיסיות' }, { id: 3, label: 'אותות קריאה' },
    { id: 4, label: 'הסעה על הקרקע' }, { id: 5, label: 'המראה' }, { id: 6, label: 'טיסה במרחב' },
    { id: 7, label: 'גישה ונחיתה' }, { id: 8, label: 'מזג אוויר · ATIS' }, { id: 9, label: 'חירום' },
    { id: 10, label: 'שותף אמריקאי' }, { id: 0, label: 'מבחן מסכם', final: true }
  ];

  var stages = {
    1: { num: 1, title: 'הגיית מספרים ואיות', sub: 'הבסיס לכל תקשורת רדיו', exercises: [
      { type: 'mcq', he: 'כיצד הוגים את הספרה 9 בקשר תעופתי?', en: 'How do you pronounce the number 9 on the radio?', opts: [['Nine', 0], ['NIN-ER', 1], ['Niner-niner', 0], ['No-vember', 0]], tip: 'בתקשורת תעופתית 9 = NIN-ER, כדי למנוע בלבול עם המילה "no" בסביבה רועשת.' },
      { type: 'mcq', he: 'כיצד נקרא את התדר 129.25?', en: 'How do you read the frequency 129.25?', opts: [['One two nine two five', 0], ['One twenty nine decimal two five', 0], ['One two niner decimal two fife', 1], ['One hundred twenty nine', 0]], tip: 'כל ספרה בנפרד · עשרוני = decimal · 5 = fife · 9 = niner.' },
      { type: 'mcq', he: 'מהי ההגייה הנכונה לגובה 1,500 רגל?', en: 'How is the altitude 1,500 feet read?', opts: [['Fifteen hundred feet', 0], ['One fife zero zero feet', 0], ['One tousand fife hundred feet', 1], ['One five zero zero feet', 0]], tip: 'אלפים: "one tousand" · מאות: "fife hundred".' },
      { type: 'dnd', he: 'הרכב/י את התדר 129.2 בתשדורת', template: 'Contact HAGAV __ decimal __', bank: ['one niner two', 'fife', 'one two niner', 'two'], answer: ['one two niner', 'two'], tip: 'תדר 129.2 — כל ספרה בנפרד, "decimal" להפרדת העשרוני.' },
      { type: 'dnd', he: 'הרכב/י דיווח רוח: כיוון 210, עוצמה 13 קשר', template: 'Wind __ degrees __ knots', bank: ['two one zero', 'one tree', 'fife zero', 'zero'], answer: ['two one zero', 'one tree'], tip: 'כיוון = 3 ספרות בנפרד · עוצמה = בקשרים.' },
      { type: 'listen', he: 'האזן/י וחשוף/י את התרגום', audio: 'QNH one zero one two', he2: 'לחץ ברומטרי — אחת, אפס, אחת, שתיים', tip: 'QNH = לחץ ברומטרי לכיול מד הגובה.' },
      { type: 'listen', he: 'האזן/י לתשדורת הבאה', audio: 'One niner tousand feet', he2: '19,000 רגל', tip: 'niner = 9 · tousand = thousand (הגייה סטנדרטית).' }
    ] },
    2: { num: 2, title: 'מילון ביטויים — פקודות בסיסיות', sub: 'המונחים הסטנדרטיים', exercises: [
      { type: 'mcq', he: 'מה המשמעות של "say again"?', en: 'What does "say again" mean?', opts: [['סיימתי לשדר', 0], ['חזור על השידור האחרון', 1], ['לא הבנתי', 0], ['המתן', 0]], tip: '"Say again" = חזור על השידור האחרון. נמנעים מ-"repeat".' },
      { type: 'mcq', he: 'מה ההבדל בין "Affirm" ל-"Roger"?', en: 'Affirm vs. Roger?', opts: [['אין הבדל, שניהם "כן"', 0], ['Affirm = חיובי · Roger = קיבלתי', 1], ['Roger = כן · Affirm = אבצע', 0], ['שניהם "המסר התקבל"', 0]], tip: 'Affirm = חיובי/נכון · Roger = קיבלתי את המסר.' },
      { type: 'mcq', he: 'איזו מילה משמעה "בטל את התשדורת האחרונה"?', en: 'Which word cancels the last transmission?', opts: [['Negative', 0], ['Cancel', 0], ['Disregard', 1], ['Unable', 0]], tip: 'Disregard = התעלם / בטל את התשדורת האחרונה.' },
      { type: 'mcq', he: 'כיצד אומרים "אינני מסוגל לבצע"?', en: 'How do you say "I cannot comply"?', opts: [['Negative', 0], ['Unable', 1], ['Denied', 0], ['Cancel', 0]], tip: 'Unable = לא מסוגל · Negative = שלילי/לא נכון.' },
      { type: 'dnd', he: 'הרכב/י: "מסור את הודעתך, רוח קלה"', template: '__ , wind __', bank: ['Pass your message', 'calm', 'Say again', 'gusts'], answer: ['Pass your message', 'calm'], tip: 'Pass your message = שדר · wind calm = רוח קלה (עד 3 קשר).' },
      { type: 'listen', he: 'האזן/י לתשדורת', audio: 'Expedite climb to altitude six tousand feet', he2: 'זרז טיפוס לגובה 6,000 רגל', tip: 'Expedite = זרז — ביצוע מהיר יותר.' },
      { type: 'listen', he: 'האזן/י להוראה החוזרת', audio: 'I say again, cancel take-off', he2: 'אני חוזר: בטל המראה', tip: '"I say again" = הדגשה חוזרת של הוראה קריטית.' }
    ] },
    3: { num: 3, title: 'אותות קריאה ובדיקת קשר', sub: 'או"ק, אלפבית פונטי ואיכות קליטה', exercises: [
      { type: 'mcq', he: 'כיצד ישודר אות הקריאה "גמל" בקשר?', en: 'How is the call sign "גמל" transmitted?', opts: [['Camel', 0], ['Golf Alpha Mike', 0], ['Gamal', 1], ['Goat', 0]], tip: 'אותות קריאה משודרים במלואם ללא תרגום משמעותם לאנגלית.' },
      { type: 'mcq', he: 'מהי האות R באלפבית הפונטי?', en: 'The phonetic letter R is...', opts: [['Romeo', 1], ['Robert', 0], ['Radio', 0], ['Roger', 0]], tip: 'R = Romeo. האלפבית הפונטי הבינלאומי (ICAO).' },
      { type: 'mcq', he: 'מה המשמעות של "Reading you tree"?', en: 'What does "Reading you tree" mean?', opts: [['קליטה מושלמת', 0], ['קריא בקושי (3 מ-5)', 1], ['לא קריא', 0], ['קריא לסירוגין', 0]], tip: 'סולם 1–5: שלוש מחמש = Readable but with difficulty.' },
      { type: 'dnd', he: 'הרכב/י קריאה ראשונה למגדל קדם', template: 'KEDEM __ , __', bank: ['TOWER', 'shalom', 'GROUND', 'mayday'], answer: ['TOWER', 'shalom'], tip: 'שם השדה + השירות + ברכה.' },
      { type: 'mcq', he: 'איך אומרים "חמש מחמש"?', en: '"Perfectly readable" is...', opts: [['Reading you fife', 1], ['Reading you five', 0], ['Loud and clear five', 0], ['Reading you fower', 0]], tip: 'חמש מחמש = Reading you fife (5 נהגה fife).' },
      { type: 'listen', he: 'האזן/י לקריאה הראשונה', audio: 'Negev Ground shalom, Akrav one', he2: 'נגב גראונד שלום, אקרב 1', tip: 'מבנה קריאה: תחנת נת"א + ברכה + אות קריאה.' }
    ] }
  };

  var PRON = [['0','ZE-RO'],['1','WUN'],['2','TOO'],['3','TREE'],['4','FOW-ER'],['5','FIFE'],['6','SIX'],['7','SEV-EN'],['8','AIT'],['9','NIN-ER'],['.','DAY-SEE-MAL'],['100','HUN-DRED'],['1000','TOU-SAND']];
  var READ = [['1','Reading you one','אחד מחמש — לא קריא','#E5484D'],['2','Reading you two','שתיים מחמש — קריא לסירוגין','#F2870A'],['3','Reading you tree','שלוש מחמש — קריא בקושי','#E0A800'],['4','Reading you fower','ארבע מחמש — קריא','#5BA35B'],['5','Reading you fife','חמש מחמש — קריא מצוין','#2E9E5B']];
  var CATS = [
    { id: 'proc', label: 'נהלים ובקרת קשר', items: [['Say again','אמור שנית','חזור על השידור האחרון'],['I say again','אומר שנית','חזרה על הוראה חשובה'],['Roger','קיבלתי','המסר התקבל'],['Affirm','חיובי','כן / נכון'],['Negative','שלילי','לא / לא נכון'],['Confirm','אשר','אשר נתון מסוים'],['Verify','ודא','ודא לפני מתן תשובה'],['Readback','חזור על','חזור על תוכן ההוראה'],['Standby','מיד אתך','המתן, אקרא לך'],['Disregard','התעלם','בטל את התשדורת האחרונה'],['Correction','תיקון','תיקון לשידור הקודם'],['How do you read','איך שומע','מהי איכות הקליטה'],['Unable','לא מסוגל','לא ניתן לבצע את הבקשה'],['Break break','הפרדה בין שידורים','בין מטוסים שונים'],['Monitor','האזן','האזן לתחנה ולתדר'],['Contact','עבור ל','עבור לקשר עם תחנה ותדר']] },
    { id: 'inst', label: 'הוראות טיסה', items: [['Climb','טפס','טפס לגובה'],['Descend','הנמך','הנמך לגובה'],['Maintain','שמור','גובה / מהירות / אזור'],['Turn left / right','פנה שמאלה / ימינה','שינוי כיוון'],['Fly heading','טוס בכיוון','שלוש ספרות'],['Expedite','זרז','בצע מהר יותר'],['Orbit','בצע המתנה','מעגל פנייה 360°'],['Line up and wait','התיישר והמתן','עלייה למסלול והמתנה'],['Cleared for take-off','רשאי להמראה','אישור המראה'],['Cleared to land','רשאי לנחות','אישור נחיתה'],['Go around','לך סביב','ביטול נחיתה'],['Touch and go','נגיעה והמראה','תרגול במסלול'],['Hold position','עצור במקום','עצירה בהסעה'],['Hold short','עצור לפני','מסלול / הסעה'],['Taxi','הסע','הסעה על הקרקע'],['Pushback','דחיפה לאחור','דחיפה מהחניה'],['Vacate the runway','פנה את המסלול','פינוי לאחר נחיתה'],['Backtrack','הסעה הפוכה','בכיוון הפוך על המסלול']] },
    { id: 'traffic', label: 'תנועה והפרדה', items: [['Traffic','תנועה','מידע על כלי טיס אחר'],['Radar contact','מגע מכ"ם','המטוס זוהה על התמונה'],['Maintain own separation','שמור הפרדה עצמית','אחריות ההפרדה על הטייס'],['Caution wake turbulence','זהירות מערבולות','מערבולות קצה כנף'],['Opposite traffic','תנועה נגדית','כלי טיס בכיוון מנוגד'],['Crossing traffic','תנועה חוצה','חוצה את הנתיב'],['Give way','תן זכות קדימה','אפשר מעבר'],['Report traffic in sight','דווח בקשר עין','כשהתנועה מזוהה'],['Number two','מספר שתיים','מיקום ברצף הנחיתות'],['Follow','עקוב אחרי','אחר מטוס בהקפה']] },
    { id: 'wx', label: 'מזג אוויר', items: [['Wind calm','רוח קלה','עד שלושה קשרים'],['Gusting','משבים','עוצמת המשב המרבית'],['QNH','לחץ ברומטרי','כיול מד גובה'],['Visibility','ראות','בק"ם / במייל'],['Few','מעט עננות','1–2 שמיניות'],['Scattered','עננות מפוזרת','3–4 שמיניות'],['Broken','עננות שבורה','5–7 שמיניות'],['Overcast','שמים מכוסים','8 שמיניות'],['Ceiling','בסיס ענן','גובה בסיס העננות'],['Top','פסגת ענן','גובה ראש העננות']] },
    { id: 'emer', label: 'חירום', items: [['Mayday Mayday Mayday','מצוקה','חירום הדורש סיוע מיידי'],['Pan-Pan','תקלה','חירום ללא סיוע מיידי'],['Are you declaring an emergency?','מכריז חירום?','בירור חומרת התקלה'],['Barrier','הרם רשת','הפעלת אמצעי עצירה'],['Arresting cable engaged','נתפס בכבל','המטוס נתפס בכבל'],['Emergency services','צוותי הצלה','כיבוי / אמבולנס / חילוץ'],['Gear appears down','כן נסע נראה למטה','דיווח מצב כן נסע'],['Cancelling Mayday','ביטול מצוקה','ביטול קריאת חירום']] }
  ];
  var roleInfo = {
    ctrl: { he: 'בקר', en: 'Flight Controller', badge: '🎧 בקר טיסה', tint: '#EAF2FB', accent: '#2E78C7', idle: 'assets/ctrl-hq.png', salute: 'assets/ctrl-hq.png', celebrate: 'assets/ctrl-hq.png', desc: 'מבקר/ת תעבורה אווירית מהמגדל ובקרת מכ"ם.' },
    insp: { he: 'פקח', en: 'Flight Inspector', badge: '✈️ פקח טיסה', tint: '#E7F4EC', accent: '#1F8A5B', idle: 'assets/pilot-hq.png', salute: 'assets/pilot-salute-hq.png', celebrate: 'assets/pilot-thumb-hq.png', desc: 'פקח/ית טיסה — ליווי המראות, נחיתות ותנועה בשדה.' }
  };
  var POSITIVE = ['מצוין!', 'עפת על זה!', 'אלוף/ה אין עלייך!', 'תקתוק נכון!'];

  /* ----------------------------- STATE ----------------------------- */
  var defRoleData = { ctrl: { completed: [], xp: 0 }, insp: { completed: [], xp: 0 } };

  var state = {
    screen: 'loading',        // מתחיל ב-loading עד Firebase יחזור
    tab: 'home',
    loggedIn: false,
    userName: '', userPhoto: '', userUid: null,
    role: null,
    pendingRole: null,
    roleData: defRoleData,
    streak: 0, gems: 0, soundOn: true,
    stageId: 1, exIndex: 0, xp: 0, correct: 0, total: 0, startTime: 0,
    selected: null, placed: [], feedback: null, feedbackTitle: '', revealed: false, finalStats: null,
    speaking: false, toast: null, dictQuery: '', dictCat: 'all',
    pracView: 'hub', pracSel: null, pracDone: false, pracCelebrate: false
  };

  var gestured = false;
  document.addEventListener('pointerdown', function () { gestured = true; }, true);
  document.addEventListener('keydown', function () { gestured = true; }, true);

  /* ----------------------------- FIREBASE BRIDGE ----------------------------- */
  var FB = null; // יוגדר ברגע ש-Firebase נטען

  // מאזין לשינוי כניסה מ-Firebase
  window.__ATC_AUTH_CALLBACK__ = function(user) {
    FB = window.__ATC_FIREBASE__;
    if (user) {
      // משתמש מחובר — טוען את ההתקדמות שלו מ-Firestore
      FB.loadProgress(user.uid).then(function(data) {
        var base = data || {};
        set({
          loggedIn: true,
          userName: user.displayName || 'טייס',
          userPhoto: user.photoURL || '',
          userUid: user.uid,
          role: base.role || null,
          roleData: base.roleData || defRoleData,
          streak: base.streak || 0,
          gems: base.gems || 0,
          soundOn: base.soundOn !== false,
          screen: base.role ? 'home' : 'welcome'
        });
      });
    } else {
      // לא מחובר — מסך landing
      set({ loggedIn: false, userName: '', userPhoto: '', userUid: null, role: null, screen: 'landing' });
    }
  };

  // אם Firebase לא נטען תוך 3 שניות — נלך ל-landing בכל זאת
  setTimeout(function() {
    if (state.screen === 'loading') set({ screen: 'landing' });
  }, 3000);

  /* ----------------------------- HELPERS ----------------------------- */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function t(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function persist() {
    if (!state.userUid || !FB) return;
    FB.saveProgress(state.userUid, {
      role: state.role,
      roleData: state.roleData,
      streak: state.streak,
      gems: state.gems,
      soundOn: state.soundOn
    });
  }

  function set(patch) { Object.assign(state, patch); persist(); render(); }
  function setL(patch) { Object.assign(state, patch); render(); }

  function role() { return state.role || 'ctrl'; }
  function rdata() { return state.roleData[role()] || { completed: [], xp: 0 }; }

  var spTimer, toastTimer, celTimer, autoT;

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
  function toast(m) { state.toast = m; render(); clearTimeout(toastTimer); toastTimer = setTimeout(function () { state.toast = null; render(); }, 1900); }

  function curId() {
    var done = rdata().completed;
    for (var i = 0; i < metaList.length; i++) {
      var m = metaList[i];
      if (stages[m.id] && done.indexOf(m.id) < 0) return m.id;
    }
    return null;
  }
  function curEx() { return stages[state.stageId].exercises[state.exIndex]; }
  function exVoice(ex) { if (ex.type === 'listen') return ex.audio; if (ex.type === 'dnd') return fillSentence(ex); return ex.en || ''; }
  function fillSentence(ex) { var parts = ex.template.split('__'); var out = ''; for (var i = 0; i < parts.length; i++) { out += parts[i]; if (i < ex.answer.length) out += ex.answer[i]; } return out.replace(/\s+/g, ' ').trim(); }
  function canCheck() { var ex = curEx(); if (ex.type === 'mcq') return state.selected !== null; if (ex.type === 'dnd') return state.placed.length === ex.answer.length; if (ex.type === 'listen') return state.revealed; return false; }

  /* ----------------------------- ACTIONS ----------------------------- */
  function signInGoogle() {
    FB = window.__ATC_FIREBASE__;
    if (!FB) { toast('Firebase לא נטען עדיין, נסה שוב'); return; }
    // הצג loading קטן
    root.innerHTML = screenLoading('מתחבר עם Google...');
    FB.googleSignIn().then(function(user) {
      if (!user) { set({ screen: 'landing' }); toast('ההתחברות בוטלה'); }
      // onAuthStateChanged יטפל בהמשך
    });
  }

  function signOut() {
    cancelSpeech();
    FB = window.__ATC_FIREBASE__;
    if (FB) FB.firebaseSignOut();
    set({ loggedIn: false, userName: '', userPhoto: '', userUid: null, role: null, roleData: defRoleData, screen: 'landing' });
  }

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
    var st = stages[id]; var cur = curId(); var done = rdata().completed.indexOf(id) >= 0;
    if (!st) { toast('השלב יהיה זמין בקרוב ✈'); return; }
    if (id !== cur && !done) { toast('סיים/י קודם את השלב הקודם 🔒'); return; }
    setL({ screen: 'lesson', stageId: id, exIndex: 0, xp: 0, correct: 0, total: 0, startTime: Date.now(), selected: null, placed: [], feedback: null, revealed: false });
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
    else ok = true;
    cancelSpeech();
    var title = ok ? POSITIVE[Math.floor(Math.random() * POSITIVE.length)] : 'לא מדויק — נסה/י לזכור';
    setL({ feedback: ok ? 'ok' : 'no', feedbackTitle: title, speaking: false, total: state.total + 1, correct: state.correct + (ok ? 1 : 0), xp: state.xp + (ok ? 10 : 0) });
  }
  function next() {
    var exs = stages[state.stageId].exercises; var ni = state.exIndex + 1;
    if (ni >= exs.length) {
      var secs = Math.max(1, Math.round((Date.now() - state.startTime) / 1000));
      var mm = Math.floor(secs / 60), ss = String(secs % 60); if (ss.length < 2) ss = '0' + ss;
      var acc = state.total ? Math.round(state.correct / state.total * 100) : 0;
      var passed = acc >= 50;
      var r = role(); var rd = rdata();
      var completed = (passed && rd.completed.indexOf(state.stageId) < 0) ? rd.completed.concat([state.stageId]) : rd.completed;
      var roleData = Object.assign({}, state.roleData); roleData[r] = { completed: completed, xp: rd.xp + state.xp };
      set({ screen: 'complete', roleData: roleData, gems: state.gems + (passed ? 5 : 0), finalStats: { xp: state.xp, acc: acc, time: mm + ':' + ss, passed: passed } });
    } else {
      setL({ exIndex: ni, selected: null, placed: [], feedback: null, revealed: false });
      autoSpeak();
    }
  }
  function goHome() { cancelSpeech(); setL({ screen: 'home', tab: 'home', feedback: null, speaking: false }); }
  function autoSpeak() { var ex = curEx(); clearTimeout(autoT); autoT = setTimeout(function () { speak(exVoice(ex)); }, 360); }

  function openGame(id) { if (id === 'radio') setL({ pracView: 'radio', pracSel: null, pracDone: false, pracCelebrate: false }); else toast('המשחק ייפתח בקרוב 🎮'); }
  function pracBack() { cancelSpeech(); setL({ pracView: 'hub' }); }
  function pracSelect(i) { if (state.pracDone) return; setL({ pracSel: i }); }
  function pracCheck() {
    state.pracDone = true;
    if (state.pracSel === 0) { state.pracCelebrate = true; clearTimeout(celTimer); celTimer = setTimeout(function () { state.pracCelebrate = false; render(); }, 1900); }
    render();
  }
  function pracReset() { set({ gems: state.gems + 5, pracSel: null, pracDone: false, pracCelebrate: false }); toast('+25 XP · +5 💎 נוספו!'); }

  /* --------------------------- VISUAL BUILDERS --------------------------- */
  function towerHTML(floorsDone, building, scale) {
    var k = scale || 1; function px(n) { return (n * k) + 'px'; }
    var total = Math.max(0, Math.min(10, floorsDone)); var floors = '';
    for (var i = total; i >= 1; i--) {
      var isNew = building && i === total;
      floors += '<div style="width:' + px(44) + ';height:' + px(17) + ';background:linear-gradient(#F3E8D6,#E0CDB1);border-top:2px solid #fff;display:flex;align-items:center;justify-content:center;gap:' + px(5) + ';box-shadow:inset 0 -3px 0 rgba(0,0,0,.06);animation:' + (isNew ? 'towerDrop .65s cubic-bezier(.2,.9,.3,1.3)' : 'none') + ';position:relative;z-index:' + (isNew ? 3 : 1) + ';">' +
        '<span style="width:' + px(8) + ';height:' + px(8) + ';background:#2E78C7;border-radius:2px;opacity:.85;"></span>' +
        '<span style="width:' + px(8) + ';height:' + px(8) + ';background:#2E78C7;border-radius:2px;opacity:.85;"></span></div>';
    }
    var beacon = '<div style="width:' + px(4) + ';height:' + px(13) + ';background:#9AA9B8;position:relative;"><div style="position:absolute;top:' + px(-7) + ';left:' + px(-4) + ';width:' + px(11) + ';height:' + px(8) + ';border-radius:50%;background:#E5484D;animation:towerBeacon 1.4s ease-in-out infinite;"></div></div>';
    var roof = '<div style="width:' + px(68) + ';height:' + px(7) + ';background:#16518c;border-radius:4px 4px 0 0;"></div>';
    var cab = '<div style="width:' + px(62) + ';height:' + px(28) + ';background:linear-gradient(#c4e2f6,#82b6e1);border:3px solid #16518c;border-bottom:none;border-radius:8px 8px 0 0;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 4px 6px rgba(255,255,255,.5);"><div style="width:' + px(44) + ';height:' + px(11) + ';background:rgba(20,62,107,.16);border-radius:3px;"></div></div>';
    var base = '<div style="width:' + px(70) + ';height:' + px(16) + ';background:linear-gradient(#5a6b86,#39455c);clip-path:polygon(8% 0,92% 0,100% 100%,0 100%);"></div>';
    var ground = '<div style="width:' + px(88) + ';height:' + px(9) + ';background:#2E9E5B;border-radius:50%;margin-top:' + px(-3) + ';opacity:.45;"></div>';
    return '<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;">' + beacon + roof + cab + floors + base + ground + '</div>';
  }
  function img(src, style) { return '<img src="' + esc(src) + '" alt="" style="' + style + '">'; }

  function gameIcon(kind, accent) {
    var open = '<svg width="60" height="60" viewBox="0 0 60 60" style="filter:drop-shadow(0 4px 6px rgba(14,42,71,.18))">', close = '</svg>';
    if (kind === 'memory') return open + '<rect x="8" y="20" width="22" height="30" rx="4" fill="#fff" stroke="' + accent + '" stroke-width="2.5" transform="rotate(-10 19 35)"/><rect x="30" y="20" width="22" height="30" rx="4" fill="' + accent + '" transform="rotate(8 41 35)"/><path d="M30 6c-6 0-10 4-10 9 0 4 3 6 3 9h14c0-3 3-5 3-9 0-5-4-9-10-9z" fill="#FFB4C2"/><path d="M30 6c-6 0-10 4-10 9 0 4 3 6 3 9h14c0-3 3-5 3-9 0-5-4-9-10-9z" fill="none" stroke="' + accent + '" stroke-width="2.4"/><path d="M24 24v4M30 24v5M36 24v4" stroke="' + accent + '" stroke-width="2" stroke-linecap="round"/>' + close;
    if (kind === 'radio') return open + '<path d="M14 34a16 16 0 0 1 32 0" fill="none" stroke="' + accent + '" stroke-width="4" stroke-linecap="round"/><rect x="8" y="32" width="12" height="20" rx="5" fill="' + accent + '"/><rect x="40" y="32" width="12" height="20" rx="5" fill="' + accent + '"/><path d="M44 44v6a6 6 0 0 1-6 6h-6" fill="none" stroke="' + accent + '" stroke-width="3.4" stroke-linecap="round"/><circle cx="30" cy="56" r="3.4" fill="#FFD27A" stroke="' + accent + '" stroke-width="1.5"/>' + close;
    if (kind === 'radar') return open + '<circle cx="30" cy="30" r="24" fill="#062a1c" stroke="' + accent + '" stroke-width="3"/><circle cx="30" cy="30" r="16" fill="none" stroke="#2E9E5B" stroke-width="1.4" opacity=".6"/><circle cx="30" cy="30" r="8" fill="none" stroke="#2E9E5B" stroke-width="1.4" opacity=".6"/><path d="M30 30 L30 8 A22 22 0 0 1 49 21 Z" fill="#54c47e" opacity=".45"/><path d="M30 30 L49 21" stroke="#7CF0A8" stroke-width="2" stroke-linecap="round"/><circle cx="22" cy="38" r="2.2" fill="#7CF0A8"/>' + close;
    return open + '<path d="M34 4 16 32h12l-4 24 22-30H32z" fill="#FFD86B" stroke="' + accent + '" stroke-width="2.8" stroke-linejoin="round"/><circle cx="48" cy="12" r="2.5" fill="' + accent + '"/><circle cx="12" cy="46" r="2.5" fill="' + accent + '"/>' + close;
  }

  /* ----------------------------- SCREENS ----------------------------- */
  function statusBar(color) { return '<div class="atc-status" style="color:' + color + ';"><span style="font-variant-numeric:tabular-nums;">7:47</span><span style="font-size:12px;letter-spacing:1.5px;opacity:.85;">5G&nbsp;&nbsp;&#9646;&#9646;&#9646;&#9646;&#9744;</span></div>'; }

  function screenLoading(msg) {
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(180deg,#0B2545,#143E6B);color:#fff;gap:20px;">' +
      '<img src="assets/tower.png" alt="" style="height:90px;opacity:.7;animation:atcBob 2s ease-in-out infinite;">' +
      '<div style="font-size:16px;font-weight:700;opacity:.85;">' + (msg || 'טוען...') + '</div>' +
      '<div style="display:flex;gap:8px;">' +
        '<div style="width:8px;height:8px;border-radius:50%;background:#fff;animation:atcPulse 1.2s ease-out infinite;"></div>' +
        '<div style="width:8px;height:8px;border-radius:50%;background:#fff;animation:atcPulse 1.2s ease-out .4s infinite;"></div>' +
        '<div style="width:8px;height:8px;border-radius:50%;background:#fff;animation:atcPulse 1.2s ease-out .8s infinite;"></div>' +
      '</div>' +
    '</div>';
  }

  function screenLanding() {
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;background:linear-gradient(180deg,#0B2545 0%,#143E6B 34%,#2E6BA6 64%,#E9A765 88%,#F4C98A 100%);overflow:hidden;">' +
      '<div style="position:absolute;top:30px;left:40px;width:3px;height:3px;border-radius:50%;background:#fff;opacity:.8;box-shadow:30px 18px 0 -1px #fff,80px 8px 0 -1px #fff,150px 30px 0 -1px #fff,210px 14px 0 -1px #fff,260px 40px 0 0 #fff,120px 52px 0 -1px #fff,300px 70px 0 -1px #fff;"></div>' +
      '<div style="position:absolute;top:54%;left:0;right:0;height:90px;background:radial-gradient(60% 100% at 50% 100%,rgba(255,221,160,.65),rgba(255,221,160,0));"></div>' +
      '<img src="assets/tower.png" alt="" style="position:absolute;top:calc(54% - 76px);left:54px;height:96px;opacity:.32;filter:brightness(.3);">' +
      '<img src="assets/airplane.png" alt="" style="position:absolute;top:96px;right:-20px;width:128px;transform:scaleX(-1) rotate(-12deg);animation:atcFloat 6s ease-in-out infinite;filter:drop-shadow(0 10px 12px rgba(0,0,0,.25));">' +
      '<div style="position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;perspective:300px;perspective-origin:50% 30%;">' +
        '<div style="transform:rotateX(62deg);transform-origin:bottom center;width:200px;height:520px;margin-bottom:-70px;background:linear-gradient(180deg,#39414f 0%,#2a313c 60%,#222831 100%);border-left:5px solid #d7deea;border-right:5px solid #d7deea;position:relative;box-shadow:0 0 70px rgba(0,0,0,.55);">' +
          '<div style="position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);width:7px;background:repeating-linear-gradient(180deg,#EDEFF3 0 30px,transparent 30px 60px);opacity:.9;"></div>' +
          '<div style="position:absolute;top:0;bottom:0;left:-1px;width:5px;background:repeating-linear-gradient(180deg,#FFD36B 0 5px,transparent 5px 40px);box-shadow:0 0 8px #FFC53D;animation:atcRunLight 1.6s ease-in-out infinite;"></div>' +
          '<div style="position:absolute;top:0;bottom:0;right:-1px;width:5px;background:repeating-linear-gradient(180deg,#FFD36B 0 5px,transparent 5px 40px);box-shadow:0 0 8px #FFC53D;animation:atcRunLight 1.6s ease-in-out .3s infinite;"></div>' +
        '</div>' +
      '</div>' +
      '<div style="position:absolute;top:120px;left:0;right:0;padding:0 28px;text-align:center;z-index:4;">' +
        '<div style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.25);padding:6px 15px;border-radius:22px;font-size:11.5px;font-weight:800;letter-spacing:2px;color:#fff;margin-bottom:14px;">✈️ AVIATION ENGLISH</div>' +
        '<h1 style="font-size:40px;line-height:1.04;font-weight:900;color:#fff;margin:0;text-shadow:0 4px 18px rgba(0,0,0,.45);">בואו ללמוד<br>אנגלית תעופתית</h1>' +
        '<p style="font-size:14px;font-weight:600;color:#EAF2FB;opacity:.92;margin:14px auto 0;max-width:280px;text-shadow:0 2px 8px rgba(0,0,0,.4);">פרזיולוגיית רדיו לפקחים ובקרים — שלב אחר שלב, עם תרגול קולי.</p>' +
      '</div>' +
      '<div style="margin-top:auto;flex:none;background:#fff;border-radius:28px 28px 0 0;padding:22px 28px 36px;position:relative;z-index:5;box-shadow:0 -12px 34px rgba(11,37,69,.3);">' +
        '<button data-act="google" style="width:100%;display:flex;align-items:center;justify-content:center;gap:11px;background:#fff;color:#1f2937;border:1.5px solid #E1E8F0;border-radius:16px;padding:16px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 8px 20px rgba(14,42,71,.1);">' +
          '<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.3 4.5 29.4 2.5 24 2.5 12.1 2.5 2.5 12.1 2.5 24S12.1 45.5 24 45.5 45.5 35.9 45.5 24c0-1.2-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M5 14.7l6.6 4.8C13.4 15.1 18.3 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.3 4.5 29.4 2.5 24 2.5 16.3 2.5 9.7 6.8 5 14.7z"/><path fill="#4CAF50" d="M24 45.5c5.3 0 10.1-2 13.7-5.3l-6.3-5.3c-2 1.5-4.6 2.4-7.4 2.4-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 41.1 16.2 45.5 24 45.5z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.3 5.3c-.4.4 6.9-5 6.9-14.7 0-1.2-.1-2.4-.4-3.5z"/></svg>' +
          'התחבר/י עם Google</button>' +
        '<div style="font-size:11.5px;color:#9AA9B8;text-align:center;margin-top:13px;">בהמשך הינך מאשר/ת את תנאי השימוש ומדיניות הפרטיות</div>' +
      '</div>' +
    '</div>';
  }

  function screenWelcome() {
    var photoHTML = state.userPhoto
      ? '<img src="' + esc(state.userPhoto) + '" alt="" style="width:72px;height:72px;border-radius:50%;border:3px solid rgba(255,255,255,.4);margin-bottom:4px;">'
      : '<img src="assets/tower.png" alt="" style="height:120px;filter:drop-shadow(0 16px 22px rgba(0,0,0,.3));position:relative;z-index:1;">';
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:34px;background:radial-gradient(130% 80% at 50% 8%, #2E78C7 0%, #1B5C9E 48%, #122F52 100%);color:#fff;overflow:hidden;">' +
      '<div style="position:absolute;top:-50px;right:-40px;width:180px;height:180px;border:20px solid rgba(255,255,255,.06);border-radius:50%;"></div>' +
      '<div style="position:absolute;bottom:-30px;left:-50px;width:150px;height:150px;border:16px solid rgba(255,255,255,.05);border-radius:50%;"></div>' +
      photoHTML +
      '<h1 style="font-size:32px;font-weight:900;margin:8px 0 4px;">ברוך הבא, ' + t(state.userName || 'טייס') + '!</h1>' +
      '<p style="font-size:15px;line-height:1.5;opacity:.85;margin:0 auto 32px;max-width:280px;">מוכן/ה להמריא? נתחיל בבחירת הדמות ובניית מסלול האימון שלך.</p>' +
      '<button data-act="start" style="width:100%;max-width:300px;padding:18px;border:none;border-radius:18px;background:#fff;color:#1B5C9E;font-size:19px;font-weight:900;letter-spacing:.5px;cursor:pointer;box-shadow:0 8px 0 #c2d3e6;position:relative;z-index:1;">בחירת דמות ►</button>' +
    '</div>';
  }

  function screenRole() {
    var picked = state.pendingRole;
    var cards = ['ctrl', 'insp'].map(function (r) {
      var info = roleInfo[r]; var sel = picked === r; var dim = picked && !sel;
      var imgStyle = 'height:' + (sel ? 176 : 150) + 'px;transition:all .25s;filter:drop-shadow(0 12px 14px rgba(0,0,0,.3));' + (sel ? 'animation:atcSelLift .3s ease forwards;' : '');
      var cardStyle = 'position:relative;flex:1;max-width:158px;background:' + (sel ? 'linear-gradient(180deg,rgba(46,158,91,.22),rgba(46,158,91,.06))' : 'rgba(255,255,255,.05)') + ';border:2.5px solid ' + (sel ? '#2E9E5B' : 'rgba(255,255,255,.12)') + ';border-radius:24px;padding:14px 8px 16px;cursor:pointer;transition:all .25s;opacity:' + (dim ? '.5' : '1') + ';' + (sel ? 'box-shadow:0 0 0 4px rgba(46,158,91,.18),0 18px 36px rgba(0,0,0,.35);' : '');
      var badgeStyle = 'display:inline-block;font-size:16px;font-weight:900;color:#fff;background:' + info.accent + ';padding:5px 16px;border-radius:14px;';
      var checkStyle = 'position:absolute;top:10px;right:10px;width:26px;height:26px;border-radius:50%;background:#2E9E5B;color:#fff;font-size:15px;font-weight:900;display:' + (sel ? 'flex' : 'none') + ';align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.3);';
      return '<button data-act="pickRole" data-a="' + r + '" style="' + cardStyle + '">' +
        '<div style="' + checkStyle + '">✓</div>' +
        '<div style="height:184px;display:flex;align-items:flex-end;justify-content:center;">' + img(sel ? info.salute : info.idle, imgStyle) + '</div>' +
        '<div style="' + badgeStyle + '">' + info.he + '</div>' +
        '<div style="font-size:11.5px;font-weight:600;color:#9FB6CE;margin-top:2px;">' + info.en + '</div>' +
      '</button>';
    }).join('');
    var confirm = picked ? ('<div style="font-size:13px;color:#CFE0F0;margin-bottom:12px;">' + t(roleInfo[picked].desc) + '</div>' +
      '<button data-act="confirmRole" style="width:100%;max-width:320px;padding:17px;border:none;border-radius:16px;background:#2E9E5B;color:#fff;font-size:17px;font-weight:900;cursor:pointer;box-shadow:0 6px 0 #1f7a45;animation:atcPop .3s ease;">המשך/י כ' + roleInfo[picked].he + ' ►</button>') : '';
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;background:radial-gradient(120% 70% at 50% 0%,#21456E 0%,#15314F 55%,#0E2438 100%);padding:64px 20px 26px;">' +
      '<div style="text-align:center;color:#fff;flex:none;">' +
        '<h1 style="font-size:25px;font-weight:900;margin:5px 0 2px;">בחר/י את הדמות שלך</h1>' +
        '<p style="font-size:13px;color:#B7CBE0;margin:0;">הקש/י על דמות — לכל תפקיד מסלול והתקדמות נפרדים</p>' +
      '</div>' +
      '<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:14px;">' + cards + '</div>' +
      '<div style="flex:none;min-height:74px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;">' + confirm + '</div>' +
    '</div>';
  }

  function screenHome() {
    var cur = curId(); var done = rdata().completed; var floorsDone = done.length;
    var towerPct = Math.round(floorsDone / 10 * 100) + '%';
    var shifts = [0, 52, 80, 52, 0, -52, -80, -52, 0, 52, 80];
    var nodes = metaList.map(function (m, i) {
      var isDone = done.indexOf(m.id) >= 0; var isCur = m.id === cur; var isLocked = !isDone && !isCur; var size = isCur ? 76 : 62;
      var circle = 'width:' + size + 'px;height:' + size + 'px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:' + (m.final ? 27 : (isCur ? 25 : 22)) + 'px;border:none;cursor:pointer;position:relative;z-index:1;';
      if (isDone) circle += 'background:#2E9E5B;color:#fff;box-shadow:0 6px 0 #1f7a45;';
      else if (isCur) circle += 'background:#2E78C7;color:#fff;box-shadow:0 7px 0 #1B5C9E;';
      else circle += 'background:#DCE4ED;color:#9AA9B8;box-shadow:0 6px 0 #C4CFDB;';
      var num = m.final ? '★' : String(m.id);
      var badgeIcon = isDone ? '✓' : (isLocked ? '🔒' : '');
      var badgeStyle = 'position:absolute;top:-2px;' + (i % 2 === 0 ? 'left:-2px;' : 'right:-2px;') + 'width:22px;height:22px;border-radius:50%;display:' + ((isDone || isLocked) ? 'flex' : 'none') + ';align-items:center;justify-content:center;font-size:11px;font-weight:900;border:2px solid #EEF3F8;background:' + (isDone ? '#2E9E5B;color:#fff;' : '#fff;color:#9AA9B8;') + 'z-index:2;';
      var labelStyle = 'font-size:12.5px;font-weight:700;margin-top:13px;color:' + (isCur ? '#2E78C7' : (isDone ? '#2E9E5B' : '#9AA9B8')) + ';';
      var wrap = 'width:100%;display:flex;flex-direction:column;align-items:center;padding:5px 0;position:relative;z-index:1;transform:translateX(' + (shifts[i] || 0) + 'px);' + (isLocked ? 'opacity:.85;' : '');
      var pulse = isCur ? '<div style="position:absolute;width:76px;height:76px;border-radius:50%;background:#2E78C7;animation:atcPulse 1.9s ease-out infinite;"></div>' : '';
      var pill = isCur ? '<div style="margin-top:7px;background:#0E2A47;color:#fff;font-size:11px;font-weight:800;letter-spacing:1px;padding:5px 14px;border-radius:20px;">התחל/י</div>' : '';
      return '<div style="' + wrap + '"><button data-act="startStage" data-a="' + m.id + '" style="background:none;border:none;padding:0;display:flex;flex-direction:column;align-items:center;cursor:pointer;">' +
        '<div style="position:relative;display:flex;align-items:center;justify-content:center;">' + pulse + '<div style="' + circle + '">' + num + '</div><div style="' + badgeStyle + '">' + badgeIcon + '</div></div>' +
        '<div style="' + labelStyle + '">' + m.label + '</div>' + pill + '</button></div>';
    }).join('');
    var curMeta = null; for (var i = 0; i < metaList.length; i++) if (metaList[i].id === cur) curMeta = metaList[i];
    var unitKicker = curMeta ? ('שלב ' + (curMeta.final ? 'מסכם' : curMeta.id) + ' מתוך 10') : 'הושלם';
    var unitTitle = curMeta ? curMeta.label : 'כל השלבים הושלמו!';
    var decoA = img(roleInfo[role()].idle, 'position:absolute;top:60px;right:18px;height:78px;opacity:.92;transform:rotate(4deg);filter:drop-shadow(0 8px 10px rgba(14,42,71,.12));');
    var decoB = img(role() === 'ctrl' ? roleInfo.insp.salute : roleInfo.ctrl.salute, 'position:absolute;top:430px;left:16px;height:74px;opacity:.92;transform:rotate(-4deg);filter:drop-shadow(0 8px 10px rgba(14,42,71,.12));');
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;padding-top:50px;">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 18px 12px;flex:none;">' +
        '<div><div style="font-size:20px;font-weight:900;color:#0E2A47;line-height:1.1;margin-top:2px;">מסלול האימון</div></div>' +
        '<div style="display:flex;align-items:center;gap:6px;background:#EAF2FB;border:1px solid #D6E5F5;border-radius:20px;padding:7px 13px;"><span style="font-size:14px;">🏗️</span><span style="font-weight:800;color:#2E78C7;font-size:14px;">' + floorsDone + '/10</span></div>' +
      '</div>' +
      '<div class="atc-scroll" style="flex:1;overflow-y:auto;padding:0 0 80px;">' +
        '<div style="margin:4px 16px 6px;background:linear-gradient(135deg,#2E78C7 0%,#1B5C9E 100%);border-radius:24px;padding:16px 18px;display:flex;align-items:center;gap:14px;color:#fff;box-shadow:0 14px 28px rgba(27,92,158,.4);position:relative;overflow:hidden;">' +
          '<div style="flex:none;width:96px;height:138px;display:flex;align-items:flex-end;justify-content:center;position:relative;z-index:1;">' + towerHTML(floorsDone, false, 0.78) + '</div>' +
          '<div style="position:relative;z-index:1;flex:1;">' +
            '<div style="font-size:11.5px;font-weight:700;letter-spacing:1.5px;opacity:.85;">' + unitKicker + '</div>' +
            '<div style="font-size:19px;font-weight:900;margin-top:3px;line-height:1.15;">' + unitTitle + '</div>' +
            '<div style="font-size:12px;opacity:.85;margin-top:5px;">המגדל שלך · ' + floorsDone + '/10 קומות</div>' +
            '<div style="margin-top:8px;height:8px;background:rgba(255,255,255,.2);border-radius:5px;overflow:hidden;"><div style="height:100%;width:' + towerPct + ';background:#FFD27A;border-radius:5px;transition:width .5s;"></div></div>' +
          '</div>' +
        '</div>' +
        '<div style="position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:18px 0 8px;">' + decoA + decoB + nodes + '</div>' +
      '</div>' +
    '</div>';
  }

  function screenDict() {
    var q = (state.dictQuery || '').trim().toLowerCase(); var cat = state.dictCat;
    var chipDefs = [['all', 'הכל'], ['numbers', 'מספרים'], ['proc', 'נהלים'], ['inst', 'הוראות'], ['traffic', 'תנועה'], ['wx', 'מזג אוויר'], ['emer', 'חירום'], ['read', 'בדיקת קשר']];
    var chips = chipDefs.map(function (c) {
      var on = cat === c[0];
      return '<button data-act="dictCat" data-a="' + c[0] + '" style="flex:none;padding:7px 15px;border-radius:20px;font-size:13px;font-weight:700;cursor:pointer;border:1.5px solid ' + (on ? '#2E78C7;background:#2E78C7;color:#fff;' : '#D8E2EC;background:#fff;color:#5B6B7C;') + '">' + c[1] + '</button>';
    }).join('');
    function matchItem(it) { return it[0].toLowerCase().indexOf(q) >= 0 || it[1].indexOf(q) >= 0 || (it[2] || '').indexOf(q) >= 0; }
    var showNumbers = (cat === 'all' || cat === 'numbers') && (!q || PRON.some(function (p) { return p[1].toLowerCase().indexOf(q) >= 0 || p[0].indexOf(q) >= 0; }));
    var showRead = (cat === 'all' || cat === 'read') && (!q || READ.some(function (r) { return r[1].toLowerCase().indexOf(q) >= 0 || r[2].indexOf(q) >= 0; }));
    var numbersHTML = showNumbers ? '<div style="background:#0E2A47;border-radius:18px;padding:16px;margin-bottom:16px;"><div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:3px;">הגיית ספרות ומספרים</div><div style="font-size:11.5px;color:#90AECB;margin-bottom:13px;">הקש/י לשמיעה</div><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">' + PRON.map(function (p) { return '<button data-act="speak" data-speak="' + esc(p[1].replace(/-/g, '')) + '" style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:11px;padding:9px 11px;cursor:pointer;text-align:left;"><span style="width:30px;height:30px;flex:none;border-radius:8px;background:#2E78C7;color:#fff;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;">' + p[0] + '</span><span style="font-size:13px;font-weight:700;color:#DCE8F5;letter-spacing:.5px;direction:ltr;">' + p[1] + '</span></button>'; }).join('') + '</div></div>' : '';
    var readHTML = showRead ? '<div style="background:#fff;border:1px solid #E6ECF3;border-radius:18px;padding:16px;margin-bottom:16px;"><div style="font-size:14px;font-weight:800;color:#0E2A47;margin-bottom:12px;">סולם בדיקת קשר</div><div style="display:flex;flex-direction:column;gap:8px;">' + READ.map(function (r) { return '<div style="display:flex;align-items:center;gap:11px;"><span style="width:28px;height:28px;flex:none;border-radius:50%;background:' + r[3] + ';color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;">' + r[0] + '</span><div style="flex:1;"><div dir="ltr" style="font-size:13px;font-weight:700;color:#2E78C7;text-align:left;">' + r[1] + '</div><div style="font-size:12px;color:#5B6B7C;">' + r[2] + '</div></div></div>'; }).join('') + '</div></div>' : '';
    var srcSections = (cat === 'all') ? CATS : CATS.filter(function (c) { return c.id === cat; });
    var sectionsHTML = srcSections.map(function (c) {
      var its = q ? c.items.filter(matchItem) : c.items;
      if (!its.length) return '';
      return '<div style="margin-bottom:18px;"><div style="font-size:13px;font-weight:800;color:#2E78C7;letter-spacing:.5px;margin:0 4px 9px;">' + c.label + '</div><div style="background:#fff;border:1px solid #E6ECF3;border-radius:18px;overflow:hidden;">' + its.map(function (it, idx) {
        return '<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;' + (idx > 0 ? 'border-top:1px solid #F0F4F8;' : '') + '"><button data-act="speak" data-speak="' + esc(it[0]) + '" style="flex:none;width:38px;height:38px;border-radius:11px;border:none;background:#EAF2FB;color:#2E78C7;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;">🔊</button><div style="flex:1;min-width:0;"><div dir="ltr" style="font-size:14.5px;font-weight:800;color:#0E2A47;text-align:left;">' + t(it[0]) + '</div><div style="font-size:13px;font-weight:600;color:#46566a;">' + t(it[1]) + '</div>' + (it[2] ? '<div style="font-size:11.5px;color:#9AA9B8;margin-top:2px;">' + t(it[2]) + '</div>' : '') + '</div></div>';
      }).join('') + '</div></div>';
    }).join('');
    var anySection = srcSections.some(function (c) { return (q ? c.items.filter(matchItem) : c.items).length > 0; });
    var emptyHTML = (!anySection && !showNumbers && !showRead) ? '<div style="text-align:center;padding:50px 20px;color:#9AA9B8;"><div style="font-size:38px;margin-bottom:10px;">🔎</div><div style="font-size:14px;font-weight:600;">לא נמצאו מונחים עבור "' + t(state.dictQuery) + '"</div></div>' : '';
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;background:#EEF3F8;padding-top:50px;">' +
      '<div style="flex:none;padding:6px 18px 12px;background:#fff;border-bottom:1px solid #E6ECF3;">' +
        '<h1 style="font-size:23px;font-weight:900;color:#0E2A47;margin:4px 0 12px;">מילון פרזיולוגיה 📚</h1>' +
        '<div style="display:flex;align-items:center;gap:9px;background:#EEF3F8;border:1px solid #E1E8F0;border-radius:13px;padding:11px 14px;"><span style="font-size:15px;color:#9AA9B8;">🔍</span><input data-dictinput value="' + esc(state.dictQuery) + '" placeholder="חיפוש..." style="flex:1;border:none;background:none;outline:none;font-family:Rubik;font-size:14px;color:#0E2A47;"></div>' +
        '<div class="atc-scroll" style="display:flex;gap:8px;overflow-x:auto;margin-top:12px;padding-bottom:2px;">' + chips + '</div>' +
      '</div>' +
      '<div class="atc-scroll" style="flex:1;overflow-y:auto;padding:14px 16px 80px;">' + numbersHTML + readHTML + sectionsHTML + emptyHTML + '</div>' +
    '</div>';
  }

  function screenPractice() { if (state.pracView === 'radio') return pracRadio(); return pracHub(); }
  function pracHub() {
    var games = [
      { id: 'memory', kind: 'memory', he: 'זיכרון מונחים', en: 'Memory Match', accent: '#7C5CFC', bg: 'linear-gradient(150deg,#EDE9FF,#DCD3FF)', meta: 'שיא 12', desc: 'התאמת מונחי תעופה למשמעות שלהם', prog: '70%' },
      { id: 'radio', kind: 'radio', he: 'מרוץ הקשר', en: 'Radio Rush', accent: '#2E78C7', bg: 'linear-gradient(150deg,#E2F0FC,#C7E2F8)', meta: 'חדש', desc: 'תגובה מהירה לתשדורות מטייסים', prog: '45%' },
      { id: 'radar', kind: 'radar', he: 'אתגר המכ"ם', en: 'Radar Challenge', accent: '#1F8A5B', bg: 'linear-gradient(150deg,#E2F6EC,#C6ECD7)', meta: 'שלב 3', desc: 'ביצוע הוראות נת"א על מסך מכ"ם', prog: '30%' },
      { id: 'match', kind: 'match', he: 'התאמה מהירה', en: 'Match Madness', accent: '#F2870A', bg: 'linear-gradient(150deg,#FFF0DC,#FFE0BC)', meta: 'שיא 28', desc: 'חבר/י מונחים לתרגום לפני שהזמן נגמר', prog: '55%' }
    ];
    var cards = games.map(function (g) {
      return '<button data-act="openGame" data-a="' + g.id + '" style="position:relative;display:flex;flex-direction:column;text-align:right;background:#fff;border:none;border-radius:22px;padding:0 0 13px;cursor:pointer;overflow:hidden;box-shadow:0 10px 22px rgba(14,42,71,.09);"><div style="height:96px;display:flex;align-items:center;justify-content:center;position:relative;background:' + g.bg + ';"><div style="position:absolute;top:8px;right:10px;background:rgba(255,255,255,.85);border-radius:10px;padding:3px 8px;font-size:10px;font-weight:800;color:' + g.accent + ';">' + g.meta + '</div>' + gameIcon(g.kind, g.accent) + '</div><div style="padding:11px 14px 0;"><div style="font-size:15.5px;font-weight:900;color:#0E2A47;">' + g.he + '</div><div dir="ltr" style="font-size:10.5px;font-weight:700;color:' + g.accent + ';text-align:right;">' + g.en + '</div><div style="font-size:11.5px;color:#5B6B7C;margin-top:6px;min-height:46px;">' + g.desc + '</div></div><div style="margin:2px 14px 0;display:flex;align-items:center;gap:6px;"><div style="flex:1;height:7px;background:#EEF2F5;border-radius:5px;overflow:hidden;"><div style="height:100%;width:' + g.prog + ';background:' + g.accent + ';border-radius:5px;"></div></div><span style="font-size:13px;color:' + g.accent + ';">▶</span></div></button>';
    }).join('');
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;background:#EEF2F5;padding-top:50px;">' +
      '<div style="flex:none;padding:8px 18px 6px;"><div style="display:flex;align-items:center;justify-content:space-between;"><div><h1 style="font-size:23px;font-weight:900;color:#0E2A47;margin:0;">מרכז התרגול 🎮</h1><div style="font-size:13px;color:#5B6B7C;font-weight:600;margin-top:2px;">בחר/י מיני-משחק וצבור/י XP</div></div><div style="display:flex;align-items:center;gap:4px;background:#fff;border:1px solid #E6ECF3;border-radius:13px;padding:7px 12px;"><span style="font-size:15px;">🔥</span><span style="font-weight:800;color:#F2870A;font-size:15px;">' + state.streak + '</span></div></div></div>' +
      '<div class="atc-scroll" style="flex:1;overflow-y:auto;padding:14px 16px 80px;"><div style="display:grid;grid-template-columns:1fr 1fr;gap:13px;">' + cards + '</div>' +
        '<div style="margin-top:16px;background:linear-gradient(135deg,#143E6B,#0E2A47);border-radius:22px;padding:18px;color:#fff;position:relative;overflow:hidden;"><div style="position:relative;z-index:1;display:flex;align-items:center;gap:6px;font-size:12px;font-weight:800;letter-spacing:1px;color:#FFD27A;">⭐ אתגר יומי</div><div style="position:relative;z-index:1;font-size:17px;font-weight:900;margin-top:5px;">ענה נכון על 5 בקשות קשר ברצף</div><div style="position:relative;z-index:1;display:flex;gap:8px;margin-top:12px;"><div style="background:rgba(255,255,255,.14);border-radius:12px;padding:7px 13px;font-size:13px;font-weight:800;">+50 XP</div><div style="background:rgba(255,255,255,.14);border-radius:12px;padding:7px 13px;font-size:13px;font-weight:800;">+5 💎</div></div><button data-act="openGame" data-a="radio" style="position:relative;z-index:1;width:100%;margin-top:14px;padding:14px;border:none;border-radius:14px;background:#2E78C7;color:#fff;font-size:16px;font-weight:900;cursor:pointer;box-shadow:0 5px 0 #1B5C9E;">התחל משימה</button></div>' +
      '</div>' +
    '</div>';
  }

  function pracRadio() {
    var opts = [['Cleared to land runway 26', 1], ['Maintain current altitude', 0], ['Contact ground frequency', 0], ['Taxi to holding point', 0]];
    var done = state.pracDone; var sel = state.pracSel;
    var optHTML = opts.map(function (o, i) {
      var stt = 'idle';
      if (done) { if (o[1]) stt = 'correct'; else if (i === sel) stt = 'wrong'; else stt = 'dim'; }
      else if (i === sel) stt = 'sel';
      var map = { idle: '#E1E8F0;background:#fff;color:#0E2A47;', sel: '#2E78C7;background:#EAF2FB;color:#0E2A47;', correct: '#2E9E5B;background:#E7F6EE;color:#1d6b3f;', wrong: '#E5484D;background:#FCEBEC;color:#9b2c2f;', dim: '#EAF0F6;background:#fff;color:#BCC8D4;' };
      var tick = (done && o[1]) ? '<span style="margin-right:auto;font-size:17px;">✅</span>' : '';
      return '<button data-act="pracSelect" data-a="' + i + '" style="display:flex;align-items:center;width:100%;padding:15px 16px;border-radius:15px;font-size:15px;font-weight:600;cursor:pointer;direction:ltr;text-align:left;border:2px solid ' + map[stt] + '"><span dir="ltr">' + o[0] + '</span>' + tick + '</button>';
    }).join('');
    var confetti = '';
    if (state.pracCelebrate) { var gems = ''; for (var d = 0; d < 7; d++) { var lf = 10 + d * 12; var dl = (d * 0.12).toFixed(2); gems += '<div style="position:absolute;top:-20px;left:' + lf + '%;font-size:' + (16 + (d % 3) * 6) + 'px;animation:towerSpark 1.6s ease-out ' + dl + 's infinite;">💎</div>'; } confetti = '<div style="position:absolute;inset:0;pointer-events:none;z-index:30;overflow:hidden;">' + gems + '</div>'; }
    var footer;
    if (!done) {
      footer = '<button data-act="pracCheck" style="width:100%;padding:16px;border:none;border-radius:16px;font-size:17px;font-weight:800;' + (sel !== null ? 'background:#2E78C7;color:#fff;box-shadow:0 5px 0 #1B5C9E;cursor:pointer;' : 'background:#E1E8F0;color:#9AA9B8;cursor:default;') + '">בדוק/י תשובה</button>';
    } else {
      var ok = sel === 0;
      var title = ok ? POSITIVE[Math.floor(Math.random() * POSITIVE.length)] : 'לא מדויק — נסה/י שוב';
      footer = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;"><div style="width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px;color:#fff;background:' + (ok ? '#2E9E5B' : '#E5484D') + ';">' + (ok ? '✓' : '!') + '</div><div style="flex:1;"><div style="font-size:16px;font-weight:800;color:' + (ok ? '#1d6b3f' : '#9b2c2f') + ';">' + title + '</div>' + (ok ? '<div style="font-size:12.5px;color:#2E9E5B;font-weight:700;">+25 XP · +5 💎</div>' : '<div dir="ltr" style="font-size:12.5px;color:#9b2c2f;font-weight:700;text-align:left;">Cleared to land runway 26</div>') + '</div></div><button data-act="pracReset" style="width:100%;padding:15px;border:none;border-radius:15px;font-size:16px;font-weight:800;cursor:pointer;color:#fff;background:' + (ok ? '#2E9E5B' : '#E5484D') + ';box-shadow:0 5px 0 ' + (ok ? '#1f7a45' : '#b5363a') + ';">בקשה הבאה</button>';
    }
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;background:#EEF2F5;padding-top:50px;">' + confetti +
      '<div style="display:flex;align-items:center;gap:12px;padding:8px 16px 12px;flex:none;"><button data-act="pracBack" style="background:none;border:none;font-size:22px;color:#9AA9B8;cursor:pointer;line-height:1;padding:0;">✕</button><div style="flex:1;"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;"><span style="font-size:13px;font-weight:800;color:#0E2A47;">משימת פיקוח</span><span style="font-size:12px;font-weight:800;color:#2E9E5B;">+25 XP</span></div><div style="height:12px;background:#E6ECF3;border-radius:7px;overflow:hidden;"><div style="height:100%;width:65%;background:linear-gradient(90deg,#2E78C7,#48a0e8);border-radius:7px;"></div></div></div><div style="display:flex;align-items:center;gap:4px;"><span style="font-size:16px;">🔥</span><span style="font-weight:800;color:#F2870A;font-size:15px;">' + state.streak + '</span></div></div>' +
      '<div class="atc-scroll" style="flex:1;overflow-y:auto;padding:6px 18px 16px;"><div style="background:#fff;border-radius:24px;padding:18px;box-shadow:0 12px 28px rgba(14,42,71,.1);"><div style="position:relative;height:120px;border-radius:18px;overflow:hidden;background:linear-gradient(180deg,#BCE3F7,#8FC6EE 70%,#7FB36B 70%,#6BA158);margin-bottom:16px;"><img src="assets/tower.png" alt="" style="position:absolute;bottom:18%;left:12px;height:78px;"><img src="assets/airplane.png" alt="" style="position:absolute;top:10px;right:-6px;width:120px;transform:rotate(-9deg);"></div><div style="display:inline-block;font-size:11px;font-weight:800;color:#2E78C7;background:#EAF2FB;padding:4px 11px;border-radius:12px;">📻 טייס יוצר קשר עם המגדל</div><div style="background:#0E2A47;border-radius:14px;padding:14px;display:flex;gap:11px;align-items:center;margin:12px 0 14px;"><button data-act="speak" data-speak="Tower, request permission to land runway two six." style="flex:none;width:44px;height:44px;border-radius:12px;border:none;background:#2E78C7;color:#fff;font-size:17px;cursor:pointer;">🔊</button><div dir="ltr" style="flex:1;font-size:15px;font-weight:600;color:#EAF2FB;line-height:1.4;text-align:left;">"Tower, request permission to land runway 26."</div></div><div style="font-size:17px;font-weight:900;color:#0E2A47;margin-bottom:12px;">מהי התגובה הנכונה?</div><div style="display:flex;flex-direction:column;gap:10px;">' + optHTML + '</div></div></div>' +
      '<div style="flex:none;padding:14px 18px 24px;border-top:1px solid #E6ECF3;background:#fff;">' + footer + '</div>' +
    '</div>';
  }

  function screenProfile() {
    var info = roleInfo[role()];
    var stats = [['#F2870A', state.streak, '🔥 רצף ימים'], ['#2E78C7', rdata().xp, '✈️ XP בתפקיד'], ['#2E9E5B', rdata().completed.length, '✅ שלבים']].map(function (s) { return '<div style="flex:1;background:#fff;border:1px solid #E6ECF3;border-radius:16px;padding:14px 6px;text-align:center;"><div style="font-size:22px;font-weight:900;color:' + s[0] + ';">' + s[1] + '</div><div style="font-size:11px;color:#5B6B7C;font-weight:600;margin-top:2px;">' + s[2] + '</div></div>'; }).join('');
    var toggles = ['ctrl', 'insp'].map(function (r) {
      var ri = roleInfo[r]; var sel = role() === r; var rd = state.roleData[r] || { completed: [] };
      return '<button data-act="switchRole" data-a="' + r + '" style="position:relative;flex:1;display:flex;flex-direction:column;align-items:center;padding:12px 6px;border-radius:18px;cursor:pointer;background:' + (sel ? ri.tint : '#fff') + ';border:2px solid ' + (sel ? ri.accent : '#E6ECF3') + ';"><div style="position:absolute;top:8px;right:8px;width:22px;height:22px;border-radius:50%;background:' + ri.accent + ';color:#fff;font-size:13px;font-weight:900;display:' + (sel ? 'flex' : 'none') + ';align-items:center;justify-content:center;">✓</div><div style="height:84px;display:flex;align-items:flex-end;justify-content:center;">' + img(ri.idle, 'height:' + (sel ? 90 : 80) + 'px;margin-bottom:-2px;') + '</div><div style="font-size:14px;font-weight:800;margin-top:6px;color:' + (sel ? '#0E2A47' : '#5B6B7C') + ';">' + ri.he + '</div><div style="font-size:10.5px;font-weight:600;color:#9AA9B8;">שלב ' + Math.min(rd.completed.length + 1, 10) + ' · ' + rd.completed.length + ' הושלמו</div></button>';
    }).join('');
    var soundTrack = 'width:44px;height:26px;border-radius:14px;flex:none;display:flex;align-items:center;padding:3px;background:' + (state.soundOn ? '#2E9E5B' : '#CBD5E0') + ';' + (state.soundOn ? 'justify-content:flex-start;' : 'justify-content:flex-end;');
    var photoHTML = state.userPhoto ? '<img src="' + esc(state.userPhoto) + '" alt="" style="width:90px;height:90px;border-radius:24px;border:2px solid rgba(255,255,255,.3);object-fit:cover;flex:none;position:relative;z-index:1;">' : '<div style="width:90px;height:90px;border-radius:24px;background:rgba(255,255,255,.16);border:2px solid rgba(255,255,255,.3);display:flex;align-items:flex-end;justify-content:center;overflow:hidden;flex:none;position:relative;z-index:1;">' + img(info.idle, 'height:96px;margin-bottom:-4px;') + '</div>';
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;background:#EEF3F8;padding-top:50px;">' +
      '<div class="atc-scroll" style="flex:1;overflow-y:auto;padding:0 0 80px;">' +
        '<div style="background:linear-gradient(150deg,#2E78C7,#143E6B);padding:22px 22px 26px;color:#fff;display:flex;align-items:center;gap:16px;position:relative;overflow:hidden;">' + photoHTML +
          '<div style="position:relative;z-index:1;"><div style="font-size:22px;font-weight:900;">' + t(state.userName || 'טייס') + '</div><div style="display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.18);padding:4px 11px;border-radius:14px;font-size:12.5px;font-weight:700;margin-top:6px;">' + info.badge + '</div></div>' +
        '</div>' +
        '<div style="display:flex;gap:10px;padding:16px;">' + stats + '</div>' +
        '<div style="padding:0 16px;"><div style="font-size:13px;font-weight:800;color:#2E78C7;margin:6px 4px 10px;">הדמות שלי</div><div style="display:flex;gap:11px;">' + toggles + '</div></div>' +
        '<div style="padding:18px 16px 0;"><div style="font-size:13px;font-weight:800;color:#2E78C7;margin:6px 4px 10px;">הגדרות</div>' +
          '<div style="background:#fff;border:1px solid #E6ECF3;border-radius:16px;overflow:hidden;">' +
            '<button data-act="toggleSound" style="width:100%;display:flex;align-items:center;gap:12px;padding:15px 16px;background:none;border:none;border-bottom:1px solid #F0F4F8;cursor:pointer;"><span style="font-size:18px;">🔊</span><span style="flex:1;text-align:right;font-size:14.5px;font-weight:600;color:#0E2A47;">קריינות קולית</span><span style="' + soundTrack + '"><span style="width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);"></span></span></button>' +
            '<button data-act="signOut" style="width:100%;display:flex;align-items:center;gap:12px;padding:15px 16px;background:none;border:none;cursor:pointer;"><span style="font-size:18px;">🚪</span><span style="flex:1;text-align:right;font-size:14.5px;font-weight:600;color:#E5484D;">התנתקות</span><span style="font-size:18px;color:#E5484D;">‹</span></button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function screenLesson() {
    var st = stages[state.stageId]; var ex = st.exercises[state.exIndex]; var info = roleInfo[role()];
    var progressPct = Math.round(state.exIndex / st.exercises.length * 100) + '%';
    var charImg = (state.exIndex % 2 === 1) ? info.salute : info.idle;
    var charStyle = 'height:88px;transform-origin:bottom center;filter:drop-shadow(0 6px 8px rgba(14,42,71,.16));' + (state.speaking ? 'animation:atcTalkBob .5s ease-in-out infinite;' : '');
    var body = '';
    if (ex.type === 'mcq') {
      var ltr = ex.opts.every(function (o) { return /^[\x00-\x7F\s'.()-]+$/.test(o[0]); });
      var map = { idle: '#E1E8F0;background:#fff;color:#0E2A47;', sel: '#2E78C7;background:#EAF2FB;color:#0E2A47;', correct: '#2E9E5B;background:#E7F6EE;color:#1d6b3f;', wrong: '#E5484D;background:#FCEBEC;color:#9b2c2f;', dim: '#EAF0F6;background:#fff;color:#BCC8D4;' };
      var optHTML = ex.opts.map(function (o, i) {
        var stt = 'idle';
        if (state.feedback) { if (o[1]) stt = 'correct'; else if (i === state.selected) stt = 'wrong'; else stt = 'dim'; }
        else if (i === state.selected) stt = 'sel';
        return '<button data-act="select" data-a="' + i + '" style="width:100%;padding:15px 16px;border-radius:15px;font-size:15px;font-weight:600;cursor:pointer;transition:all .15s;border:2px solid ' + map[stt] + (ltr ? 'text-align:left;direction:ltr;' : 'text-align:right;') + '">' + t(o[0]) + '</button>';
      }).join('');
      body = '<div style="background:#0E2A47;border-radius:16px;padding:16px;display:flex;gap:12px;align-items:center;margin-bottom:18px;box-shadow:0 10px 22px rgba(14,42,71,.22);"><button data-act="speak" data-speak="' + esc(ex.en) + '" style="flex:none;width:46px;height:46px;border-radius:12px;border:none;background:#2E78C7;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">🔊</button><div dir="ltr" style="flex:1;font-size:16px;font-weight:600;color:#EAF2FB;line-height:1.4;text-align:left;">' + t(ex.en) + '</div></div><div style="display:flex;flex-direction:column;gap:11px;">' + optHTML + '</div>';
    } else if (ex.type === 'dnd') {
      var segs = ex.template.split('__'); var inner = ''; var slot = 0;
      for (var si = 0; si < segs.length; si++) {
        var seg = segs[si].trim();
        if (seg) inner += '<span style="font-size:16px;font-weight:600;color:#DCE8F5;">' + t(seg) + '</span>';
        if (si < segs.length - 1) { var idx = slot++; var filled = idx < state.placed.length; inner += '<button data-act="removeSlot" data-a="' + idx + '" style="min-width:78px;padding:7px 10px;border-radius:9px;font-size:14px;font-weight:700;cursor:pointer;border:2px ' + (filled ? 'solid #F2A100;background:#F2A100;color:#0E2A47;' : 'dashed #4d6f93;background:rgba(255,255,255,.04);color:#6e8eaf;') + '">' + (filled ? t(state.placed[idx].word) : '＿＿') + '</button>'; }
      }
      var bankHTML = ex.bank.map(function (w, i) { var used = state.placed.some(function (p) { return p.bankId === i; }); return '<button data-act="place" data-a="' + i + '" style="padding:11px 15px;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;border:2px solid #D8E2EC;background:#fff;color:#0E2A47;box-shadow:0 3px 0 #D8E2EC;' + (used ? 'visibility:hidden;' : '') + '">' + t(w) + '</button>'; }).join('');
      body = '<div style="background:#0E2A47;border-radius:16px;padding:20px 16px;min-height:92px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;direction:ltr;box-shadow:0 10px 22px rgba(14,42,71,.22);position:relative;"><div style="position:absolute;top:9px;right:13px;font-size:9px;letter-spacing:2px;color:#5b7da3;font-weight:700;">● TX</div>' + inner + '</div><div style="text-align:center;font-size:12px;color:#9AA9B8;margin:14px 0 12px;">הקש/י על מילה כדי לשבץ אותה</div><div style="display:flex;flex-wrap:wrap;gap:11px;justify-content:center;direction:ltr;">' + bankHTML + '</div>';
    } else if (ex.type === 'listen') {
      var revealBlock = state.revealed ? '<div style="margin-top:22px;width:100%;background:#F4F7FB;border:1px solid #E1E8F0;border-radius:16px;padding:18px;text-align:center;animation:atcPop .3s ease;"><div dir="ltr" style="font-size:15px;font-weight:700;color:#2E78C7;">"' + t(ex.audio) + '"</div><div style="height:1px;background:#E1E8F0;margin:13px 0;"></div><div style="font-size:17px;font-weight:800;color:#0E2A47;">' + t(ex.he2) + '</div></div>' : '<button data-act="reveal" style="margin-top:22px;padding:13px 26px;border:2px solid #2E78C7;background:#fff;color:#2E78C7;border-radius:14px;font-weight:800;font-size:15px;cursor:pointer;">חשוף/י תרגום</button>';
      var bars = ''; var delays = ['0s', '.15s', '.3s', '.45s', '.6s']; var cols = ['#9cc3ea', '#6aa6e0', '#2E78C7', '#6aa6e0', '#9cc3ea'];
      for (var b = 0; b < 5; b++) bars += '<div style="width:4px;height:26px;background:' + cols[b] + ';border-radius:3px;animation:atcWave 1s ease-in-out ' + delays[b] + ' infinite;"></div>';
      body = '<div style="display:flex;flex-direction:column;align-items:center;padding:8px 0 4px;"><button data-act="speak" data-speak="' + esc(ex.audio) + '" style="width:124px;height:124px;border-radius:50%;border:none;background:linear-gradient(160deg,#2E78C7,#1B5C9E);color:#fff;font-size:44px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 0 #16518c,0 18px 30px rgba(27,92,158,.35);padding-left:8px;">▶</button><div style="display:flex;align-items:flex-end;gap:4px;height:26px;margin-top:18px;">' + bars + '</div><div style="font-size:13px;color:#9AA9B8;margin-top:12px;">הקש/י לשמיעת התשדורת</div>' + revealBlock + '</div>';
    }
    var footer;
    if (!state.feedback) {
      var can = canCheck();
      footer = '<div style="padding:14px 20px 24px;flex:none;border-top:1px solid #F0F4F8;"><button data-act="check" style="width:100%;padding:16px;border:none;border-radius:16px;font-size:17px;font-weight:800;' + (can ? 'background:#2E78C7;color:#fff;box-shadow:0 5px 0 #1B5C9E;cursor:pointer;' : 'background:#E1E8F0;color:#9AA9B8;cursor:default;') + '">בדוק/י</button></div>';
    } else {
      var ok = state.feedback === 'ok'; var correctText = '';
      if (ex.type === 'mcq') { for (var ci = 0; ci < ex.opts.length; ci++) if (ex.opts[ci][1]) correctText = ex.opts[ci][0]; }
      else if (ex.type === 'dnd') correctText = ex.answer.join('  ·  ');
      footer = '<div style="flex:none;padding:18px 20px 24px;border-radius:26px 26px 0 0;animation:atcSheet .28s cubic-bezier(.2,.8,.2,1);background:' + (ok ? '#E7F6EE' : '#FCEBEC') + ';"><div style="display:flex;align-items:center;gap:12px;"><div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:21px;color:#fff;flex:none;background:' + (ok ? '#2E9E5B' : '#E5484D') + ';">' + (ok ? '✓' : '!') + '</div><div style="flex:1;"><div style="font-size:16px;font-weight:800;color:' + (ok ? '#1d6b3f' : '#9b2c2f') + ';">' + t(state.feedbackTitle) + '</div>' + (!ok && ex.type !== 'listen' ? '<div dir="ltr" style="font-size:13.5px;font-weight:700;color:#9b2c2f;margin-top:3px;text-align:left;">' + t(correctText) + '</div>' : '') + '</div></div><div style="display:flex;gap:8px;margin-top:12px;font-size:13px;line-height:1.45;color:#46566a;"><span style="font-size:15px;flex:none;">💡</span><span>' + t(ex.tip) + '</span></div><button data-act="next" style="width:100%;margin-top:14px;padding:15px;border:none;border-radius:15px;font-size:16px;font-weight:800;cursor:pointer;color:#fff;background:' + (ok ? '#2E9E5B' : '#E5484D') + ';box-shadow:0 5px 0 ' + (ok ? '#1f7a45' : '#b5363a') + ';">המשך/י</button></div>';
    }
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;background:#fff;">' +
      '<div style="display:flex;align-items:center;gap:14px;padding:58px 18px 14px;flex:none;"><button data-act="closeLesson" style="background:none;border:none;font-size:22px;color:#9AA9B8;cursor:pointer;line-height:1;padding:0;">✕</button><div style="flex:1;height:14px;background:#E6ECF3;border-radius:8px;overflow:hidden;"><div style="height:100%;background:linear-gradient(90deg,#2E78C7,#48a0e8);border-radius:8px;width:' + progressPct + ';transition:width .45s;"></div></div></div>' +
      '<div class="atc-scroll" style="flex:1;overflow-y:auto;padding:6px 20px 16px;">' +
        '<div style="font-size:12px;font-weight:800;color:#2E78C7;letter-spacing:1.2px;">שלב ' + st.num + ' · ' + st.title + '</div>' +
        '<div style="display:flex;align-items:flex-end;gap:8px;margin:12px 0 18px;"><button data-act="speak" data-speak="' + esc(exVoice(ex)) + '" style="background:none;border:none;padding:0;cursor:pointer;flex:none;">' + img(charImg, charStyle) + '</button><div style="flex:1;background:#fff;border:2px solid #E6ECF3;border-radius:16px 16px 16px 4px;padding:12px 14px;"><div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><span style="font-size:15px;color:#2E78C7;">🔊</span><span style="font-size:11px;font-weight:800;color:#2E78C7;">' + info.he + '</span><span style="font-size:10.5px;font-weight:600;color:#9AA9B8;">· ' + (state.speaking ? 'מדבר/ת…' : 'הקש/י לשמיעה') + '</span></div><div style="font-size:16px;font-weight:800;color:#0E2A47;line-height:1.4;border-bottom:2px dashed #CBD7E3;padding-bottom:7px;">' + t(ex.he) + '</div></div></div>' + body +
      '</div>' + footer +
    '</div>';
  }

  function screenComplete() {
    var fs = state.finalStats || { xp: 0, acc: 0, time: '0:00', passed: true };
    var passed = fs.passed !== false;
    var num = stages[state.stageId] ? stages[state.stageId].num : '';
    var sub = stages[state.stageId] ? stages[state.stageId].title : '';
    var fd = rdata().completed.length;
    var msg = passed ? ('קומה ' + fd + ' נבנתה! המגדל גדל 🏗️') : ('צריך 50% לפחות כדי לעבור · קיבלת ' + fs.acc + '%');
    var spark = passed ? '<div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);width:8px;height:8px;"><div style="position:absolute;left:-30px;bottom:60px;font-size:18px;animation:towerSpark 1.2s ease-out infinite;">✨</div><div style="position:absolute;left:24px;bottom:80px;font-size:14px;animation:towerSpark 1.2s ease-out .4s infinite;">✨</div><div style="position:absolute;left:-6px;bottom:96px;font-size:12px;animation:towerSpark 1.2s ease-out .8s infinite;">✨</div></div>' : '';
    var statCards = [['XP', '+' + fs.xp, '#FFD27A'], ['דיוק', fs.acc + '%', '#fff'], ['זמן', fs.time, '#fff']].map(function (s) { return '<div style="flex:1;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:18px;padding:14px 6px;"><div style="font-size:11px;font-weight:700;letter-spacing:1px;opacity:.8;">' + s[0] + '</div><div style="font-size:24px;font-weight:900;margin-top:4px;color:' + s[2] + ';">' + s[1] + '</div></div>'; }).join('');
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(165deg,#2E78C7 0%,#143E6B 100%);color:#fff;padding:30px;text-align:center;overflow:hidden;">' +
      '<div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(60% 40% at 50% 30%,rgba(255,210,122,.18),transparent);"></div>' +
      '<div style="font-size:13px;font-weight:800;letter-spacing:2px;opacity:.85;position:relative;">' + sub + '</div>' +
      '<h1 style="font-size:27px;font-weight:900;margin:4px 0 16px;position:relative;">' + (passed ? 'שלב ' + num + ' הושלם!' : 'כמעט! נסה/י שוב') + '</h1>' +
      '<div style="position:relative;height:230px;display:flex;align-items:flex-end;justify-content:center;margin-bottom:6px;">' + spark + '<div style="height:230px;display:flex;align-items:flex-end;position:relative;z-index:1;">' + towerHTML(fd, passed, 1.25) + '</div></div>' +
      '<div style="font-size:15px;font-weight:800;position:relative;color:' + (passed ? '#FFD27A' : '#FFC4C4') + ';">' + msg + '</div>' +
      '<div style="display:flex;gap:11px;width:100%;margin:22px 0 26px;position:relative;">' + statCards + '</div>' +
      '<button data-act="goHome" style="width:100%;padding:17px;border:none;border-radius:17px;background:#fff;color:#1B5C9E;font-size:17px;font-weight:900;cursor:pointer;box-shadow:0 6px 0 #c9d8e8;position:relative;">המשך/י למסלול</button>' +
    '</div>';
  }

  function navBar() {
    var tabs = [
      ['home', 'בית', '<path d="M12 3.2 3.6 10.4a1 1 0 0 0-.35.76V20a1 1 0 0 0 1 1h4.2v-5.3a1 1 0 0 1 1-1h5.1a1 1 0 0 1 1 1V21h4.2a1 1 0 0 0 1-1v-8.84a1 1 0 0 0-.35-.76Z" fill="C"/>'],
      ['practice', 'תרגול', '<g fill="C"><rect x="2.5" y="9.5" width="2.6" height="5" rx="1.1"/><rect x="5" y="7.7" width="2.8" height="8.6" rx="1.2"/><rect x="16.2" y="7.7" width="2.8" height="8.6" rx="1.2"/><rect x="18.9" y="9.5" width="2.6" height="5" rx="1.1"/><rect x="7" y="10.7" width="10" height="2.6" rx="1.3"/></g>'],
      ['dict', 'מילון', '<path d="M12 6.5C10 5 6.5 5 4.5 6v12c2-1 5.5-1 7.5.5 2-1.5 5.5-1.5 7.5-.5V6c-2-1-5.5-1-7.5.5Z" fill="C"/><path d="M12 6.5v12" stroke="#fff" stroke-width="1.3"/>'],
      ['profile', 'פרופיל', '<circle cx="12" cy="8" r="4" fill="C"/><path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1Z" fill="C"/>']
    ];
    var btns = tabs.map(function (tb) {
      var active = state.tab === tb[0]; var color = active ? '#2E78C7' : '#9AA9B8';
      return '<button data-act="tab" data-a="' + tb[0] + '" style="flex:1;background:none;border:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;border-top:3px solid ' + (active ? '#2E78C7' : 'transparent') + ';"><svg width="25" height="25" viewBox="0 0 24 24">' + tb[2].replace(/C/g, color) + '</svg><span style="font-size:10.5px;font-weight:700;color:' + color + ';">' + tb[1] + '</span></button>';
    }).join('');
    return '<div style="position:absolute;bottom:0;left:0;right:0;height:64px;background:#fff;border-top:1px solid #E6ECF3;display:flex;align-items:stretch;z-index:20;box-shadow:0 -4px 14px rgba(14,42,71,.06);">' + btns + '</div>';
  }

  /* ----------------------------- RENDER ----------------------------- */
  function render() {
    var darkScreens = ['landing', 'welcome', 'role', 'complete'];
    var html = statusBar(darkScreens.indexOf(state.screen) >= 0 ? '#fff' : '#0E2A47');
    if (state.screen === 'loading')     html += screenLoading();
    else if (state.screen === 'landing')     html += screenLanding();
    else if (state.screen === 'welcome')     html += screenWelcome();
    else if (state.screen === 'role')        html += screenRole();
    else if (state.screen === 'home')        html += screenHome();
    else if (state.screen === 'dictionary')  html += screenDict();
    else if (state.screen === 'practice')    html += screenPractice();
    else if (state.screen === 'profile')     html += screenProfile();
    else if (state.screen === 'lesson')      html += screenLesson();
    else if (state.screen === 'complete')    html += screenComplete();
    if (['home', 'dictionary', 'profile', 'practice'].indexOf(state.screen) >= 0) html += navBar();
    if (state.toast) html += '<div style="position:absolute;bottom:86px;left:50%;background:#0E2A47;color:#fff;font-size:13.5px;font-weight:600;padding:11px 20px;border-radius:14px;box-shadow:0 10px 24px rgba(0,0,0,.3);animation:atcToast 1.9s ease forwards;z-index:50;white-space:nowrap;">' + t(state.toast) + '</div>';
    root.innerHTML = html;
    wire();
  }

  function wire() {
    var di = root.querySelector('[data-dictinput]');
    if (di) di.addEventListener('input', function (e) { state.dictQuery = e.target.value; var c = e.target.selectionStart; render(); var ni = root.querySelector('[data-dictinput]'); if (ni) { ni.focus(); try { ni.setSelectionRange(c, c); } catch(x){} } });
  }

  var ACTS = {
    start: startWelcome, confirmRole: confirmRole, signOut: signOut,
    toggleSound: toggleSound, check: check, next: next, reveal: reveal,
    goHome: goHome, closeLesson: goHome, pracBack: pracBack, pracCheck: pracCheck, pracReset: pracReset
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]'); if (!el) return;
    var act = el.getAttribute('data-act'); var a = el.getAttribute('data-a');
    if (act === 'google')      { signInGoogle(); return; }
    if (act === 'speak')       { speak(el.getAttribute('data-speak')); return; }
    if (act === 'pickRole')    { pickRole(a); return; }
    if (act === 'startStage')  { startStage(parseInt(a, 10)); return; }
    if (act === 'select')      { select(parseInt(a, 10)); return; }
    if (act === 'place')       { place(parseInt(a, 10)); return; }
    if (act === 'removeSlot')  { removeSlot(parseInt(a, 10)); return; }
    if (act === 'dictCat')     { setL({ dictCat: a }); return; }
    if (act === 'tab')         { setTab(a); return; }
    if (act === 'openGame')    { openGame(a); return; }
    if (act === 'pracSelect')  { pracSelect(parseInt(a, 10)); return; }
    if (act === 'switchRole')  { set({ role: a }); return; }
    if (ACTS[act]) ACTS[act]();
  });

  render();
})();
