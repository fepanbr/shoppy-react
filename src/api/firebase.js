// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);
const dbRef = ref(database);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  console.log("logout");
  return signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    // 1. 사용자가 있는 경우에 (로그인한경우)
    // 2. 사용자가 어드민 권한을 가지고 있는지 확인!
    // 3. {...user, isAdmin: true/false}
    if (!user) return callback(null);

    callback({ ...user, isAdmin: await isAdmin(user.uid) });
  });
}

export async function isAdmin(id) {
  return get(child(dbRef, `admins`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        // console.log("isAdmin", admins.includes(id));
        return admins.includes(id);
      }
      return false;
    })
    .catch(console.error);
}

// function addProduct(product) {
//   set(child(dbRef, 'products'), product);
// }
