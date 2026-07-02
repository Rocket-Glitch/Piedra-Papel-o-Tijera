// DEMO LOCAL.
// La versión multijugador requiere Firebase.

const options=["Rock","Paper","Scissors"];
const result=document.getElementById("result");

function play(player){
 const computer=options[Math.floor(Math.random()*3)];
 let msg;
 if(player===computer) msg="🤝 Empate";
 else if(
   (player==="Rock"&&computer==="Scissors")||
   (player==="Paper"&&computer==="Rock")||
   (player==="Scissors"&&computer==="Paper")
 ) msg="🎉 Ganaste";
 else msg="😢 Perdiste";

 result.innerHTML=`Tú: ${player}<br>Computadora: ${computer}<br><br>${msg}`;
}

document.getElementById("rock").onclick=()=>play("Rock");
document.getElementById("paper").onclick=()=>play("Paper");
document.getElementById("scissors").onclick=()=>play("Scissors");

document.getElementById("createRoom").onclick=()=>{
 alert("La versión completa necesita Firebase configurado.");
};
document.getElementById("joinRoom").onclick=()=>{
 alert("La versión completa necesita Firebase configurado.");
};
