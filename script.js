const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')

const gameNumber = 1;
const cellSize = 40;

let cellWidth, cellHeight, gamePlaying

let player = {
    x:0,
    y:0,
    color:"black",
    width:1,
    height:1
}

let computer = {
    x:0,
    y:0,
    color:"black",
    width:1,
    height:1
}

function initGame(){

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
    player.height = 4;
    player.y = cellSize / 2 - Math.trunc(player.width / 2) - 1
    player.x = 2;

    computer.height = 4;
    computer.y = cellSize / 2 - Math.trunc(player.width / 2) - 1
    computer.x = cellSize - 3;

    setInterval(pongClock, 100)
}

function pongClock(){
    if(player.y < 0) player.y = 0;
    if(player.y > cellSize) player.y = cellSize;
    render()
}

function render(){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fill();

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x * cellWidth, player.y * cellHeight, player.width * cellWidth, player.height * cellHeight);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = computer.color;
    ctx.fillRect(computer.x * cellWidth, computer.y * cellHeight, computer.width * cellWidth, computer.height * cellHeight);
    ctx.fill();
    ctx.closePath();
}

function createProduct(color, name, desc, version){
    let newDiv = document.createElement('div');
    newDiv.classList.add('product-item');

    let newImg = document.createElement('img');
    newImg.src = "./icons/" + color + 'icon.png'
    newDiv.appendChild(newImg);
    
    let childDiv = document.createElement('div');
    let header = document.createElement('h1');
    let para = document.createElement('p')
    header.appendChild(document.createTextNode(name))
    para.appendChild(document.createTextNode(desc))

    childDiv.appendChild(header)
    childDiv.appendChild(para)
    newDiv.appendChild(childDiv)

    let versionPara = document.createElement('p')
    versionPara.appendChild(document.createTextNode(version))

    newDiv.appendChild(versionPara)

    document.getElementById('product-list').appendChild(newDiv);
}

document.addEventListener('keydown', function(e){
    if(gamePlaying != undefined){
        e.preventDefault()
        if(e.keyCode == 37){

        } else if(e.keyCode == 38){
            if(gamePlaying == 0) player.y -= 1;
        } else if(e.keyCode == 39){
            
        } else if(e.keyCode == 40){
            if(gamePlaying == 0) player.y += 1;
        }
    }
})

createProduct("blue", "BitFolio", "An Online Social Media dedicated to showcase your personal achievements, advancements, qualifications, etc. The Best Online Hub for employees and employers everywhere!", "BETA")
createProduct("purple", "BitSports", "Online Fantasy Sports platform for players around the world. Is not constricted to one location, and is free to play! It is The Number One Fantasy Sport application in the world!", "ALPHA")
createProduct("red", "BitMail", "Online Email system designed for efficiency and user-friendliness. This email system utilizes End-To-End encryption and secure connections enabling an integrated security system!", "ALPHA")
createProduct("yellow", "BitLearn", "A Website dedicated to helping people learn about everyday necessities, whilst making it fun and easy. Our curriculum emphasizes user understanding, and has an online community to help.", "BETA")
createProduct("green", "BitPlay", "A platform for online games that you can play! As of right now, it is free, but fun! The Games were designed with user-friendliness and customizability in mind. Have Fun gaming!", "ALPHA")