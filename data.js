/* =====================================================================
   ATC English Trainer — static content data — כל השלבים
   ===================================================================== */
(function () {
  'use strict';

  var metaList = [
    { id: 1,  label: 'מספרים ואיות' },
    { id: 2,  label: 'פקודות בסיסיות' },
    { id: 3,  label: 'אותות קריאה' },
    { id: 4,  label: 'הסעה על הקרקע' },
    { id: 5,  label: 'המראה' },
    { id: 6,  label: 'טיסה במרחב' },
    { id: 7,  label: 'גישה ונחיתה' },
    { id: 8,  label: 'מזג אוויר · ATIS' },
    { id: 9,  label: 'חירום' },
    { id: 10, label: 'שותף אמריקאי' },
    { id: 0,  label: 'מבחן מסכם', final: true }
  ];

  var stages = {

    1: { num: 1, title: 'הגיית מספרים ואיות', sub: 'הבסיס לכל תקשורת רדיו', exercises: [
      { type: 'mcq', he: 'כיצד הוגים את הספרה 9 בקשר תעופתי?', en: 'How do you pronounce the number 9 in aviation radio communications?', opts: [['Nine', 0], ['NIN-ER', 1], ['Niner-niner', 0], ['No-vember', 0]], tip: 'בתקשורת תעופתית 9 = NIN-ER, כדי למנוע בלבול עם המילה "no" בסביבה רועשת.' },
      { type: 'mcq', he: 'כיצד נקרא את התדר 129.25?', en: 'How do you read the frequency 129.25?', opts: [['One two nine two five', 0], ['One twenty nine decimal two five', 0], ['One two niner decimal two fife', 1], ['One hundred twenty nine', 0]], tip: 'כל ספרה בנפרד · עשרוני = decimal · 5 = fife · 9 = niner.' },
      { type: 'mcq', he: 'מהי ההגייה הנכונה לגובה 1,500 רגל?', en: 'What is the correct pronunciation of altitude 1,500 feet?', opts: [['Fifteen hundred feet', 0], ['One fife zero zero feet', 0], ['One tousand fife hundred feet', 1], ['One five zero zero feet', 0]], tip: 'אלפים: "one tousand" · מאות: "fife hundred".' },
      { type: 'mcq', he: 'כיצד משדרים את השעה 15:30?', en: 'Time 15:30 — how is it transmitted?', opts: [['Fifteen thirty', 0], ['One fife tree zero local time', 1], ['1530 hours', 0], ['Fife-teen tree-zero', 0]], tip: 'זמן = ארבע ספרות, local time / UTC.' },
      { type: 'dnd', he: 'הרכב/י את התדר 129.2 בתשדורת', template: 'Contact HAGAV __ decimal __', bank: ['one niner two', 'fife', 'one two niner', 'two'], answer: ['one two niner', 'two'], tip: 'תדר 129.2 — כל ספרה בנפרד, "decimal" להפרדת העשרוני.' },
      { type: 'dnd', he: 'הרכב/י דיווח רוח: כיוון 210, עוצמה 13 קשר', template: 'Wind __ degrees __ knots', bank: ['two one zero', 'one tree', 'fife zero', 'zero'], answer: ['two one zero', 'one tree'], tip: 'כיוון = 3 ספרות בנפרד · עוצמה = בקשרים.' },
      { type: 'listen', he: 'האזן/י וחשוף/י את התרגום', audio: 'QNH one zero one two', he2: 'לחץ ברומטרי — אחת, אפס, אחת, שתיים', tip: 'QNH = לחץ ברומטרי לכיול מד הגובה.' },
      { type: 'listen', he: 'האזן/י לתשדורת הבאה', audio: 'One niner tousand feet', he2: '19,000 רגל', tip: 'niner = 9 · tousand = thousand (הגייה סטנדרטית).' }
    ]},

    2: { num: 2, title: 'מילון ביטויים — פקודות בסיסיות', sub: 'המונחים הסטנדרטיים', exercises: [
      { type: 'mcq', he: 'טייס אומר "say again" — מה המשמעות?', en: 'A pilot says "say again" — what does it mean?', opts: [['The pilot is done transmitting', 0], ['Repeat your last transmission', 1], ['I did not understand', 0], ['Stand by', 0]], tip: '"Say again" = חזור על השידור האחרון. לא "repeat".' },
      { type: 'mcq', he: 'מה ההבדל בין "Affirm" ל-"Roger"?', en: 'What is the difference between "Affirm" and "Roger"?', opts: [['No difference, both mean yes', 0], ['Affirm = yes (fact). Roger = message received', 1], ['Roger = yes. Affirm = I will comply', 0], ['Both mean message received', 0]], tip: 'Affirm = חיובי/נכון · Roger = קיבלתי את המסר (לא מאשר תוכן).' },
      { type: 'mcq', he: 'הפקח אמר "stand-by" — מה על הטייס לעשות?', en: 'The controller says "stand-by" — what should the pilot do?', opts: [['Land immediately', 0], ['Wait, the controller will call back', 1], ['Switch frequency', 0], ['Report position', 0]], tip: 'Stand-by = מיד אתך / חכה ואני אקרא לך.' },
      { type: 'mcq', he: 'איזו מילה משמעה "בטל את התשדורת האחרונה"?', en: 'Which word means "cancel the last transmission"?', opts: [['Negative', 0], ['Cancel', 0], ['Disregard', 1], ['Unable', 0]], tip: 'Disregard = התעלם / בטל את התשדורת האחרונה.' },
      { type: 'mcq', he: 'כיצד אומרים "אינני מסוגל לבצע"?', en: 'How do you say "I cannot comply" in standard phraseology?', opts: [['Negative', 0], ['Unable', 1], ['Denied', 0], ['Cancel', 0]], tip: 'Unable = לא מסוגל · Negative = שלילי/לא נכון.' },
      { type: 'dnd', he: 'הרכב/י: "מסור את הודעתך, רוח קלה"', template: '__ , wind __', bank: ['Pass your message', 'calm', 'Say again', 'gusts'], answer: ['Pass your message', 'calm'], tip: 'Pass your message = שדר · wind calm = רוח קלה.' },
      { type: 'listen', he: 'האזן/י לתשדורת', audio: 'Expedite climb to altitude six tousand feet', he2: 'זרז טיפוס לגובה 6,000 רגל', tip: 'Expedite = זרז — ביצוע מהיר יותר.' },
      { type: 'listen', he: 'האזן/י להוראה החוזרת', audio: 'I say again, cancel takeoff', he2: 'אני חוזר: בטל המראה', tip: '"I say again" = הדגשה חוזרת של הוראה קריטית.' }
    ]},

    3: { num: 3, title: 'אותות קריאה ופתיחת קשר', sub: 'כיצד פותחים קשר ואותות קריאה', exercises: [
      { type: 'mcq', he: 'טייס פותח: "נגב גראונד שלום" — מהי התגובה הנכונה?', en: 'A pilot calls: "NEGEV GROUND shalom" — what is the correct ATC response?', opts: [['NEGEV GROUND go ahead', 0], ['India Alpha Fox two fife fife NEGEV GROUND shalom, stand-by', 1], ['Affirm, go ahead', 0], ['NEGEV GROUND, what is your request?', 0]], tip: 'תשובה = אות קריאה + שם תחנה + שלום + הוראה.' },
      { type: 'mcq', he: 'מהו שם השירות "מגדל" בבסיס כדם?', en: 'What is the call sign for "Tower" at Kedem base?', opts: [['Kedem Control', 0], ['Kedem Tower', 1], ['Kedem Approach', 0], ['Kedem Ground', 0]], tip: 'Tower = מגדל/הקפה · Ground = קרקע · Approach = גישה.' },
      { type: 'mcq', he: 'כיצד משדרים את שם היחידה "גמל" בקשר?', en: 'The unit "גמל" — how is it transmitted in English?', opts: [['Camel', 0], ['Gamal', 1], ['G-A-M-A-L', 0], ['Gimel', 0]], tip: 'אותות קריאה עבריים מושמעים כהגייה עברית, לא מתורגמים.' },
      { type: 'dnd', he: 'הרכב/י פתיחת קשר עם נגב גראונד', template: '__ GROUND shalom, India Alpha Fox two fife fife, request ATC clearance to __', bank: ['KEDEM', 'NEGEV', 'Lima Charlie Papa Hotel', 'Tel Aviv', 'Tower'], answer: ['NEGEV', 'Lima Charlie Papa Hotel'], tip: 'מבנה: שם שדה + שם שירות + שלום + אות קריאה + בקשה + יעד.' },
      { type: 'listen', he: 'האזן/י לפתיחת קשר מהמגדל', audio: 'Master, KEDEM Tower', he2: 'קוראים: מאסטר — מגדל כדם', tip: 'ATC פותח קשר = שם הטייס/אות קריאה + שם התחנה.' }
    ]},

    4: { num: 4, title: 'הסעה על הקרקע', sub: 'taxi, line-up, crossing, ground movements', exercises: [
      { type: 'mcq', he: 'מה עושה הטייס: "Emek one cross runway tree tree left via Mike"?', en: 'ATC: "Emek one cross runway tree tree left via Mike" — what does the pilot do?', opts: [['Enter the runway and hold', 0], ['Cross runway 33 left, using taxiway Mike', 1], ['Backtrack runway 33', 0], ['Hold short of Mike', 0]], tip: 'Cross = חצה · runway tree tree = מסלול 33 · via Mike = דרך מסלול הסעה מיקי.' },
      { type: 'mcq', he: 'מה פירוש "hold short of Alpha"?', en: 'What does "hold short of Alpha" mean?', opts: [['Stop at Alpha and wait for further instructions', 1], ['Cross Alpha quickly', 0], ['Turn onto Alpha taxiway', 0], ['Back-track to Alpha', 0]], tip: 'Hold short = עצור ולא תחצה — לפני הצומת/מסלול.' },
      { type: 'mcq', he: 'מה הסיבה לעצירה: "hold short due pair of F-thirty fife crossing"?', en: 'ATC: "hold short due pair of F-thirty fife crossing" — what is the reason?', opts: [['Runway under maintenance', 0], ['Two F-35s are crossing from left to right', 1], ['Pilot requested holding', 0], ['Runway wet', 0]], tip: 'Due to = בגלל · pair of = זוג · crossing from left to right = חוצים משמאל לימין.' },
      { type: 'dnd', he: 'הרכב/י אישור הסעה לאקרב אחד', template: 'Akrav one __ runway two tree, __ from shelter one six to Alpha', bank: ['expect', 'taxi', 'cross', 'hold', 'report'], answer: ['expect', 'taxi'], tip: 'ATC clearance לפני ההסעה: expect runway + taxi from [נקודה] to [נקודה].' },
      { type: 'listen', he: 'האזן/י לתשדורת ריצת חזרה', audio: 'Backtrack runway tree tree, turn left taxi runway zero niner, vacate via Yankee', he2: 'בצע ריצת חזרה על מסלול 33, פנה שמאלה למסלול 09, פנה דרך יאנקי', tip: 'Backtrack = ריצת חזרה · vacate = פנה את המסלול.' }
    ]},

    5: { num: 5, title: 'המראה', sub: 'line-up, take-off clearance, rejected take-off', exercises: [
      { type: 'mcq', he: 'מהו ה-readback הנכון לאישור המראה מסלול 29 ימין?', en: 'What is the correct readback for "cleared for take-off runway two niner right"?', opts: [['Cleared take-off, wilco', 0], ['Runway two niner right cleared for take-off, callsign', 1], ['Roger, departing now', 0], ['Affirm, runway two niner', 0]], tip: 'Readback חובה: מסלול + cleared for take-off + אות קריאה.' },
      { type: 'mcq', he: 'מה הסיבה לביטול: "cancel takeoff, vehicle on runway"?', en: 'ATC: "Hold position, cancel takeoff, vehicle on runway" — why?', opts: [['Traffic on final approach', 0], ['A vehicle is on the runway', 1], ['Wind changed direction', 0], ['Another aircraft is lined up', 0]], tip: 'Vehicle on runway = כלי רכב על המסלול — עצור מיד!' },
      { type: 'mcq', he: 'מה פירוש "line up and wait"?', en: 'What does "line up and wait" mean?', opts: [['Enter runway and depart immediately', 0], ['Enter runway, align with centerline and wait for takeoff clearance', 1], ['Taxi to hold short point', 0], ['Backtrack runway', 0]], tip: 'Line up and wait = התיישר על המסלול והמתן — לא מורשה להמריא עדיין.' },
      { type: 'dnd', he: 'הרכב/י הוראת התיישרות של מגדל', template: '__ line up runway zero fife, wind __ degrees __ knots, SID Qirya one', bank: ['Arayot', 'zero fower zero', 'one zero', 'tree tree zero', 'fifer'], answer: ['Arayot', 'zero fower zero', 'one zero'], tip: 'מבנה הוראת התיישרות: אות קריאה + line up + מסלול + רוח + SID.' },
      { type: 'listen', he: 'האזן/י לאישור המראה', audio: 'SID PALMH one, runway two niner right cleared for take-off, Akrav', he2: 'מסלול התנעה PALMH אחד, מסלול 29 ימין — מורשה להמראה, אקרב', tip: 'SID = Standard Instrument Departure.' }
    ]},

    6: { num: 6, title: 'טיסה במרחב', sub: 'enroute, airspace, traffic advisories', exercises: [
      { type: 'mcq', he: 'מה פירוש דיווח הטייס: "Looking out, Gamal"?', en: 'Pilot: "Looking out, Gamal" — what does this mean?', opts: [['I have landed at Gamal', 0], ['I am searching visually for the reported traffic', 1], ['My callsign is Gamal and I cannot see', 0], ['I am switching to visual flight', 0]], tip: 'Looking out = מחפש ראייתית את התנועה שדווחה.' },
      { type: 'mcq', he: 'איפה נמצאת התנועה: "two o\'clock, tree miles, merging from right"?', en: 'ATC: "Traffic, two o\'clock, tree miles, merging from right at two tousand feet" — where?', opts: [['At 9 o\'clock, 3 miles', 0], ['At 2 o\'clock, 3 miles, converging from the right', 1], ['Directly ahead at 2,000 ft', 0], ['Behind and below', 0]], tip: 'שעה = כיוון יחסי · merging from right = מתקרב מצד ימין.' },
      { type: 'mcq', he: 'מה פירוש "squawk fife one fife two and IDENT"?', en: 'What does "squawk fife one fife two and IDENT" mean?', opts: [['Switch to frequency 5152', 0], ['Set transponder code 5152 and press IDENT button', 1], ['Report position 5152', 0], ['Climb to 5,152 feet', 0]], tip: 'Squawk = הגדר קוד תוכי · IDENT = לחץ כפתור זיהוי.' },
      { type: 'dnd', he: 'הרכב/י תגובה כשרואים את התנועה', template: 'Gamal, __ traffic in sight, Gamal', bank: ['looking out', 'traffic in sight', 'contact made', 'visual'], answer: ['traffic in sight'], tip: 'לאחר "looking out" — כשרואים: "traffic in sight".' },
      { type: 'dnd', he: 'הרכב/י הוראת גובה ותוכי במרחב', template: 'Climb to altitude __ tousand feet, __ NAT, squawk __ and IDENT', bank: ['fower', 'six', 'VOR', 'ILS', 'fife zero six fife', 'one two three four'], answer: ['fower', 'VOR', 'fife zero six fife'], tip: 'מרשה IFR במרחב: גובה + VOR + קוד תוכי.' },
      { type: 'listen', he: 'האזן/י לתשדורת CVFR במרחב', audio: 'QNH two niner niner fife, fly on CVFR route, report over Beit Kama', he2: 'לחץ 2995, טוס ב-CVFR, דווח מעל בית קמה', tip: 'CVFR = Controlled VFR · report over = דווח כשתגיע מעל.' }
    ]},

    7: { num: 7, title: 'גישה ונחיתה', sub: 'approach, circuit, landing clearance, go-around', exercises: [
      { type: 'mcq', he: 'מה פירוש "number two, follow F-sixteen on final"?', en: 'What does "number two, follow F-sixteen on final" mean?', opts: [['You are the first to land after the F-16', 0], ['You are second in sequence, follow the F-16 on final approach', 1], ['Follow the F-16 to the runway threshold', 0], ['Report when F-16 lands', 0]], tip: 'Number two = שני בתור · follow = עקוב · on final = בגישה אחרונה.' },
      { type: 'mcq', he: 'מה תגובת הפקח כשיש ספק לגבי הגלגלים?', en: 'ATC response when unsure about "Gear down and locked"?', opts: [['Roger, cleared to land', 0], ['Verify gear down and locked, report again', 1], ['Gear check completed', 0], ['Confirm gear position', 0]], tip: 'כשיש ספק בגלגלים — ATC מבקש לדווח פעם נוספת.' },
      { type: 'mcq', he: 'מה עושה הטייס: "Go around, climb tree tousand feet downwind"?', en: 'ATC: "Go around due to vehicle on the runway, climb tree tousand feet downwind" — what to do?', opts: [['Land on alternate runway', 0], ['Execute go-around, climb to 3,000 ft, enter downwind', 1], ['Hold position', 0], ['Declare emergency', 0]], tip: 'Go around = הליכה סביב · due to = בגלל · climb to 3,000 + downwind.' },
      { type: 'dnd', he: 'הרכב/י קריאה ראשונה לגישה', template: 'Patron Tel Nof Approach, QNH __, maintain __ feet Yavne, runway __ in use', bank: ['two niner niner two', 'one tousand', 'one two tousand', 'tree tree', 'two niner'], answer: ['two niner niner two', 'one two tousand', 'tree tree'], tip: 'קריאה ראשונה גישה: QNH + גובה + מסלול פעיל.' },
      { type: 'listen', he: 'האזן/י לאישור הנחיתה', audio: 'Arayot, runway zero fife cleared to land', he2: 'ארייות, מסלול 05 — מורשה לנחיתה', tip: 'מבנה: אות קריאה + מסלול + cleared to land.' },
      { type: 'listen', he: 'האזן/י להוראת הליכה סביב', audio: 'Zahav one, go around due to vehicle on the runway, climb tree tousand feet downwind', he2: 'זהב אחד, הלך סביב בגלל רכב על המסלול, טפס 3,000 רגל לעם הרוח', tip: 'Go around = ביוזמת פקח עם סיבה.' }
    ]},

    8: { num: 8, title: 'מזג אוויר ו-ATIS', sub: 'weather reports, ATIS, wind, visibility', exercises: [
      { type: 'mcq', he: 'כיצד משדרים: "רוח 230 מעלות 10 קשר עם משב 30"?', en: 'How do you transmit "Wind 230 degrees, 10 knots, gusting 30"?', opts: [['Wind two three zero, ten, thirty', 0], ['Wind two tree zero degrees one zero knots gusting tree zero', 1], ['Two-thirty degrees ten knots gust thirty', 0], ['Wind 230/10G30', 0]], tip: 'כיוון = 3 ספרות · מהירות · gusting + שיא (לא G).' },
      { type: 'mcq', he: 'מהו ATIS?', en: 'What is ATIS?', opts: [['Air Traffic Information Signal', 0], ['Automatic Terminal Information Service — a recorded weather/airfield broadcast', 1], ['A special emergency frequency', 0], ['A pilot\'s weather request', 0]], tip: 'ATIS = שידור מוקלט אוטומטי עם מידע שדה ומזג אוויר.' },
      { type: 'mcq', he: 'מה פירוש "NEGATIVE ATIS" בשימוש שותף אמריקאי?', en: 'What does "NEGATIVE ATIS" mean in American partner usage?', opts: [['ATIS is not available', 0], ['The crew has not listened to the ATIS', 1], ['The weather is bad', 0], ['ATIS frequency is wrong', 0]], tip: 'מושג שותף אמריקאי: הצוות לא האזין ל-ATIS לפני הקשר.' },
      { type: 'dnd', he: 'הרכב/י דיווח רוח עם משבים', template: 'Wind __ degrees __ knots, __ tree zero', bank: ['two tree zero', 'one zero', 'gusting', 'calm', 'reporting'], answer: ['two tree zero', 'one zero', 'gusting'], tip: 'דיווח רוח עם משבים: כיוון + מהירות + gusting + שיא.' },
      { type: 'listen', he: 'האזן/י לתשדורת לחץ ועגינה', audio: 'QNH two niner seven one, expect runway two niner, hold over Hazor', he2: 'לחץ 2971, צפה למסלול 29, המתן מעל חצור', tip: 'hold over = עגינה (holding) מעל נקודה.' }
    ]},

    9: { num: 9, title: 'חירום', sub: 'emergency, mayday, distress, arresting cable', exercises: [
      { type: 'mcq', he: 'מהי סדרת קריאת המצוקה הנכונה?', en: 'What is the correct distress call sequence?', opts: [['Emergency, emergency, callsign, nature of emergency', 0], ['MAYDAY MAYDAY MAYDAY, callsign, position, nature, intentions', 1], ['PAN PAN, position, emergency type', 0], ['Declare emergency to ATC directly', 0]], tip: 'MAYDAY x3 = מצוקה · PAN PAN x3 = דחיפות. לפי ICAO Doc 4444.' },
      { type: 'mcq', he: 'מה מציין הדיווח "hook appears down"?', en: 'What does "hook appears down" indicate?', opts: [['Landing gear is down and locked', 0], ['Arresting hook appears to be in the down position', 1], ['Flaps are deployed', 0], ['Speed brakes are out', 0]], tip: 'Hook = ווו עצירה · דיווח לפני ניסיון תפיסה בכבל.' },
      { type: 'mcq', he: 'מה פירוש "Safety, hold position"?', en: 'ATC: "Safety, hold position" — what does this mean?', opts: [['The aircraft has a safety issue', 0], ['It is a safety-related instruction — stop now', 1], ['Check your safety equipment', 0], ['Hold at the safety line', 0]], tip: '"Safety" = הקדמת מילת בטיחות — הוראה קריטית.' },
      { type: 'mcq', he: 'איזו מילת חירום משתמשים בה שותפים אמריקאים במקום MAYDAY?', en: 'Which emergency term do American partners use instead of MAYDAY?', opts: [['URGENCY', 0], ['EMERGENCY', 1], ['DISTRESS', 0], ['BREAK BREAK', 0]], tip: 'שותף אמריקאי: EMERGENCY (לא MAYDAY / PAN PAN בדרך כלל).' },
      { type: 'dnd', he: 'הרכב/י דיווח תפיסה בכבל', template: '__ callsign __ arresting cable engaged', bank: ['Aircraft', 'first', 'second', 'all', 'safety'], answer: ['Aircraft', 'first'], tip: 'כשמטוס נתפס בכבל: "Aircraft [callsign] first/second arresting cable engaged".' },
      { type: 'listen', he: 'האזן/י לביטול המראה דחוף', audio: 'Emek two hold position cancel takeoff, I say again cancel takeoff, vehicle on runway', he2: 'עמק 2, עצור! בטל המראה — אני חוזר: בטל המראה! רכב על המסלול', tip: '"I say again" = הדגשה כפולה על הוראת בטיחות קריטית.' }
    ]},

    10: { num: 10, title: 'שותף אמריקאי', sub: 'American partner unique terminology', exercises: [
      { type: 'mcq', he: 'טייס אמריקאי אומר "2 Mikes" — מה הכוונה?', en: 'An American pilot says "2 Mikes" — what does it mean?', opts: [['2 miles', 0], ['2 minutes', 1], ['2 miles per minute', 0], ['2 nautical miles', 0]], tip: 'MIKE = קיצור Minutes בשימוש צבאי אמריקאי.' },
      { type: 'mcq', he: 'מהו "CIRCUIT PATTERN"?', en: 'What is "CIRCUIT PATTERN"?', opts: [['Emergency pattern', 0], ['The standard traffic pattern / circuit', 1], ['A navigation chart', 0], ['A radio circuit check', 0]], tip: 'Circuit Pattern = הקפה (Traffic Pattern) — השם האמריקאי.' },
      { type: 'mcq', he: 'טייס מדווח "HUNG ORDNANCE" — מה המצב?', en: 'A pilot reports "HUNG ORDNANCE" — what is the situation?', opts: [['The aircraft is overloaded', 0], ['There is a weapons malfunction / stuck ordnance', 1], ['The aircraft is in an emergency descent', 0], ['Weapons have been released', 0]], tip: 'HUNG ORDNANCE = תקלת חימוש / חימוש שלא שוחרר.' },
      { type: 'mcq', he: 'מהו "REQUEST CLOSE"?', en: 'What is "REQUEST CLOSE"?', opts: [['Request close approach', 0], ['Request to fly directly to downwind, usually after low approach', 1], ['Request close formation', 0], ['Request for close-in vectors', 0]], tip: 'REQUEST CLOSE = בקשה לטוס ישירות לעם הרוח, אחרי גישה נמוכה.' },
      { type: 'mcq', he: 'מתי משדרים Alarm Green?', en: 'When is Alarm Green transmitted?', opts: [['When enemy aircraft detected', 0], ['End of event, safe to return for landing', 1], ['When runway is clear', 0], ['When weather improves', 0]], tip: 'Alarm Green = סוף אירוע, מותר לחזור לנחיתה בבטיחות.' },
      { type: 'dnd', he: 'הרכב/י Alpha Check', template: 'ALPHA CHECK: __ is on range __ Miles, __ degrees', bank: ['Base', 'Final', '5', '10', '1-1-0', '0-9-0'], answer: ['Base', '5', '1-1-0'], tip: 'Alpha Check = בדיקת מיקום לפני גישה — מינוח ישראלי.' },
      { type: 'listen', he: 'האזן/י לדיווח הפסקת המראה', audio: 'ABORTING TAKE OFF', he2: 'מפסיק המראה (דיווח טייס על הפסקת המראה)', tip: 'מונח אמריקאי — לעומת ATC שמשדר: "cancel takeoff".' },
      { type: 'listen', he: 'האזן/י לדיווח כוח מנוע', audio: 'IDLE POWER', he2: 'כוח מנוע על סרק (מנוע במינימום)', tip: 'אמריקאי: IDLE POWER · ישראלי/ICAO: flight idle.' }
    ]},

    0: { num: 'final', title: 'מבחן מסכם', sub: 'כל החומר — מספרים עד חירום ושותף אמריקאי', exercises: [
      { type: 'mcq', he: 'מהו קוד התוכי: "squawk fife one fife two"?', en: 'ATC: "India Alpha Fox cleared via SID MEZADA, squawk fife one fife two" — what is the transponder code?', opts: [['6000', 0], ['5152', 1], ['MEZADA', 0], ['IAF255', 0]], tip: 'squawk = קוד תוכי · fife one fife two = 5152.' },
      { type: 'mcq', he: 'בחירום — מי לא מקבל דיווח בקשר הרדיו ישירות?', en: 'Pilot declares EMERGENCY — which does NOT receive the direct radio call?', opts: [['ATC', 0], ['Emergency services', 0], ['The base commander', 1], ['The adjacent airspace unit', 0]], tip: 'שאלה מלכודת — בקשר הרדיו ATC מתאמת. שאר הגורמים מתואמים פנימית.' },
      { type: 'mcq', he: 'איזה כלל הגייה שגוי?', en: 'Which pronunciation rule is WRONG?', opts: [['5 = FIFE', 0], ['9 = NIN-ER', 0], ['3 = TREE', 0], ['0 = OH', 1]], tip: '0 = ZE-RO (לא OH) — OH משמש בדיבור יומיומי אך לא בפרזיולוגיה תעופתית.' },
      { type: 'mcq', he: 'מה הגובה לפי: "Arayot one and two descending altitude ___ feet"?', en: 'Complete: "joining holding, Arayot one and two descending altitude ___ feet"', opts: [['six tousand', 0], ['eight tousand', 1], ['one zero tousand', 0], ['fife tousand', 0]], tip: 'לפי הדוגמה: Arayot 1 & 2 = descend to 8,000 ft.' },
      { type: 'dnd', he: 'הרכב/י בקשת הסעה מלאה מחצור', template: 'HATZOR GROUND shalom, Akrav one at __, information Charlie, ready to taxi, departing __', bank: ['shelter one six', 'SID QIRYA one', 'runway two tree', 'approach'], answer: ['shelter one six', 'SID QIRYA one'], tip: 'בקשת הסעה: מיקום נוכחי + SID מבוקש.' },
      { type: 'dnd', he: 'הרכב/י התראת תנועה', template: 'Gamal, __ traffic, two o\'clock, __ miles, merging from right at two tousand feet, Black Hawk', bank: ['traffic', 'opposite', 'tree', 'five', 'contact'], answer: ['traffic', 'tree'], tip: 'התראת תנועה: traffic + שעון + מרחק + כיוון + גובה + סוג כלי טיס.' },
      { type: 'listen', he: 'האזן/י להוראת ירידה והצטרפות', audio: 'Arayot, descend altitude six tousand feet join upwind runway two niner left', he2: 'ארייות, רד ל-6,000 רגל, הצטרף מצלע מת למסלול 29 שמאל', tip: 'upwind leg = צלע מת (הצלע שמול כיוון המסלול).' },
      { type: 'listen', he: 'האזן/י למעבר ל-IFR במרחב', audio: 'Charlie Alpha Echo, switch to IFR, climb to altitude fower tousand feet, VOR NAT, squawk fife zero six fife and IDENT', he2: 'צ\'רלי אלפא אקו, עבור ל-IFR, טפס ל-4,000 רגל, VOR NAT, קוד תוכי 5065 ולחץ IDENT', tip: 'מעבר מ-VFR ל-IFR: גובה + VOR + תוכי + IDENT.' },
      { type: 'listen', he: 'האזן/י להוראת הליכה סביב', audio: 'Barzel one climb to altitude tree tousand feet runway heading', he2: 'ברזל אחד, טפס ל-3,000 רגל, heading מסלול', tip: 'הליכה סביב ביוזמת טייס: ATC נותן גובה + heading.' }
    ]}

  };

  var PRON = [
    ['0','ZE-RO'],['1','WUN'],['2','TOO'],['3','TREE'],['4','FOW-ER'],
    ['5','FIFE'],['6','SIX'],['7','SEV-EN'],['8','AIT'],['9','NIN-ER'],
    ['.','DAY-SEE-MAL'],['100','HUN-DRED'],['1000','TOU-SAND']
  ];

  var READ = [
    ['1','Reading you one','אחד מחמש — לא קריא','#E5484D'],
    ['2','Reading you two','שתיים מחמש — קריא לסירוגין','#F2870A'],
    ['3','Reading you tree','שלוש מחמש — קריא בקושי','#E0A800'],
    ['4','Reading you fower','ארבע מחמש — קריא','#5BA35B'],
    ['5','Reading you fife','חמש מחמש — קריא מצוין','#2E9E5B']
  ];

  var CATS = [
    { id: 'proc', label: 'נהלים ובקרת קשר', items: [['Say again','אמור שנית','חזור על השידור האחרון'],['I say again','אומר שנית','חזרה על הוראה חשובה'],['Roger','קיבלתי','המסר התקבל'],['Affirm','חיובי','כן / נכון'],['Negative','שלילי','לא / לא נכון'],['Confirm','אשר','אשר נתון מסוים'],['Verify','ודא','ודא לפני מתן תשובה'],['Readback','חזור על','חזור על תוכן ההוראה'],['Standby','מיד אתך','המתן, אקרא לך'],['Disregard','התעלם','בטל את התשדורת האחרונה'],['Correction','תיקון','תיקון לשידור הקודם'],['How do you read','איך שומע','מהי איכות הקליטה'],['Unable','לא מסוגל','לא ניתן לבצע'],['Break break','הפרדה בין שידורים','בין מטוסים שונים'],['Monitor','האזן','האזן לתחנה ולתדר'],['Contact','עבור ל','עבור לקשר עם תחנה ותדר']]},
    { id: 'inst', label: 'הוראות טיסה', items: [['Climb','טפס','טפס לגובה'],['Descend','הנמך','הנמך לגובה'],['Maintain','שמור','גובה / מהירות / אזור'],['Turn left / right','פנה שמאלה / ימינה','שינוי כיוון'],['Fly heading','טוס בכיוון','שלוש ספרות'],['Expedite','זרז','בצע מהר יותר'],['Orbit','בצע המתנה','מעגל פנייה 360°'],['Line up and wait','התיישר והמתן','עלייה למסלול והמתנה'],['Cleared for take-off','רשאי להמראה','אישור המראה'],['Cleared to land','רשאי לנחות','אישור נחיתה'],['Go around','לך סביב','ביטול נחיתה'],['Touch and go','נגיעה והמראה','תרגול במסלול'],['Hold position','עצור במקום','עצירה בהסעה'],['Hold short','עצור לפני','מסלול / הסעה'],['Taxi','הסע','הסעה על הקרקע'],['Pushback','דחיפה לאחור','דחיפה מהחניה'],['Vacate the runway','פנה את המסלול','פינוי לאחר נחיתה'],['Backtrack','הסעה הפוכה','בכיוון הפוך על המסלול']]},
    { id: 'traffic', label: 'תנועה והפרדה', items: [['Traffic','תנועה','מידע על כלי טיס אחר'],['Radar contact','מגע מכ"ם','המטוס זוהה על התמונה'],['Maintain own separation','שמור הפרדה עצמית','אחריות ההפרדה על הטייס'],['Caution wake turbulence','זהירות מערבולות','מערבולות קצה כנף'],['Opposite traffic','תנועה נגדית','כלי טיס בכיוון מנוגד'],['Crossing traffic','תנועה חוצה','חוצה את הנתיב'],['Give way','תן זכות קדימה','אפשר מעבר'],['Report traffic in sight','דווח בקשר עין','כשהתנועה מזוהה'],['Number two','מספר שתיים','מיקום ברצף הנחיתות'],['Follow','עקוב אחרי','אחר מטוס בהקפה']]},
    { id: 'wx', label: 'מזג אוויר', items: [['Wind calm','רוח קלה','עד שלושה קשרים'],['Gusting','משבים','עוצמת המשב המרבית'],['QNH','לחץ ברומטרי','כיול מד גובה'],['Visibility','ראות','בק"ם / במייל'],['Few','מעט עננות','1–2 שמיניות'],['Scattered','עננות מפוזרת','3–4 שמיניות'],['Broken','עננות שבורה','5–7 שמיניות'],['Overcast','שמים מכוסים','8 שמיניות'],['Ceiling','בסיס ענן','גובה בסיס העננות'],['ATIS','שידור מוקלט אוטומטי','מידע שדה ומזג אוויר']]},
    { id: 'emer', label: 'חירום', items: [['Mayday Mayday Mayday','מצוקה','חירום הדורש סיוע מיידי'],['Pan-Pan','תקלה','חירום ללא סיוע מיידי'],['Emergency','חירום (אמריקאי)','שותף אמריקאי — MAYDAY'],['Barrier','הרם רשת','הפעלת אמצעי עצירה'],['Arresting cable engaged','נתפס בכבל','המטוס נתפס בכבל'],['Hook appears down','ווו נראה למטה','דיווח מצב ווו עצירה'],['Hung ordnance','תקלת חימוש','חימוש שלא שוחרר'],['Cancelling Mayday','ביטול מצוקה','ביטול קריאת חירום']]}
  ];

  var roleInfo = {
    ctrl: { he: 'בקר/ית', en: 'Flight Controller', badge: 'בקר טיסה', tint: '#EAF2FB', accent: '#2E78C7', idle: './assets/bakarStand.PNG', salute: './assets/bakar.png', desc: 'מבקר/ת תעבורה אווירית מהמגדל ובקרת מכ"ם.' },
    insp: { he: 'פקח/ית', en: 'Flight Inspector', badge: 'פקח טיסה', tint: '#E7F4EC', accent: '#1F8A5B', idle: './assets/girl.png', salute: './assets/girlHand.png', desc: 'פקח/ית טיסה — ליווי המראות, נחיתות ותנועה בשדה.' }
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

  var DICT_CHIPS = [
    ['all','הכל'],['numbers','מספרים'],['proc','נהלים'],['inst','הוראות'],
    ['traffic','תנועה'],['wx','מזג אוויר'],['emer','חירום'],['read','בדיקת קשר']
  ];

  window.ATC_DATA = {
    metaList: metaList, stages: stages,
    PRON: PRON, READ: READ, CATS: CATS,
    roleInfo: roleInfo, POSITIVE: POSITIVE,
    GAMES: GAMES, RADIO_GAME: RADIO_GAME, DICT_CHIPS: DICT_CHIPS
  };
})();
