const socket = io('https://lit-plains-47315.herokuapp.com/');
socket.on('init', handleInit);
socket.on('gameCode', handleGameCode);
socket.on('unknownCode', handleUnknownCode);
socket.on('displayWords', handleDisplayWords);
socket.on('getRedList', handleRedList);
socket.on('getBlueList', handleBlueList);
socket.on('getGrayList', handleGrayList);
socket.on('getDeathWord', handleDeathWord);
socket.on('changeButtonColor', handleChangeButtonColor);
const body = document.getElementsByTagName("BODY")[0];

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const newGameBtn2 = document.getElementById('newGameButton2');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const elements = document.getElementsByClassName("grid-item");
newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);
newGameBtn2.addEventListener('click', function() {
  window.location.reload();
});
var isBluesTurn = true;
let blueList;
let grayList;
let redList;
var blueScore = 9;
var redScore = 8;
var buttonClicked;

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', function(e){
    buttonClicked = e.target.id;
    const code = gameCodeInput.value;
    socket.emit('buttonClick', code, buttonClicked);
  });
}

spymasterButton.addEventListener('click', spyMaster);

function spyMaster(){
  for (let i = 0; i < 25; i++){
    var button  = document.getElementById(i+1);
    if (redList.includes(button.textContent)){
        button.style.background = "rgba(150, 122, 220, 0.45)";
    }
    else if (blueList.includes(button.textContent)){
        button.style.background="rgba(93, 156, 236, 0.45)";
    }
    else if (grayList.includes(button.textContent)){
        button.style.background="whitesmoke";
    }
    else if (deathWord.includes(button.textContent)){
        button.style.background = "black";
        button.style.color = "white";         
    }
    button.disabled = true;
}
}

function joinGame() {
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";
  body.style.background = "whitesmoke";
  const code = gameCodeInput.value;
  socket.emit('joinGame', code);
  handleGameCode(code);
}

function newGame() {
  body.style.background = "whitesmoke";;
  socket.emit('newGame');
}

function handleInit(msg){
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";
  setTimeout(spyMaster, 1000); //had to add this wait to make buttons actually change color
}

function handleGameCode(gameCode){
  gameCodeDisplay.innerText = gameCode;
}

function handleUnknownCode() {
  //unknown game code
  reset();
  alert("unknown game code");
}

function reset() {
  //reset the UI
  playerNumber = null;
  gameCodeInput.value = "";
  gameCodeDisplay.innerText = "";
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}

function handleDisplayWords(currUsedWords){ 
  for (let i = 0; i < 25; i++){
    word = currUsedWords[i];
    var button = document.getElementById(i+1);
    button.textContent = word;
  }
}

function handleBlueList(currBlueList){
  blueList = currBlueList;
}
function handleRedList(currRedList){
  redList = currRedList;
}
function handleGrayList(currGrayList){
  grayList = currGrayList;
}
function handleDeathWord(currDeathWord){
  deathWord = currDeathWord;
}

function handleChangeButtonColor(num){
  var button = document.getElementById(num);
  if (redList.includes(button.textContent)){
    button.style.background = 'rgba(150, 122, 220, 0.45)';
  }
  if (blueList.includes(button.textContent)){
    button.style.background = "rgb(0, 102, 133)";
  }
  if (grayList.includes(button.textContent)){
    button.style.background = 'gray';
  }
  if (deathWord === button.textContent){
    button.style.background = 'black';
    button.style.color = 'white';
    document.body.style.background = 'black';
  }
}
