import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {

    apiKey: "AIzaSyCVCz_E8YfpRttyq3g6ZkeWRLS5y9AaXKE",

    authDomain: "piedra-papel-o-tijera-1.firebaseapp.com",

    databaseURL: "https://piedra-papel-o-tijera-1-default-rtdb.firebaseio.com",

    projectId: "piedra-papel-o-tijera-1",

    storageBucket: "piedra-papel-o-tijera-1.firebasestorage.app",

    messagingSenderId: "147138851043",

    appId: "1:147138851043:web:8d9d87d033b4bf15e615d6"

};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
