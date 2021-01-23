
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
socket.on('changeBackgroundColor', handleChangeBackgroundColor);
socket.on('updateBlueScore', handleUpdateBlueScore)
socket.on('updateRedScore', handleUpdateRedScore);
socket.on('spymaster', handleSpyMaster);

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const newGameBtn2 = document.getElementById('newGameButton2');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const elements = document.getElementsByClassName("boxed");
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
  //in here, addEventListener is looking for a reference to a function, 
  //which is why I had to make the mainFunction return a function
  //otherwise it would just call it directly and change all button colors immediately 
  elements[i].addEventListener('click', buttonFunction);
}

function buttonFunction(e) {
  buttonClicked = e.target.id;
  const code = gameCodeInput.value;
  socket.emit('buttonClick', code, buttonClicked);
}

spymasterButton.addEventListener('click', function(){
  for (let i = 0; i < 25; i++){
    var button  = document.getElementById(i+1);
    if (redList.includes(button.textContent)){
        button.style.background = "rgba(242, 155, 160, 1)";
    }
    else if (blueList.includes(button.textContent)){
        button.style.background="rgba(149, 212, 212, 1)";
    }
    else if (grayList.includes(button.textContent)){
        button.style.background="white";
    }
    else if (deathWord.includes(button.textContent)){
        button.style.background = "black";
        button.style.color = "white"         
    }
    button.disabled = true;
}
})

function handleSpyMaster(buttonNum){
  var button  = document.getElementById(buttonNum+1);
  if (redList.includes(button.textContent)){
      button.style.background = "rgba(242, 155, 160, 1)";
  }
  else if (blueList.includes(button.textContent)){
      button.style.background="rgba(149, 212, 212, 1)";
  }
  else if (grayList.includes(button.textContent)){
      button.style.background="white";
  }
  else if (deathWord.includes(button.textContent)){
      button.style.background = "black";
      button.style.color = "white"         
  }
  button.disabled = true;
  
}

function joinGame() {
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";
  const code = gameCodeInput.value;
  socket.emit('joinGame', code);
  handleGameCode(code);
}

function newGame() {
  socket.emit('newGame');
}

function init() {
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";
  for (let i = 0; i < 25; i++){
    handleSpyMaster(i);
    console.log("calling spymaster");
  }

}

function handleInit(msg){
  init();
}

function handleGameCode(gameCode){
  console.log(gameCode);
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
    button.style.background = 'red';
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

function handleChangeBackgroundColor(num){

}

function handleUpdateBlueScore(blueScore){

}

function handleUpdateRedScore(redScore){

}
