/* =====================================================================
   ATC English Trainer  -  Static content data (role-aware)
   שני מסלולי תוכן נפרדים:
     ctrl  = בקר/ית טיסה  (Flight Controller - מגדל/הקפה + בקרת מכ"ם/מרחב)
     insp  = פקח/ית טיסה  (Flight Inspector  - פיקוח שדה/גישה בלבד, ללא בקרת מרחב)
   ===================================================================== */
(function () {
  'use strict';

  /* ===================================================================
     מסלול בקר/ית (Flight Controller)
     =================================================================== */
  var metaListCtrl = [
    { id: 1,  label: 'מספרים, איות וקריאות קשר' },
    { id: 2,  label: 'מילון ביטויים - פקודות ובקרה' },
    { id: 3,  label: 'אותות קריאה ופתיחת קשר' },
    { id: 4,  label: 'הסעה על הקרקע' },
    { id: 5,  label: 'המראה וכניסה לאזור' },
    { id: 6,  label: 'טיסה במרחב - תנועה ומהירות' },
    { id: 7,  label: 'ניווט, המתנה וגובה נמוך' },
    { id: 8,  label: 'גישה ונחיתה' },
    { id: 9,  label: 'מזג אוויר - שדה ומרחב' },
    { id: 10,  label: 'חציית גבול (MFO)' },
    { id: 11,  label: 'חירום - מבנה הודעות' },
    { id: 12,  label: 'תרחישי חירום מבצעיים' },
    { id: 13,  label: 'שותף אמריקאי' },
    { id: 14,  label: 'יירוט וסקירה מתקדמת' },
    { id: 0,  label: 'מבחן מסכם', final: true }
  ];

  var stagesCtrl = {

    1: { num: 1, title: 'מספרים, איות וקריאות קשר', sub: 'הבסיס לכל תקשורת רדיו - כולל קריאות קשר מתקדמות במרחב', exercises: [
      { type: 'mcq', he: 'כיצד הוגים את הספרה 9 בקשר תעופתי?', en: 'How do you pronounce the number 9 in aviation radio communications?', opts: [['Nine', 0], ['NIN-ER', 1], ['Niner-niner', 0], ['No-vember', 0]], tip: 'בתקשורת תעופתית 9 = NIN-ER, כדי למנוע בלבול עם המילה "no" בסביבה רועשת.' },
      { type: 'mcq', he: 'כיצד נקרא את התדר 129.25?', en: 'How do you read the frequency 129.25?', opts: [['One two nine two five', 0], ['One twenty nine decimal two five', 0], ['One two niner decimal two fife', 1], ['One hundred twenty nine', 0]], tip: 'כל ספרה בנפרד · עשרוני = decimal · 5 = fife · 9 = niner.' },
      { type: 'mcq', he: 'מהי ההגייה הנכונה לגובה 1,500 רגל?', en: 'What is the correct pronunciation of altitude 1,500 feet?', opts: [['Fifteen hundred feet', 0], ['One fife zero zero feet', 0], ['One tousand fife hundred feet', 1], ['One five zero zero feet', 0]], tip: 'אלפים: "one tousand" · מאות: "fife hundred".' },
      { type: 'mcq', he: 'כיצד משדרים את השעה 15:30?', en: 'Time 15:30 - how is it transmitted?', opts: [['Fifteen thirty', 0], ['One fife tree zero local time', 1], ['1530 hours', 0], ['Fife-teen tree-zero', 0]], tip: 'זמן = ארבע ספרות, local time / UTC.' },
      { type: 'dnd', he: 'הרכב/י את התדר 129.2 בתשדורת', template: 'Contact HAGAV __ decimal __', bank: ['one niner two', 'fife', 'one two niner', 'two'], answer: ['one two niner', 'two'], tip: 'תדר 129.2 - כל ספרה בנפרד, "decimal" להפרדת העשרוני.' },
      { type: 'dnd', he: 'הרכב/י דיווח רוח: כיוון 210, עוצמה 13 קשר', template: 'Wind __ degrees __ knots', bank: ['two one zero', 'one tree', 'fife zero', 'zero'], answer: ['two one zero', 'one tree'], tip: 'כיוון = 3 ספרות בנפרד · עוצמה = בקשרים.' },
      { type: 'listen', he: 'האזן/י והשלם/י: לחץ ברומטרי', audio: 'QNH one zero one two', he2: 'לחץ ברומטרי - אחת, אפס, אחת, שתיים', template: 'QNH one __ one __', bank: ['zero', 'two', 'niner', 'fife'], answer: ['zero', 'two'], tip: 'QNH = לחץ ברומטרי לכיול מד הגובה.' },
      { type: 'listen', he: 'האזן/י והשלם/י: גובה טיסה', audio: 'One niner tousand feet', he2: '19,000 רגל', template: '__ niner __ feet', bank: ['One', 'Two', 'tousand', 'hundred'], answer: ['One', 'tousand'], tip: 'niner = 9 · tousand = thousand (הגייה סטנדרטית).' },
      { type: 'dnd', he: 'הרכב/י: משדרים תדר 118.3 לפי ICAO', template: 'One one eight __ tree', bank: ['decimal', 'point', 'comma', 'dash'], answer: ['decimal'], tip: 'המילה decimal מפרידה בין החלק השלם לחלק העשרוני של התדר.' },
      { type: 'dnd', he: 'הרכב/י: אישור קליטה מושלמת', template: 'Reading you __', bank: ['fife', 'tree', 'one', 'two'], answer: ['fife'], tip: 'סולם קליטה 1 (גרוע) עד 5 (מצוין) - fife = חמש, קליטה מושלמת.' },
      { type: 'mcq', he: 'כיצד הוגים את הספרה 9 בפרזיולוגיה תעופתית?', en: 'How do you pronounce the number 9 in aviation phraseology?', opts: [['Nine', 0], ['Niner', 1], ['No-ver', 0], ['Ninth', 0]], tip: 'ה"ר" הנוספת ב-Niner מונעת בלבול עם המילה "no" בקשר רועש.' },
      { type: 'mcq', he: 'איזו מילה מייצגת את האות J באיות הפונטי?', en: 'Which word represents the letter J in the phonetic alphabet?', opts: [['Jaguar', 0], ['Juliet', 1], ['Jupiter', 0], ['Jet', 0]], tip: 'אין הגיון סמנטי בבחירת המילים - יש לשנן את הרשימה המלאה של הא"ב הפונטי.' },
      { type: 'mcq', he: 'כיצד משודר גובה של 15,000 רגל?', en: 'How is an altitude of 15,000 feet transmitted?', opts: [['Fifteen thousand feet', 0], ['One fife tousand feet', 1], ['One five zero zero zero', 0], ['Fifteen tousand', 0]], tip: 'כל ספרה בנפרד: ONE FIFE TOUSAND FEET.' },
      { type: 'listen', he: 'האזן/י והשלם/י: בדיקת קשר', audio: 'CGC, reading you tree', he2: 'סי-ג\'י-סי, קולט אותך שלוש', template: '__, reading you __', bank: ['CGC', 'BJL', 'tree', 'fife'], answer: ['CGC', 'tree'], tip: 'תשובת בדיקת קשר תמיד כוללת חזרה על אות הקריאה + reading you + מספר דירוג.' },
      { type: 'listen', he: 'האזן/י והשלם/י: בקשה חוזרת לאות קריאה', audio: 'Station calling Pluto, say again call sign?', he2: 'תחנה הקוראת לפלוטו, אמור שנית את אות הקריאה?', template: 'Station calling Pluto, __ call sign?', bank: ['say again', 'confirm', 'report', 'repeat'], answer: ['say again'], tip: 'הבקר מבקש חזרה על אות הקריאה בלבד, לא על כל השידור.' }
    ]},

    2: { num: 2, title: 'מילון ביטויים - פקודות ובקרה', sub: 'המונחים הסטנדרטיים - בסיס ובקרת מרחב', exercises: [
      { type: 'mcq', he: 'טייס אומר "say again" - מה המשמעות?', en: 'A pilot says "say again" - what does it mean?', opts: [['The pilot is done transmitting', 0], ['Repeat your last transmission', 1], ['I did not understand', 0], ['Stand by', 0]], tip: '"Say again" = חזור על השידור האחרון. לא "repeat".' },
      { type: 'mcq', he: 'מה ההבדל בין "Affirm" ל-"Roger"?', en: 'What is the difference between "Affirm" and "Roger"?', opts: [['No difference, both mean yes', 0], ['Affirm = yes (fact). Roger = message received', 1], ['Roger = yes. Affirm = I will comply', 0], ['Both mean message received', 0]], tip: 'Affirm = חיובי/נכון · Roger = קיבלתי את המסר.' },
      { type: 'mcq', he: 'הפקח אמר "stand-by" - מה על הטייס לעשות?', en: 'The controller says "stand-by" - what should the pilot do?', opts: [['Land immediately', 0], ['Wait, the controller will call back', 1], ['Switch frequency', 0], ['Report position', 0]], tip: 'Stand-by = מיד אתך / חכה ואני אקרא לך.' },
      { type: 'mcq', he: 'איזו מילה משמעה "בטל את התשדורת האחרונה"?', en: 'Which word means "cancel the last transmission"?', opts: [['Negative', 0], ['Cancel', 0], ['Disregard', 1], ['Unable', 0]], tip: 'Disregard = התעלם / בטל את התשדורת האחרונה.' },
      { type: 'mcq', he: 'כיצד אומרים "אינני מסוגל לבצע"?', en: 'How do you say "I cannot comply" in standard phraseology?', opts: [['Negative', 0], ['Unable', 1], ['Denied', 0], ['Cancel', 0]], tip: 'Unable = לא מסוגל · Negative = שלילי/לא נכון.' },
      { type: 'dnd', he: 'הרכב/י: "מסור את הודעתך, רוח קלה"', template: '__ , wind __', bank: ['Pass your message', 'calm', 'Say again', 'gusts'], answer: ['Pass your message', 'calm'], tip: 'Pass your message = שדר · wind calm = רוח קלה.' },
      { type: 'listen', he: 'האזן/י והשלם/י: הוראת זירוז', audio: 'Expedite climb to altitude six tousand feet', he2: 'זרז טיפוס לגובה 6,000 רגל', template: 'Expedite __ to altitude __ tousand feet', bank: ['climb', 'descend', 'six', 'fife'], answer: ['climb', 'six'], tip: 'Expedite = זרז - ביצוע מהיר יותר.' },
      { type: 'listen', he: 'האזן/י והשלם/י: ביטול המראה', audio: 'I say again, cancel takeoff', he2: 'אני חוזר: בטל המראה', template: 'I say again, __ __', bank: ['cancel', 'hold', 'takeoff', 'landing'], answer: ['cancel', 'takeoff'], tip: '"I say again" = הדגשה חוזרת של הוראה קריטית.' },
      { type: 'dnd', he: 'הרכב/י: בקשה לחזור על אות הקריאה בלבד', template: 'Say again __', bank: ['call sign', 'position', 'altitude', 'frequency'], answer: ['call sign'], tip: 'Say again משמש גם לבקשת חזרה על פרט ספציפי, לא רק על השידור כולו.' },
      { type: 'dnd', he: 'הרכב/י: הוראת פנייה של 360 מעלות להמתנה', template: 'Perform __', bank: ['orbit', 'holding', 'approach', 'landing'], answer: ['orbit'], tip: 'Orbit = פנייה מלאה של 360° ליצירת מרווח.' },
      { type: 'dnd', he: 'הרכב/י: בקשה להאזין לתדר מבלי לשדר', template: '__ this frequency', bank: ['Monitor', 'Contact', 'Squawk', 'Report'], answer: ['Monitor'], tip: 'Monitor = האזן בלבד, ללא שידור - בניגוד ל-Contact שמחייב יצירת קשר פעיל.' },
      { type: 'mcq', he: 'מה משמעות "Resume own navigation"?', en: 'What does "Resume own navigation" mean?', opts: [['חזרה לניווט עצמאי במקום וקטורים מהבקרה', 1], ['החלפת מערכת ניווט', 0], ['עצירת ניווט לחלוטין', 0], ['מעבר למערכת ניווט גיבוי', 0]], tip: 'המונח מציין העברת אחריות הניווט בחזרה לטייס.' },
      { type: 'mcq', he: '"Established on radial 210" פירושו:', en: 'What does "Established on radial 210" mean?', opts: [['המטוס עוקב אחר רדיאל 210 מ-VOR', 1], ['כיוון הטיסה הוא 210', 0], ['המטוס נמצא 210 מייל מהיעד', 0], ['כיוון הרוח הוא 210', 0]], tip: 'רדיאל הוא קו דמיוני היוצא מתחנת VOR במעלות מגנטיות.' },
      { type: 'mcq', he: 'מהי ההוראה הנכונה לזיהוי מטוס באמצעות תמרון?', en: 'What is the correct instruction to identify an aircraft by maneuver?', opts: [['"For identification, turn right heading 250"', 1], ['"Squawk ident"', 0], ['"Report your position"', 0], ['"Confirm altitude"', 0]], tip: 'בשונה מ-Squawk Ident (זיהוי אלקטרוני) - כאן הזיהוי נעשה במכ"ם דרך פניית תמרון.' },
      { type: 'listen', he: 'האזן/י והשלם/י: אישור גישת RNAV', audio: 'Bauzer, cleared for the RNAV approach HULA, report ground in sight', he2: 'באוזר, רשאי לגישת RNAV הולה, דווח קשר עין עם הקרקע', template: 'Cleared for the __ approach HULA, report __ in sight', bank: ['RNAV', 'ILS', 'ground', 'runway'], answer: ['RNAV', 'ground'], tip: 'מבנה אישור גישה: סוג גישה + שם הנוהל + תנאי לדיווח.' },
      { type: 'listen', he: 'האזן/י והשלם/י: כניסה לאזור עם הגבלת גובה', audio: 'Gizmo, enter area fife zero tree north, maximum altitude two tousand tree hundred feet', he2: 'גיזמו, היכנס לאזור 503 צפון, גובה מרבי 2300 רגל', template: 'Enter area __, maximum altitude __', bank: ['fife zero tree north', 'eight one north', 'two tousand tree hundred feet', 'one two tousand feet'], answer: ['fife zero tree north', 'two tousand tree hundred feet'], tip: 'הגבלת גובה מרבי חשובה לא פחות מהגדרת גבולות האזור עצמו.' }
    ]},

    3: { num: 3, title: 'אותות קריאה ופתיחת קשר', sub: 'כיצד פותחים קשר ואותות קריאה', exercises: [
      { type: 'mcq', he: 'טייס פותח: "נגב גראונד שלום" - מהי התגובה הנכונה?', en: 'A pilot calls: "NEGEV GROUND shalom" - what is the correct ATC response?', opts: [['NEGEV GROUND go ahead', 0], ['India Alpha Fox two fife fife NEGEV GROUND shalom, stand-by', 1], ['Affirm, go ahead', 0], ['NEGEV GROUND, what is your request?', 0]], tip: 'תשובה = אות קריאה + שם תחנה + שלום + הוראה.' },
      { type: 'mcq', he: 'מהו שם השירות "מגדל" בבסיס כדם?', en: 'What is the call sign for "Tower" at Kedem base?', opts: [['Kedem Control', 0], ['Kedem Tower', 1], ['Kedem Approach', 0], ['Kedem Ground', 0]], tip: 'Tower = מגדל/הקפה · Ground = קרקע · Approach = גישה.' },
      { type: 'mcq', he: 'כיצד משדרים את שם היחידה "גמל" בקשר?', en: 'The unit "גמל" - how is it transmitted in English?', opts: [['Camel', 0], ['Gamal', 1], ['G-A-M-A-L', 0], ['Gimel', 0]], tip: 'אותות קריאה עבריים מושמעים כהגייה עברית, לא מתורגמים.' },
      { type: 'dnd', he: 'הרכב/י פתיחת קשר עם נגב גראונד', template: '__ GROUND shalom, India Alpha Fox two fife fife, request ATC clearance to __', bank: ['KEDEM', 'NEGEV', 'Lima Charlie Papa Hotel', 'Tel Aviv', 'Tower'], answer: ['NEGEV', 'Lima Charlie Papa Hotel'], tip: 'מבנה: שם שדה + שם שירות + שלום + אות קריאה + בקשה + יעד.' },
      { type: 'listen', he: 'האזן/י והשלם/י: פתיחת קשר מהמגדל', audio: 'Master, KEDEM Tower', he2: 'קוראים: מאסטר - מגדל כדם', template: '__, __ Tower', bank: ['Master', 'Roger', 'KEDEM', 'NEGEV'], answer: ['Master', 'KEDEM'], tip: 'ATC פותח קשר = שם הטייס/אות קריאה + שם התחנה.' }
    ]},

    4: { num: 4, title: 'הסעה על הקרקע', sub: 'taxi, line-up, crossing, ground movements', exercises: [
      { type: 'mcq', he: 'מה עושה הטייס: "Emek one cross runway tree tree left via Mike"?', en: 'ATC: "Emek one cross runway tree tree left via Mike" - what does the pilot do?', opts: [['Enter the runway and hold', 0], ['Cross runway 33 left, using taxiway Mike', 1], ['Backtrack runway 33', 0], ['Hold short of Mike', 0]], tip: 'Cross = חצה · runway tree tree = מסלול 33 · via Mike = דרך מסלול הסעה מיקי.' },
      { type: 'mcq', he: 'מה פירוש "hold short of Alpha"?', en: 'What does "hold short of Alpha" mean?', opts: [['Stop at Alpha and wait for further instructions', 1], ['Cross Alpha quickly', 0], ['Turn onto Alpha taxiway', 0], ['Back-track to Alpha', 0]], tip: 'Hold short = עצור ולא תחצה - לפני הצומת/מסלול.' },
      { type: 'mcq', he: 'מה הסיבה לעצירה: "hold short due pair of F-thirty fife crossing"?', en: 'ATC: "hold short due pair of F-thirty fife crossing" - what is the reason?', opts: [['Runway under maintenance', 0], ['Two F-35s are crossing from left to right', 1], ['Pilot requested holding', 0], ['Runway wet', 0]], tip: 'Due to = בגלל · pair of = זוג · crossing from left to right = חוצים משמאל לימין.' },
      { type: 'dnd', he: 'הרכב/י אישור הסעה לאקרב אחד', template: 'Akrav one __ runway two tree, __ from shelter one six to Alpha', bank: ['expect', 'taxi', 'cross', 'hold', 'report'], answer: ['expect', 'taxi'], tip: 'ATC clearance לפני ההסעה: expect runway + taxi from [נקודה] to [נקודה].' },
      { type: 'listen', he: 'האזן/י והשלם/י: ריצת חזרה', audio: 'Backtrack runway tree tree, turn left taxi runway zero niner, vacate via Yankee', he2: 'בצע ריצת חזרה על מסלול 33, פנה שמאלה למסלול 09, פנה דרך יאנקי', template: '__ runway tree tree, turn __ taxi runway zero niner, vacate via __', bank: ['Backtrack', 'Enter', 'left', 'right', 'Yankee', 'Alpha'], answer: ['Backtrack', 'left', 'Yankee'], tip: 'Backtrack = ריצת חזרה · vacate = פנה את המסלול.' }
    ]},

    5: { num: 5, title: 'המראה וכניסה לאזור', sub: 'line-up, take-off clearance ועד כניסה לאזור אימונים (SID, Alpha Check)', exercises: [
      { type: 'mcq', he: 'מהו ה-readback הנכון לאישור המראה מסלול 29 ימין?', en: 'What is the correct readback for "cleared for take-off runway two niner right"?', opts: [['Cleared take-off, wilco', 0], ['Runway two niner right cleared for take-off, callsign', 1], ['Roger, departing now', 0], ['Affirm, runway two niner', 0]], tip: 'Readback חובה: מסלול + cleared for take-off + אות קריאה.' },
      { type: 'mcq', he: 'מה הסיבה לביטול: "cancel takeoff, vehicle on runway"?', en: 'ATC: "Hold position, cancel takeoff, vehicle on runway" - why?', opts: [['Traffic on final approach', 0], ['A vehicle is on the runway', 1], ['Wind changed direction', 0], ['Another aircraft is lined up', 0]], tip: 'Vehicle on runway = כלי רכב על המסלול - עצור מיד!' },
      { type: 'mcq', he: 'מה פירוש "line up and wait"?', en: 'What does "line up and wait" mean?', opts: [['Enter runway and depart immediately', 0], ['Enter runway, align with centerline and wait for takeoff clearance', 1], ['Taxi to hold short point', 0], ['Backtrack runway', 0]], tip: 'Line up and wait = התיישר על המסלול והמתן - לא מורשה להמריא עדיין.' },
      { type: 'dnd', he: 'הרכב/י הוראת התיישרות של מגדל', template: '__ line up runway zero fife, wind __ degrees __ knots, SID Qirya one', bank: ['Arayot', 'zero fower zero', 'one zero', 'tree tree zero', 'fifer'], answer: ['Arayot', 'zero fower zero', 'one zero'], tip: 'מבנה הוראת התיישרות: אות קריאה + line up + מסלול + רוח + SID.' },
      { type: 'listen', he: 'האזן/י והשלם/י: אישור המראה', audio: 'SID PALMH one, runway two niner right cleared for take-off, Akrav', he2: 'מסלול התנעה PALMH אחד, מסלול 29 ימין - מורשה להמראה, אקרב', template: 'SID __ one, runway two niner right __ for take-off, Akrav', bank: ['PALMH', 'MEZADA', 'cleared', 'lined up'], answer: ['PALMH', 'cleared'], tip: 'SID = Standard Instrument Departure.' },
      { type: 'dnd', he: 'הרכב/י: אישור טיפוס ברצף ל-SID RAMA', template: 'SID RAMA, climb __ to altitude tree niner tousand feet', bank: ['unrestricted', 'directly', 'immediately', 'normally'], answer: ['unrestricted'], tip: 'Unrestricted = ללא צורך בעצירת ביניים בדרך לגובה הסופי.' },
      { type: 'dnd', he: 'הרכב/י: הצלבת מיקום בין הטייס לבקר', template: 'Position cross-check between pilot and controller is called: __ check', bank: ['Alpha', 'Bravo', 'Radar', 'Position'], answer: ['Alpha'], tip: 'Alpha Check הוא מונח ישראלי ולא מופיע בפרזיולוגיית ICAO הסטנדרטית.' },
      { type: 'dnd', he: 'הרכב/י: דיווח חציית גובה', template: 'Report __ altitude two zero tousand feet', bank: ['passing', 'reaching', 'crossing', 'leaving'], answer: ['passing'], tip: 'Passing מציין רגע חציית הגובה, בניגוד ל-Reaching שמציין הגעה למטרה.' },
      { type: 'mcq', he: 'מהי מטרת ה-Alpha Check?', en: 'What is the purpose of an Alpha Check?', opts: [['בדיקת כמות דלק', 0], ['הצלבה בין מיקום המטוס בפועל לנקודת ייחוס מוגדרת מראש', 1], ['בדיקת תדר קשר', 0], ['בדיקת מזג אוויר', 0]], tip: 'המטרה היא לוודא סנכרון בין מה שהבקר רואה במכ"ם למיקום בפועל.' },
      { type: 'mcq', he: 'כיצד מזוהה הרכבה (formation) בקשר?', en: 'How is a formation identified over the radio?', opts: [['כל מטוס בנפרד עם אות קריאה משלו', 0], ['לפי סוג המטוס בלבד', 0], ['אות קריאה אחד לכל ההרכבה (למשל "Google three ship formation")', 1], ['לפי מספר אקראי', 0]], tip: 'כך נחסך זמן קשר יקר כשמדובר בכמה כלי טיס יחד.' },
      { type: 'mcq', he: '"Climb unrestricted to altitude X" משמעו:', en: 'What does "Climb unrestricted to altitude X" mean?', opts: [['לטפס ל-X ברצף, ללא דרישת עצירת ביניים', 1], ['לטפס במהירות מרבית בלבד', 0], ['לטפס ללא קשר רדיו', 0], ['לטפס עד מתחת ל-X בלבד', 0]], tip: 'לרוב משמש בטיפוס ממושך דרך מספר שכבות גובה.' },
      { type: 'listen', he: 'האזן/י והשלם/י: דיווח מיקום ב-Alpha Check', audio: 'Bauzer, IAF at zero two zero degrees, six miles', he2: 'באוזר, אי-איי-אף בכיוון 020 מעלות, שישה מייל', template: '__ at __ degrees, __ miles', bank: ['IAF', 'Traffic', 'zero two zero', 'six'], answer: ['IAF', 'zero two zero', 'six'], tip: 'מיקום התייחסות (IAF) משודר במעלות ומרחק, ממש כמו מיקום מטרה במכ"ם.' },
      { type: 'listen', he: 'האזן/י והשלם/י: אזהרת בלון באוויר', audio: 'Google after passing RAMA, descend to altitude six tousand feet Dimona. Be advised, balloon is in the air', he2: 'גוגל, לאחר מעבר ראמה, רד ל-6,000 רגל דימונה. לידיעתך, בלון באוויר', template: 'Be advised, __ is in the air', bank: ['balloon', 'glider', 'UAV', 'helicopter'], answer: ['balloon'], tip: 'אזהרות על עצמים לא-ממונעים (בלונים, עפיפונים) חשובות לא פחות מתנועה ממונעת.' }
    ]},

    6: { num: 6, title: 'טיסה במרחב - תנועה ומהירות', sub: 'enroute, airspace, traffic advisories, speed control', exercises: [
      { type: 'mcq', he: 'מה פירוש דיווח הטייס: "Looking out, Gamal"?', en: 'Pilot: "Looking out, Gamal" - what does this mean?', opts: [['I have landed at Gamal', 0], ['I am searching visually for the reported traffic', 1], ['My callsign is Gamal and I cannot see', 0], ['I am switching to visual flight', 0]], tip: 'Looking out = מחפש ראייתית את התנועה שדווחה.' },
      { type: 'mcq', he: 'איפה נמצאת התנועה: "two o\'clock, tree miles, merging from right"?', en: 'ATC: "Traffic, two o\'clock, tree miles, merging from right at two tousand feet" - where?', opts: [['At 9 o\'clock, 3 miles', 0], ['At 2 o\'clock, 3 miles, converging from the right', 1], ['Directly ahead at 2,000 ft', 0], ['Behind and below', 0]], tip: 'שעה = כיוון יחסי · merging from right = מתקרב מצד ימין.' },
      { type: 'mcq', he: 'מה פירוש "squawk fife one fife two and IDENT"?', en: 'What does "squawk fife one fife two and IDENT" mean?', opts: [['Switch to frequency 5152', 0], ['Set transponder code 5152 and press IDENT button', 1], ['Report position 5152', 0], ['Climb to 5,152 feet', 0]], tip: 'Squawk = הגדר קוד תוכי · IDENT = לחץ כפתור זיהוי.' },
      { type: 'dnd', he: 'הרכב/י תגובה כשרואים את התנועה', template: 'Gamal, __ traffic in sight, Gamal', bank: ['looking out', 'traffic in sight', 'contact made', 'visual'], answer: ['traffic in sight'], tip: 'לאחר "looking out" - כשרואים: "traffic in sight".' },
      { type: 'dnd', he: 'הרכב/י הוראת גובה ותוכי במרחב', template: 'Climb to altitude __ tousand feet, __ NAT, squawk __ and IDENT', bank: ['fower', 'six', 'VOR', 'ILS', 'fife zero six fife', 'one two three four'], answer: ['fower', 'VOR', 'fife zero six fife'], tip: 'מרשה IFR במרחב: גובה + VOR + קוד תוכי.' },
      { type: 'listen', he: 'האזן/י והשלם/י: תשדורת CVFR', audio: 'QNH two niner niner fife, fly on CVFR route, report over Beit Kama', he2: 'לחץ 2995, טוס ב-CVFR, דווח מעל בית קמה', template: 'QNH two niner niner __, fly on __ route, report over __', bank: ['fife', 'zero', 'CVFR', 'IFR', 'Beit Kama', 'Hazor'], answer: ['fife', 'CVFR', 'Beit Kama'], tip: 'CVFR = Controlled VFR · report over = דווח כשתגיע מעל.' },
      { type: 'dnd', he: 'הרכב/י: צמצום מרווח ברצף', template: 'Reduce to __ speed', bank: ['minimum clean', 'maximum', 'normal', 'minimum approach'], answer: ['minimum clean'], tip: 'Minimum clean = המהירות האיטית ביותר ללא הארכת מדפים/גרר.' },
      { type: 'dnd', he: 'הרכב/י: ביטול הגבלת מהירות קודמת', template: '__, resume normal speed', bank: ['Disregard', 'Confirm', 'Maintain', 'Expedite'], answer: ['Disregard'], tip: 'Disregard מבטל את ההוראה הקודמת באופן מפורש לפני מתן ההוראה החדשה.' },
      { type: 'dnd', he: 'הרכב/י (מהתשדורת): ציון סוג כלי טיס בהתראת תנועה', template: 'Opposite traffic at altitude one fife tousand feet, a __', bank: ['B707', 'F-16', 'C130', 'Cessna'], answer: ['B707'], tip: 'סוג כלי הטיס מסייע לטייס להעריך את גודל וקצב ההתקרבות של התנועה.' },
      { type: 'mcq', he: 'מהי התגובה הנכונה כשהתנועה מזוהה ויזואלית?', en: 'What is the correct response when traffic is visually identified?', opts: [['Radar contact', 0], ['Traffic in sight', 1], ['Looking out', 0], ['Confirmed', 0]], tip: 'Traffic in sight מגיע מהטייס; Radar contact ניתן ע"י הבקר.' },
      { type: 'mcq', he: 'מה פירוש Converging traffic?', en: 'What does "Converging traffic" mean?', opts: [['תנועה באותו כיוון', 0], ['תנועה שנתיבה יחצה/ייפגש עם נתיבך', 1], ['תנועה מאחוריך', 0], ['תנועה מתחתיך', 0]], tip: 'בניגוד ל-Opposite (מנוגד) ו-Parallel (מקביל) - Converging מתאר נתיבים שנפגשים.' },
      { type: 'mcq', he: 'איזה מונח מתאר תנועה העוקפת מאחור?', en: 'Which term describes traffic overtaking from behind?', opts: [['Opposite traffic', 0], ['Parallel traffic', 0], ['Overtaking traffic', 1], ['Crossing traffic', 0]], tip: 'תנועה עוקפת נעה באותו כיוון אך מהר יותר ממך.' },
      { type: 'listen', he: 'האזן/י והשלם/י: התראת תנועה מלאה', audio: 'DBR, traffic Cessna 152, twelve o\'clock tree miles, same direction, report traffic in sight', he2: 'די-בי-אר, תנועה סזנה 152, שעה 12, שלושה מייל, אותו כיוון, דווח קשר עין', template: 'Traffic __, __ o\'clock __ miles, __ direction', bank: ['Cessna 152', 'twelve', 'tree', 'same'], answer: ['Cessna 152', 'twelve', 'tree', 'same'], tip: 'מבנה מלא של התראת תנועה: סוג כלי טיס + שעון + מרחק + כיוון.' },
      { type: 'listen', he: 'האזן/י והשלם/י: תנועה חוצה', audio: 'Crossing traffic, C130 at alt tree tousand feet from left to right', he2: 'תנועה חוצה, סי-130 בגובה 3,000 רגל משמאל לימין', template: 'Crossing traffic, C130 at alt tree tousand feet from __ to __', bank: ['left', 'right', 'east', 'west'], answer: ['left', 'right'], tip: 'כיוון החצייה (משמאל לימין וכו׳) קריטי להערכת הסיכון.' }
    ]},

    7: { num: 7, title: 'ניווט, המתנה וגובה נמוך', sub: 'Navigation, Holding & Low-Level Operations', exercises: [
      { type: 'dnd', he: 'הרכב/י: הוראת המתנה', template: 'Join __ at STRTO as published', bank: ['holding', 'position', 'area', 'pattern'], answer: ['holding'], tip: 'Holding = המתנה במסלול טיסה מוגדר מראש, בדרך כלל בצורת מסלול מרוץ סוסים.' },
      { type: 'dnd', he: 'הרכב/י: אישור לטיסת ניווט בגובה נמוך', template: 'Cleared for __ navigation', bank: ['low altitude', 'high altitude', 'visual', 'instrument'], answer: ['low altitude'], tip: 'טיסה בגובה נמוך דורשת אישור נפרד ומוגבל לאזורים מיועדים בלבד.' },
      { type: 'dnd', he: 'הרכב/י: הצטרפות מעל נקודה', template: 'Expect further descent after crossing QIRYA to join HAZOR __', bank: ['overhead', 'downwind', 'base', 'final'], answer: ['overhead'], tip: 'Overhead = מעל התחנה/שדה עצמו, בניגוד ל-Downwind/Base שהם צלעות בהקפה.' },
      { type: 'mcq', he: 'מה על הטייס לעשות לאחר "cleared for low altitude navigation, maintain east of the cliffs"?', en: 'What must the pilot do after "cleared for low altitude navigation, maintain east of the cliffs"?', opts: [['לטוס מערבית לצוקים', 0], ['להישאר מזרחית לצוקים כפי שנדרש', 1], ['לטפס מיידית', 0], ['לנחות מיידית', 0]], tip: 'הפרת גבול צד (מזרח/מערב) עלולה להכניס לאזור אימון פעיל אחר.' },
      { type: 'mcq', he: 'אם אושרה גישת RNAV אך לא נוצר קשר עין עם הקרקע, על הטייס לדווח:', en: 'If cleared for an RNAV approach but unable to establish ground contact, the pilot should report:', opts: [['"Runway in sight"', 0], ['"Going around, negative contact with ground"', 1], ['"Landing"', 0], ['"Standby"', 0]], tip: 'חובה לדווח מפורשות על אי-יצירת קשר עין לפני החלטת המשך.' },
      { type: 'mcq', he: '"Maintain west of Road niner zero, descend to altitude zero above mean sea level" משמעו:', en: 'What does "Maintain west of Road niner zero, descend to altitude zero above mean sea level" mean?', opts: [['להנמיך לגובה פני הים תוך הישארות מערבית לכביש 90', 1], ['לטפס ל-90 רגל', 0], ['לפנות לכיוון 090', 0], ['להמתין מעל כביש 90', 0]], tip: 'Mean sea level (פני הים) הוא גובה ייחוס אבסולוטי, לא גובה מעל הקרקע (AGL).' },
      { type: 'listen', he: 'האזן/י והשלם/י: אישור ניווט נמוך עם אזור מסוקים', audio: 'General, cleared for low altitude navigation, maintain east of the cliffs. Be advised, helicopter training area west of the cliffs active', he2: 'ג\'נרל, רשאי לניווט בגובה נמוך, שמור מזרחית לצוקים. לידיעתך, אזור אימון מסוקים מערבית לצוקים פעיל', template: 'Cleared for __ navigation, maintain __ of the cliffs. Be advised, __ training area __ of the cliffs active', bank: ['low altitude', 'east', 'helicopter', 'west'], answer: ['low altitude', 'east', 'helicopter', 'west'], tip: 'אזורי אימון סמוכים (מסוקים/גובה נמוך) מחייבים תיאום כיווני ברור.' },
      { type: 'listen', he: 'האזן/י והשלם/י: המתנה לפני גישת ILS', audio: 'Benny, Shanun, join holding at STRTO as published, maintain altitude fife tousand feet, advise ready to perform ILS approach', he2: 'בני, שנון, הצטרף להמתנה בסטרטו כמפורסם, שמור גובה 5,000 רגל, הודע מוכן לגישת ILS', template: 'Join __ at STRTO as published, maintain altitude __ feet, advise ready to perform __ approach', bank: ['holding', 'fife tousand', 'ILS', 'RNAV'], answer: ['holding', 'fife tousand', 'ILS'], tip: 'המתנה לפני גישה משמשת לוויסות רצף כניסה כשיש עומס תנועה.' }
    ]},

    8: { num: 8, title: 'גישה ונחיתה', sub: 'approach, circuit, landing clearance, go-around', exercises: [
      { type: 'mcq', he: 'מה פירוש "number two, follow F-sixteen on final"?', en: 'What does "number two, follow F-sixteen on final" mean?', opts: [['You are the first to land after the F-16', 0], ['You are second in sequence, follow the F-16 on final approach', 1], ['Follow the F-16 to the runway threshold', 0], ['Report when F-16 lands', 0]], tip: 'Number two = שני בתור · follow = עקוב · on final = בגישה אחרונה.' },
      { type: 'mcq', he: 'מה תגובת הפקח כשיש ספק לגבי הגלגלים?', en: 'ATC response when unsure about "Gear down and locked"?', opts: [['Roger, cleared to land', 0], ['Verify gear down and locked, report again', 1], ['Gear check completed', 0], ['Confirm gear position', 0]], tip: 'כשיש ספק בגלגלים - ATC מבקש לדווח פעם נוספת.' },
      { type: 'mcq', he: 'מה עושה הטייס: "Go around, climb tree tousand feet downwind"?', en: 'ATC: "Go around due to vehicle on the runway, climb tree tousand feet downwind" - what to do?', opts: [['Land on alternate runway', 0], ['Execute go-around, climb to 3,000 ft, enter downwind', 1], ['Hold position', 0], ['Declare emergency', 0]], tip: 'Go around = הליכה סביב · due to = בגלל · climb to 3,000 + downwind.' },
      { type: 'dnd', he: 'הרכב/י קריאה ראשונה לגישה', template: 'Patron Tel Nof Approach, QNH __, maintain __ feet Yavne, runway __ in use', bank: ['two niner niner two', 'one tousand', 'one two tousand', 'tree tree', 'two niner'], answer: ['two niner niner two', 'one two tousand', 'tree tree'], tip: 'קריאה ראשונה גישה: QNH + גובה + מסלול פעיל.' },
      { type: 'listen', he: 'האזן/י והשלם/י: אישור נחיתה', audio: 'Arayot, runway zero fife cleared to land', he2: 'ארייות, מסלול 05 - מורשה לנחיתה', template: 'Arayot, runway __ __ cleared to land', bank: ['zero', 'fife', 'two niner', 'one'], answer: ['zero', 'fife'], tip: 'מבנה: אות קריאה + מסלול + cleared to land.' },
      { type: 'listen', he: 'האזן/י והשלם/י: הליכה סביב', audio: 'Zahav one, go around due to vehicle on the runway, climb tree tousand feet downwind', he2: 'זהב אחד, הלך סביב בגלל רכב על המסלול, טפס 3,000 רגל לעם הרוח', template: 'Zahav one, __ around due to vehicle on the runway, climb __ tousand feet __', bank: ['go', 'hold', 'tree', 'six', 'downwind', 'upwind'], answer: ['go', 'tree', 'downwind'], tip: 'Go around = ביוזמת פקח עם סיבה.' }
    ]},

    9: { num: 9, title: 'מזג אוויר - שדה ומרחב', sub: 'weather reports, ATIS, wind, visibility - כולל דיווחי מרחב', exercises: [
      { type: 'mcq', he: 'כיצד משדרים: "רוח 230 מעלות 10 קשר עם משב 30"?', en: 'How do you transmit "Wind 230 degrees, 10 knots, gusting 30"?', opts: [['Wind two three zero, ten, thirty', 0], ['Wind two tree zero degrees one zero knots gusting tree zero', 1], ['Two-thirty degrees ten knots gust thirty', 0], ['Wind 230/10G30', 0]], tip: 'כיוון = 3 ספרות · מהירות · gusting + שיא (לא G).' },
      { type: 'mcq', he: 'מהו ATIS?', en: 'What is ATIS?', opts: [['Air Traffic Information Signal', 0], ['Automatic Terminal Information Service - a recorded weather/airfield broadcast', 1], ['A special emergency frequency', 0], ['A pilot\'s weather request', 0]], tip: 'ATIS = שידור מוקלט אוטומטי עם מידע שדה ומזג אוויר.' },
      { type: 'mcq', he: 'מה פירוש "NEGATIVE ATIS" בשימוש שותף אמריקאי?', en: 'What does "NEGATIVE ATIS" mean in American partner usage?', opts: [['ATIS is not available', 0], ['The crew has not listened to the ATIS', 1], ['The weather is bad', 0], ['ATIS frequency is wrong', 0]], tip: 'מושג שותף אמריקאי: הצוות לא האזין ל-ATIS לפני הקשר.' },
      { type: 'dnd', he: 'הרכב/י דיווח רוח עם משבים', template: 'Wind __ degrees __ knots, __ tree zero', bank: ['two tree zero', 'one zero', 'gusting', 'calm', 'reporting'], answer: ['two tree zero', 'one zero', 'gusting'], tip: 'דיווח רוח עם משבים: כיוון + מהירות + gusting + שיא.' },
      { type: 'listen', he: 'האזן/י והשלם/י: לחץ ועגינה', audio: 'QNH two niner seven one, expect runway two niner, hold over Hazor', he2: 'לחץ 2971, צפה למסלול 29, המתן מעל חצור', template: 'QNH two niner __ one, expect runway two niner, __ over Hazor', bank: ['seven', 'fife', 'hold', 'report'], answer: ['seven', 'hold'], tip: 'hold over = עגינה (holding) מעל נקודה.' },
      { type: 'dnd', he: 'הרכב/י: כיסוי עננים של 5-7 שמיניות', template: 'Cloud cover of 5 to 7 oktas is called: __', bank: ['Broken', 'Scattered', 'Few', 'Overcast'], answer: ['Broken'], tip: '5-7 שמיניות = Broken; 8/8 = Overcast; 3-4 = Scattered; 1-2 = Few.' },
      { type: 'dnd', he: 'הרכב/י: שמיים ללא עננות כלל', template: 'No clouds at all: __', bank: ['Sky clear', 'Few', 'CAVOK', 'Overcast'], answer: ['Sky clear'], tip: 'Sky clear שונה מ-CAVOK, שכולל גם תנאי ראות ומזג אוויר טובים נוספים.' },
      { type: 'dnd', he: 'הרכב/י (מהתשדורת המקורית): דיווח עננות קל', template: 'Clouds __ at one tousand fife hundred feet with light turbulence, Master', bank: ['few', 'broken', 'overcast', 'scattered'], answer: ['few'], tip: 'תיאור כמות עננות תמיד מלווה בגובה הבסיס שלה.' },
      { type: 'mcq', he: 'מהי המשמעות של CAVOK?', en: 'What does CAVOK mean?', opts: [['Ceiling and Visibility OK', 1], ['Clouds Are Very OK', 0], ['Complete Aviation Visibility Overcast', 0], ['Confirmed Altitude Very OK', 0]], tip: 'צח ונאה - אין צורך בדיווח נוסף על מזג האוויר.' },
      { type: 'mcq', he: 'איזה כיסוי עננים מתאר Overcast?', en: 'What cloud coverage does "Overcast" describe?', opts: [['1-2/8', 0], ['3-4/8', 0], ['5-7/8', 0], ['8/8', 1]], tip: '8/8 = שמיים מכוסים לחלוטין, ללא פרצות.' },
      { type: 'mcq', he: 'מהו TOP בדיווח עננות?', en: 'What is "TOP" in a cloud report?', opts: [['בסיס הענן', 0], ['פסגת הענן', 1], ['מהירות הרוח בגובה הענן', 0], ['סוג הענן', 0]], tip: 'לעומת CEILING (בסיס ענן) - TOP מציין את פסגת שכבת הענן.' },
      { type: 'listen', he: 'האזן/י והשלם/י: דיווח עננות מלא', audio: 'Clouds overcast, ceiling one zero tousand feet, top one fife tousand feet with few CB', he2: 'עננות מכוסה, בסיס ענן 10,000 רגל, פסגה 15,000 רגל עם מעט CB', template: 'Clouds __, ceiling __ feet, top __ feet with few CB', bank: ['overcast', 'one zero tousand', 'one fife tousand', 'broken'], answer: ['overcast', 'one zero tousand', 'one fife tousand'], tip: 'ceiling = בסיס הענן; top = פסגתו - שני נתונים שונים לגמרי.' },
      { type: 'listen', he: 'האזן/י והשלם/י: אזהרת גזירת רוח', audio: 'Master, be advised, wind shear at area Alef Two at altitude fife hundred feet', he2: 'מאסטר, לידיעתך, גזירת רוח באזור אלף שתיים בגובה 500 רגל', template: 'Be advised, __ at area __ at altitude __', bank: ['wind shear', 'Alef Two', 'fife hundred feet', 'turbulence'], answer: ['wind shear', 'Alef Two', 'fife hundred feet'], tip: 'גזירת רוח מהווה סכנה מיוחדת בשלבי טיפוס/הנמכה.' }
    ]},

    10: { num: 10, title: 'חציית גבול (MFO)', sub: 'Border Crossing (MFO) & Non-ICAO Local Terms', exercises: [
      { type: 'dnd', he: 'הרכב/י: בקשת זיהוי טייס MFO', template: 'SQUAWK __ / report squawking', bank: ['IDENT', 'NOW', 'TWICE', 'AGAIN'], answer: ['IDENT'], tip: 'Squawk Ident משמש לאישור זיהוי חד-משמעי מול מגע מכ"ם קיים.' },
      { type: 'dnd', he: 'הרכב/י: המתנה עד לאישור חצייה', template: '__ over NADOL', bank: ['Orbit', 'Hold', 'Land', 'Cross'], answer: ['Orbit'], tip: 'Orbit משמש גם כאן להמתנה במקום קבוע עד לאישור המשך.' },
      { type: 'dnd', he: 'הרכב/י (מהתשדורת): אין אישור חצייה', template: 'MFO six niner two, be advised you don\'t have permission to cross the border, __ over NADOL', bank: ['orbit', 'land', 'descend', 'divert'], answer: ['orbit'], tip: 'אין לחצות גבול ללא אישור מפורש, גם אם כבר מתקבל מגע מכ"ם.' },
      { type: 'mcq', he: 'למה מתייחס המונח "שידור כפול" (Double transmission)?', en: 'What does the term "Double transmission" refer to?', opts: [['טייס שחוזר על הודעתו פעמיים', 0], ['שתי תחנות או יותר המשדרות בו-זמנית וחוסמות את המסר', 1], ['ערוץ קשר גיבוי', 0], ['שידור חירום', 0]], tip: 'שידור כפול חוסם את התוכן ולעיתים מוחק חלקים משתי ההודעות גם יחד.' },
      { type: 'mcq', he: 'מהי "Cable system" בהקשר של ציוד עצירה בחירום?', en: 'What is a "Cable system" in the context of emergency arresting gear?', opts: [['חיווט חשמלי', 0], ['מערכת כבל וווו פיזית לעצירת מטוס בנחיתה', 1], ['כבל תקשורת', 0], ['קו דלק', 0]], tip: 'מערכות עצירה כוללות גם net system (רשת) כאלטרנטיבה למערכת הכבל.' },
      { type: 'mcq', he: 'איזה ביטוי משמש לתיאור הצטרפות הרכבה להקפה?', en: 'Which phrase describes a formation joining the traffic pattern?', opts: [['"Number one, circuit clear"', 0], ['"Be advised, two ship formation at downwind"', 1], ['"Report final"', 0], ['"Go around"', 0]], tip: 'הודעה מוקדמת על הרכבה מסייעת לטייסים אחרים בהקפה להיערך.' },
      { type: 'listen', he: 'האזן/י והשלם/י: מגע מכ"ם לפני חצייה', audio: 'MFO-FIFE TOUSAND MIKE, radar contact one zero miles north west of NITZANA, standby for border clearance', he2: 'אם-אף-או חמש-אלף-מייק, מגע מכ"ם 10 מייל צפון-מערבית לניצנה, המתן לאישור חצייה', template: 'Radar contact __ miles __ of NITZANA, standby for __', bank: ['one zero', 'north west', 'border clearance', 'south east'], answer: ['one zero', 'north west', 'border clearance'], tip: 'מגע מכ"ם אינו מהווה אישור חצייה - יש להמתין להוראה מפורשת.' },
      { type: 'listen', he: 'האזן/י והשלם/י: המשך בטיסה לאחר חצייה', audio: 'MFO six niner two, continue enroute to HAZOR maintain alt one zero tousand feet QNH one zero one tree', he2: 'אם-אף-או 692, המשך לחצור, שמור גובה 10,000 רגל, QNH 1013', template: 'Continue enroute to __ maintain alt __ feet QNH __', bank: ['HAZOR', 'one zero tousand', 'one zero one tree', 'NADOL'], answer: ['HAZOR', 'one zero tousand', 'one zero one tree'], tip: 'לאחר אישור חצייה, ממשיכים לפי ההוראות הרגילות של גובה ולחץ.' }
    ]},

    11: { num: 11, title: 'חירום - מבנה הודעות', sub: 'emergency, mayday, distress, arresting cable - כולל מבנה הודעות רשמי', exercises: [
      { type: 'mcq', he: 'מהי סדרת קריאת המצוקה הנכונה?', en: 'What is the correct distress call sequence?', opts: [['Emergency, emergency, callsign, nature of emergency', 0], ['MAYDAY MAYDAY MAYDAY, callsign, position, nature, intentions', 1], ['PAN PAN, position, emergency type', 0], ['Declare emergency to ATC directly', 0]], tip: 'MAYDAY x3 = מצוקה · PAN PAN x3 = דחיפות. לפי ICAO Doc 4444.' },
      { type: 'mcq', he: 'מה מציין הדיווח "hook appears down"?', en: 'What does "hook appears down" indicate?', opts: [['Landing gear is down and locked', 0], ['Arresting hook appears to be in the down position', 1], ['Flaps are deployed', 0], ['Speed brakes are out', 0]], tip: 'Hook = ווו עצירה · דיווח לפני ניסיון תפיסה בכבל.' },
      { type: 'mcq', he: 'מה פירוש "Safety, hold position"?', en: 'ATC: "Safety, hold position" - what does this mean?', opts: [['The aircraft has a safety issue', 0], ['It is a safety-related instruction - stop now', 1], ['Check your safety equipment', 0], ['Hold at the safety line', 0]], tip: '"Safety" = הקדמת מילת בטיחות - הוראה קריטית.' },
      { type: 'mcq', he: 'איזו מילת חירום משתמשים בה שותפים אמריקאים במקום MAYDAY?', en: 'Which emergency term do American partners use instead of MAYDAY?', opts: [['URGENCY', 0], ['EMERGENCY', 1], ['DISTRESS', 0], ['BREAK BREAK', 0]], tip: 'שותף אמריקאי: EMERGENCY (לא MAYDAY / PAN PAN בדרך כלל).' },
      { type: 'dnd', he: 'הרכב/י דיווח תפיסה בכבל', template: '__ callsign __ arresting cable engaged', bank: ['Aircraft', 'first', 'second', 'all', 'safety'], answer: ['Aircraft', 'first'], tip: 'כשמטוס נתפס בכבל: "Aircraft [callsign] first/second arresting cable engaged".' },
      { type: 'listen', he: 'האזן/י והשלם/י: ביטול המראה דחוף', audio: 'Emek two hold position cancel takeoff, I say again cancel takeoff, vehicle on runway', he2: 'עמק 2, עצור! בטל המראה - אני חוזר: בטל המראה! רכב על המסלול', template: 'Emek two __ position __ takeoff, I say again cancel takeoff, __ on runway', bank: ['hold', 'clear', 'cancel', 'delay', 'vehicle', 'aircraft'], answer: ['hold', 'cancel', 'vehicle'], tip: '"I say again" = הדגשה כפולה על הוראת בטיחות קריטית.' },
      { type: 'dnd', he: 'הרכב/י: השדה החסר האחרון במבנה הודעת מצוקה מלאה', template: 'Station, call sign, nature of trouble, position, altitude/heading, __', bank: ['souls on board', 'fuel type', 'aircraft color', 'pilot name'], answer: ['souls on board'], tip: 'השדה האחרון במבנה מסייע לכוחות חילוץ לדעת כמה אנשים לחפש.' },
      { type: 'dnd', he: 'הרכב/י: הטלת שקט אלחוטי לכל התחנות', template: 'ALL STATIONS, [station], STOP TRANSMITTING, __', bank: ['MAYDAY', 'PAN-PAN', 'NOW', 'PLEASE'], answer: ['MAYDAY'], tip: 'הוראה זו נועדה לפנות את התדר לחלוטין עבור המטוס במצוקה.' },
      { type: 'dnd', he: 'הרכב/י: ביטול הודעת מצוקה ע"י הטייס (שים/י לב למספר החזרות)', template: '__, [station], [call sign], ENGINE RESTARTED, REQUEST PRIORITY LANDING', bank: ['MAYDAY', 'MAYDAY MAYDAY MAYDAY', 'PAN-PAN', 'CANCEL'], answer: ['MAYDAY'], tip: 'בשונה מהקריאה הראשונית (פי 3), הביטול נאמר פעם אחת בלבד.' },
      { type: 'mcq', he: 'כמה פעמים חוזרים על המילה MAYDAY בקריאת המצוקה הראשונית?', en: 'How many times is "MAYDAY" repeated in the initial distress call?', opts: [['פעם אחת', 0], ['פעמיים', 0], ['שלוש פעמים', 1], ['חמש פעמים', 0]], tip: 'שלוש חזרות מבטיחות שההודעה תישמע גם בתנאי קליטה גרועים.' },
      { type: 'mcq', he: 'מהי קריאת הדחיפות (שאינה מצוקה מיידית)?', en: 'What is the urgency (non-distress) call?', opts: [['MAYDAY MAYDAY MAYDAY', 0], ['PAN PAN, PAN PAN, PAN PAN', 1], ['HELP HELP HELP', 0], ['URGENT URGENT URGENT', 0]], tip: 'Pan-Pan מדווח על מצב דחוף אך לא מסכן חיים באופן מיידי.' },
      { type: 'mcq', he: 'לאחר הכרזת MAYDAY, מה על שאר התחנות לעשות?', en: 'After a MAYDAY is declared, what should all other stations do?', opts: [['להמשיך בשידורים כרגיל', 0], ['להפסיק לשדר עד להודעה חוזרת', 1], ['לעבור תדר מיידית', 0], ['ליצור קשר ישיר עם המטוס', 0]], tip: 'שקט אלחוטי נשמר עד הודעת "distress traffic ended".' },
      { type: 'listen', he: 'האזן/י והשלם/י: הודעת מצוקה מלאה', audio: 'MAYDAY MAYDAY MAYDAY, PLUTO CONTROL, 4XABC, ENGINE FAILURE, DITCHING, 15 MILES WEST OF HAIFA, 2000 FEET, HEADING 290, 5 PERSONS ON BOARD', he2: 'מצוקה, פלוטו בקרה, 4XABC, כשל מנוע, נטישה בים, 15 מייל מערבית לחיפה, 2000 רגל, כיוון 290, 5 נפשות על הסיפון', template: 'MAYDAY MAYDAY MAYDAY, PLUTO CONTROL, 4XABC, ENGINE FAILURE, DITCHING, 15 MILES WEST OF HAIFA, 2000 FEET, HEADING 290, __', bank: ['5 PERSONS ON BOARD', '5 PASSENGERS', 'NO SOULS', 'UNKNOWN SOB'], answer: ['5 PERSONS ON BOARD'], tip: 'מבנה קבוע מבטיח שלא יישכח פרט קריטי גם בלחץ.' },
      { type: 'listen', he: 'האזן/י והשלם/י: הפניית תעבורה בזמן חירום', audio: 'MAYDAY 4XABC, ALL OTHER AIRCRAFT CONTACT TEL AVIV CONTROL 121.4', he2: 'מצוקה 4XABC, כל שאר כלי הטיס - עברו לתל אביב בקרה 121.4', template: 'ALL OTHER AIRCRAFT CONTACT __ __', bank: ['TEL AVIV CONTROL', '121.4', 'PLUTO CONTROL', '118.3'], answer: ['TEL AVIV CONTROL', '121.4'], tip: 'הפניית שאר התעבורה מפנה את התדר הראשי למטוס במצוקה בלבד.' }
    ]},

    12: { num: 12, title: 'תרחישי חירום מבצעיים', sub: 'Operational Emergency Scenarios - תקלות ואירועים מיוחדים', exercises: [
      { type: 'dnd', he: 'הרכב/י: שאלת הבהרה של הבקר', template: 'Are you __ an emergency?', bank: ['declaring', 'requesting', 'reporting', 'confirming'], answer: ['declaring'], tip: 'שאלה זו מסייעת לבקר להבין את רמת הדחיפות הנדרשת.' },
      { type: 'dnd', he: 'הרכב/י: נטישה בים לפני נחיתה', template: 'Reporting abandonment at sea before landing: __', bank: ['Ditching', 'Forced landing', 'Ejecting', 'Emergency landing'], answer: ['Ditching'], tip: 'Ditching שונה מ-Forced landing, שמתייחס לנחיתת אונס על יבשה.' },
      { type: 'dnd', he: 'הרכב/י (מהתשדורת): בקשת הנמכה', template: 'Request immediate descent to altitude one two tousand fife hundred feet or __', bank: ['below', 'above', 'higher', 'more'], answer: ['below'], tip: '"או מתחת" מותיר לטייס גמישות לפי הצורך המבצעי.' },
      { type: 'dnd', he: 'הרכב/י: תקלת חשמל בטיסה', template: 'Electrical malfunction in flight is called: __ malfunction', bank: ['electrical (EPU)', 'engine', 'hydraulic', 'fuel'], answer: ['electrical (EPU)'], tip: 'EPU הוא מקור הספק חירום עצמאי למקרה כשל חשמלי מרכזי.' },
      { type: 'mcq', he: 'מהו ההבדל בין Fuel endurance ל-Amount of fuel?', en: 'What is the difference between "Fuel endurance" and "Amount of fuel"?', opts: [['אין הבדל, שני המונחים זהים', 0], ['Fuel endurance = זמן טיסה נותר; Amount of fuel = כמות בפועל, רלוונטית לכוחות כיבוי/משקל נחיתה', 1], ['Fuel endurance מתייחס רק למסוקים', 0], ['Amount of fuel מתייחס רק לדלק רזרבה', 0]], tip: 'ההבחנה קריטית: זמן טיסה נותר לעומת משקל/כמות דלק בפועל.' },
      { type: 'mcq', he: 'אילו פרטים יש לדווח לבקרה יחד עם הכרזת MAYDAY, לפי החומר?', en: 'What details must be reported to ATC along with a MAYDAY declaration?', opts: [['רק סוג כלי הטיס', 0], ['מספר נפשות על הסיפון, יתירות דלק וחומרים מסוכנים', 1], ['רק שם הטייס', 0], ['רק שדה היעד', 0]], tip: 'פרטים אלו משפיעים ישירות על היערכות כוחות החילוץ בקרקע.' },
      { type: 'mcq', he: 'מה משמעות EPU בהקשר של תקלת חשמל?', en: 'What does "EPU" refer to in the context of an electrical malfunction?', opts: [['מערכת גיבוי חשמלית חירומית (Electrical/Emergency Power Unit)', 1], ['מצנח חירום', 0], ['מערכת לחץ מנוע', 0], ['מערכת הספק חיצוני', 0]], tip: 'משמש כגיבוי כשהמערכת החשמלית הראשית נכשלת.' },
      { type: 'listen', he: 'האזן/י והשלם/י: תקלת מיזוג אוויר', audio: 'Liba, Ace. Encounter a malfunction with the air-conditioning, request immediate descent to altitude one two tousand fife hundred feet or below', he2: 'ליבה, אייס. תקלה במיזוג האוויר, מבקש הנמכה מיידית ל-12,500 רגל או מתחת', template: 'Encounter a malfunction with the __, request immediate descent to altitude __ feet or __', bank: ['air-conditioning', 'one two tousand fife hundred', 'below', 'landing gear'], answer: ['air-conditioning', 'one two tousand fife hundred', 'below'], tip: 'גם תקלה "לא קריטית" לכאורה יכולה להצדיק הנמכה מיידית.' },
      { type: 'listen', he: 'האזן/י והשלם/י: דיווח נפשות וחומרים מסוכנים', audio: 'MFO692 copied MAYDAY, report souls on board and dangerous goods', he2: 'אם-אף-או 692, קיבלתי מצוקה, דווח נפשות על הסיפון וחומרים מסוכנים', template: 'Report __ and __', bank: ['souls on board', 'dangerous goods', 'fuel type', 'aircraft weight'], answer: ['souls on board', 'dangerous goods'], tip: 'שני הנתונים חיוניים לכוחות החירום בקרקע לפני הגעת המטוס.' },
      { type: 'listen', he: 'האזן/י והשלם/י: הימנעות מפגיעת ציפורים', audio: 'Robin, be advised, traffic ahead encountered a massive flocks of storks and cranes. To avoid bird strike, deviate heading two seven zero', he2: 'רובין, לידיעתך, תנועה לפניך נתקלה בלהקה מסיבית של חסידות ועגורים. כדי להימנע מפגיעת ציפורים, סטה לכיוון 270', template: 'To avoid __, deviate heading __', bank: ['bird strike', 'two seven zero', 'turbulence', 'one eight zero'], answer: ['bird strike', 'two seven zero'], tip: 'סטייה מונעת מראש עדיפה תמיד על התמודדות עם פגיעה בפועל.' }
    ]},

    13: { num: 13, title: 'שותף אמריקאי', sub: 'American partner unique terminology', exercises: [
      { type: 'mcq', he: 'טייס אמריקאי אומר "2 Mikes" - מה הכוונה?', en: 'An American pilot says "2 Mikes" - what does it mean?', opts: [['2 miles', 0], ['2 minutes', 1], ['2 miles per minute', 0], ['2 nautical miles', 0]], tip: 'MIKE = קיצור Minutes בשימוש צבאי אמריקאי.' },
      { type: 'mcq', he: 'מהו "CIRCUIT PATTERN"?', en: 'What is "CIRCUIT PATTERN"?', opts: [['Emergency pattern', 0], ['The standard traffic pattern / circuit', 1], ['A navigation chart', 0], ['A radio circuit check', 0]], tip: 'Circuit Pattern = הקפה (Traffic Pattern) - השם האמריקאי.' },
      { type: 'mcq', he: 'טייס מדווח "HUNG ORDNANCE" - מה המצב?', en: 'A pilot reports "HUNG ORDNANCE" - what is the situation?', opts: [['The aircraft is overloaded', 0], ['There is a weapons malfunction / stuck ordnance', 1], ['The aircraft is in an emergency descent', 0], ['Weapons have been released', 0]], tip: 'HUNG ORDNANCE = תקלת חימוש / חימוש שלא שוחרר.' },
      { type: 'mcq', he: 'מהו "REQUEST CLOSE"?', en: 'What is "REQUEST CLOSE"?', opts: [['Request close approach', 0], ['Request to fly directly to downwind, usually after low approach', 1], ['Request close formation', 0], ['Request for close-in vectors', 0]], tip: 'REQUEST CLOSE = בקשה לטוס ישירות לעם הרוח, אחרי גישה נמוכה.' },
      { type: 'mcq', he: 'מתי משדרים Alarm Green?', en: 'When is Alarm Green transmitted?', opts: [['When enemy aircraft detected', 0], ['End of event, safe to return for landing', 1], ['When runway is clear', 0], ['When weather improves', 0]], tip: 'Alarm Green = סוף אירוע, מותר לחזור לנחיתה בבטיחות.' },
      { type: 'dnd', he: 'הרכב/י Alpha Check', template: 'ALPHA CHECK: __ is on range __ Miles, __ degrees', bank: ['Base', 'Final', '5', '10', '1-1-0', '0-9-0'], answer: ['Base', '5', '1-1-0'], tip: 'Alpha Check = בדיקת מיקום לפני גישה - מינוח ישראלי.' },
      { type: 'listen', he: 'האזן/י והשלם/י: הפסקת המראה', audio: 'ABORTING TAKE OFF', he2: 'מפסיק המראה', template: '__ TAKE OFF', bank: ['ABORTING', 'CANCELLING', 'CLEARING'], answer: ['ABORTING'], tip: 'מונח אמריקאי - לעומת ATC שמשדר: "cancel takeoff".' },
      { type: 'listen', he: 'האזן/י והשלם/י: דיווח כוח מנוע', audio: 'IDLE POWER', he2: 'כוח מנוע על סרק', template: '__ POWER', bank: ['IDLE', 'FULL', 'MAX'], answer: ['IDLE'], tip: 'אמריקאי: IDLE POWER · ישראלי/ICAO: flight idle.' }
    ]},

    14: { num: 14, title: 'יירוט וסקירה מתקדמת', sub: 'Interception & Airspace Violation Procedures + Mixed Review', exercises: [
      { type: 'dnd', he: 'הרכב/י: אזהרה למטוס שחדר למרחב האווירי', template: 'You have penetrated Tel-Aviv FIR/Israeli airspace, please identify or you will be __', bank: ['intercepted', 'contacted', 'escorted', 'warned'], answer: ['intercepted'], tip: 'אזהרה זו ניתנת למטוס שכבר חדר בפועל למרחב האווירי.' },
      { type: 'dnd', he: 'הרכב/י: התראה למטוס הממשיך בכיוון מסוכן', template: 'If you continue this heading, you will penetrate Israeli airspace. Turn away or you will be __', bank: ['intercepted', 'arrested', 'contacted', 'fined'], answer: ['intercepted'], tip: 'כאן האזהרה ניתנת מראש, לפני חדירה בפועל למרחב.' },
      { type: 'mcq', he: '(סקירה) כיצד הוגים את הספרה 8 לפי טבלת המספרים במסמך?', en: '(Review) How is the digit 8 pronounced per the source document\'s numerals table?', opts: [['AIT', 0], ['EIGHT', 1], ['ATE-ER', 0], ['OCT', 0]], tip: 'שים/י לב: במסמך זה 8 נהגה EIGHT (סטנדרטי) - ולא בגרסה "AIT" המוכרת ממקורות אחרים.' },
      { type: 'mcq', he: '(סקירה) איזו הגייה שגויה ביחס למסמך המקור?', en: '(Review) Which pronunciation is incorrect per the source document?', opts: [['TREE (3)', 0], ['FOWER (4)', 0], ['AIT (8)', 1], ['NINER (9)', 0]], tip: 'חשוב להשוות תמיד מול מסמך המקור הספציפי - יש הבדלים בין ארגונים.' },
      { type: 'mcq', he: '(סקירה) טייס מדווח MAYDAY עם "5 PERSONS ON BOARD" - אילו פרטים נוספים על הבקר לבקש?', en: '(Review) A pilot reports MAYDAY with "5 persons on board" - what additional details should ATC request?', opts: [['העדפת ארוחה', 0], ['יתירות דלק וחומרים מסוכנים', 1], ['מספר כרטיס טיסות תכופות', 0], ['צבע כלי הטיס', 0]], tip: 'סקירה: אותם פרטים נדרשים בכל מקרה חירום, ללא קשר לסוג התקלה.' },
      { type: 'mcq', he: '(סקירה) מה על הבקר לעשות מיד עם קבלת קריאת MAYDAY?', en: '(Review) What must the controller do immediately upon receiving a MAYDAY call?', opts: [['לשאול לגבי היעד', 0], ['להורות לכל התחנות האחרות להפסיק לשדר', 1], ['לנתק את הקשר', 0], ['להמשיך בתעבורה השגרתית', 0]], tip: 'סקירה: השקט האלחוטי הוא הצעד הראשון והמיידי ביותר.' },
      { type: 'listen', he: 'האזן/י והשלם/י: התראת יירוט', audio: 'Aircraft heading 040, acknowledge or you will be intercepted', he2: 'כלי טיס בכיוון 040, אשר קליטה או שתיורט', template: 'Aircraft heading __, __ or you will be intercepted', bank: ['040', 'acknowledge', '090', 'report'], answer: ['040', 'acknowledge'], tip: 'אי-מענה לאזהרה זו עלול להוביל ליירוט בפועל.' },
      { type: 'listen', he: 'האזן/י והשלם/י (סקירה מעורבת): חיתחות חמורה', audio: 'Master, be advised, severe turbulence reported at Juliet one zero between altitude one zero tousand feet to altitude one fower tousand feet, advise requested altitude', he2: 'מאסטר, לידיעתך, חיתחות חמורה דווחה בג\'ולייט 10 בין גובה 10,000 ל-14,000 רגל, הודע גובה מבוקש', template: '__ turbulence reported at __ between altitude __ to altitude __', bank: ['severe', 'Juliet one zero', 'one zero tousand feet', 'one fower tousand feet'], answer: ['severe', 'Juliet one zero', 'one zero tousand feet', 'one fower tousand feet'], tip: 'סקירה: דיווח חיתחות כולל תמיד טווח גבהים מדויק.' }
    ]},

    0: { num: 'final', title: 'מבחן מסכם', sub: 'כל החומר - מספרים עד חירום ושותף אמריקאי', exercises: [
      { type: 'mcq', he: 'מהו קוד התוכי: "squawk fife one fife two"?', en: 'ATC: "India Alpha Fox cleared via SID MEZADA, squawk fife one fife two" - what is the transponder code?', opts: [['6000', 0], ['5152', 1], ['MEZADA', 0], ['IAF255', 0]], tip: 'squawk = קוד תוכי · fife one fife two = 5152.' },
      { type: 'mcq', he: 'בחירום - מי לא מקבל דיווח בקשר הרדיו ישירות?', en: 'Pilot declares EMERGENCY - which does NOT receive the direct radio call?', opts: [['ATC', 0], ['Emergency services', 0], ['The base commander', 1], ['The adjacent airspace unit', 0]], tip: 'שאלה מלכודת - בקשר הרדיו ATC מתאמת. שאר הגורמים מתואמים פנימית.' },
      { type: 'mcq', he: 'איזה כלל הגייה שגוי?', en: 'Which pronunciation rule is WRONG?', opts: [['5 = FIFE', 0], ['9 = NIN-ER', 0], ['3 = TREE', 0], ['0 = OH', 1]], tip: '0 = ZE-RO (לא OH) - OH משמש בדיבור יומיומי אך לא בפרזיולוגיה תעופתית.' },
      { type: 'mcq', he: 'מה הגובה לפי: "Arayot one and two descending altitude ___ feet"?', en: 'Complete: "joining holding, Arayot one and two descending altitude ___ feet"', opts: [['six tousand', 0], ['eight tousand', 1], ['one zero tousand', 0], ['fife tousand', 0]], tip: 'לפי הדוגמה: Arayot 1 & 2 = descend to 8,000 ft.' },
      { type: 'dnd', he: 'הרכב/י בקשת הסעה מלאה מחצור', template: 'HATZOR GROUND shalom, Akrav one at __, information Charlie, ready to taxi, departing __', bank: ['shelter one six', 'SID QIRYA one', 'runway two tree', 'approach'], answer: ['shelter one six', 'SID QIRYA one'], tip: 'בקשת הסעה: מיקום נוכחי + SID מבוקש.' },
      { type: 'dnd', he: 'הרכב/י התראת תנועה', template: 'Gamal, __ traffic, two o\'clock, __ miles, merging from right at two tousand feet, Black Hawk', bank: ['traffic', 'opposite', 'tree', 'five', 'contact'], answer: ['traffic', 'tree'], tip: 'התראת תנועה: traffic + שעון + מרחק + כיוון + גובה + סוג כלי טיס.' },
      { type: 'listen', he: 'האזן/י והשלם/י: ירידה והצטרפות', audio: 'Arayot, descend altitude six tousand feet join upwind runway two niner left', he2: 'ארייות, רד ל-6,000 רגל, הצטרף מצלע מת למסלול 29 שמאל', template: 'Arayot, __ altitude __ tousand feet join __ runway two niner left', bank: ['descend', 'climb', 'six', 'eight', 'upwind', 'downwind'], answer: ['descend', 'six', 'upwind'], tip: 'upwind leg = צלע מת (הצלע שמול כיוון המסלול).' },
      { type: 'listen', he: 'האזן/י והשלם/י: מעבר ל-IFR', audio: 'Charlie Alpha Echo, switch to IFR, climb to altitude fower tousand feet, VOR NAT, squawk fife zero six fife and IDENT', he2: 'צ\'רלי אלפא אקו, עבור ל-IFR, טפס ל-4,000 רגל, VOR NAT, קוד תוכי 5065 ולחץ IDENT', template: 'Charlie Alpha Echo, switch to __, climb to altitude __ tousand feet, VOR NAT, squawk __ and IDENT', bank: ['IFR', 'VFR', 'fower', 'six', 'fife zero six fife', 'one two tree four'], answer: ['IFR', 'fower', 'fife zero six fife'], tip: 'מעבר מ-VFR ל-IFR: גובה + VOR + תוכי + IDENT.' },
      { type: 'listen', he: 'האזן/י והשלם/י: הליכה סביב', audio: 'Barzel one climb to altitude tree tousand feet runway heading', he2: 'ברזל אחד, טפס ל-3,000 רגל, heading מסלול', template: 'Barzel one __ to altitude __ tousand feet runway __', bank: ['climb', 'descend', 'tree', 'six', 'heading', 'track'], answer: ['climb', 'tree', 'heading'], tip: 'הליכה סביב ביוזמת טייס: ATC נותן גובה + heading.' }
    ]}

  };

  var CATSCtrl = [
    { id: 'proc', label: 'נהלים ובקרת קשר', items: [['Say again','אמור שנית','חזור על השידור האחרון'],['I say again','אומר שנית','חזרה על הוראה חשובה'],['Roger','קיבלתי','המסר התקבל'],['Affirm','חיובי','כן / נכון'],['Negative','שלילי','לא / לא נכון'],['Confirm','אשר','אשר נתון מסוים'],['Verify','ודא','ודא לפני מתן תשובה'],['Readback','חזור על','חזור על תוכן ההוראה'],['Standby','מיד אתך','המתן, אקרא לך'],['Disregard','התעלם','בטל את התשדורת האחרונה'],['Correction','תיקון','תיקון לשידור הקודם'],['How do you read','איך שומע','מהי איכות הקליטה'],['Unable','לא מסוגל','לא ניתן לבצע'],['Break break','הפרדה בין שידורים','בין מטוסים שונים'],['Monitor','האזן','האזן לתחנה ולתדר'],['Contact','עבור ל','עבור לקשר עם תחנה ותדר']]},
    { id: 'inst', label: 'הוראות טיסה', items: [['Climb','טפס','טפס לגובה'],['Descend','הנמך','הנמך לגובה'],['Maintain','שמור','גובה / מהירות / אזור'],['Turn left / right','פנה שמאלה / ימינה','שינוי כיוון'],['Fly heading','טוס בכיוון','שלוש ספרות'],['Expedite','זרז','בצע מהר יותר'],['Orbit','בצע המתנה','מעגל פנייה 360°'],['Line up and wait','התיישר והמתן','עלייה למסלול והמתנה'],['Cleared for take-off','רשאי להמראה','אישור המראה'],['Cleared to land','רשאי לנחות','אישור נחיתה'],['Go around','לך סביב','ביטול נחיתה'],['Touch and go','נגיעה והמראה','תרגול במסלול'],['Hold position','עצור במקום','עצירה בהסעה'],['Hold short','עצור לפני','מסלול / הסעה'],['Taxi','הסע','הסעה על הקרקע'],['Pushback','דחיפה לאחור','דחיפה מהחניה'],['Vacate the runway','פנה את המסלול','פינוי לאחר נחיתה'],['Backtrack','הסעה הפוכה','בכיוון הפוך על המסלול']]},
    { id: 'traffic', label: 'תנועה והפרדה', items: [['Traffic','תנועה','מידע על כלי טיס אחר'],['Radar contact','מגע מכ"ם','המטוס זוהה על התמונה'],['Maintain own separation','שמור הפרדה עצמית','אחריות ההפרדה על הטייס'],['Caution wake turbulence','זהירות מערבולות','מערבולות קצה כנף'],['Opposite traffic','תנועה נגדית','כלי טיס בכיוון מנוגד'],['Crossing traffic','תנועה חוצה','חוצה את הנתיב'],['Give way','תן זכות קדימה','אפשר מעבר'],['Report traffic in sight','דווח בקשר עין','כשהתנועה מזוהה'],['Number two','מספר שתיים','מיקום ברצף הנחיתות'],['Follow','עקוב אחרי','אחר מטוס בהקפה']]},
    { id: 'wx', label: 'מזג אוויר', items: [['Wind calm','רוח קלה','עד שלושה קשרים'],['Gusting','משבים','עוצמת המשב המרבית'],['QNH','לחץ ברומטרי','כיול מד גובה'],['Visibility','ראות','בק"ם / במייל'],['Few','מעט עננות','1–2 שמיניות'],['Scattered','עננות מפוזרת','3–4 שמיניות'],['Broken','עננות שבורה','5–7 שמיניות'],['Overcast','שמים מכוסים','8 שמיניות'],['Ceiling','בסיס ענן','גובה בסיס העננות'],['ATIS','שידור מוקלט אוטומטי','מידע שדה ומזג אוויר']]},
    { id: 'emer', label: 'חירום', items: [['Mayday Mayday Mayday','מצוקה','חירום הדורש סיוע מיידי'],['Pan-Pan','תקלה','חירום ללא סיוע מיידי'],['Emergency','חירום (אמריקאי)','שותף אמריקאי - MAYDAY'],['Barrier','הרם רשת','הפעלת אמצעי עצירה'],['Arresting cable engaged','נתפס בכבל','המטוס נתפס בכבל'],['Hook appears down','ווו נראה למטה','דיווח מצב ווו עצירה'],['Hung ordnance','תקלת חימוש','חימוש שלא שוחרר'],['Cancelling Mayday','ביטול מצוקה','ביטול קריאת חירום']]}
  ];

  var MEMORY_POOLCtrl = [
    ['Say again', 'אמור שנית'],
    ['Roger', 'קיבלתי'],
    ['Affirm', 'חיובי'],
    ['Negative', 'שלילי'],
    ['Standby', 'מיד אתך'],
    ['Disregard', 'התעלם'],
    ['Unable', 'לא מסוגל'],
    ['Readback', 'חזור על'],
    ['Climb', 'טפס'],
    ['Descend', 'הנמך'],
    ['Maintain', 'שמור'],
    ['Taxi', 'הסע'],
    ['Hold short', 'עצור לפני'],
    ['Cleared to land', 'רשאי לנחות'],
    ['Go around', 'לך סביב'],
    ['Traffic', 'תנועה'],
    ['Wind calm', 'רוח קלה'],
    ['QNH', 'לחץ ברומטרי'],
    ['Visibility', 'ראות'],
    ['Overcast', 'שמים מכוסים'],
    ['Mayday', 'מצוקה'],
    ['Pan-Pan', 'תקלה'],
    ['Vacate the runway', 'פנה את המסלול'],
    ['Line up and wait', 'התיישר והמתן']
  ];

  var DICT_CHIPSCtrl = [
    ['all','הכל'],['numbers','מספרים'],['proc','נהלים'],['inst','הוראות'],
    ['traffic','תנועה'],['wx','מזג אוויר'],['emer','חירום'],['read','בדיקת קשר']
  ];

  /* ===================================================================
     מסלול פקח/ית (Flight Inspector) - פיקוח שדה/גישה, ללא בקרת מרחב
     =================================================================== */
  var metaListInsp = [
    { id: 1,  label: 'ספרות, מספרים וזמן' },
    { id: 2,  label: 'מילון ביטויים - נהלים' },
    { id: 3,  label: 'מילון ביטויים - תנועה וציוד' },
    { id: 4,  label: 'אותות קריאה וקריאות קשר' },
    { id: 5,  label: 'מרשה, התנעה והסעה' },
    { id: 6,  label: 'התיישרות והמראה' },
    { id: 7,  label: 'הקפה ודיווח ירוקים' },
    { id: 8,  label: 'מתן מרשה לגישה' },
    { id: 9,  label: 'נחיתה ואחרי נחיתה' },
    { id: 10, label: 'בקרת מהירות וגובה' },
    { id: 11, label: 'הוראה מותנית ותמונה אווירית' },
    { id: 12, label: 'מזג אוויר ו-ATIS' },
    { id: 13, label: 'חירום ואמצעי עצירה' },
    { id: 14, label: 'שותף אמריקאי' },
    { id: 0,  label: 'מבחן מסכם - פיקוח שדה', final: true }
  ];

  var stagesInsp = {

    /* ================= 1. ספרות, מספרים וזמן (עמ' 4-5) ================= */
    1: { num: 1, title: 'כללי הגיית ספרות ומספרים', sub: 'הבסיס לכל תשדורת קשר', exercises: [
      { type: 'mcq', he: 'כיצד הוגים את הספרה 1 בקשר תעופתי?', en: 'How do you pronounce the number 1 in aviation radio communications?', opts: [['WUN', 1], ['ONE', 0], ['FIRST', 0], ['WAHN-ER', 0]], tip: '1 = WUN, נהגה בדומה למילה "one" באנגלית.' },
      { type: 'mcq', he: 'כיצד הוגים את הספרה 8?', en: 'How do you pronounce the number 8?', opts: [['EIGHT', 0], ['AIT', 1], ['ATE-ER', 0], ['OCT', 0]], tip: '8 = AIT, נהגה כמו "eight".' },
      { type: 'mcq', he: 'איזו מילה משמשת להפרדת ספרה עשרונית?', en: 'Which word is used to separate a decimal digit?', opts: [['POINT', 0], ['DOT', 0], ['DAY-SEE-MAL', 1], ['COMMA', 0]], tip: 'המילה decimal (DAY-SEE-MAL) מפרידה בין ספרות לפני ואחרי הנקודה העשרונית.' },
      { type: 'mcq', he: 'אילו מהערכים הבאים חייבים להיות מלווים תמיד ביחידת מידה בשידור?', en: 'Which values must always be transmitted with a unit of measurement?', opts: [['גבהים, מרחקים ומהירויות', 1], ['מספרי מסלול', 0], ['קודי זע"ט', 0], ['תדרים', 0]], tip: 'מספרים המבטאים גבהים, מרחקים או מהירויות יצוינו תמיד עם יחידת המדידה (feet, kilometer, mile, meter וכו\').' },
      { type: 'mcq', he: 'אילו נתונים ישודרו תמיד כל ספרה בנפרד (ולא כמספר שלם)?', en: 'Which of these are always transmitted digit-by-digit?', opts: [['מספרי מסלול, כיוונים, תדרים, QNH, שעה וקוד זע"ט', 1], ['רק גבהים', 0], ['רק מהירויות', 0], ['רק מרחקים', 0]], tip: 'מספרי מסלול, כיוונים, רדיאלים, ערוצי קשר, לחץ ברומטרי, תדרים, שעה מדויקת וקודי תוכי (זע"ט) - כל ספרה בנפרד.' },
      { type: 'mcq', he: 'איך יש לשדר את המילים "מאה" ו-"אלף"?', en: 'How should "hundred" and "thousand" be pronounced?', opts: [['HUN-DRED, TOU-SAND', 1], ['HUNDRED, THOUSAND (רגיל)', 0], ['ONE-O-O, ONE-TOU', 0], ['HUN-RED, TOU-ZAND', 0]], tip: 'ביטוי מאות ואלפים: Hundred = HUN-DRED, Thousand = TOU-SAND.' },
      { type: 'dnd', he: 'הרכב/י שידור שעה 08:15 לפי הזמן המקומי', template: 'Time __ __ __ __ Local Time', bank: ['zero', 'eight', 'one', 'fife', 'two', 'niner'], answer: ['zero', 'eight', 'one', 'fife'], tip: 'שעה משודרת תמיד בארבע ספרות בנפרד + ציון Local Time או UTC.' },
      { type: 'listen', he: 'האזן/י והשלם/י: תדר עם עשרוני', audio: 'One tree niner decimal two fife', he2: '139 נקודה 25', template: 'One tree __ decimal two __', bank: ['niner', 'fife', 'zero', 'six'], answer: ['niner', 'fife'], tip: 'תדר = כל ספרה בנפרד, "decimal" מפריד בין החלק השלם לעשרוני.' }
    ]},

    /* ================= 2. מילון ביטויים - נהלים (עמ' 6-10) ================= */
    2: { num: 2, title: 'מילון ביטויים - נהלים ובקרת קשר', sub: 'מונחי הליבה של השידור', exercises: [
      { type: 'mcq', he: '"אמור שנית" - מהו התרגום הנכון והמשמעות?', en: 'What is the correct term and meaning of "אמור שנית"?', opts: [['Say again - חזור על השידור האחרון', 1], ['Readback - חזור על תוכן ההוראה', 0], ['Correction - תיקון לשידור הקודם', 0], ['Confirm - אשר נתון', 0]], tip: 'Say again = אמור שנית - חזור על השידור האחרון.' },
      { type: 'mcq', he: 'מה ההבדל בין Confirm ל-Verify?', en: 'What is the difference between "Confirm" and "Verify"?', opts: [['Confirm = אשר נתון · Verify = יש לוודא לפני מתן תשובה', 1], ['שתיהן זהות במשמעותן', 0], ['Verify = אשר · Confirm = ודא', 0], ['Confirm משמש רק לגובה', 0]], tip: 'Confirm = אשר נתון מסוים · Verify = ודא לפני מתן תשובה.' },
      { type: 'mcq', he: 'מהי המשמעות של "Disregard"?', en: 'What does "Disregard" mean?', opts: [['בטל את התשדורת האחרונה', 1], ['חזור על ההוראה', 0], ['התעלם מהתנועה', 0], ['בטל את המרשה', 0]], tip: 'Disregard = התעלם - בטל את התשדורת האחרונה.' },
      { type: 'mcq', he: 'מהי המשמעות של "Stand-by"?', en: 'What does "Stand-by" mean?', opts: [['חכה, ואני אקרא לך', 1], ['עצור מיד', 0], ['בטל את הבקשה', 0], ['דווח שוב מאוחר יותר', 0]], tip: 'Stand-by = מיד אתך - חכה ואני אקרא לך.' },
      { type: 'mcq', he: 'מהו התרגום ל"Expedite"?', en: 'What is the translation of "Expedite"?', opts: [['זרז', 1], ['שמור', 0], ['הגבר', 0], ['הקטן', 0]], tip: 'Expedite = זרז - בצע מהר יותר.' },
      { type: 'mcq', he: 'מהי המילה שמציינת שינוי במרשה?', en: 'Which word indicates a change to a clearance?', opts: [['Amend', 1], ['Correction', 0], ['Cancel', 0], ['Readback', 0]], tip: 'Amend = שינוי (מרשה).' },
      { type: 'mcq', he: 'מהי המשמעות של "Readback"?', en: 'What does "Readback" mean?', opts: [['הוראה לטייס לחזור על תוכן ההוראה', 1], ['הודעה שהמסר לא ברור', 0], ['בקשה לחזור על ההוראה', 0], ['אישור קבלת המסר בלבד', 0]], tip: 'Readback = חזור על - הוראה לטייס לחזור על תוכן ההוראה.' },
      { type: 'dnd', he: 'הרכב/י: "העברת מסר ברוח קלה, שדר את הבקשה שנית"', template: '__ , wind __', bank: ['Pass your message', 'calm', 'Say again', 'gusts'], answer: ['Pass your message', 'calm'], tip: 'Pass your message = שדר · wind calm = רוח קלה.' },
      { type: 'listen', he: 'האזן/י והשלם/י: זהירות מהדף מנוע', audio: 'Caution jet blast', he2: 'זהירות - הדף מנוע', template: 'Caution __ __', bank: ['jet', 'wind', 'blast', 'calm'], answer: ['jet', 'blast'], tip: 'Jet blast / slipstream = הדף מנוע.' },
      { type: 'listen', he: 'האזן/י והשלם/י: בקשת דיבור איטי', audio: 'Speak slower', he2: 'דבר לאט', tip: '"Speak slower" משמש כאשר קצב הדיבור מהיר מדי להבנה.' }
    ]},

    /* ================= 3. מילון ביטויים - תנועה וציוד (עמ' 6-10) ================= */
    3: { num: 3, title: 'מילון ביטויים - תנועה, ציוד ומסלול', sub: 'מונחי תנועה, שירותי חירום ומצב מסלול', exercises: [
      { type: 'mcq', he: 'מהי המשמעות של "Give way"?', en: 'What does "Give way" mean?', opts: [['תן זכות קדימה', 1], ['עקוף', 0], ['עצור לפני', 0], ['פנה שמאלה', 0]], tip: 'Give-way = תן זכות קדימה.' },
      { type: 'mcq', he: 'מה משמעות "FOD"?', en: 'What does "FOD" stand for?', opts: [['Foreign Object Damage/Debris - עצם או לכלוך על המסלול', 1], ['Flight Operations Delay', 0], ['Field Occupancy Data', 0], ['Final Object Departure', 0]], tip: 'FOD = עצם או לכלוך המסכן כלי טיס באזור המסלול.' },
      { type: 'mcq', he: 'איך מדווחים על מצב מסלול תפוס?', en: 'How is an occupied runway reported?', opts: [['Occupied', 1], ['Wet', 0], ['Unserviceable', 0], ['Restricted', 0]], tip: 'דיווח מצב מסלול: occupied (תפוס), wet (רטוב), FOD on the runway וכו\'.' },
      { type: 'mcq', he: 'איזה מונח מציין רכב המנחה כלי טיס בהסעה?', en: 'Which term describes a ground vehicle guiding an aircraft during taxi?', opts: [['Follow me car / Inspection vehicle', 1], ['Fire truck', 0], ['Barrier vehicle', 0], ['Rescue crew', 0]], tip: 'Follow me car / inspection vehicle = רכב קרקעי המנחה את כלי הטיס.' },
      { type: 'mcq', he: 'מהי "converging traffic"?', en: 'What is "converging traffic"?', opts: [['תנועה מתכנסת', 1], ['תנועה חוצה', 0], ['תנועה עוקפת', 0], ['תנועה מתבדרת', 0]], tip: 'Converging traffic = תנועה מתכנסת.' },
      { type: 'mcq', he: 'מהי "overtaking traffic"?', en: 'What is "overtaking traffic"?', opts: [['תנועה עוקפת', 1], ['תנועה מתבדרת', 0], ['תנועה עוקבת', 0], ['תנועה מקבילה', 0]], tip: 'Overtaking traffic = תנועה עוקפת.' },
      { type: 'mcq', he: 'מהו "Orbit"?', en: 'What is "Orbit"?', opts: [['המתנה בפניית 360 מעלות', 1], ['פנייה של 180 מעלות', 0], ['ירידה מהירה', 0], ['גישה קצרה', 0]], tip: '360 = Orbit - המתנה בפניית 360 מעלות ליצירת מרווח זמן.' },
      { type: 'mcq', he: 'מתי משתמשים ב-"Break Break"?', en: 'When is "Break Break" used?', opts: [['להפרדה בין הודעות המופנות לכלי טיס שונים בסביבת עבודה עמוסה', 1], ['להפסקה בתוך הודעה לאותו מטוס', 0], ['לביטול תשדורת', 0], ['לפנייה לכל התחנות', 0]], tip: 'Break Break = הפרדה בין שידורים לכלי טיס שונים. Break (בלבד) = הפסקה בתוך הודעה ארוכה לאותו מטוס.' },
      { type: 'dnd', he: 'הרכב/י: "רכב ביקורות מלווה להסעה"', template: 'Follow the __ __', bank: ['inspection', 'vehicle', 'fire', 'truck'], answer: ['inspection', 'vehicle'], tip: 'Inspection vehicle / follow me car = רכב ביקורות המנחה להסעה.' },
      { type: 'listen', he: 'האזן/י והשלם/י: דיווח על מסלול לא פנוי', audio: 'Runway occupied', he2: 'מסלול לא פנוי (תפוס)', tip: 'Occupied = לא פנוי/תפוס - דיווח מצב מסלול.' }
    ]},

    /* ================= 4. אותות קריאה וקריאות קשר (עמ' 5, 11) ================= */
    4: { num: 4, title: 'אותות קריאה, קריאה ראשונה ובדיקת קשר', sub: 'פתיחת קשר, דיווח מיקום והעברת קשר', exercises: [
      { type: 'mcq', he: 'כיצד ישודרו אותות קריאה ונקודות ציון?', en: 'How are call signs and reporting points transmitted?', opts: [['באופן מלא, ללא תרגום משמעותם לאנגלית', 1], ['תמיד מתורגמים לאנגלית', 0], ['רק באות הראשונה', 0], ['לפי בחירת הפקח', 0]], tip: 'אותות קריאה ונקודות ציון ישודרו באופן מלא ללא תרגום משמעותן לאנגלית.' },
      { type: 'mcq', he: 'מהם שמות השירותים הנכונים בפיקוח שדה?', en: 'What are the correct field control service names?', opts: [['Ground, Tower, Approach', 1], ['Ground, Radar, Area', 0], ['Base, Tower, Center', 0], ['Ground, Control, Radar', 0]], tip: 'פיקוח שדה: Ground - קרקע, Tower - מגדל/הקפה, Approach - גישה.' },
      { type: 'mcq', he: 'מהו מבנה קריאה ראשונה ללא תמונה אווירית (פיקוח נהלי)?', en: 'What is the structure of an initial call without radar picture?', opts: [['ATC call sign, Aircraft call sign, altitude, position, destination', 1], ['Aircraft call sign, radar contact', 0], ['Aircraft call sign, ATC clearance', 0], ['ATC call sign בלבד', 0]], tip: 'פיקוח/בקרה נהלית (ללא תמונה אווירית): ATC call sign, Aircraft call sign, altitude, position, destination.' },
      { type: 'mcq', he: 'מהי תשובת הפקח כשמזוהה מגע מכ"ם בקריאה ראשונה?', en: 'What does ATC reply when radar contact is established on initial call?', opts: [['Aircraft call sign, ATC call sign, radar contact', 1], ['Say again', 0], ['Stand-by', 0], ['Report position', 0]], tip: 'כאשר יש תמונה אווירית: Aircraft call sign, ATC call sign, radar contact.' },
      { type: 'dnd', he: 'הרכב/י בדיקת קשר: "ארבע מחמש - קריא"', template: 'Reading you __', bank: ['fower', 'tree', 'fife', 'two'], answer: ['fower'], tip: 'ארבע מחמש = Reading you fower = קריא.' },
      { type: 'dnd', he: 'הרכב/י בדיקת קשר: "חמש מחמש - קריא מצוין"', template: 'Reading you __', bank: ['fife', 'one', 'tree', 'two'], answer: ['fife'], tip: 'חמש מחמש = Reading you fife = קריא באופן מושלם.' },
      { type: 'dnd', he: 'הרכב/י הוראת מעבר קשר', template: '__ contact __ __', bank: ['Aircraft call sign', 'GCU', 'Frequency', 'Tower'], answer: ['Aircraft call sign', 'GCU', 'Frequency'], tip: 'הוראת מעבר קשר: Aircraft call sign, contact GCU/ATC, Frequency.' },
      { type: 'listen', he: 'האזן/י והשלם/י: מטוס בתדר UHF/VHF שעובר יחידה', audio: 'Contact NEGEV Tower', he2: 'עבור לתדר מגדל נגב', template: 'Contact __ __', bank: ['NEGEV', 'KEDEM', 'Tower', 'Ground'], answer: ['NEGEV', 'Tower'], tip: 'מטוס ב-UHF/VHF יועבר תוך ציון או"ק/עורק/תדר היחידה הבאה בלבד.' }
    ]},

    /* ================= 5. מרשה, התנעה והסעה (עמ' 12-14) ================= */
    5: { num: 5, title: 'מרשה טיסה, התנעה והסעה', sub: 'ATC clearance, start-up, taxi ו-crossing', exercises: [
      { type: 'mcq', he: 'כיצד יבקש טייס מרשה טיסה ביוזמתו?', en: 'How does a pilot request an ATC clearance on their own initiative?', opts: [['Aircraft call sign requesting ATC clearance to destination', 1], ['Aircraft call sign advise ready to copy', 0], ['Aircraft call sign start-up approved', 0], ['Aircraft call sign report ready for departure', 0]], tip: 'ביוזמת טייס: Aircraft call sign requesting ATC clearance to flight destination.' },
      { type: 'mcq', he: 'מהי תוספת המרשה כאשר יש לשמור גובה עד נקודה מסוימת?', en: 'Which addition is used to hold altitude until a point?', opts: [['Maintain altitude until cross position at or above altitude', 1], ['Report ready for departure', 0], ['Hold short of runway', 0], ['Expedite climb', 0]], tip: 'תוספות מרשה: Maintain altitude until/cross position at or above altitude/flight direct position.' },
      { type: 'mcq', he: 'מה עונה הטייס לבקשת התנעה כאשר יש עיכוב?', en: 'What does ATC reply when start-up is delayed?', opts: [['Stand by for start-up / expect start-up at UTC time', 1], ['Start-up denied', 0], ['Cancel start-up', 0], ['Report ready for departure', 0]], tip: 'תשובות אפשריות: start-up approved / stand by for start-up / expect start-up at UTC time.' },
      { type: 'mcq', he: 'מהי הוראת ההסעה הכוללת חציית מסלול טיסה?', en: 'What is the taxi instruction that includes crossing a runway?', opts: [['Aircraft call sign taxi from ___ cross runway ___ via ___', 1], ['Aircraft call sign hold short of runway', 0], ['Aircraft call sign line up and wait', 0], ['Aircraft call sign expedite taxi', 0]], tip: 'הוראת הסעה עם חציית מסלול: taxi from ___ cross runway ___ via ___ (hold short of runway).' },
      { type: 'mcq', he: 'כיצד ניתנת הוראת הסעה למסוק?', en: 'How is a taxi instruction given to a helicopter?', opts: [['Air taxi to ___ via ___', 1], ['Taxi to ___ via ___', 0], ['Cross runway ___ via ___', 0], ['Line up and wait', 0]], tip: 'הסעה למסוק: air taxi to ___, via ___ (הסעה בריחוף).' },
      { type: 'mcq', he: 'מה ההוראה הנכונה לעצירת מטוס בהסעה?', en: 'What is the correct instruction to stop an aircraft during taxi?', opts: [['Aircraft call sign, hold position', 1], ['Aircraft call sign, cancel taxi', 0], ['Aircraft call sign, expedite taxi', 0], ['Aircraft call sign, give way', 0]], tip: 'עצירת מטוס בהסעה: Aircraft call sign, hold position.' },
      { type: 'dnd', he: 'הרכב/י בקשת הסעה מהמחסה', template: '__ from shelter __ request taxi to __', bank: ['Aircraft call sign', 'one six', 'Alpha', 'Bravo'], answer: ['Aircraft call sign', 'one six', 'Alpha'], tip: 'בקשת הסעה: Aircraft call sign from shelter/stand ___ request taxi to ___.' },
      { type: 'dnd', he: 'הרכב/י הוראת הכנה לעזיבה', template: 'Aircraft call sign report ready for __', bank: ['departure', 'landing', 'taxi'], answer: ['departure'], tip: 'הכנה לעזיבה: Aircraft call sign report ready for departure.' },
      { type: 'listen', he: 'האזן/י והשלם/י: מרשה טיסה מלא', audio: 'Cleared to Kedem via SID Palmach one, squawk five one five two', he2: 'רשאי לכדם דרך SID פלמ"ח 1, קוד תוכי 5152', template: 'Cleared to Kedem via SID Palmach one, __ __ __ __ __', bank: ['squawk', 'fife', 'one', 'fife', 'two', 'niner'], answer: ['squawk', 'fife', 'one', 'fife', 'two'], tip: 'מרשה טיסה: cleared to destination via SID name, squawk transponder code.' }
    ]},

    /* ================= 6. התיישרות והמראה (עמ' 14-15) ================= */
    6: { num: 6, title: 'התיישרות והמראה', sub: 'Line up, take-off clearance, rejected take-off', exercises: [
      { type: 'mcq', he: 'מהי הוראת ההתיישרות המלאה?', en: 'What is the complete line-up instruction?', opts: [['Line up and wait runway ___, wind direction degrees speed knots, SID ___', 1], ['Line up runway ___ בלבד', 0], ['Cleared for take-off runway ___', 0], ['Hold short of runway ___', 0]], tip: 'הוראת התיישרות: line up and wait runway ___, wind direction degrees speed knots, SID ___.' },
      { type: 'mcq', he: 'מה יאמר הפקח אם המסלול עדיין תפוס בעת מתן הוראת התיישרות?', en: 'What does ATC add if the runway is still occupied when clearing line-up?', opts: [['runway still occupied', 1], ['runway vacated', 0], ['cleared for take-off', 0], ['hold position', 0]], tip: 'אם המסלול אינו פנוי בעת ההתיישרות - יש לציין: "runway still occupied".' },
      { type: 'mcq', he: 'מה יאמר הפקח כאשר המסלול מתפנה וניתן אישור המראה?', en: 'What does ATC say once the runway is clear and take-off is cleared?', opts: [['runway vacated, cleared for take-off runway ___', 1], ['line up and wait', 0], ['runway still occupied', 0], ['hold short of runway', 0]], tip: 'כשהמסלול מתפנה: runway vacated, cleared for take-off runway ___.' },
      { type: 'mcq', he: 'איזו הוראה נכונה להפסקת המראה למטוס שעדיין לא החל ריצה?', en: 'What is the correct instruction to cancel take-off before roll has begun?', opts: [['Hold position, cancel take off, I say again, cancel take off', 1], ['Stop immediately', 0], ['Go around', 0], ['Line up and wait', 0]], tip: 'הפסקת המראה למטוס שטרם החל ריצה: hold position, cancel take off, I say again, cancel take off (+ סיבה). תשובת הטייס: Holding position.' },
      { type: 'mcq', he: 'מהי ההוראה למטוס שכבר החל ריצת המראה ויש לעצור אותו?', en: 'What is the instruction for an aircraft already rolling that must stop?', opts: [['Stop immediately, stop immediately', 1], ['Cancel take off', 0], ['Hold position', 0], ['Go around', 0]], tip: 'למטוס שהחל ריצה: Aircraft call sign stop immediately (חוזרים פעמיים). תשובת הטייס: Stopping.' },
      { type: 'mcq', he: 'מתי נשדר "take off immediately or vacate runway"?', en: 'When is "take off immediately or vacate runway" transmitted?', opts: [['כשהמטוס טרם החל ריצת המראה ויש דחיפות שימריא', 1], ['לאחר תפיסה בכבל', 0], ['בעת הליכה סביב', 0], ['בעת הודעת חירום רפואי', 0]], tip: 'אם המטוס טרם החל ריצה וקיימת דחיפות להמריא: take off immediately or vacate runway.' },
      { type: 'dnd', he: 'הרכב/י הוראת המראה מלאה', template: '__ runway __ __, cleared for take-off', bank: ['Akrav one', 'two niner', 'right', 'left'], answer: ['Akrav one', 'two niner', 'right'], tip: 'אישור המראה: Aircraft call sign, ATC clearance, runway __, cleared for take-off.' },
      { type: 'listen', he: 'האזן/י והשלם/י: המשך לאחר המראה', audio: 'After departure maintain runway heading, then turn right to position Beit Kama', he2: 'לאחר עזיבה שמור ציר מסלול, אח"כ פנה ימינה לנקודת בית קמה', template: 'After departure maintain runway __, then turn __ to position Beit Kama', bank: ['heading', 'right', 'left', 'altitude'], answer: ['heading', 'right'], tip: 'הוראות נוספות לאחר המראה: after departure maintain runway heading, then turn right/left to position.' }
    ]},

    /* ================= 7. הקפה ודיווח ירוקים (עמ' 15-16) ================= */
    7: { num: 7, title: 'הקפה ודיווח ירוקים', sub: 'Circuit legs, gear-down report, sequencing', exercises: [
      { type: 'mcq', he: 'מה פירוש "Extend downwind"?', en: 'What does "Extend downwind" mean?', opts: [['הארכת צלע עם הרוח לפני פנייה לצלע בסיס', 1], ['קיצור צלע עם הרוח', 0], ['פנייה מיידית לפיינל', 0], ['ביטול ההקפה', 0]], tip: 'Extend downwind = הארך עם הרוח - הארכת הצלע לפני פנייה לצלע בסיס.' },
      { type: 'mcq', he: 'מהי "Low approach"?', en: 'What is a "Low approach"?', opts: [['גישה עם הנמכה עד להליכה סביב, ללא נחיתה/נגיעה', 1], ['גישה ישירה לנחיתה', 0], ['גישה עם עיגול 360', 0], ['גישת ראייה בלבד', 0]], tip: 'Low approach = הנמכה לגישה עד להליכה סביב - ללא נחיתה או נגיעה.' },
      { type: 'mcq', he: 'מהו הדיווח הראשוני מהטייס בבדיקת גלגלים?', en: 'What is the pilot\'s initial gear-check report?', opts: [['Gear down and locked', 1], ['Gear appears down', 0], ['Number two, runway', 0], ['Traffic in sight', 0]], tip: 'דיווח הטייס: Aircraft call sign, gear down and locked.' },
      { type: 'mcq', he: 'כיצד עונה הפקח לדיווח הירוקים?', en: 'How does ATC respond to the gear-down report?', opts: [['Number ___ runway ___, wind direction degrees speed knots', 1], ['Cleared to land', 0], ['Report gear again', 0], ['Cleared for take-off', 0]], tip: 'תשובת הפקח: Aircraft call sign, number ___ runway ___, wind direction degrees speed knots.' },
      { type: 'mcq', he: 'מה מוסיף הפקח בלילה לאחר מתן נתוני הרוח?', en: 'What does ATC add at night after giving wind data?', opts: [['Report gear down and locked again', 1], ['Report traffic in sight', 0], ['Report speed', 0], ['Report position', 0]], tip: 'בלילה, לאחר מתן נתוני הרוח יבקש הפקח: report gear down and locked again.' },
      { type: 'mcq', he: 'איזו הוראה משמשת לזירוז שיעור טיפוס בהקפה?', en: 'Which instruction is used to speed up rate of climb?', opts: [['Expedite climb', 1], ['Stop climb at', 0], ['Rate of descent', 0], ['Maintain altitude until', 0]], tip: 'Expedite climb = זרז טיפוס - בשימוש כשרוצים לזרז את שיעור הטיפוס.' },
      { type: 'dnd', he: 'הרכב/י הוראת כניסה להקפה', template: '__ TOWER, descend to altitude __ feet, join __', bank: ['NEGEV', 'tree tousand', 'downwind', 'final'], answer: ['NEGEV', 'tree tousand', 'downwind'], tip: 'הוראת כניסה להקפה: airport name TOWER, descend/climb to altitude ___ feet, join circuit leg.' },
      { type: 'listen', he: 'האזן/י והשלם/י: מספור בהקפה', audio: 'Arayot, number two runway two niner, wind two tree zero degrees one zero knots', he2: 'ארייות, מספר שתיים למסלול 29, רוח 230 מעלות 10 קשר', template: 'Arayot, number __ runway two niner, wind two tree zero degrees __ knots', bank: ['two', 'one zero', 'tree', 'six'], answer: ['two', 'one zero'], tip: 'תשובת הפקח לירוקים כוללת מספר ברצף, מסלול, כיוון ועוצמת רוח.' }
    ]},

    /* ================= 8. מתן מרשה לגישה (עמ' 18 - רק פיקוח גישה) ================= */
    8: { num: 8, title: 'מתן מרשה לגישה', sub: 'Approach clearance - straight-in / visual / holding', exercises: [
      { type: 'mcq', he: 'מה פירוש "Cleared straight-in approach runway ___"?', en: 'What does "Cleared straight-in approach runway ___" mean?', opts: [['ביצוע גישה ישירות לציר הפיינל, ללא הקפה', 1], ['גישת ראייה בלבד', 0], ['המתנה בגובה', 0], ['הליכה סביב', 0]], tip: 'Straight in approach = גישה ישירה למסלול - ביצוע ישיר לציר הפיינל ללא הקפה.' },
      { type: 'mcq', he: 'מהי "Cleared visual approach"?', en: 'What is "Cleared visual approach"?', opts: [['אישור לגישת ראייה המבוססת על קשר עין עם הקרקע', 1], ['אישור לגישת מכשירים בלבד', 0], ['אישור המתנה', 0], ['אישור הליכה סביב', 0]], tip: 'Cleared visual approach = רשאי לגישת ראייה - אישור המבוסס על קשר עין עם הקרקע.' },
      { type: 'mcq', he: 'מהי המשמעות של "Maintain own separation from (aircraft type)" בגישה?', en: 'What does "Maintain own separation from (aircraft type)" mean during approach?', opts: [['הטלת אחריות ההפרדה על הטייס בגישת ראייה', 1], ['הפקח אחראי להפרדה', 0], ['הוראת המתנה', 0], ['ביטול הגישה', 0]], tip: 'Maintain own separation = שמור הפרדה עצמית - האחריות עוברת לטייס בגישת ראייה.' },
      { type: 'mcq', he: 'מהו "Expected Approach Time (EAT)"?', en: 'What is "Expected Approach Time (EAT)"?', opts: [['הודעה מה הזמן הצפוי לתחילת גישה, בד"כ ביציאה מהמתנה', 1], ['הזמן שנותר לנחיתה', 0], ['משך הגישה בפועל', 0], ['זמן ההמראה הצפוי', 0]], tip: 'EAT = זמן גישה צפוי - מודיעים לטייס מתי צפויה תחילת תהליך הגישה, בדרך כלל ביציאה מהמתנה.' },
      { type: 'mcq', he: 'מה עושה הפקח אם לא ניתן לבצע את הגישה מייד?', en: 'What must ATC do if the approach cannot be executed immediately?', opts: [['לדווח למטוס זמן גישה צפוי ולהנחות להמתנה', 1], ['להורות מיידית על הליכה סביב', 0], ['לבטל את המרשה', 0], ['להעביר קשר ליחידה אחרת', 0]], tip: 'אם לא ניתן לבצע את הגישה - יש לדווח זמן גישה צפוי (EAT) ולתת הנחיית המתנה.' },
      { type: 'dnd', he: 'הרכב/י הנחיית המתנה', template: 'Hold at __ point, __ side, at altitude __', bank: ['reporting', 'right', 'fife tousand', 'left'], answer: ['reporting', 'right', 'fife tousand'], tip: 'הנחיית המתנה: המתן בנקודה (מפורסמת), בימנית/שמאלית, בגובה מסוים.' },
      { type: 'listen', he: 'האזן/י והשלם/י: אישור גישה ישירה', audio: 'Cleared straight in approach runway two niner', he2: 'רשאי לגישה ישירה למסלול 29', template: 'Cleared __ __ approach runway two niner', bank: ['straight', 'in', 'visual', 'holding'], answer: ['straight', 'in'], tip: 'Cleared straight-in approach = אישור לביצוע גישה ישירה ללא הקפה.' }
    ]},

    /* ================= 9. נחיתה ואחרי נחיתה (עמ' 16-17, 35-39) ================= */
    9: { num: 9, title: 'נחיתה ואחרי נחיתה', sub: 'Landing clearance, go-around, runway vacating, 180 backtrack', exercises: [
      { type: 'mcq', he: 'מהי הוראת הנחיתה הבסיסית?', en: 'What is the basic landing instruction?', opts: [['Aircraft call sign, runway ___ cleared to land', 1], ['Aircraft call sign, cleared for take-off', 0], ['Aircraft call sign, line up and wait', 0], ['Aircraft call sign, hold short', 0]], tip: 'הוראת נחיתה: Aircraft call sign, runway ___ cleared to land.' },
      { type: 'mcq', he: 'מהי ההוראה הנכונה לנחיתת מסוק?', en: 'What is the correct landing clearance for a helicopter?', opts: [['Verify area vacated, cleared to land + wind', 1], ['Cleared for touch and go', 0], ['Runway vacated, cleared to land', 0], ['Report gear down and locked', 0]], tip: 'למסוק: (שם נקודה), verify area vacated, cleared to land + wind.' },
      { type: 'mcq', he: 'מה נדרש כתנאי לאישור נחיתה בקשר עין (ק"ע)?', en: 'What is required before a visual-contact landing clearance?', opts: [['שהטייס ידווח traffic in sight', 1], ['שהמסלול יהיה יבש', 0], ['שהרוח תהיה קלה', 0], ['אין תנאי מוקדם', 0]], tip: 'נחיתה בק"ע: when traffic in sight cleared to land - מותנה בכך שהטייס מדווח קשר עין.' },
      { type: 'mcq', he: 'מהי "cleared for touch and go"?', en: 'What is "cleared for touch and go"?', opts: [['אישור למטוס המתרגל נגיעות על המסלול', 1], ['אישור נחיתה מלאה', 0], ['אישור הליכה סביב', 0], ['אישור עצירה במקום', 0]], tip: 'Cleared for touch and go = אישור נגיעה והמראה - למטוס שמתרגל נגיעות.' },
      { type: 'mcq', he: 'מהי המבנה הנכון להוראת הליכה סביב?', en: 'What is the correct structure for a go-around instruction?', opts: [['Go around, flight instructions, reason', 1], ['Go around בלבד', 0], ['Cleared to land, go around', 0], ['Cancel landing', 0]], tip: 'הליכה סביב: go around + הוראת טיסה (כיוון וגובה) + סיבה.' },
      { type: 'mcq', he: 'איך מבצעים ריצת חזרה (180) על מסלול בשימוש למניעת בלבול?', en: 'How is a 180 backtrack performed to avoid confusion on an active runway?', opts: [['תוך ציון שם המסלול בשימוש, למשל "runway two six left"', 1], ['ללא ציון מספר המסלול', 0], ['רק בשידור עברית', 0], ['אין צורך לציין דבר', 0]], tip: 'בהסעה ב-180 על מסלול פעיל יש לציין את שם המסלול במדויק כדי למנוע בלבול הטייס.' },
      { type: 'mcq', he: 'מה כוללת ההוראה "אחרי נחיתה"?', en: 'What does the "after landing" instruction include?', opts: [['Vacate the runway via ___, expedite taxi, make one eighty backtrack, report runway vacated', 1], ['Cleared to land בלבד', 0], ['Hold short of runway', 0], ['Line up and wait', 0]], tip: 'אחרי נחיתה: vacate the runway via ___, expedite taxi, make one eighty backtrack runway, report runway vacated.' },
      { type: 'dnd', he: 'הרכב/י אישור נחיתה מלא', template: 'Arayot, runway __ __ cleared to land', bank: ['zero', 'fife', 'two', 'niner'], answer: ['zero', 'fife'], tip: 'אישור נחיתה: Aircraft call sign, runway ___ cleared to land.' },
      { type: 'listen', he: 'האזן/י והשלם/י: פינוי מסלול לאחר נחיתה', audio: 'Vacate the runway via Yankee, expedite taxi, report runway vacated', he2: 'פנה את המסלול דרך יאנקי, זרז הסעה, דווח פינוי מסלול', template: '__ the runway via Yankee, __ taxi, report runway vacated', bank: ['Vacate', 'expedite', 'Cross', 'hold'], answer: ['Vacate', 'expedite'], tip: 'אחרי נחיתה: vacate the runway via, expedite taxi, report runway vacated.' }
    ]},

    /* ================= 10. בקרת מהירות וגובה (עמ' 21-22) ================= */
    10: { num: 10, title: 'בקרת מהירות וגובה', sub: 'שתי הטבלאות המרכזיות: Speed control ו-Altitude', exercises: [
      { type: 'mcq', he: 'מהי "Minimum clean speed"?', en: 'What is "Minimum clean speed"?', opts: [['המהירות הנמוכה ביותר ללא מדפים/גרר', 1], ['המהירות האיטית ביותר בגישה סופית', 0], ['מהירות ללא הגבלה כלל', 0], ['מהירות הטיפוס המומלצת', 0]], tip: 'Minimum clean speed = מהירות מינימלית ללא גרר (ללא מדפים).' },
      { type: 'mcq', he: 'מהי "Minimum approach speed"?', en: 'What is "Minimum approach speed"?', opts: [['המהירות האיטית ביותר בגישה הסופית', 1], ['המהירות הנמוכה ביותר ללא מדפים', 0], ['מהירות ההמראה המינימלית', 0], ['מהירות הטיפוס הראשונית', 0]], tip: 'Minimum approach speed = מהירות גישה מינימלית - האיטית ביותר בגישה סופית.' },
      { type: 'mcq', he: 'מה ההבדל בין "Maintain present speed" ל-"Resume normal speed"?', en: 'What is the difference between "Maintain present speed" and "Resume normal speed"?', opts: [['הראשון מקפיא את המהירות הנוכחית, השני מבטל הגבלות מהירות', 1], ['שתיהן זהות', 0], ['השני מקפיא, הראשון מבטל', 0], ['שתיהן משמשות רק בהמראה', 0]], tip: 'Maintain present speed = הקפאת מהירות נוכחית · Resume normal speed = ביטול הגבלות מהירות קודמות.' },
      { type: 'mcq', he: 'מהי "Rate (number) feet per minute"?', en: 'What is "Rate (number) feet per minute"?', opts: [['הגדרת שיעור טיפוס או הנמכה בקצב מסוים', 1], ['מהירות אופקית', 0], ['גובה מקסימלי', 0], ['מרחק מנקודה', 0]], tip: 'Rate ___ feet per minute = קצב רגל לדקה - הגדרת שיעור טיפוס/הנמכה.' },
      { type: 'mcq', he: 'מהי "Cross (point) at (alt)"?', en: 'What is "Cross (point) at (alt)"?', opts: [['חובת הגעה לגובה מסוים בנקודה מוגדרת', 1], ['בקשת גובה מהטייס', 0], ['הוראת האטה', 0], ['ביטול הגבלת גובה', 0]], tip: 'Cross (point) at (alt) = תחצה (נקודה) בגובה - חובת הגעה לגובה בנקודת מוגדרת.' },
      { type: 'mcq', he: 'מהי המטרה של "Confirm QNH"?', en: 'What is the purpose of "Confirm QNH"?', opts: [['וידוא כיול מד הגובה בהתאם ללחץ מול הפקח', 1], ['בדיקת תדר', 0], ['בדיקת מהירות', 0], ['בדיקת כיוון רוח', 0]], tip: 'Confirm QNH = ודא QNH - וידוא כיול מד הגובה בהתאם ללחץ.' },
      { type: 'dnd', he: 'הרכב/י הוראת מהירות', template: 'Reduce speed to __ __ knots', bank: ['one', 'eight zero', 'two', 'zero'], answer: ['one', 'eight zero'], tip: 'הקטן/האט מהירות ל-(מספר) - שינוי מהירות אקטיבי.' },
      { type: 'dnd', he: 'הרכב/י הוראת גובה עם נקודת חיתוך', template: 'Cross Hazor at or above __ __ feet', bank: ['fife', 'tousand', 'two', 'hundred'], answer: ['fife', 'tousand'], tip: 'Cross (point) at or above altitude - חובת הגעה לגובה בנקודה מוגדרת.' },
      { type: 'listen', he: 'האזן/י והשלם/י: ביטול הגבלה', audio: 'Restriction cancelled, resume normal speed', he2: 'הגבלה מבוטלת, חזור למהירות רגילה', template: 'Restriction __, resume __ speed', bank: ['cancelled', 'normal', 'imposed', 'reduced'], answer: ['cancelled', 'normal'], tip: 'Restriction cancelled = הגבלה מבוטלת · Resume normal speed = חזור למהירות רגילה.' }
    ]},

    /* ================= 11. הוראה מותנית, תמונה אווירית ומערבולות (עמ' 23-24) ================= */
    11: { num: 11, title: 'הוראה מותנית ותמונה אווירית', sub: 'Conditional clearance, traffic advisories, wake turbulence', exercises: [
      { type: 'mcq', he: 'מהו מבנה ההוראה המותנית?', en: 'What is the structure of a conditional clearance?', opts: [['Report traffic in sight → Looking out → behind traffic, instructions behind', 1], ['Traffic in sight בלבד', 0], ['Looking out בלבד', 0], ['Behind traffic בלבד', 0]], tip: 'הוראה מותנית: הפקח מבקש "report traffic in sight", הטייס משיב "Looking out", ולאחר זיהוי הפקח נותן הוראה "behind traffic, instructions behind".' },
      { type: 'mcq', he: 'איך יגיב טייס לאחר קבלת מידע על תנועה אווירית מהנת"א?', en: 'How should a pilot respond after receiving traffic information from ATC?', opts: [['Looking out (ללא רידבק)', 1], ['לחזור על כל המידע (רידבק מלא)', 0], ['Roger בלבד', 0], ['Standby', 0]], tip: 'לאחר קבלת התראה/מידע על תנועה אין להחזיר רידבק אלא לענות בפשטות: Looking out.' },
      { type: 'mcq', he: 'מה עונה הטייס אם לא נוצר קשר עין עם התנועה המדווחת?', en: 'What does the pilot report if visual contact with traffic is not established?', opts: [['Negative contact', 1], ['Looking out', 0], ['Traffic in sight', 0], ['Unable', 0]], tip: 'אם לא נוצר קשר עין: Negative contact. אם נוצר קשר עין: Traffic in sight.' },
      { type: 'mcq', he: 'מדוע יש להימנע ממתן מידע על תנועה אווירית יחד עם הוראת טיסה?', en: 'Why avoid combining traffic information with a flight instruction in the same transmission?', opts: [['כדי למנוע בלבול בין הוראת טיסה להתראה - יש להפריד באמצעות המילה "תנועה"', 1], ['אין סיבה מיוחדת', 0], ['כי זה אסור לפי ICAO בלבד', 0], ['כדי לקצר תשדורות', 0]], tip: 'יש להימנע ממתן מידע תנועה יחד עם הוראת טיסה - ואם נדרש, להפריד באופן ברור באמצעות המילה "תנועה" / traffic.' },
      { type: 'mcq', he: 'כיצד תינתן אזהרת מערבולות קצה כנף?', en: 'How is a wake turbulence warning transmitted?', opts: [['Call sign, caution wake turbulence due to ___', 1], ['Call sign, caution FOD', 0], ['Call sign, hold position', 0], ['Call sign, expedite climb', 0]], tip: 'אזהרת מערבולות קצה כנף: Call sign, caution wake turbulence due to ___.' },
      { type: 'mcq', he: 'כיצד מציינים סוג מטוס במידע על תנועה?', en: 'How is aircraft type indicated in traffic information?', opts: [['בשמו הצבאי או האזרחי, לא באות קריאה (למעט ידוע ממערכת "שקנאי")', 1], ['תמיד באות הקריאה', 0], ['אין צורך לציין סוג מטוס', 0], ['רק במספר זנב', 0]], tip: 'כאשר ניתן סוג מטוס - יש להשתמש בשמו הצבאי/אזרחי ולא באות הקריאה, אלא אם מדובר בייעוד ממערכת "שקנאי".' },
      { type: 'dnd', he: 'הרכב/י מידע על תנועה', template: '__ traffic at __ feet over Beit Kama, F-sixteen', bank: ['Crossing', 'two tousand', 'Converging', 'niner'], answer: ['Crossing', 'two tousand'], tip: 'מבנה מידע תנועה: opposite/same/crossing/overtaking traffic at (altitude) over (position) (aircraft type).' },
      { type: 'listen', he: 'האזן/י והשלם/י: אזהרת מערבולות', audio: 'Gamal, caution wake turbulence due to heavy transport ahead', he2: 'גמל, זהירות מערבולות קצה כנף עקב מטוס תובלה כבד לפניך', template: 'Gamal, caution __ __ due to heavy transport ahead', bank: ['wake', 'turbulence', 'jet', 'blast'], answer: ['wake', 'turbulence'], tip: 'Caution wake turbulence due to ___ - אזהרה חובה במסלולים ובמרחב.' }
    ]},

    /* ================= 12. מזג אוויר ו-ATIS (עמ' 24-25) ================= */
    12: { num: 12, title: 'דיווחי מזג אוויר ו-ATIS', sub: 'עננות, רוח, ראות ושידור מוקלט', exercises: [
      { type: 'mcq', he: 'איך מדווחים על שמיים ללא עננות כלל?', en: 'How is a completely clear sky reported?', opts: [['Sky clear 0/8', 1], ['Few clouds', 0], ['Scattered clouds', 0], ['Overcast', 0]], tip: 'Sky clear 0/8 = שמיים ללא עננות כלל.' },
      { type: 'mcq', he: 'איזו כמות עננות מתארת "Broken clouds"?', en: 'What cloud coverage does "Broken clouds" describe?', opts: [['5-7/8', 1], ['1-2/8', 0], ['3-4/8', 0], ['8/8', 0]], tip: 'Broken clouds = 5-7 שמיניות (עננות שבורה).' },
      { type: 'mcq', he: 'איזו כמות עננות מתארת "Scattered clouds"?', en: 'What cloud coverage does "Scattered clouds" describe?', opts: [['3-4/8', 1], ['1-2/8', 0], ['5-7/8', 0], ['8/8', 0]], tip: 'Scattered clouds = 3-4 שמיניות (עננות מפוזרת).' },
      { type: 'mcq', he: 'מה ההבדל בין TOP ל-CEILING בדיווח עננות?', en: 'What is the difference between TOP and CEILING in cloud reports?', opts: [['TOP = פסגת הענן, CEILING = בסיס הענן', 1], ['שתיהן מתארות את אותו הדבר', 0], ['TOP = בסיס, CEILING = פסגה', 0], ['אין קשר לעננות', 0]], tip: 'בדיווח גובה עננות מציינים אם מדובר בפסגת ענן (TOP) או בבסיס ענן (CEILING).' },
      { type: 'mcq', he: 'כיצד תינתן עוצמת רוח בדיווח?', en: 'How is wind speed reported?', opts: [['בקשרים, ללא הגיית כל ספרה בנפרד', 1], ['בק"מ לשעה, כל ספרה בנפרד', 0], ['תמיד "Wind calm"', 0], ['במיילים לשעה', 0]], tip: 'עוצמת הרוח תינתן בקשרים - אין צורך להגות כל ספרה בנפרד (לעומת כיוון, שנהגה ספרה-ספרה).' },
      { type: 'mcq', he: 'עד כמה קשר ניתן לדווח "Wind calm"?', en: 'Up to how many knots can "Wind calm" be reported?', opts: [['עד שלושה קשרים', 1], ['עד חמישה קשרים', 0], ['עד עשרה קשרים', 0], ['אין הגבלה', 0]], tip: 'Wind calm - ניתן לדווח עד שלושה קשרים בלבד.' },
      { type: 'mcq', he: 'מהו ATIS?', en: 'What is ATIS?', opts: [['Automatic Terminal Information Service - שידור מוקלט אוטומטי עם מידע שדה ומזג אוויר', 1], ['ערוץ חירום ייעודי', 0], ['בקשת מזג אוויר מהטייס', 0], ['דיווח מכ"ם אוטומטי', 0]], tip: 'ATIS = Automatic Terminal Information Service - שידור מוקלט אוטומטי הכולל מידע שדה ומזג אוויר.' },
      { type: 'dnd', he: 'הרכב/י דיווח רוח משתנה', template: 'Wind variable between __ and __ degrees __ knots', bank: ['two one zero', 'two fife zero', 'one two', 'zero'], answer: ['two one zero', 'two fife zero', 'one two'], tip: 'רוח משתנה: Wind variable between (direction) and (direction) degrees (speed) knots.' },
      { type: 'listen', he: 'האזן/י והשלם/י: דיווח משבים', audio: 'Wind two tree zero degrees one zero knots gusting tree zero', he2: 'רוח 230 מעלות, 10 קשר עם משבים עד 30', template: 'Wind two tree zero degrees one zero knots __ tree zero', bank: ['gusting', 'variable', 'calm', 'reduce'], answer: ['gusting'], tip: 'משבים (Gust) - יש לציין את עוצמת המשב המרבית, למשל: gusting tree zero.' }
    ]},

    /* ================= 13. חירום ואמצעי עצירה (עמ' 25-26) ================= */
    13: { num: 13, title: 'חירום ואמצעי עצירה', sub: 'קריאות מצוקה, חירום רפואי, ורטיגו, רשת ווו', exercises: [
      { type: 'mcq', he: 'מהי קריאת המצוקה לתקלה שאינה דורשת סיוע מיידי?', en: 'What is the distress call for a malfunction that does not require immediate assistance?', opts: [['"Pan-Pan, Pan-Pan, Pan-Pan"', 1], ['"Mayday, Mayday, Mayday"', 0], ['"Emergency, Emergency"', 0], ['"Barrier, Barrier, Barrier"', 0]], tip: 'תקלה שאינה דורשת סיוע מיידי: הכרזה בקשר "Pan-Pan, Pan-Pan, Pan-Pan".' },
      { type: 'mcq', he: 'מהי קריאת המצוקה לחירום הדורש סיוע מיידי?', en: 'What is the distress call for an emergency requiring immediate assistance?', opts: [['"Mayday, Mayday, Mayday"', 1], ['"Pan-Pan, Pan-Pan, Pan-Pan"', 0], ['"Hold position"', 0], ['"Standby"', 0]], tip: 'חירום הדורש סיוע מיידי: הכרזה בקשר ע"י הטייס "Mayday, Mayday, Mayday".' },
      { type: 'mcq', he: 'מה יכול הפקח לשאול אם אינו בטוח במהות/חומרת התקלה?', en: 'What may ATC ask if unsure of the nature or severity of a malfunction?', opts: [['"Are you declaring an emergency?"', 1], ['"Report gear down and locked"', 0], ['"Say again"', 0], ['"Confirm QNH"', 0]], tip: 'אם לא ברור לפקח מהות התקלה - ניתן לשאול: "Are you declaring an emergency?"' },
      { type: 'mcq', he: 'איך מוכרז חירום רפואי?', en: 'How is a medical emergency declared?', opts: [['medical + Pan-Pan / Mayday', 1], ['רק Mayday', 0], ['רק Pan-Pan', 0], ['Emergency medical only', 0]], tip: 'חירום רפואי: הכרזה בקשר "medical" + Pan-Pan/Mayday (לפי חומרת המצב).' },
      { type: 'mcq', he: 'איך מדווח הפקח על מצב כן נסע שנראה כבעייתי?', en: 'How does ATC report an apparent gear problem?', opts: [['Gear appears down/up, right/left/main gear appears down/up', 1], ['Gear down and locked', 0], ['Gear failure, declare emergency', 0], ['Verify gear', 0]], tip: 'דיווחי הפקח על מצב כן נסע: gear appears down/up, right/left/main gear appears down/up.' },
      { type: 'mcq', he: 'מהי הטרמינולוגיה במקרה חשד ל"ורטיגו"?', en: 'What is the terminology used when vertigo is suspected?', opts: [['*Call sign* attention, you may be experiencing vertigo, switch to full instrument flight', 1], ['*Call sign* declare emergency immediately', 0], ['*Call sign* go around immediately', 0], ['*Call sign* hold position', 0]], tip: 'בעת חשד לורטיגו: *Call sign* attention, you may be experiencing vertigo, switch to full instrument flight (לטייסי חה"א בלבד).' },
      { type: 'mcq', he: 'מה אומר הטייס בבקשה להרמת רשת?', en: 'What does a pilot say when requesting the barrier/net be raised?', opts: [['"Barrier, Barrier, Barrier runway (number)"', 1], ['"Hook appears down"', 0], ['"Mayday, Mayday, Mayday"', 0], ['"Cancelling Mayday"', 0]], tip: 'בקשה להרמת רשת מהטייס: "Barrier, Barrier, Barrier runway (number)".' },
      { type: 'mcq', he: 'מה מדווח הפקח כשמטוס נתפס בכבל עצירה?', en: 'What does ATC report when an aircraft engages the arresting cable?', opts: [['Aircraft call sign first/second arresting cable engaged', 1], ['Aircraft call sign hook appears down', 0], ['Aircraft call sign barrier up', 0], ['Aircraft call sign go around', 0]], tip: 'כשהמטוס נתפס בכבל: Aircraft call sign first/second arresting cable engaged.' },
      { type: 'dnd', he: 'הרכב/י דיווח על מצב ווו', template: 'Aircraft call sign __ appears __', bank: ['hook', 'down', 'gear', 'up'], answer: ['hook', 'down'], tip: 'זיהוי ווו מטה: Aircraft call sign, hook appears down.' },
      { type: 'listen', he: 'האזן/י והשלם/י: ביטול קריאת מצוקה', audio: 'Cancelling Mayday', he2: 'ביטול קריאת מצוקה', tip: 'ביטול קריאת מצוקה: "cancelling Mayday/Pan-Pan".' }
    ]},

    /* ================= 14. שותף אמריקאי (עמ' 39-40) ================= */
    14: { num: 14, title: 'נדב"ר חריג - שותף אמריקאי', sub: 'מונחים ייחודיים לצוותי האוויר האמריקאים', exercises: [
      { type: 'mcq', he: 'מה פירוש "2 Mikes"?', en: 'What does "2 Mikes" mean?', opts: [['2 דקות (Minutes)', 1], ['2 מיילים', 0], ['2 מטרים', 0], ['2 קשרים', 0]], tip: 'MIKE = קיצור ל-Minutes, לדוגמה: 2 Mikes = 2 דקות.' },
      { type: 'mcq', he: 'מה פירוש "ABORTING TAKE OFF"?', en: 'What does "ABORTING TAKE OFF" mean?', opts: [['דיווח הפסקת המראה', 1], ['בקשה להמראה', 0], ['אישור המראה', 0], ['בקשה לעצירה במקום', 0]], tip: 'ABORTING TAKE OFF - מונח אמריקאי לדיווח הפסקת המראה (לעומת "cancel takeoff" ב-ATC).' },
      { type: 'mcq', he: 'מה פירוש "CIRCUIT PATTERN"?', en: 'What does "CIRCUIT PATTERN" mean?', opts: [['טיסה לפי צורת ההקפה', 1], ['תהליך גישת מכשירים', 0], ['אזור המתנה', 0], ['בדיקת קשר', 0]], tip: 'CIRCUIT PATTERN = טיסה ע"פ צורת ההקפה - השם האמריקאי להקפה.' },
      { type: 'mcq', he: 'מה פירוש "HUNG ORDNANCE"?', en: 'What does "HUNG ORDNANCE" mean?', opts: [['תקלת חימוש / חימוש תקוע', 1], ['פגיעה בכנף', 0], ['תקלת גלגלים', 0], ['תקלת דלק', 0]], tip: 'HUNG GUN / HUNG ORDNANCE = תקלת חימוש / חימוש תקוע.' },
      { type: 'mcq', he: 'מהי "WING TIP CLEARANCE"?', en: 'What is "WING TIP CLEARANCE"?', opts: [['מרווח קצה כנף נקי, לוידוא שסוג המטוס מתאים למסלול', 1], ['אישור המראה', 0], ['אזהרת מערבולות', 0], ['אישור חציית מסלול', 0]], tip: 'WING TIP CLEARANCE = מרווח קצה כנף נקי - וידוא התאמת סוג המטוס למסלול.' },
      { type: 'mcq', he: 'מה פירוש "REQUEST CLOSE"?', en: 'What does "REQUEST CLOSE" mean?', opts: [['בקשה לטוס ישירות לעם הרוח, בד"כ אחרי גישה נמוכה', 1], ['בקשה לגישה קרובה למסלול אחר', 0], ['בקשה לסגור את המשימה', 0], ['בקשה לירידה מהירה', 0]], tip: 'REQUEST CLOSE = בקשה לטיסה ישירה לעם הרוח, בדרך כלל אחרי גישה נמוכה (Low approach).' },
      { type: 'mcq', he: 'מהי "DIRECT GEAR POINT"?', en: 'What is "DIRECT GEAR POINT"?', opts: [['טיסה ישירות לנקודת "ירוקים"', 1], ['טיסה ישירה למסלול', 0], ['בדיקת גלגלים באוויר', 0], ['נקודת פנייה לצלע בסיס', 0]], tip: 'DIRECT GEAR POINT = טיסה ישירות לנקודת הירוקים (gear check point).' },
      { type: 'mcq', he: 'מהי "NEGATIVE ATIS"?', en: 'What is "NEGATIVE ATIS"?', opts: [['הודעה שהצוות לא האזין ל-ATIS', 1], ['הודעה שאין שידור ATIS', 0], ['הודעה שהמזג אוויר גרוע', 0], ['הודעה על ATIS שגוי', 0]], tip: 'NEGATIVE ATIS = הודעת הצוות שלא האזין לשידור ה-ATIS לפני יצירת הקשר.' },
      { type: 'mcq', he: 'איזה מונח ישתמשו בו הצוותים האמריקאים במקום MAYDAY/PAN-PAN?', en: 'Which term do American crews typically use instead of MAYDAY/PAN-PAN?', opts: [['EMERGENCY', 1], ['DISTRESS', 0], ['URGENCY', 0], ['ABORT', 0]], tip: 'EMERGENCY - מונח שישתמשו בו הצוותים האמריקאים במקרה חירום, לרוב במקום MAYDAY או PAN-PAN.' },
      { type: 'mcq', he: 'מתי משדרים "Alarm Green"?', en: 'When is "Alarm Green" transmitted?', opts: [['בסוף אירוע, כאשר ניתן לחזור לנחיתה בבטיחות', 1], ['בעת זיהוי איום', 0], ['בעת פגיעה בבסיס', 0], ['בתחילת אירוע', 0]], tip: 'Alarm Green = סוף אירוע, ניתן לחזור לנחיתה בבטיחות (לעומת Alarm Red/Black).' },
      { type: 'dnd', he: 'הרכב/י דיווח כוח מנוע בסרק (מונח אמריקאי)', template: '__ POWER', bank: ['IDLE', 'FULL', 'MAX'], answer: ['IDLE'], tip: 'IDLE POWER = כוח מנוע על סרק (מונח אמריקאי; ICAO/ישראלי: flight idle).' },
      { type: 'listen', he: 'האזן/י והשלם/י: כינוי לצלע מת', audio: 'INITIAL', he2: 'כינוי אמריקאי לצלע מת (upwind)', tip: 'INITIAL = כינוי אמריקאי לצלע מת בהקפה.' }
    ]},

    /* ================= 0. מבחן מסכם - פיקוח שדה ================= */
    0: { num: 'final', title: 'מבחן מסכם - פיקוח שדה', sub: 'כל החומר: ספרות, נהלים, הסעה, המראה, הקפה, גישה, נחיתה, חירום ושותף אמריקאי', exercises: [
      { type: 'mcq', he: 'מהי ההגייה הנכונה של הספרה 0 בפרזיולוגיה תעופתית?', en: 'What is the correct aviation pronunciation of the digit 0?', opts: [['ZE-RO', 1], ['OH', 0], ['ZIRO', 0], ['NULL', 0]], tip: '0 = ZE-RO, לא "OH" - זו טעות נפוצה.' },
      { type: 'mcq', he: 'מה ההבדל בין "Break" ל-"Break Break"?', en: 'What is the difference between "Break" and "Break Break"?', opts: [['Break - הפסקה בתוך הודעה לאותו מטוס · Break Break - הפרדה בין הודעות לכלי טיס שונים', 1], ['שניהם זהים', 0], ['Break Break משמש רק בחירום', 0], ['Break משמש רק בהקפה', 0]], tip: 'Break = הפסקה בתוך הודעה ארוכה לאותו מטוס · Break Break = הפרדה בין הודעות לכלי טיס שונים בעומס תעבורה.' },
      { type: 'mcq', he: 'איזו הוראה נכונה לפני עלייה על מסלול כאשר הוא עדיין תפוס?', en: 'What is the correct instruction before entering a runway that is still occupied?', opts: [['Line up and wait runway ___, runway still occupied', 1], ['Cleared for take-off', 0], ['Runway vacated', 0], ['Cross runway', 0]], tip: 'אם המסלול תפוס בעת ההתיישרות - יש לציין "runway still occupied".' },
      { type: 'mcq', he: 'מה עונה טייס שקיבל מידע על תנועה ולא רואה אותה?', en: 'What does a pilot reply after receiving traffic info but not seeing the traffic?', opts: [['Negative contact', 1], ['Traffic in sight', 0], ['Looking out בלבד ולא עונה שוב', 0], ['Roger, wilco', 0]], tip: 'אם לא נוצר קשר עין עם התנועה: Negative contact.' },
      { type: 'mcq', he: 'מהי ההוראה הנכונה לגישה ישירה לציר הפיינל ללא הקפה?', en: 'Which instruction clears a direct approach to final without circuit?', opts: [['Cleared straight-in approach runway ___', 1], ['Cleared visual approach', 0], ['Maintain own separation', 0], ['Hold at reporting point', 0]], tip: 'Straight in approach = גישה ישירה לציר הפיינל ללא הקפה.' },
      { type: 'mcq', he: 'מהי "Minimum approach speed" לעומת "Minimum clean speed"?', en: 'How does "Minimum approach speed" differ from "Minimum clean speed"?', opts: [['approach = איטית ביותר בגישה סופית · clean = ללא מדפים/גרר', 1], ['שתיהן זהות', 0], ['clean מתייחסת לגישה בלבד', 0], ['approach מתייחסת להמראה', 0]], tip: 'Minimum clean speed = ללא גרר/מדפים · Minimum approach speed = האיטית ביותר בגישה הסופית.' },
      { type: 'mcq', he: 'איזה דיווח עננות מתאר 8/8?', en: 'Which cloud report describes 8/8 coverage?', opts: [['Overcast', 1], ['Broken', 0], ['Scattered', 0], ['Few', 0]], tip: 'Overcast = 8/8 שמיניות - שמיים מכוסים לחלוטין.' },
      { type: 'mcq', he: 'איזו קריאת מצוקה מציינת חירום הדורש סיוע מיידי?', en: 'Which distress call indicates an emergency requiring immediate assistance?', opts: [['Mayday, Mayday, Mayday', 1], ['Pan-Pan, Pan-Pan, Pan-Pan', 0], ['Emergency בלבד (ICAO)', 0], ['Standby, Standby', 0]], tip: 'Mayday Mayday Mayday = חירום הדורש סיוע מיידי, לעומת Pan-Pan לתקלה שאינה דחופה.' },
      { type: 'dnd', he: 'הרכב/י הוראת המראה עם עצירה בדחיפות', template: 'Aircraft call sign __ position, cancel take off, I say again, cancel take off', bank: ['hold', 'clear', 'vacate'], answer: ['hold'], tip: 'הפסקת המראה למטוס שטרם החל ריצה: hold position, cancel take off, I say again, cancel take off.' },
      { type: 'dnd', he: 'הרכב/י דיווח ירוקים מהפקח', template: 'Aircraft call sign, number __ runway __, wind __ degrees one zero knots', bank: ['one', 'two niner', 'two tree zero'], answer: ['one', 'two niner', 'two tree zero'], tip: 'תשובת הפקח לירוקים: number, runway, wind direction degrees speed knots.' },
      { type: 'listen', he: 'האזן/י והשלם/י: הוראת חציית מסלול', audio: 'Taxi from shelter one six cross runway two tree via Mike, hold short of runway zero fife', he2: 'הסע ממחסה 16, חצה מסלול 23 דרך מייק, עצור לפני מסלול 05', template: 'Taxi from shelter one six __ runway two tree via Mike, __ __ of runway zero fife', bank: ['cross', 'hold', 'short', 'line'], answer: ['cross', 'hold', 'short'], tip: 'הוראת הסעה עם חציית מסלול: taxi from ___ cross runway ___ via ___, hold short of runway ___.' },
      { type: 'listen', he: 'האזן/י והשלם/י: אישור נחיתה בק"ע', audio: 'When traffic in sight cleared to land', he2: 'כשתהיה בקשר עין - רשאי לנחות', template: 'When __ __ __ cleared to land', bank: ['traffic', 'in', 'sight', 'runway'], answer: ['traffic', 'in', 'sight'], tip: 'נחיתה בק"ע מותנית בדיווח "traffic in sight" מהטייס.' }
    ]}

  };

  var CATSInsp = [
    { id: 'proc', label: 'נהלים ובקרת קשר', items: [
      ['Say again','אמור שנית','חזור על השידור האחרון'],
      ['I say again','אומר שנית','חזרה על הוראה חשובה'],
      ['Confirm','אשר או ודא','confirm - אשר / verify - ודא לפני מתן תשובה'],
      ['Disregard','התעלם','בטל את התשדורת האחרונה'],
      ['Readback','חזור על','חזור על תוכן ההוראה'],
      ['Stand-by','מיד אתך','המתן, אקרא לך'],
      ['Correction','תיקון','תיקון לשידור הקודם'],
      ['How do you read','איך שומע','מהי איכות הקליטה'],
      ['Unable','לא מסוגל','לא ניתן לבצע'],
      ['Able','יכול','יכול לבצע את הבקשה'],
      ['Break','הפסקה בין חלקים של הודעה','לאותו מטוס בהודעה ארוכה'],
      ['Break break','הפרדה בין שידורים','בין מטוסים שונים בעומס תעבורה'],
      ['Monitor','האזן','האזן לתחנה ולתדר'],
      ['Contact','עבור ל...','עבור לקשר עם תחנה ותדר'],
      ['Speak slower','דבר לאט','בקשה להאטת קצב הדיבור'],
      ['Amend','שינוי','שינוי מרשה'],
      ['Cancel','בטל',''],
      ['Immediately','מיידית','הוראה לביצוע מיידי'],
      ['Message','הודעה',''],
      ['Report','דווח',''],
      ['Say intentions','דווח כוונות',''],
      ['Transmission blind','שידור עיוור',''],
      ['All stations on frequency','פנייה לכל התחנות המאזינות','']
    ]},
    { id: 'ground', label: 'הסעה, מסלול וציוד', items: [
      ['Taxi','הסע','הסעה על הקרקע'],
      ['Air taxi','הסעה בריחוף','למסוקים'],
      ['Pushback','דחיפה','דחיפה מהחניה'],
      ['Hold position','עצור במקום','עצירה בהסעה'],
      ['Hold short','עצור לפני','מסלול / הסעה'],
      ['Give way','תן זכות קדימה',''],
      ['Vacate the runway','פנה את המסלול','פינוי לאחר נחיתה'],
      ['Backtrack','הסעה הפוכה/ריצת חזרה','בכיוון הפוך על המסלול'],
      ['Occupied','לא פנוי/תפוס','דיווח מצב מסלול'],
      ['Runway wet','מסלול רטוב',''],
      ['FOD','עצם/לכלוך על המסלול','Foreign Object Damage/Debris'],
      ['ILS/DME/VOR Unserviceable','עזר ניווט לא שמיש',''],
      ['Follow me car / Inspection vehicle','רכב ביקורות','רכב קרקעי המנחה כלי טיס להסעה'],
      ['Fire truck / fire brigades','כבאית/כיבוי אש',''],
      ['Rescue services/teams','חילוץ (צוות)',''],
      ['Emergency services','צוותי הצלה','כיבוי, אמבולנס'],
      ['Runway heading / centerline','ציר מסלול',''],
      ['Line up and wait','התיישר והמתן','עלייה למסלול והמתנה'],
      ['Cleared for take-off','רשאי להמראה',''],
      ['Cleared to land','רשאי לנחות',''],
      ['Go around','לך סביב','ביטול נחיתה'],
      ['Touch and go','נגיעה והמראה','תרגול במסלול'],
      ['Expedite','זרז','בצע מהר יותר']
    ]},
    { id: 'flight', label: 'הוראות טיסה והקפה', items: [
      ['Climb','טפס',''],
      ['Descend','הנמך',''],
      ['Maintain','שמור','גובה / מהירות / אזור'],
      ['Turn left / right','פנה שמאלה / ימינה',''],
      ['Fly heading','טוס בכיוון','שלוש ספרות'],
      ['Orbit (360)','בצע המתנה','מעגל פנייה 360 מעלות'],
      ['Extend downwind','הארך עם הרוח','לפני פנייה לצלע בסיס'],
      ['Make short approach','בצע גישה קצרה',''],
      ['Low approach','הנמכה עד הליכה סביב','ללא נחיתה/נגיעה'],
      ['Number','מספר לנחיתה','מיקום ברצף הנחיתות'],
      ['Follow','עקוב אחרי','אחר כלי טיס אחר בהקפה'],
      ['Base leg','צלע בסיס',''],
      ['Downwind leg','צלע עם הרוח',''],
      ['Upwind leg','צלע מת',''],
      ['Crosswind leg','צלע צולבת',''],
      ['Final','צלע פיינל','השלב האחרון בגישה לנחיתה'],
      ['Straight in approach','גישה ישירה למסלול','ללא הקפה'],
      ['Cleared visual approach','רשאי לגישת ראייה',''],
      ['Maintain own separation','שמור הפרדה עצמית','אחריות ההפרדה על הטייס'],
      ['Circuit','הקפה',''],
      ['Traffic','(מידע) תנועה','traffic advisory'],
      ['Converging traffic','תנועה מתכנסת',''],
      ['Crossing traffic','תנועה חוצה',''],
      ['Overtaking traffic','תנועה עוקפת',''],
      ['Caution wake turbulence','זהירות מערבולות קצה כנף','']
    ]},
    { id: 'wx', label: 'מזג אוויר ו-ATIS', items: [
      ['Wind calm','רוח קלה','עד שלושה קשרים'],
      ['Gusting','משבים','עוצמת המשב המרבית'],
      ['QNH','לחץ ברומטרי','כיול מד גובה'],
      ['Visibility','ראות','בק"מ / במייל'],
      ['Sky clear','שמיים ללא עננות','0/8'],
      ['Few clouds','מעט עננות','1-2/8'],
      ['Scattered clouds','עננות מפוזרת','3-4/8'],
      ['Broken clouds','עננות שבורה','5-7/8'],
      ['Overcast','שמים מכוסים','8/8'],
      ['Ceiling','בסיס ענן',''],
      ['TOP','פסגת ענן',''],
      ['ATIS','שידור מוקלט אוטומטי','Automatic Terminal Information Service']
    ]},
    { id: 'emer', label: 'חירום', items: [
      ['Mayday Mayday Mayday','מצוקה','חירום הדורש סיוע מיידי'],
      ['Pan-Pan','תקלה','חירום ללא צורך בסיוע מיידי'],
      ['Are you declaring an emergency?','מכריז על חירום?','שאלת הבהרה מהפקח'],
      ['Gear appears down/up','כן נסע נראה למטה/למעלה',''],
      ['Vertigo','ורטיגו','חשד לאיבוד התמצאות מרחבית'],
      ['Cancelling Mayday/Pan-Pan','ביטול קריאת מצוקה',''],
      ['Barrier','רשת','אמצעי עצירה'],
      ['Hook appears down','ווו נראה למטה',''],
      ['Arresting cable engaged','נתפס בכבל','המטוס נתפס בכבל עצירה']
    ]},
    { id: 'amer', label: 'שותף אמריקאי', items: [
      ['MIKE','דקה','2 Mikes = 2 דקות'],
      ['ABORTING TAKE OFF','הפסקת המראה',''],
      ['CIRCUIT PATTERN','הקפה',''],
      ['HUNG ORDNANCE','תקלת חימוש',''],
      ['WING TIP CLEARANCE','מרווח קצה כנף נקי',''],
      ['LOW APPROACH','גישה נמוכה','לבדיקת גלגלים/מדידת מסלול'],
      ['REQUEST CLOSE','בקשה לעם הרוח','לרוב אחרי גישה נמוכה'],
      ['DIRECT GEAR POINT','טיסה ישירה לירוקים',''],
      ['IDLE POWER','כוח מנוע על סרק',''],
      ['NEGATIVE ATIS','הצוות לא האזין לאטיס',''],
      ['ALTIMETER','לחץ (QNH)',''],
      ['EMERGENCY','הכרזת חירום (אמריקאי)','במקום MAYDAY/PAN-PAN'],
      ['INITIAL','צלע מת (כינוי)','']
    ]}
  ];

  var MEMORY_POOLInsp = [
    ['Say again', 'אמור שנית'],
    ['Readback', 'חזור על'],
    ['Stand-by', 'מיד אתך'],
    ['Disregard', 'התעלם'],
    ['Unable', 'לא מסוגל'],
    ['Amend', 'שינוי'],
    ['Break break', 'הפרדה בין שידורים'],
    ['Taxi', 'הסע'],
    ['Air taxi', 'הסעה בריחוף'],
    ['Hold short', 'עצור לפני'],
    ['Vacate the runway', 'פנה את המסלול'],
    ['Backtrack', 'ריצת חזרה'],
    ['FOD', 'לכלוך על המסלול'],
    ['Line up and wait', 'התיישר והמתן'],
    ['Cleared for take-off', 'רשאי להמראה'],
    ['Cleared to land', 'רשאי לנחות'],
    ['Go around', 'לך סביב'],
    ['Touch and go', 'נגיעה והמראה'],
    ['Extend downwind', 'הארך עם הרוח'],
    ['Low approach', 'הנמכה ללא נחיתה'],
    ['Straight in approach', 'גישה ישירה'],
    ['Wake turbulence', 'מערבולות קצה כנף'],
    ['Gear down and locked', 'כן נסע למטה ונעול'],
    ['Wind calm', 'רוח קלה'],
    ['Gusting', 'משבים'],
    ['QNH', 'לחץ ברומטרי'],
    ['Overcast', 'שמים מכוסים'],
    ['Mayday', 'מצוקה'],
    ['Pan-Pan', 'תקלה'],
    ['Hook appears down', 'ווו נראה למטה'],
    ['Arresting cable engaged', 'נתפס בכבל'],
    ['Negative contact', 'לא נוצר קשר עין']
  ];

  var DICT_CHIPSInsp = [
    ['all','הכל'],['numbers','מספרים'],['proc','נהלים'],['ground','הסעה ומסלול'],
    ['flight','טיסה והקפה'],['wx','מזג אוויר'],['emer','חירום'],['amer','שותף אמריקאי'],['read','בדיקת קשר']
  ];

  /* ===================================================================
     תוכן משותף לשני המסלולים
     =================================================================== */
  var PRON = [
    ['0','ZE-RO'],['1','WUN'],['2','TOO'],['3','TREE'],['4','FOW-ER'],
    ['5','FIFE'],['6','SIX'],['7','SEV-EN'],['8','AIT'],['9','NIN-ER'],
    ['.','DAY-SEE-MAL'],['100','HUN-DRED'],['1000','TOU-SAND']
  ];

  var READ = [
    ['1','Reading you one','אחד מחמש - לא קריא','#E5484D'],
    ['2','Reading you two','שתיים מחמש - קריא לסירוגין','#F2870A'],
    ['3','Reading you tree','שלוש מחמש - קריא בקושי','#E0A800'],
    ['4','Reading you fower','ארבע מחמש - קריא','#5BA35B'],
    ['5','Reading you fife','חמש מחמש - קריא מצוין','#2E9E5B']
  ];

  var roleInfo = {
    ctrl: { he: 'בקר/ית', en: 'Flight Controller', badge: 'בקר טיסה', tint: '#EAF2FB', accent: '#2E78C7', idle: './assets/bakarStand.PNG', salute: './assets/bakar.png', desc: 'מבקר/ת תעבורה אווירית מהמגדל ובקרת מכ"ם.' },
    insp: { he: 'פקח/ית', en: 'Flight Inspector', badge: 'פקח טיסה', tint: '#E7F4EC', accent: '#1F8A5B', idle: './assets/girl.png', salute: './assets/girlHand.png', desc: ' ליווי המראות, נחיתות ותנועה בשדה.' }
  };

  var POSITIVE = ['מצוין!', 'עפת על זה!', 'אלוף/ה אין עלייך!', 'תקתוק נכון!'];

  var GAMES = [
    { id: 'memory', kind: 'memory', he: 'זיכרון מונחים',  en: 'Memory Match',    accent: '#7C5CFC', bg: 'linear-gradient(150deg,#EDE9FF,#DCD3FF)', meta: 'שיא 12',  desc: 'התאמת מונחי תעופה למשמעות שלהם',     prog: '70%' },
    { id: 'radio',  kind: 'radio',  he: 'מרוץ הקשר',      en: 'Radio Rush',      accent: '#2E78C7', bg: 'linear-gradient(150deg,#E2F0FC,#C7E2F8)', meta: 'חדש',    desc: 'תגובה מהירה לתשדורות מטייסים',        prog: '45%' },
    { id: 'radar',  kind: 'radar',  he: 'אתגר המכ"ם',     en: 'Radar Challenge', accent: '#1F8A5B', bg: 'linear-gradient(150deg,#E2F6EC,#C6ECD7)', meta: 'שלב 3', desc: 'ביצוע הוראות נת"א על מסך מכ"ם',       prog: '30%' },
    { id: 'match',  kind: 'match',  he: 'התאמה מהירה',    en: 'Match Madness',   accent: '#F2870A', bg: 'linear-gradient(150deg,#FFF0DC,#FFE0BC)', meta: 'שיא 28', desc: 'חבר/י מונחים לתרגום לפני שהזמן נגמר', prog: '55%' }
  ];

  var RADIO_GAME = {
    prompt: 'Tower, request permission to land runway 26.',
    opts: [['Cleared to land runway 26', 1], ['Maintain current altitude', 0], ['Contact ground frequency', 0], ['Taxi to holding point', 0]]
  };

  var MEMORY_LEVELS = [
    { id: 'easy',   he: 'קל',    sub: '6 זוגות · ללא טיימר', pairs: 6,  seconds: null, dot: '#2E9E5B' },
    { id: 'medium', he: 'בינוני', sub: '8 זוגות · 90 שניות',  pairs: 8,  seconds: 90,   dot: '#F2A100' },
    { id: 'hard',   he: 'קשה',   sub: '12 זוגות · 60 שניות', pairs: 12, seconds: 60,   dot: '#E5484D' }
  ];

  /* ===================================================================
     חשיפה גלובלית - הכל מפורק לפי תפקיד (ctrl / insp)
     =================================================================== */
  window.ATC_DATA = {
    metaListByRole: { ctrl: metaListCtrl, insp: metaListInsp },
    stagesByRole:   { ctrl: stagesCtrl,   insp: stagesInsp },
    CATSByRole:     { ctrl: CATSCtrl,     insp: CATSInsp },
    MEMORY_POOLByRole: { ctrl: MEMORY_POOLCtrl, insp: MEMORY_POOLInsp },
    DICT_CHIPSByRole:  { ctrl: DICT_CHIPSCtrl,  insp: DICT_CHIPSInsp },

    /* תוכן משותף */
    PRON: PRON, READ: READ,
    roleInfo: roleInfo, POSITIVE: POSITIVE,
    GAMES: GAMES, RADIO_GAME: RADIO_GAME,
    MEMORY_LEVELS: MEMORY_LEVELS,

    /* ברירת מחדל לתאימות לאחור (ctrl) - למקרה שקוד ישן עדיין ניגש ל-D.stages וכו' */
    metaList: metaListCtrl, stages: stagesCtrl, CATS: CATSCtrl,
    MEMORY_POOL: MEMORY_POOLCtrl, DICT_CHIPS: DICT_CHIPSCtrl
  };
})();
