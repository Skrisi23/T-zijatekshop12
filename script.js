// Az aktív kosár elemeit tároló tömb
var cartItems = [];

// Véletlenszerű rendelésazonosító generálása
function generateOrderID() {
  return 'ORD-' + Math.floor(Math.random() * 1000000);
}

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
  var existingItem = cartItems.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name: name, price: price, quantity: 1 });
  }

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

      var deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
      deleteButton.textContent = 'Törlés';
      deleteButton.onclick = function() {
        deleteItem(index);
      };

      listItem.appendChild(itemName);
      listItem.appendChild(itemQuantity);
      listItem.appendChild(modifyButton);
      listItem.appendChild(deleteButton);

      cartItemsElement.appendChild(listItem);

      totalPrice += item.price * item.quantity;
    });
  }

  totalPriceElement.textContent = 'Összesen: ' + totalPrice + ' Ft';
}

// Termék törlésének funkciója
function deleteItem(index) {
  cartItems.splice(index, 1); // Eltávolítja a terméket a kosárból
  updateCart(); // Frissíti a kosár tartalmát
}

// Mennyiség módosítása
function modifyQuantity(index) {
  var newQuantity = prompt('Adj meg egy új mennyiséget:');
  if (newQuantity !== null && newQuantity !== '') {
    newQuantity = parseInt(newQuantity);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      cartItems[index].quantity = newQuantity;
      updateCart();
    } else {
      alert('Kérlek, érvényes pozitív számot adj meg!');
    }
  }
}

// Betöltéskor frissítsd a kosarat, ha szükséges
document.addEventListener('DOMContentLoaded', function() {
  var savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    updateCart();
  }

  // Fizetési mód kezelése
  const cashOnDelivery = document.getElementById('cashOnDelivery');
  const cashOnDeliveryBox = document.getElementById('cashOnDeliveryBox');
  const bankTransfer = document.getElementById('bankTransfer');
  const remarkBox = document.getElementById('remarkBox');

  cashOnDelivery.addEventListener('change', function() {
    if (this.checked) {
      cashOnDeliveryBox.style.display = 'block';
      remarkBox.style.display = 'none';
    } else {
      cashOnDeliveryBox.style.display = 'none';
    }
  });

  bankTransfer.addEventListener('change', function() {
    if (this.checked) {
      remarkBox.style.display = 'block';
      cashOnDeliveryBox.style.display = 'none';
    } else {
      remarkBox.style.display = 'none';
    }
  });
});

// Kilépéskor mentsd el a kosarat
window.addEventListener('beforeunload', function() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
});

// Fizetés gombra kattintás eseménykezelője
var checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', function() {
  var paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
  paymentModal.show();
});

// Fizetési mód választása és események
document.getElementById('bankTransfer').addEventListener('change', function() {
  document.getElementById('remarkBox').style.display = 'block';

  // Rendelésazonosító generálása és automatikus kitöltése a megjegyzés mezőben
  var orderID = generateOrderID();
  var remarksField = document.getElementById('remarks');
  remarksField.value = 'Rendelés azonosító: ' + orderID + '\nKérjük, használja ezt az azonosítót az utalás közleményében.';
});

document.getElementById('cashOnDelivery').addEventListener('change', function() {
  document.getElementById('remarkBox').style.display = 'none';
  document.getElementById('cashOnDeliveryBox').style.display = 'block';
});

// Fizetési mód megerősítése
document.getElementById('confirmPayment').addEventListener('click', function() {
  var selectedOption = document.querySelector('input[name="paymentOption"]:checked');
  var emailInputCashOnDelivery = document.getElementById('emailInputCashOnDelivery').value;
  var emailInputBankTransfer = document.getElementById('emailInput').value;

  if (selectedOption.value === 'Utánvétes fizetés' && !emailInputCashOnDelivery.includes('@')) {
    alert('Érvénytelen email cím az utánvétes fizetéshez!');
    return;
  }

  if (selectedOption.value === 'Fizetés előre utalással' && !emailInputBankTransfer.includes('@')) {
    alert('Érvénytelen email cím az előre utaláshoz!');
    return;
  }

  if (selectedOption) {
    alert('Kiválasztott fizetési mód: ' + selectedOption.value + '. Köszönjük a vásárlást!');
    cartItems.length = 0;
    updateCart();
    var paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
    paymentModal.hide();
  } else {
    alert('Kérlek, válassz egy fizetési módot!');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Fizetési mód kezelése
  let totalAmount = document.getElementById("totalAmount");
  let paymentMethods = document.getElementsByName("paymentMethod");
  const cashOnDeliveryFee = 500;
  
  paymentMethods.forEach(method => {
      method.addEventListener("change", function () {
          let amount = parseFloat(totalAmount.dataset.originalAmount);
          if (this.value === "utanvet") {
              amount += cashOnDeliveryFee;
          }
          totalAmount.innerText = amount.toFixed(2) + " Ft";
      });
  });

  // Tároljuk az eredeti összeget egy adatkatribútumban
  if (!totalAmount.dataset.originalAmount) {
      totalAmount.dataset.originalAmount = totalAmount.innerText.replace(" Ft", "");
  }
});
