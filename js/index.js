let swiper; 

function initSwiper() {
  swiper = new Swiper('.mySwiper', {
    loop: true,  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,  
    },
    autoplay: {
      delay: 2500,  
      disableOnInteraction: false,  
    },
  });
}

document.addEventListener("DOMContentLoaded", initSwiper); 
