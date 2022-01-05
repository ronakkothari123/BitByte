/*const API_KEY = '24995126-3263844d74d69f7b7b610a0c4';
const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');

import { createClient } from 'pexels';
const client = createClient('563492ad6f917000010000012ddf299f56d4458a944014f96e891a7e');
const query = 'Nature';

client.photos.search({ query, per_page: 1 }).then(photos => {
    console.log(photos)
});*/

const containers = document.querySelectorAll(".container");
const sidebars = document.querySelectorAll(".sidebar");
const sportsList = ['cricket', 'football', 'basketball', 'soccer']
const statusList = ['#94ff99', '#fbff94', '#ff9494']

let draftsList = [];
let draftIndex = 0;
let activeContainer = 0;
let draftNotifIndex = 0;

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

    btn.setAttribute("onClick", "toggleDraftModal(" + draftIndex + ")");

    secondDiv.appendChild(headerDiv)
    secondDiv.appendChild(para)
    secondDiv.appendChild(btn)

    newDiv.appendChild(firstDiv)
    newDiv.appendChild(secondDiv)
    newDiv.appendChild(thirdDiv)

    document.getElementById('drafts').appendChild(newDiv);
    
    let draftList = [name, image]
    
    draftsList.push(draftList)
    draftIndex++;
}

function toggleDraftModal(num){
    if(num == undefined){
        document.getElementById('join-draft').classList.remove('active-modal');
        document.getElementById('join-draft').classList.add('inactive-modal');
    } else {
        document.getElementById('join-draft').classList.add('active-modal');
        document.getElementById('join-draft').classList.remove('inactive-modal');
        document.getElementById('draft-confirm-btn').setAttribute('onClick', "confirmDraft(" + num + ")");
        document.getElementById('draft-header').innerHTML = "Joining The " + draftsList[num][0] + " Draft";
        document.getElementById('draft-img').style.backgroundImage = "url('" + draftsList[num][1] + "')"
    }
}

function confirmDraft(num){
    document.getElementById('join-draft').classList.remove('active-modal');
    document.getElementById('join-draft').classList.add('inactive-modal');
    if(document.getElementById('draft-main-input').value == "") draftNotification("Note: You made an empty bet for the " + draftsList[num][0] + " draft", 1);
    document.getElementById('draft-main-input').value = "";
    draftNotification("Congratulations! You successfully joined the " + draftsList[num][0] + " Draft", 0)
    toggleContainer(1)
}

function toggleContainer(num){
    containers[activeContainer].classList.remove('active-container');

    sidebars[activeContainer].classList.remove('active-sidebar');
    sidebars[num].classList.add('active-sidebar');
    sidebars[num].classList.remove('invisible-sidebar');
    containers[num].classList.add('active-container')

    activeContainer = num;
}

function draftNotification(text, statusIndex, closeIndex){
    const draftNotif = document.createElement('p');
    if(text != "close"){
        draftNotif.style.display = "flex";
        draftNotif.innerHTML = text;

        let closeSpan = document.createElement('span');
        let closeImg = document.createElement('img');

        closeImg.setAttribute('onclick', "draftNotification('close', 0, " + draftNotifIndex + ")");
        closeImg.src = "../icons/svgs/close.svg"

        closeSpan.appendChild(closeImg);
        draftNotif.appendChild(closeSpan);
        draftNotif.style.background = statusList[statusIndex]
        draftNotif.classList.add('draft-notification')

        document.getElementById('draft-navbar').prepend(draftNotif);
        draftNotifIndex++;
        console.log(draftNotifIndex)
    } else {
        document.querySelectorAll('.draft-notification')[draftNotifIndex - closeIndex - 1].style.display = "none";
        console.log(closeIndex)
    }
}

createFantasyLeague(1, "NFL 2022 Fantasy", "1 Ultimate Trophy", 7284854, "https://cdn.vox-cdn.com/thumbor/X0BcMsovx2iiZvMrSc4bgQk5y-g=/0x0:1200x800/1200x800/filters:focal(504x304:696x496)/cdn.vox-cdn.com/uploads/chorus_image/image/70203570/Week12WinnersLosers_AP_Ringer.0.jpeg")
createFantasyLeague(0, "IPL 2022 Cup", "1 League Trophy", 4567837, "https://wallpaperaccess.com/full/2302746.jpg")
createFantasyLeague(2, "NBA 2022 Fantasy", "1 Ultimate Trophy", 12, "https://cdn.nba.com/manage/2021/10/3point-lead-graphic.png")
createFantasyLeague(3, "FIFA 2022 World Cup", "1 Ultimate Trophy", 14843725, "https://i.pinimg.com/736x/b0/1d/99/b01d994ca2e910f93f0f1fed81d99b1f.jpg")
createFantasyLeague(0, "ICC T20 World Cup", "1 Silver Trophy", 982374, "https://pbs.twimg.com/media/E9FpDDFXsAAqkbR.jpg");
createFantasyLeague(2, "NCAA Basketball", "1 Silver Trophy", 11, "https://a.espncdn.com/photo/2021/1108/ncaa_bracketology-men_16x9.jpg");

toggleContainer(0);