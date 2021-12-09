const carouselItems = document.querySelectorAll('.carousel-item');

let activeCarousel = 0;

function toggleCarousel(n){
    carouselItems[activeCarousel].classList.remove('active-carousel-item')
    carouselItems[activeCarousel].classList.add('inactive-carousel-item')
    carouselItems[n].classList.add('active-carousel-item')
    carouselItems[n].classList.remove('inactive-carousel-item')

    activeCarousel = n;

    console.log(n)
}