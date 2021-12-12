const containers = document.querySelectorAll('.sub-container');
const imageContainer = document.getElementById('image-container')
const images = ['../images/night.jpg', '../images/swamp.jpg', '../images/forest.jpg'];

let activeContainer = 0;

function toggleContainer(num){
    containers[activeContainer].classList.remove('active-container');
    containers[activeContainer].classList.add('inactive-container');
    containers[num].classList.remove('inactive-container');
    containers[num].classList.add('active-container');

    imageContainer.style.backgroundImage = "url('" + images[num] + "')"

    activeContainer = num;
}

toggleContainer(0);