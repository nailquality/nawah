
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "ضع_API_KEY_هنا",
  authDomain: "ضع_PROJECT_ID.firebaseapp.com",
  projectId: "ضع_PROJECT_ID_هنا",
  storageBucket: "ضع_STORAGE_BUCKET_هنا",
  messagingSenderId: "ضع_MESSAGING_SENDER_ID_هنا",
  appId: "ضع_APP_ID_هنا"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
