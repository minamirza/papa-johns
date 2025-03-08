const discountDiv = document.getElementById("discount")
let menu = document.getElementById("menu");
let content = document.getElementById("content");
let modalContainer = document.getElementById("modalContainer");
let modalContent = document.getElementById("modalContent");
let basketHtml = document.getElementById("basket");
let basketContent = document.getElementById("basketContent");
let discount = document.getElementById("discount");
const slugs = Object.keys(data);
let basket = [];
function handlecategory() {
  category.map(
    (item) =>
      (menu.innerHTML += ` <li onclick='show("${item.category}")'>${item.category}</li>`)
  );
}
handlecategory();

function handleCards(arg) {
  console.log(data[arg]);

  content.innerHTML = "";
  data[arg].map(
   
    (item, index) =>
    (content.innerHTML += `
      <a href="/pages/detail.html?arg=${arg}&index=${index}" class="card">
        <div class="cardImg">
          <img src="${item.img}" alt="image">
        </div>
        <div class="cardMain">
            <div class="cardHeader justify-between">
              <p>${item.title}</p> 
              <button class='button' onclick="showModal(event ,'${arg}','${index}')">Bunu sec</button>
            </div>
            <div class="cardText">
                    <p>${item.composition ? item.composition : ''}</p>
            </div>
        </div>
      </a>`)
  );
}

function show(arg) {
  content.innerHTML = "";
  if (!slugs.includes(arg)) {
    handleError();
  } else {
    handleCards(arg);
  }
}
function addToBasket(arg, index) {
  let item = data[arg][index];
  if (basket.includes(item)) {
    basket.find((element) => {
      element.id == item.id;
    });

    item.count++;

  } else {
    basket.push(item);
    item.count = 1;
  }
  totalPrice()
  showBasket();
  setTimeout(closeBasket, 1000);
}
function handleError() {
  console.log("err");
  content.innerHTML += `
        <div class="error-container">
            <h1> 404 </h1>
            <p>
                Oops! The page you're
                looking for is not here.
            </p>
            <a href="/index.html">
                Go Back to Home
            </a>
        </div>
    
    `;
}
function showModal(e, arg, index) {
  e.preventDefault()
  modalContainer.classList.toggle("opacity");
  console.log(data[arg]);
  let item = data[arg][index];
  modalContent.innerHTML = `<div class="cardModal">
  <div class="cardImg">
    <img src="${item.img}" alt="image">
  </div>
  <div class="cardMain">
       <div class="cardText">
              <h4>${item.title}</h4>
              <p>${item.composition}</p>
              <p>${item.price} $</p>  
              <button class='button' onclick="addToBasket('${arg}',${index})">Sebete elave et</button>  
       </div>
  </div>
 </div>`;
}
function showBasket() {
  basketHtml.classList.toggle("right");
  basketContent.innerHTML = "";
  if (basket.length > 0) {
    basket.map((item) => {
      basketContent.innerHTML += `<div class="cardModal">
    <div class="cardImg">
      <img src="${item.img}" alt="image">
    </div>
    <div class="cardMain">
         <div class="cardText">
                <h4>${item.title}</h4>
                <p>${item.composition}</p> 
                <p id="discount">${item.count >= 10 ? "Tebrikler 10% endirim qazandiniz" : ""}</p>
                <div class='justify-between counts'> 
                <button onclick='decreaseCount("${item.id
        }")' class='close'>-</button>
                 <p>count : ${item.count
        } </p> <button onclick='increaseCount("${item.id
        }")' class='close'>+</button> </div>
                      <p>price:${item.price} $</> 
                      
                <p style="text-decoration: ${item.count >= 10 ? 'line-through' : 'none'};">total price:${(item.count * item.price).toFixed(2)}$</p>  
                <p>${item.count >= 10 ? 'new total price:' + (item.price * 0.9 * item.count).toFixed(2) : ''}</p>
                <button  class='close' onclick='deleteItem("${item.id
        }")'>Sil</button>
         </div>
    </div>
   </div>`;
    });
  } else {
    basketContent.innerHTML = "<p class='justify-center'> Sebet bosdur</p>";
  }
}
function increaseCount(id) {
  basket.find((item) => item.id == id).count++;
  console.log(basket);
  totalPrice();
  showBasket();
  closeBasket();
}
function decreaseCount(id) {
  let item = basket.find((item) => item.id == id);
  if (item.count > 1) {
    item.count--;
  } else {
    basket = basket.filter((item) => item.id !== id);
  }
  totalPrice();
  showBasket();
  closeBasket();
}
function closeBasket() {
  basketHtml.classList.toggle("right");
}
function deleteItem(id) {
  basket = basket.filter((item) => item.id !== id);
  totalPrice()
  showBasket();
  closeBasket();
}
function closeModal() {
  modalContainer.classList.toggle("opacity");
}
function clearBasket() {
  basket = []
  totalPrice();
  basketContent.innerHTML = "<p class='justify-center'> Sebet bosdur</p>"
}
function totalPrice() {
  let totalPrice = 0
  let discountedPrice = 0
  basket.forEach(
    item => {
      totalPrice += +item.price * item.count

      if (item.count >= 10) {
        discountedPrice += +item.price * item.count * 0.9;
      }
      else {
        discountedPrice += +item.price * item.count
      }
    }
  )
  let discount = (totalPrice - discountedPrice).toFixed(2)
  discountDiv.innerHTML = `Endirim: ${discount}$`;

  document.getElementById('totalPrice').innerHTML = `Umumi qiymet :${(totalPrice).toFixed(2)}$`;
  document.getElementById('discountedPrice').innerHTML = `Endirimli qiymet :${(discountedPrice).toFixed(2)}$`;
}
