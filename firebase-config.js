import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// 🔁 CAMBIA ESTOS VALORES POR LOS DE TU PROYECTO
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "piedra-papel-o-tijera-1.firebaseapp.com",
  databaseURL: "https://piedra-papel-o-tijera-1-default-rtdb.firebaseio.com",
  projectId: "piedra-papel-o-tijera-1",
  storageBucket: "piedra-papel-o-tijera-1.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
