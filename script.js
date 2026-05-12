const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn =
document.getElementById("restart");

const newGameBtn =
document.getElementById("newGame");

const pvpBtn =
document.getElementById("pvpBtn");

const aiBtn =
document.getElementById("aiBtn");

const xScoreEl =
document.getElementById("xScore");

const oScoreEl =
document.getElementById("oScore");

let currentPlayer = "X";

let gameActive = true;

let gameMode = "pvp";

let xScore = 0;
let oScore = 0;

let gameState =
["","","","","","","","",""];

const winningConditions = [

  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,3,6],
  [1,4,7],
  [2,5,8],

  [0,4,8],
  [2,4,6]

];

/* Cell Click */

function handleCellClick(){

  const index =
  this.getAttribute("data-index");

  if(gameState[index] !== "" || !gameActive){
    return;
  }

  makeMove(index,currentPlayer);

  if(gameMode === "ai" &&
  gameActive &&
  currentPlayer === "O"){

    setTimeout(aiMove,500);

  }

}

/* Make Move */

function makeMove(index,player){

  gameState[index] = player;

  cells[index].innerHTML = player;

  cells[index].classList.add(
  player.toLowerCase()
  );

  checkWinner();

}

/* AI Move */

function aiMove(){

  let emptyCells =
  gameState
  .map((cell,index)=>
  cell === "" ? index : null)
  .filter(val => val !== null);

  if(emptyCells.length === 0){
    return;
  }

  let randomIndex =
  emptyCells[
  Math.floor(
  Math.random()*emptyCells.length
  )];

  makeMove(randomIndex,"O");

}

/* Check Winner */

function checkWinner(){

  let roundWon = false;

  for(let i=0;i<winningConditions.length;i++){

    const condition =
    winningConditions[i];

    const a =
    gameState[condition[0]];

    const b =
    gameState[condition[1]];

    const c =
    gameState[condition[2]];

    if(a === "" || b === "" || c === ""){
      continue;
    }

    if(a === b && b === c){

      roundWon = true;

      break;

    }

  }

  if(roundWon){

    statusText.innerHTML =
    `🎉 Player ${currentPlayer} Wins!`;

    gameActive = false;

    if(currentPlayer === "X"){

      xScore++;
      xScoreEl.innerHTML = xScore;

    }else{

      oScore++;
      oScoreEl.innerHTML = oScore;

    }

    return;

  }

  if(!gameState.includes("")){

    statusText.innerHTML =
    "🤝 Match Draw!";

    gameActive = false;

    return;

  }

  currentPlayer =
  currentPlayer === "X" ? "O" : "X";

  statusText.innerHTML =
  `Player ${currentPlayer} Turn`;

}

/* Restart */

function restartGame(){

  currentPlayer = "X";

  gameActive = true;

  gameState =
  ["","","","","","","","",""];

  statusText.innerHTML =
  "Player X Turn";

  cells.forEach(cell=>{

    cell.innerHTML = "";

    cell.classList.remove("x","o");

  });

}

/* New Game */

function newGame(){

  restartGame();

  xScore = 0;
  oScore = 0;

  xScoreEl.innerHTML = 0;
  oScoreEl.innerHTML = 0;

}

/* Mode Selection */

pvpBtn.onclick = ()=>{

  gameMode = "pvp";

  restartGame();

};

aiBtn.onclick = ()=>{

  gameMode = "ai";

  restartGame();

};

/* Events */

cells.forEach(cell=>{

  cell.addEventListener(
  "click",
  handleCellClick
  );

});

restartBtn.addEventListener(
"click",
restartGame
);

newGameBtn.addEventListener(
"click",
newGame
);