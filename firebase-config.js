import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig={
 apiKey:"REEMPLAZAR",
 authDomain:"REEMPLAZAR",
 databaseURL:"REEMPLAZAR",
 projectId:"REEMPLAZAR",
 storageBucket:"REEMPLAZAR",
 messagingSenderId:"REEMPLAZAR",
 appId:"REEMPLAZAR"
};

const app=initializeApp(firebaseConfig);
export const db=getDatabase(app);
