const socket = io('http://localhost:3000')

const name = prompt('your name')

let playingGrid = [0,0,0,0,0,0,0,0,0];

let player = true;

let grid = document.querySelector('.grid-container');

let restart = document.querySelector('button');

let cases = document.querySelectorAll('.grid-item');

let playerOne = document.querySelector('.pOne');

let playerTwo = document.querySelector('.pTwo');

let playerTurn = document.querySelector('.tPlayer');

let reset = document.querySelector('.reset');

socket.on('serverGround',grid=>{
    cases.forEach((element,index) => {
        if(grid[index]==0){
            element.innerHTML = '';
        }
        else if(grid[index]==1){
            element.innerHTML = 'X';
        }
        else{
            element.innerHTML = 'O';
        }
    })
    playingGrid = grid;
})



grid.addEventListener('click', ev =>{
    if(player){
        ev.target.innerHTML = 'X';
        playingGrid[Number(ev.target.classList[1])-1] = 1;
        socket.emit('playerGround', playingGrid);
    }
    else{
        ev.target.innerHTML = 'O';
        playingGrid[Number(ev.target.classList[1])-1] = 2;
        socket.emit('playerGround', playingGrid);
    }
});

restart.addEventListener('click', ev =>{
    cases.forEach(element => {
            element.innerHTML = '';
        });
    playingGrid = [0,0,0,0,0,0,0,0,0];
    socket.emit('playerGround', playingGrid);
});

reset.addEventListener('click', ()=>{
    socket.emit('reset', 'reset');
    window.location.href = "./../views/menu.html";
})

socket.on('socketMessage', data =>{
    console.log(data);
})
socket.on('user-connected', () => {
    console.log('new user has connected');
})
socket.on('myRoom', (roomId,players)=>{
    console.log("my room is "+ roomId + " players in this room  = "+ players);
    if(players == 1){
        player=true;
        playerOne.innerHTML = name;
        socket.emit('player',name,1);
        socket.on('nameSend',players=>{
            playerTwo.innerHTML = players.playerTwo;
            console.log(players)
        })
    }else{
        player=false;
        playerTwo.innerHTML = name;
        socket.emit('player',name,2);
        socket.on('nameSend', players =>{
            playerOne.innerHTML = players.playerOne;
        })
    }
})