import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL8BtzCQ_jrpn2Um-Q0ugI9SDLYfXV-mg",
  authDomain: "jaloapp-9de8d.firebaseapp.com",
  projectId: "jaloapp-9de8d",
  storageBucket: "jaloapp-9de8d.appspot.com",
  messagingSenderId: "138019762076",
  appId: "1:138019762076:web:d15ce8de5539858ab7e259",
  measurementId: "G-BEPTTQTGVF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
