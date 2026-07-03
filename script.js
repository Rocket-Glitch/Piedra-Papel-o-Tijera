import { db } from "./firebase-config.js";
import { ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Elementos DOM
const login = document.getElementById("login");
const game = document.getElementById("game");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const reset = document.getElementById("reset");
const status = document.getElementById("status");
const playerIndicator = document.getElementById("playerIndicator");
const resultArea = document.getElementById("resultArea");
const gameStatus = document.getElementById("gameStatus");
const p1move = document.getElementById("p1move");
const p2move = document.getElementById("p2move");

let me = null;
let gameData = { player1: null, player2: null };

// Elegir jugador
p1.onclick = () => {
    me = "player1";
    login.style.display = "none";
    game.style.display = "block";
    status.textContent = "Conectado como Jugador 1";
    playerIndicator.textContent = "🔵";
    document.querySelector('.player-info').style.borderLeft = '4px solid #48bb78';
    updateStatusUI();
};

p2.onclick = () => {
    me = "player2";
    login.style.display = "none";
    game.style.display = "block";
    status.textContent = "Conectado como Jugador 2";
    playerIndicator.textContent = "🔴";
    document.querySelector('.player-info').style.borderLeft = '4px solid #fc8181';
    updateStatusUI();
};

// Enviar jugada
function send(move) {
    if (!me) {
        alert("Selecciona un jugador.");
        return;
    }
    const moveEmojis = { "Rock": "🪨", "Paper": "📄", "Scissors": "✂️" };
    update(ref(db, "game"), { 
        [me]: move,
        [`${me}Emoji`]: moveEmojis[move]
    });
    
    // Feedback visual
    const selectedBtn = document.querySelector(`.choice-btn.${move.toLowerCase()}`);
    if (selectedBtn) {
        selectedBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            selectedBtn.style.transform = '';
        }, 200);
    }
}

// Botones de jugada
rock.onclick = () => send("Rock");
paper.onclick = () => send("Paper");
scissors.onclick = () => send("Scissors");

// Reiniciar partida
reset.onclick = () => {
    if (confirm('¿Estás seguro de que quieres empezar una nueva partida?')) {
        set(ref(db, "game"), { 
            player1: null, 
            player2: null,
            player1Emoji: null,
            player2Emoji: null
        });
        resultArea.innerHTML = `
            <div class="result-placeholder">
                <span>🔄</span>
                <p>Partida reiniciada. ¡Esperando jugadas!</p>
            </div>
        `;
        resultArea.className = 'result-area';
        updateStatusUI();
    }
};

// Actualizar UI de estado
function updateStatusUI() {
    if (!gameData) return;
    
    // Actualizar movimientos
    p1move.textContent = gameData.player1 ? getMoveDisplay(gameData.player1) : '⏳';
    p2move.textContent = gameData.player2 ? getMoveDisplay(gameData.player2) : '⏳';
    p1move.className = 'status-value' + (gameData.player1 ? ' moved' : ' waiting');
    p2move.className = 'status-value' + (gameData.player2 ? ' moved' : ' waiting');
}

// Obtener display del movimiento
function getMoveDisplay(move) {
    const emojis = { "Rock": "🪨", "Paper": "📄", "Scissors": "✂️" };
    return emojis[move] || move;
}

// Mostrar resultado
function showResult(g) {
    if (!g.player1 || !g.player2) {
        resultArea.innerHTML = `
            <div class="result-placeholder">
                <span>⏳</span>
                <p>Esperando al otro jugador...</p>
            </div>
        `;
        resultArea.className = 'result-area';
        return;
    }

    let winner = "";
    let resultClass = "";
    const p1Move = getMoveDisplay(g.player1);
    const p2Move = getMoveDisplay(g.player2);

    if (g.player1 === g.player2) {
        winner = "🤝 ¡Empate!";
        resultClass = "draw";
    } else if (
        (g.player1 === "Rock" && g.player2 === "Scissors") ||
        (g.player1 === "Paper" && g.player2 === "Rock") ||
        (g.player1 === "Scissors" && g.player2 === "Paper")
    ) {
        winner = "🏆 ¡Ganó Jugador 1!";
        resultClass = me === "player1" ? "win" : "lose";
    } else {
        winner = "🏆 ¡Ganó Jugador 2!";
        resultClass = me === "player2" ? "win" : "lose";
    }

    resultArea.innerHTML = `
        <div class="result-content">
            <div class="winner">${winner}</div>
            <div class="result-details">
                <div class="move-display">
                    <span class="move-emoji">${p1Move}</span>
                    <span class="move-label">Jugador 1</span>
                </div>
                <div class="vs">⚔️</div>
                <div class="move-display">
                    <span class="move-emoji">${p2Move}</span>
                    <span class="move-label">Jugador 2</span>
                </div>
            </div>
            <div class="result-text ${resultClass}">
                ${winner}
            </div>
        </div>
    `;
    resultArea.className = 'result-area has-result';
}

// Escuchar cambios en la base de datos
onValue(ref(db, "game"), (snapshot) => {
    const g = snapshot.val();
    if (!g) {
        // Inicializar si no existe
        set(ref(db, "game"), { 
            player1: null, 
            player2: null,
            player1Emoji: null,
            player2Emoji: null
        });
        return;
    }

    gameData = g;
    updateStatusUI();
    showResult(g);
});

// Inicializar estado
updateStatusUI();
