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
    redList = makeRedList(currUsedWords);
    blueList = makeBlueList(currUsedWords, redList);
    grayList = makeGrayList(currUsedWords, redList, blueList);
    deathWord = getDeathWord(currUsedWords, redList, blueList, grayList);

    function handleNewGame() {

        let roomName = makeId(5);
        currUsedWords = makeFullList();
        clientRooms[client.id] = roomName;
        client.emit('gameCode', roomName);
        client.join(roomName);
        client.emit('init', 1);
   
        io.in(roomName).emit('displayWords', currUsedWords);  
        io.in(roomName).emit('getRedList', redList);
        io.in(roomName).emit('getBlueList', blueList);
        io.in(roomName).emit('getGrayList', grayList);
        io.in(roomName).emit('getDeathWord', deathWord);
      
    }

    function handleJoinGame(roomName){
        //check if there's actually users in the room
        const room = io.sockets.adapter.rooms[roomName];
        let allUsers;
        if (room) {
          allUsers = room.sockets;
        }
          let numClients = 0; //check if there's actually users in the room
        if (allUsers) {
          numClients = Object.keys(allUsers).length;
        }

        if (numClients === 0) {
          client.emit('unknownCode');
          return;
        }
        clientRooms[client.id] = roomName;
        client.join(roomName);
        io.in(roomName).emit('displayWords', currUsedWords);  
        io.in(roomName).emit('getRedList', redList);
        io.in(roomName).emit('getBlueList', blueList);
        io.in(roomName).emit('getGrayList', grayList);
        io.in(roomName).emit('getDeathWord', deathWord);
    }

    function handleButtonClick(roomName, numButton){ 
      clientRooms[client.id] = roomName;
      client.join(roomName);
      io.in(roomName).emit('changeButtonColor', numButton);
      //io.emit('changeBackgroundColor', isBluesTurn);
      //io.emit('updateBlueScore', blueScore);
      //io.emit('updateRedScore', redScore);
    }

});

io.listen(process.env.PORT || 3000);
