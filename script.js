import {db} from './firebase-config.js';
import {ref,set,update,onValue} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

let me=null;

p1.onclick=()=>{
 me='player1';
 login.style.display='none';
 game.style.display='block';
 status.textContent='Eres Jugador 1';
};

p2.onclick=()=>{
 me='player2';
 login.style.display='none';
 game.style.display='block';
 status.textContent='Eres Jugador 2';
};

function send(move){
 if(!me){alert('Selecciona un jugador');return;}
 update(ref(db,'game'),{[me]:move});
}

rock.onclick=()=>send('Rock');
paper.onclick=()=>send('Paper');
scissors.onclick=()=>send('Scissors');

reset.onclick=()=>set(ref(db,'game'),{player1:null,player2:null});

onValue(ref(db,'game'),snap=>{
 const g=snap.val();
 if(!g||!g.player1||!g.player2)return;

 let r='';
 if(g.player1===g.player2) r='Empate';
 else if(
 (g.player1==='Rock'&&g.player2==='Scissors')||
 (g.player1==='Paper'&&g.player2==='Rock')||
 (g.player1==='Scissors'&&g.player2==='Paper')
 ) r='Ganó Jugador 1';
 else r='Ganó Jugador 2';

 result.innerHTML=`J1: ${g.player1}<br>J2: ${g.player2}<br><br>${r}`;
});
