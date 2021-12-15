const sportsList = ['cricket', 'football', 'basketball']

function createFantasyLeague(sportIndex, name, prize, competing, image){
    let newDiv = document.createElement('div')

    let firstDiv = document.createElement('div')
    let secondDiv = document.createElement('div')
    let thirdDiv = document.createElement('div')

    firstDiv.style.backgroundImage = "url('" + image + "')";
    thirdDiv.style.backgroundImage = "url('" + image + "')";

    let headerDiv = document.createElement('div')
    let para = document.createElement('p')
    let btn = document.createElement('button')

    let headerImg = document.createElement('img')
    let childDiv = document.createElement('div')
    let header = document.createElement('h1')
    let prizePara = document.createElement('p')

    headerImg.src = '../icons/svgs/' + sportsList[sportIndex] + '.svg';
    header.innerHTML = name;
    prizePara.innerHTML = "Prize: " + prize;

    childDiv.appendChild(header);
    childDiv.appendChild(prizePara);

    headerDiv.appendChild(headerImg);
    headerDiv.appendChild(childDiv)

    para.innerHTML = competing + " People Competing"
    btn.innerHTML = "Join Draft"

    secondDiv.appendChild(headerDiv)
    secondDiv.appendChild(para)
    secondDiv.appendChild(btn)

    newDiv.appendChild(firstDiv)
    newDiv.appendChild(secondDiv)
    newDiv.appendChild(thirdDiv)

    document.getElementById('drafts').appendChild(newDiv);
    console.log('done')
}

createFantasyLeague(0, "IPL 2022 Cup", "1 Ultimate Trophy", 4567837, "https://pbs.twimg.com/media/E9FpDDFXsAAqkbR.jpg")
createFantasyLeague(2, "NBA 2022 Champions", "1 Ultimate Trophy", 12, "https://cdn.nba.com/manage/2021/10/3point-lead-graphic.png")