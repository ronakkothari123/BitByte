const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')

const gameNumber = 1;
const cellSize = 40;

let cellWidth, cellHeight, gamePlaying
let objects = [];

function initGame(){

    objects = [];

    if(window.innerWidth > window.innerHeight){
        canvas.width = window.innerHeight * 11/20;
        canvas.height = window.innerHeight * 11/20;
    } else {
        canvas.width = window.innerWidth * 11/20;
        canvas.height = window.innerWidth * 11/20;
    }
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    cellWidth = canvas.width/cellSize;
    cellHeight = canvas.height/cellSize;

    canvas.style.opacity = 0.75;

    gamePlaying = Math.trunc(Math.random() * gameNumber);
    if(gamePlaying == 0){
        pong()
    }
}

function pong(){

    let player = {
        x:2,
        y:cellSize / 2 - 2,
        color:"black",
        width:1,
        height:4
    }
    
    let computer = {
        x:cellSize - 3,
        y:cellSize / 2 - 2,
        color:"black",
        width:1,
        height:4
    }
    
    let ball = {
        x:cellSize / 2 - 1,
        y:cellSize / 2 - 1,
        color: "black",
        width:1,
        height:1,
        xDir:-1,
        yDir:0
    }

    objects.push(player)
    objects.push(computer)
    objects.push(ball)

    setInterval(pongClock, 100)
}

function pongClock(){
    if(objects[0].y < 0) objects[0].y = 0;
    if(objects[0].y + objects[0].height > cellSize) objects[0].y = cellSize - objects[0].height;
    
    if(objects[2].y <= 0 || objects[2].y >= cellSize - 1) objects[2].yDir *= -1;

    objects[2].x += objects[2].xDir
    objects[2].y += objects[2].yDir
    
    if(objects[2].x == 3 && objects[2].y >= objects[0].y && objects[2].y < objects[0].y + objects[0].height){
        objects[2].xDir *= -1;
        if(objects[2].y - objects[0].y == 0) objects[2].yDir = -2;
        if(objects[2].y - objects[0].y == 1) objects[2].yDir = -1;
        if(objects[2].y - objects[0].y == 2) objects[2].yDir = 1;
        if(objects[2].y - objects[0].y == 3) objects[2].yDir = 2;
    } else if(objects[2].x == cellSize - 4 && objects[2].y >= objects[1].y && objects[2].y < objects[1].y + objects[1].height){
        objects[2].xDir *= -1;
        if(objects[2].y - objects[1].y == 0) objects[2].yDir = -2;
        if(objects[2].y - objects[1].y == 1) objects[2].yDir = -1;
        if(objects[2].y - objects[1].y == 2) objects[2].yDir = 1;
        if(objects[2].y - objects[1].y == 3) objects[2].yDir = 2;
    }

    if(objects[1].y < objects[2].y) objects[1].y += 1;
    else if(objects[1].y > objects[2].y) objects[1].y -= 1;

    if(objects[2].x < 0 || objects[2].x > cellSize - 1){
        objects[2].yDir *= 0;
        objects[2].x = cellSize / 2 - 1
        objects[2].y = cellSize / 2 - 1
    }

    render()
}

function render(){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fill();

    for(let i = 0; i < objects.length; i++){
        ctx.fillStyle = objects[i].color;
        ctx.fillRect(objects[i].x * cellWidth, objects[i].y * cellHeight, objects[i].width * cellWidth, objects[i].height * cellHeight)
        ctx.fill()
    }

    ctx.closePath();
}

document.addEventListener('keydown', function(e){
    if(gamePlaying != undefined){
        if(e.keyCode == 37){
            e.preventDefault()
        } else if(e.keyCode == 38){
            e.preventDefault()
            if(gamePlaying == 0) objects[0].y -= 1;
        } else if(e.keyCode == 39){
            e.preventDefault()
        } else if(e.keyCode == 40){
            e.preventDefault()
            if(gamePlaying == 0) objects[0].y += 1;
        }
    }
})

window.addEventListener('resize', function(){
    if(window.innerWidth > window.innerHeight){
        canvas.width = window.innerHeight * 11/20;
        canvas.height = window.innerHeight * 11/20;
    } else {
        canvas.width = window.innerWidth * 11/20;
        canvas.height = window.innerWidth * 11/20;
    }
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    cellWidth = canvas.width/cellSize;
    cellHeight = canvas.height/cellSize;
    render();
});