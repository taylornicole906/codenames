const io = require('socket.io')();
const { makeId, makeFullList, makeRedList, makeBlueList, makeGrayList, getDeathWord} = require('./utils');
const state = {};
const clientRooms = {};
var currUsedWords;
var redList;
var blueList;
var grayList;
var deathWord;
var blueScore = 9;
var redScore = 8;

io.on('connection', client => {

    client.on('newGame', handleNewGame);
    client.on('joinGame', handleJoinGame);
    client.on('buttonClick', handleButtonClick);
    currUsedWords = makeFullList();

    function handleNewGame() {

        let roomName = makeId(5);
        currUsedWords = makeFullList();
        redList = makeRedList(currUsedWords);
        blueList = makeBlueList(currUsedWords, redList);
        grayList = makeGrayList(currUsedWords, redList, blueList);
        deathWord = getDeathWord(currUsedWords, redList, blueList, grayList);
        clientRooms[client.id] = roomName;
        client.emit('gameCode', roomName);
        client.join(roomName);
        client.number = 1;
        client.emit('init', 1);
    }

    function handleJoinGame(roomName){
  
        const room = io.sockets.adapter.rooms[roomName];
        redList = makeRedList(currUsedWords);
        blueList = makeBlueList(currUsedWords, redList);
        grayList = makeGrayList(currUsedWords, redList, blueList);
        deathWord = getDeathWord(currUsedWords, redList, blueList, grayList);
        let allUsers;
        if (room) {
          allUsers = room.sockets;
        }
    
        let numClients = 0;
        if (allUsers) {
          numClients = Object.keys(allUsers).length;
        }
    
        if (numClients === 0) {
          client.emit('unknownCode');
          return;
        }
        clientRooms[client.id] = roomName;
        client.join(roomName);
        client.number = 2;
        io.emit('displayWords', currUsedWords);  
        io.emit('getRedList', redList);
        io.emit('getBlueList', blueList);
        io.emit('getGrayList', grayList);
        io.emit('getDeathWord', deathWord);
        
    }
    function handleButtonClick(numButton){
        //give this the number of button that was clicked
        io.emit('changeButtonColor', numButton);
        //io.emit('changeBackgroundColor', isBluesTurn);
        //io.emit('updateBlueScore', blueScore);
        //io.emit('updateRedScore', redScore);

    }

});

io.listen(process.env.PORT || 3000);
