/* =====================================================================
   Firebase bridge — Auth + Firestore
   Exposes window.__ATC_FIREBASE__ and calls window.__ATC_AUTH_CALLBACK__
   ===================================================================== */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ============================================================
// 🔧 הכנס כאן את הפרטים שלך מ-Firebase Console
// ============================================================
const firebaseConfig = {
  apiKey:            "REPLACE_API_KEY",
  authDomain:        "REPLACE_AUTH_DOMAIN",
  projectId:         "REPLACE_PROJECT_ID",
  storageBucket:     "REPLACE_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_MESSAGING_SENDER_ID",
  appId:             "REPLACE_APP_ID"
};
// ============================================================

const app      = initializeApp(firebaseConfig);
const auth     = getAuth(app);
const db       = getFirestore(app);
const provider = new GoogleAuthProvider();

/**
 * שומר את ההתקדמות של משתמש מסוים ב-Firestore, במסמך users/{uid}.
 * משתמש ב-merge:true כדי לעדכן שדות בלבד ולא למחוק שדות קיימים אחרים.
 * @param {string} uid - מזהה המשתמש מ-Firebase Auth
 * @param {Object} data - הנתונים לשמירה (role, roleData, streak, gems, soundOn)
 */
async function saveProgress(uid, data) {
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
  } catch (e) { console.warn('saveProgress error', e); }
}

/**
 * טוען את נתוני ההתקדמות השמורים של משתמש מסוים מ-Firestore.
 * @param {string} uid - מזהה המשתמש מ-Firebase Auth
 * @returns {Promise<Object|null>} נתוני ההתקדמות, או null אם אין מסמך/שגיאה
 */
async function loadProgress(uid) {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? snap.data() : null;
  } catch (e) { return null; }
}

/**
 * פותח חלון התחברות (popup) של Google ומבצע אימות באמצעות Firebase Auth.
 * @returns {Promise<Object|null>} אובייקט המשתמש שהתחבר, או null אם נכשל/בוטל
 */
async function googleSignIn() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (e) {
    console.error('Google sign-in error', e);
    return null;
  }
}

/** מתנתק מהמשתמש הנוכחי ב-Firebase Auth. */
async function firebaseSignOut() {
  await signOut(auth);
}

/* --- חשיפה לאפליקציה הראשית --- */
// כל הפונקציות + onAuthStateChanged + auth נחשפים כאן כדי ש-app.js
// (קובץ רגיל, לא module) יוכל לקרוא להם בלי import ישיר.
window.__ATC_FIREBASE__ = { googleSignIn, firebaseSignOut, saveProgress, loadProgress, onAuthStateChanged, auth };

/* --- מאזין לשינוי מצב כניסה --- */
// בכל שינוי במצב ההתחברות (התחברות/התנתקות/טעינה ראשונית), Firebase
// קורא לפונקציה הזו עם אובייקט המשתמש (או null). אנחנו מעבירים את
// האירוע ל-app.js באמצעות window.__ATC_AUTH_CALLBACK__, שמוגדר שם.
onAuthStateChanged(auth, (user) => {
  if (window.__ATC_AUTH_CALLBACK__) window.__ATC_AUTH_CALLBACK__(user);
});
