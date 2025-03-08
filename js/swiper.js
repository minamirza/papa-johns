document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
      direction: "horizontal", // Soldan sağa hərəkət
      loop: true, // Sonsuz dövr
      slidesPerView: 1, // Hər ekranda 1 slayd görünsün
      spaceBetween: 10, // Slaydlar arası boşluq
      autoplay: {
        delay: 3000, // 3 saniyədə bir avtomatik dəyişsin
        disableOnInteraction: false, // Mouse ilə toxunduqda autoplay dayanmasın
      },
      grabCursor: true, // Mausla tutub sürükləmə effekti
      pagination: {
        el: ".swiper-pagination",
        clickable: true, // Pagination nöqtələrinə klik etmək olsun
      },
    });
  });