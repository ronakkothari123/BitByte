const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')

const gameNumber = 1;

function initGame(){
    canvas.style.opacity = 0.75;
    let gamePlaying = Math.trunc(Math.random() * gameNumber);
    if(gamePlaying == 0){
        console.log("Snak")
    }
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

createProduct("blue", "BitFolio", "An Online Social Media dedicated to showcase your personal achievements, advancements, qualifications, etc. The Best Online Hub for employees and employers everywhere!", "BETA")
createProduct("purple", "BitSports", "Online Fantasy Sports platform for players around the world. Is not constricted to one location, and is free to play! It is The Number One Fantasy Sport application in the world!")