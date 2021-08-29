const path = require('path');

const express = require('express');

const http = require('http');

const app = express();

const server = http.createServer(app);

const rules = require('./model/rules');

let rooms = [];

let playerSocket ={};

let playerNames = {
    playerOne: '',
    playerTwo: ''
};

var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }})

const cors = require('cors');

io.on('connection', socket => {
    socket.emit('socketMessage','hello there!')
    socket.join(rooms[rooms.length-1].id);
    io.in(socket.id).emit('myRoom',rooms[rooms.length-1].id,rooms[rooms.length-1].players);
    socket.on('playerGround', grid=>{
        io.in(rooms[rooms.length-1].id).emit('serverGround',grid)
    });
    socket.on('player',(playerName,hisNumber)=>{
        if(hisNumber==1){
            playerNames.playerOne = playerName;
        }else{
            playerNames.playerTwo = playerName;
        }
    })
    io.in(rooms[rooms.length-1].id).emit('nameSend',playerNames);
    socket.on('reset', r=>{
        if(r=='reset'){
            rooms = [];
            console.log(rooms);
        }
    })
})

io.on('connect', socket=>{
    console.log('a user has connected');
    if(rooms.length!=0){
        if(rooms[rooms.length-1].players == 1){
            rooms[rooms.length-1].players = 2;
        }else{
            rooms.push({
                id: rooms.length+1,
                players: 1
            })
        }
    }else{
        rooms.push({
            id: 1,
            players: 1
        })
    }
playerSocket = {
    id: socket.id
}

})

io.on('disconnect', ()=>{
    console.log('a user has disconnected');
})

app.get("/",(req,res)=>{
    res.render("index.html")
})

server.listen(3000, ()=>{
    console.log('we are connected');
})