function createProduct(color, name, desc, price){
    let newDiv = document.createElement('div');

    let firstDiv = document.createElement('div');
    let secondDiv = document.createElement('div');
    let purchaseBtn = document.createElement('button');

    firstDiv.style.background = "#" + color;

    let image = document.createElement('img');
    image.src = "../icons/whiteicon.png"

    firstDiv.appendChild(image);
    purchaseBtn.innerHTML = "purchase"

    let newHeader = document.createElement('h1');
    let subHeader = document.createElement('h2');
    let newPara = document.createElement('p');

    newHeader.innerHTML = name;
    newPara.innerHTML = desc;

    if(price == 0) subHeader.innerHTML = "FREE"
    else if(price == "Unavailable") subHeader.innerHTML = "UNAVAILABLE"
    else if(price == undefined) subHeader.innerHTML = "PRICE NOT LISTED"
    else subHeader.innerHTML = "$" + price;

    secondDiv.appendChild(newHeader);
    secondDiv.appendChild(newPara);
    secondDiv.appendChild(subHeader);

    newDiv.appendChild(firstDiv);
    newDiv.appendChild(secondDiv);
    newDiv.appendChild(purchaseBtn);

    document.getElementById('store-page').appendChild(newDiv);
}

createProduct("B343FC", "BitByte Sports", "Play Fantasy Sports online with real matches.", 0.00);
createProduct("43BDFC", "BitFolio", "Online Visual Portfolio to organize and broadcast your achievements", "Unavailable")
createProduct("FC4380", "BitByte Mail", "Online End-To-End Encrypted Mail Service that is Easy to Use!", "Unavailable")
createProduct("43FC9A", "BitByte Learn", "Learn subjects faster and easier using higher methods of understanding", "Unavailable")
createProduct("F2FC43", "BitByte Play", "Series of commercialized games ranging for all ages and genres")