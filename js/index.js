let swiper;

function initSwiper() {
  swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
}

document.addEventListener("DOMContentLoaded", initSwiper);

function handleCards(arg) {
  content.innerHTML = "";
  data[arg].map(
    (item, index) =>
      (content.innerHTML += `<div class="card">
      <div class="cardImg">
        <img src="${item.img}" alt="image" />
      </div>
      <div class="cardMain">
<div  class="cardMain"
<div class="cardHeader justify-between">{
<p>${item.title}</p> <button onclick="showModal('${arg}','${index}')">Bu</button>
</div>
        <div class="cardText">
          <p>${item.composition}</p>
        </div>
      </div>
    </div>`)
  );
}

function show(arg) {
  content.innerHTML = "";
  if (!slugs.includes(arg)) {
    handleError;
  } else {
    nandleCards(arg);
  }
}

function showModal(arg, index) {
  modalContainer.classList.toggle("opacity");
  let item = data[arg][index];
  modalContent.innerHTML = `<div class="card">
      <div class="cardImg">
        <img src="${item.img}" alt="image" />
      </div>
      <div class="cardMain">
        <div class="cardText">
          <p>${item.composition}</p>
        </div>
      </div>
    </div>`;
}
function closeModal() {
  modalContainer.classList.toggle("opacity");
}
