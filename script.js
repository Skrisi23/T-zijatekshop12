// Az aktív kosár elemeit tároló tömb
var cartItems = [];

// Kosárba helyezés gombra kattintás eseménykezelője
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('add-to-cart')) {
    var product = event.target.closest('.product');
    var productName = product.querySelector('.product-name').textContent;
    var productPrice = parseInt(product.dataset.price);

    addToCart(productName, productPrice);
  }
});

// Kosárba helyezés függvény
function addToCart(name, price) {
  cartItems.push({ name: name, price: price });
  alert('A termék bekerült a kosárba!');

  updateCart();
}

// Kosár frissítése
function updateCart() {
  var cartItemsElement = document.getElementById('cart-items');
  var totalPriceElement = document.getElementById('total-price');
  var totalPrice = 0;

  cartItemsElement.innerHTML = '';

  if (cartItems.length === 0) {
    cartItemsElement.innerHTML = '<li class="list-group-item">A kosár üres</li>';
  } else {
    cartItems.forEach(function(item) {
      var listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.textContent = item.name + ' - ' + item.price + ' Ft';
      cartItemsElement.appendChild(listItem);

      totalPrice += item.price;
    });
  }

  totalPriceElement.textContent = 'Összesen: ' + totalPrice + ' Ft';
}

// Betöltéskor frissítsd a kosarat, ha szükséges
document.addEventListener('DOMContentLoaded', function() {
  var savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    updateCart();
  }
});

// Kilépéskor mentsd el a kosarat
window.addEventListener('beforeunload', function() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
});

// Fizetés gombra kattintás eseménykezelője
var checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', function() {
  performCheckout();
});

// Fizetés
function performCheckout() {
  var totalPrice = document.getElementById('total-price').textContent;
  var confirmationMessage = 'Fizetés megerősítve. Fizetendő összeg ' + totalPrice + ' Köszönjük a vásárlást!';

  console.log('checkout function called'); // Új sor
  alert(confirmationMessage);

  cartItems.length = 0; // Kosár kiürítése
  updateCart();
}
// modosit gomb
function updateCart() {
  var cartItemsElement = document.getElementById('cart-items');
  var totalPriceElement = document.getElementById('total-price');
  var totalPrice = 0;

  cartItemsElement.innerHTML = '';

  if (cartItems.length === 0) {
    cartItemsElement.innerHTML = '<li class="list-group-item">A kosár üres</li>';
  } else {
    cartItems.forEach(function(item, index) {
      var listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

      var itemName = document.createElement('span');
      itemName.textContent = item.name + ' - ' + item.price + ' Ft';

      var itemQuantity = document.createElement('span');
      itemQuantity.textContent = item.quantity + ' db';

      var modifyButton = document.createElement('button');
      modifyButton.classList.add('btn', 'btn-warning', 'btn-sm');
      modifyButton.textContent = 'Módosítás';
      modifyButton.onclick = function() {
        modifyQuantity(index);
      };

      listItem.appendChild(itemName);
      listItem.appendChild(itemQuantity);
      listItem.appendChild(modifyButton);

      cartItemsElement.appendChild(listItem);

      totalPrice += item.price * item.quantity;
    });
  }

  totalPriceElement.textContent = 'Összesen: ' + totalPrice + ' Ft';
}

function addToCart(name, price) {
  var existingItem = cartItems.find(item => item.name === name);

  if (existingItem) {
    // Ha a termék már szerepel a kosárban, növeld a darabszámát
    existingItem.quantity++;
  } else {
    // Ha még nem szerepel a kosárban, adj hozzá új elemként
    cartItems.push({ name: name, price: price, quantity: 1 });
  }

  alert('A termék bekerült a kosárba!');

  updateCart();
}

function modifyQuantity(index) {
  let db = document.getElementById("db");
  var newQuantity = prompt('Adj meg egy új mennyiséget:');
  if (newQuantity !== null && newQuantity !== '') {
    // Ellenőrizd, hogy a megadott érték szám
    newQuantity = parseInt(newQuantity);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      cartItems[index].quantity = newQuantity;
      updateCart();
    } else {
      alert('Kérlek, érvényes pozitív számot adj meg!');
    }
  }
}  
