# 🚀 הוראות פריסה — ATC Trainer

## שלב 1 — Firebase (10 דקות)

### 1.1 צור פרויקט
1. כנסי ל־ https://console.firebase.google.com
2. לחצי **"Add project"** → שם לפרויקט (למשל `atc-trainer`) → המשך
3. Google Analytics — אפשר לכבות, לא חובה

### 1.2 הפעל Authentication
1. בתפריט שמאל: **Build → Authentication**
2. לחצי **"Get started"**
3. לחצי **Google** → הפעל → הכניסי מייל תמיכה → שמור

### 1.3 הפעל Firestore
1. בתפריט שמאל: **Build → Firestore Database**
2. לחצי **"Create database"**
3. בחרי **"Start in test mode"** (נשנה אחר כך)
4. בחרי אזור: `europe-west1` (הכי קרוב לישראל) → Done

### 1.4 קבל את פרטי הפרויקט
1. לחצי על גלגל השיניים (⚙️) ליד "Project Overview" → **Project settings**
2. גללי למטה ל-"Your apps" → לחצי על **`</>`** (Web)
3. שם האפליקציה: `atc-web` → Register app
4. תקבלי קוד כזה — **שמרי אותו**:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "atc-trainer-xxx.firebaseapp.com",
  projectId: "atc-trainer-xxx",
  storageBucket: "atc-trainer-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## שלב 2 — עדכן את הקוד

פתחי את **`index.html`** ומצאי את החלק:
```javascript
const firebaseConfig = {
  apiKey:            "REPLACE_API_KEY",
  authDomain:        "REPLACE_AUTH_DOMAIN",
  ...
```

החליפי את כל ה-`REPLACE_...` בערכים האמיתיים מהשלב הקודם.

---

## שלב 3 — הוסף Authorized Domain ב-Firebase

1. Firebase Console → Authentication → **Settings** → **Authorized domains**
2. לחצי **"Add domain"**
3. הוסיפי את הדומיין של Netlify שתקבלי בהמשך (למשל `atc-trainer.netlify.app`)
4. אפשר לעשות את זה גם אחרי הפריסה

---

## שלב 4 — פרסי ב-Netlify (5 דקות)

### אפשרות א׳ — גרירה (הכי מהיר)
1. כנסי ל-https://netlify.com → הירשמי עם Google
2. Dashboard → **"Add new site"** → **"Deploy manually"**
3. גרירי את **תיקיית `atc-trainer`** כולה לריבוע
4. מקבלת לינק מיידי! 🎉

### אפשרות ב׳ — GitHub (מומלץ לעתיד)
1. דחפי את התיקייה ל-GitHub repository
2. Netlify → "Add new site" → "Import an existing project" → GitHub
3. בחרי את הריפו → Deploy

---

## שלב 5 — עדכן Authorized Domains ב-Firebase

אחרי שקיבלת את הלינק מ-Netlify:
1. Firebase → Authentication → Settings → Authorized domains
2. הוסיפי את `your-site.netlify.app`

---

## שלב 6 — אבטחת Firestore (חשוב!)

בFirestore → **Rules**, החליפי את הכלל ב:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
זה מבטיח שכל משתמש יכול לגשת רק לנתונים שלו.

---

## מבנה הקבצים

```
atc-trainer/
├── index.html      ← ראשי + Firebase SDK
├── styles.css      ← עיצוב
├── app.js          ← לוגיקה
└── assets/         ← תמונות (תוסיפי בעצמך)
    ├── tower.png
    ├── airplane.png
    ├── ctrl-hq.png
    ├── pilot-hq.png
    ├── pilot-salute-hq.png
    └── pilot-thumb-hq.png
```

---

## בעיות נפוצות

**"auth/unauthorized-domain"** — הדומיין לא מוסמך ב-Firebase Authentication → הוסיפי אותו ב-Authorized domains

**Popup נחסם** — בטלפון pop-up לפעמים נחסם. אפשר לשנות ל-`signInWithRedirect` — תגידי ואשנה

**Firebase לא נטען** — בדקי שהפרטים ב-`firebaseConfig` נכונים
