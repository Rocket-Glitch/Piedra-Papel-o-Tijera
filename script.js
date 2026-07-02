import { db } from "./firebase-config.js";
import { ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Obtener elementos del HTML
const login = document.getElementById("login");
const game = document.getElementById("game");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const reset = document.getElementById("reset");
const status = document.getElementById("status");
const result = document.getElementById("result");

// Jugador actual
let me = null;

// Elegir jugador
p1.onclick = () => {
  me = "player1";
  login.style.display = "none";
  game.style.display = "block";
  status.textContent = "Eres Jugador 1";
};

p2.onclick = () => {
  me = "player2";
  login.style.display = "none";
  game.style.display = "block";
  status.textContent = "Eres Jugador 2";
};

// Enviar jugada
function send(move) {
  if (!me) {
    alert("Selecciona un jugador.");
    return;
  }
  update(ref(db, "game"), { [me]: move });
}

// Botones
rock.onclick = () => send("Rock");
paper.onclick = () => send("Paper");
scissors.onclick = () => send("Scissors");

// Reiniciar partida
reset.onclick = () => {
  set(ref(db, "game"), { player1: null, player2: null });
};

// Escuchar cambios
onValue(ref(db, "game"), (snapshot) => {
  const g = snapshot.val();
  if (!g) return;

  if (!g.player1 || !g.player2) {
    result.innerHTML = "Esperando al otro jugador...";
    return;
  }

  let winner = "";
  if (g.player1 === g.player2) {
    winner = "🤝 Empate";
  } else if (
    (g.player1 === "Rock" && g.player2 === "Scissors") ||
    (g.player1 === "Paper" && g.player2 === "Rock") ||
    (g.player1 === "Scissors" && g.player2 === "Paper")
  ) {
    winner = "🏆 Ganó Jugador 1";
  } else {
    winner = "🏆 Ganó Jugador 2";
  }

  // ✅ Aquí estaba el error: template literal con backticks
  result.innerHTML = `<b>Jugador 1:</b> ${g.player1}<br>
                      <b>Jugador 2:</b> ${g.player2}<br><br>
                      <h2>${winner}</h2>`;
});
