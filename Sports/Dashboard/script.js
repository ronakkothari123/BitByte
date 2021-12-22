const containers = document.querySelectorAll(".container");
const sidebars = document.querySelectorAll(".sidebar");
const sportsList = ['cricket', 'football', 'basketball', 'soccer']

let activeContainer = 0;

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
    btn.innerHTML = "Join League"

    secondDiv.appendChild(headerDiv)
    secondDiv.appendChild(para)
    secondDiv.appendChild(btn)

    newDiv.appendChild(firstDiv)
    newDiv.appendChild(secondDiv)
    newDiv.appendChild(thirdDiv)

    document.getElementById('drafts').appendChild(newDiv);
}

function toggleContainer(num){
    containers[activeContainer].classList.remove('active-container');

    sidebars[activeContainer].classList.remove('active-sidebar');
    sidebars[num].classList.add('active-sidebar');
    
    containers[num].classList.add('active-container')

    activeContainer = num;

    console.log(containers[0].classList)
}

createFantasyLeague(1, "NFL 2022 Fantasy", "1 Ultimate Trophy", 7284854, "https://cdn.vox-cdn.com/thumbor/X0BcMsovx2iiZvMrSc4bgQk5y-g=/0x0:1200x800/1200x800/filters:focal(504x304:696x496)/cdn.vox-cdn.com/uploads/chorus_image/image/70203570/Week12WinnersLosers_AP_Ringer.0.jpeg")
createFantasyLeague(0, "IPL 2022 Cup", "1 League Trophy", 4567837, "https://wallpaperaccess.com/full/2302746.jpg")
createFantasyLeague(2, "NBA 2022 Fantasy", "1 Ultimate Trophy", 12, "https://cdn.nba.com/manage/2021/10/3point-lead-graphic.png")
createFantasyLeague(3, "FIFA 2022 World Cup", "1 Ultimate Trophy", 14843725, "https://i.pinimg.com/736x/b0/1d/99/b01d994ca2e910f93f0f1fed81d99b1f.jpg")
createFantasyLeague(0, "ICC T20 World Cup", "1 Silver Trophy", 982374, "https://pbs.twimg.com/media/E9FpDDFXsAAqkbR.jpg");

toggleContainer(0)