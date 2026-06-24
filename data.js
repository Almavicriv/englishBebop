/* =====================================================================
   ATC English Trainer — static content data
   (stages, exercises, dictionary terms, role definitions)
   ===================================================================== */
(function () {
  'use strict';

  /**
   * רשימת כל השלבים בסדר ההצגה במסך הבית (מסלול ה"מגדל").
   * id - מזהה השלב (תואם למפתח באובייקט stages למטה; 0 = המבחן המסכם).
   * label - הכותרת המוצגת מתחת לעיגול השלב.
   * final - (אופציונלי) true אם זה השלב המסכם/אחרון (מוצג בעיגול עם ★).
   */
  var metaList = [
    { id: 1, label: 'מספרים ואיות' }, { id: 2, label: 'פקודות בסיסיות' }, { id: 3, label: 'אותות קריאה' },
    { id: 4, label: 'הסעה על הקרקע' }, { id: 5, label: 'המראה' }, { id: 6, label: 'טיסה במרחב' },
    { id: 7, label: 'גישה ונחיתה' }, { id: 8, label: 'מזג אוויר · ATIS' }, { id: 9, label: 'חירום' },
    { id: 10, label: 'שותף אמריקאי' }, { id: 0, label: 'מבחן מסכם', final: true }
  ];

  /**
   * תוכן הלימוד של כל שלב, ממופה לפי מזהה השלב (תואם ל-id ב-metaList).
   * כל שלב מכיל num (מספר השלב), title, sub (כותרת משנה) ומערך exercises.
   *
   * כל תרגיל (exercise) הוא אחד מ-3 סוגים:
   *  - 'mcq'    (רב-בחירה): he, en, opts (מערך [טקסט, 1/0 אם נכון]), tip
   *  - 'dnd'    (גרירה-והשלכה): he, template (משפט עם '__' למשבצות),
   *             bank (מילים זמינות לבחירה), answer (התשובה הנכונה לפי סדר), tip
   *  - 'listen' (האזנה): he, audio (הטקסט להקראה), he2 (התרגום), tip
   *
   * רק שלבים 1–3 ממומשים כרגע (תוכן לדוגמה); שלבים 4–10 ו-0 קיימים
   * רק ב-metaList ויוצגו כ"נעולים"/"בקרוב" עד שיתווסף להם תוכן כאן.
   */
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

  /** הגיית ספרות תעופתית: [ספרה/תו, הגייה תעופתית]. מוצג במסך המילון. */
  var PRON = [['0','ZE-RO'],['1','WUN'],['2','TOO'],['3','TREE'],['4','FOW-ER'],['5','FIFE'],['6','SIX'],['7','SEV-EN'],['8','AIT'],['9','NIN-ER'],['.','DAY-SEE-MAL'],['100','HUN-DRED'],['1000','TOU-SAND']];

  /**
   * סולם "בדיקת קשר" (readability scale) הסטנדרטי בתעופה (1–5):
   * [ציון, ביטוי באנגלית, הסבר בעברית, צבע hex לתצוגה].
   */
  var READ = [['1','Reading you one','אחד מחמש — לא קריא','#E5484D'],['2','Reading you two','שתיים מחמש — קריא לסירוגין','#F2870A'],['3','Reading you tree','שלוש מחמש — קריא בקושי','#E0A800'],['4','Reading you fower','ארבע מחמש — קריא','#5BA35B'],['5','Reading you fife','חמש מחמש — קריא מצוין','#2E9E5B']];

  /**
   * קטגוריות המילון המלא (proc/inst/traffic/wx/emer). כל קטגוריה מכילה
   * id, label (כותרת עברית), ו-items — מערך של [מונח באנגלית, תרגום עברי, הערה/הסבר].
   */
  var CATS = [
    { id: 'proc', label: 'נהלים ובקרת קשר', items: [['Say again','אמור שנית','חזור על השידור האחרון'],['I say again','אומר שנית','חזרה על הוראה חשובה'],['Roger','קיבלתי','המסר התקבל'],['Affirm','חיובי','כן / נכון'],['Negative','שלילי','לא / לא נכון'],['Confirm','אשר','אשר נתון מסוים'],['Verify','ודא','ודא לפני מתן תשובה'],['Readback','חזור על','חזור על תוכן ההוראה'],['Standby','מיד אתך','המתן, אקרא לך'],['Disregard','התעלם','בטל את התשדורת האחרונה'],['Correction','תיקון','תיקון לשידור הקודם'],['How do you read','איך שומע','מהי איכות הקליטה'],['Unable','לא מסוגל','לא ניתן לבצע את הבקשה'],['Break break','הפרדה בין שידורים','בין מטוסים שונים'],['Monitor','האזן','האזן לתחנה ולתדר'],['Contact','עבור ל','עבור לקשר עם תחנה ותדר']] },
    { id: 'inst', label: 'הוראות טיסה', items: [['Climb','טפס','טפס לגובה'],['Descend','הנמך','הנמך לגובה'],['Maintain','שמור','גובה / מהירות / אזור'],['Turn left / right','פנה שמאלה / ימינה','שינוי כיוון'],['Fly heading','טוס בכיוון','שלוש ספרות'],['Expedite','זרז','בצע מהר יותר'],['Orbit','בצע המתנה','מעגל פנייה 360°'],['Line up and wait','התיישר והמתן','עלייה למסלול והמתנה'],['Cleared for take-off','רשאי להמראה','אישור המראה'],['Cleared to land','רשאי לנחות','אישור נחיתה'],['Go around','לך סביב','ביטול נחיתה'],['Touch and go','נגיעה והמראה','תרגול במסלול'],['Hold position','עצור במקום','עצירה בהסעה'],['Hold short','עצור לפני','מסלול / הסעה'],['Taxi','הסע','הסעה על הקרקע'],['Pushback','דחיפה לאחור','דחיפה מהחניה'],['Vacate the runway','פנה את המסלול','פינוי לאחר נחיתה'],['Backtrack','הסעה הפוכה','בכיוון הפוך על המסלול']] },
    { id: 'traffic', label: 'תנועה והפרדה', items: [['Traffic','תנועה','מידע על כלי טיס אחר'],['Radar contact','מגע מכ"ם','המטוס זוהה על התמונה'],['Maintain own separation','שמור הפרדה עצמית','אחריות ההפרדה על הטייס'],['Caution wake turbulence','זהירות מערבולות','מערבולות קצה כנף'],['Opposite traffic','תנועה נגדית','כלי טיס בכיוון מנוגד'],['Crossing traffic','תנועה חוצה','חוצה את הנתיב'],['Give way','תן זכות קדימה','אפשר מעבר'],['Report traffic in sight','דווח בקשר עין','כשהתנועה מזוהה'],['Number two','מספר שתיים','מיקום ברצף הנחיתות'],['Follow','עקוב אחרי','אחר מטוס בהקפה']] },
    { id: 'wx', label: 'מזג אוויר', items: [['Wind calm','רוח קלה','עד שלושה קשרים'],['Gusting','משבים','עוצמת המשב המרבית'],['QNH','לחץ ברומטרי','כיול מד גובה'],['Visibility','ראות','בק"ם / במייל'],['Few','מעט עננות','1–2 שמיניות'],['Scattered','עננות מפוזרת','3–4 שמיניות'],['Broken','עננות שבורה','5–7 שמיניות'],['Overcast','שמים מכוסים','8 שמיניות'],['Ceiling','בסיס ענן','גובה בסיס העננות'],['Top','פסגת ענן','גובה ראש העננות']] },
    { id: 'emer', label: 'חירום', items: [['Mayday Mayday Mayday','מצוקה','חירום הדורש סיוע מיידי'],['Pan-Pan','תקלה','חירום ללא סיוע מיידי'],['Are you declaring an emergency?','מכריז חירום?','בירור חומרת התקלה'],['Barrier','הרם רשת','הפעלת אמצעי עצירה'],['Arresting cable engaged','נתפס בכבל','המטוס נתפס בכבל'],['Emergency services','צוותי הצלה','כיבוי / אמבולנס / חילוץ'],['Gear appears down','כן נסע נראה למטה','דיווח מצב כן נסע'],['Cancelling Mayday','ביטול מצוקה','ביטול קריאת חירום']] }
  ];

  /**
   * פרטי שני התפקידים הניתנים לבחירה (בקר/פקח): שם בעברית/אנגלית,
   * תג תצוגה (badge), צבעי tint/accent, נתיבי תמונה (idle/salute/celebrate),
   * ותיאור התפקיד שמוצג במסך בחירת התפקיד.
   */
  var roleInfo = {
    ctrl: { he: 'בקר', en: 'Flight Controller', badge: 'בקר טיסה', tint: '#EAF2FB', accent: '#2E78C7', idle: './assets/bakarStand.PNG', salute: './assets/bakar.png', celebrate: 'assets/ctrl-hq.png', desc: 'מבקר/ת תעבורה אווירית מהמגדל ובקרת מכ"ם.' },
    insp: { he: 'פקח', en: 'Flight Inspector', badge: 'פקח טיסה', tint: '#E7F4EC', accent: '#1F8A5B', idle: './assets/pakachStand.png', salute: './assets/pakachHand.png', celebrate: 'assets/pilot-thumb-hq.png', desc: 'פקח/ית טיסה — ליווי המראות, נחיתות ותנועה בשדה.' }
  };

  /** הודעות עידוד שמוצגות באקראי כשמשתמש עונה נכון על תרגיל. */
  var POSITIVE = ['מצוין!', 'עפת על זה!', 'אלוף/ה אין עלייך!', 'תקתוק נכון!'];

  /**
   * רשימת המיני-משחקים במרכז התרגול. כל משחק מכיל id (גם משמש
   * לבדיקת openGame), kind (לבחירת אייקון ב-gameIconSVG), שם עברי/אנגלי,
   * צבע accent, גרדיאנט רקע (bg), תג מטא (meta — שיא/חדש/שלב), תיאור,
   * ואחוז התקדמות (prog) להצגה בלבד.
   * הערה: רק 'radio' (מרוץ הקשר) ממומש בפועל כרגע.
   */
  var GAMES = [
    { id: 'memory', kind: 'memory', he: 'זיכרון מונחים', en: 'Memory Match', accent: '#7C5CFC', bg: 'linear-gradient(150deg,#EDE9FF,#DCD3FF)', meta: 'שיא 12', desc: 'התאמת מונחי תעופה למשמעות שלהם', prog: '70%' },
    { id: 'radio', kind: 'radio', he: 'מרוץ הקשר', en: 'Radio Rush', accent: '#2E78C7', bg: 'linear-gradient(150deg,#E2F0FC,#C7E2F8)', meta: 'חדש', desc: 'תגובה מהירה לתשדורות מטייסים', prog: '45%' },
    { id: 'radar', kind: 'radar', he: 'אתגר המכ"ם', en: 'Radar Challenge', accent: '#1F8A5B', bg: 'linear-gradient(150deg,#E2F6EC,#C6ECD7)', meta: 'שלב 3', desc: 'ביצוע הוראות נת"א על מסך מכ"ם', prog: '30%' },
    { id: 'match', kind: 'match', he: 'התאמה מהירה', en: 'Match Madness', accent: '#F2870A', bg: 'linear-gradient(150deg,#FFF0DC,#FFE0BC)', meta: 'שיא 28', desc: 'חבר/י מונחים לתרגום לפני שהזמן נגמר', prog: '55%' }
  ];

  /** שאלת ותשובות מיני-משחק "מרוץ הקשר" (radio): prompt = השאלה, opts = [[טקסט, 1/0 אם נכון], ...]. */
  var RADIO_GAME = {
    prompt: 'Tower, request permission to land runway 26.',
    opts: [['Cleared to land runway 26', 1], ['Maintain current altitude', 0], ['Contact ground frequency', 0], ['Taxi to holding point', 0]]
  };

  /**
   * שבבי הסינון (chips) במסך המילון: [מזהה קטגוריה, תווית עברית].
   * 'all' מציג הכל, 'numbers'/'read' הם בלוקים מיוחדים (לא מ-CATS),
   * השאר תואמים ל-id-ים שבמערך CATS.
   */
  var DICT_CHIPS = [['all', 'הכל'], ['numbers', 'מספרים'], ['proc', 'נהלים'], ['inst', 'הוראות'], ['traffic', 'תנועה'], ['wx', 'מזג אוויר'], ['emer', 'חירום'], ['read', 'בדיקת קשר']];

  // חושף את כל הדאטה כאובייקט גלובלי יחיד (window.ATC_DATA), כדי ש-app.js
  // יוכל לקרוא אותו אחרי שקובץ זה נטען (data.js נטען לפני app.js ב-index.html).
  window.ATC_DATA = {
    metaList: metaList, stages: stages, PRON: PRON, READ: READ, CATS: CATS,
    roleInfo: roleInfo, POSITIVE: POSITIVE, GAMES: GAMES, RADIO_GAME: RADIO_GAME, DICT_CHIPS: DICT_CHIPS
  };
})();
