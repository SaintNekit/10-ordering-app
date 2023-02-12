// import { v4 as uuidv4 } from 'uuid';
import { menuArray } from './data.js';

const menuItems = document.getElementById('main-section');
const orderSummary = document.getElementById('order-summary');
const orderContainer = document.getElementById('order-container');
const paymentModal = document.getElementById('payment-modal-window');
const completeBtn = document.getElementById('complete-btn');
const nameInput = document.getElementById('name-input');
const cardInput = document.getElementById('card-input');
const cvvInput = document.getElementById('cvv-input');
const nameError = document.getElementById('name-error');
const cardError = document.getElementById('card-error');
const cvvError = document.getElementById('cvv-error');
const thankYouContainer = document.getElementById('thank-you-container');
const closeModal = document.getElementById('close-modal-btn');

const renderMenu = () => {
  let itemHtml = '';

  menuArray.forEach((e) => {
    itemHtml += `
      <div class="item-container">
          <img
            src="${e.image}"
            alt="icon of the ${e.name}"
            height="89px"
          />
          <div class="item-text">
            <h2 class="item-title">${e.name}</h2>
            <p class="item-description">${e.ingredients.join(', ')}</p>
            <p class="price">$${e.price}</p>
          </div>
          <button id="button-${e.id}" class="add-button" data-${e.name}='${
      e.id
    }'>+</button>
        </div>
    `;
  });
  return (menuItems.innerHTML = itemHtml);
};
renderMenu();

menuItems.addEventListener('click', (e) => {
  if (e.target.dataset.pizza) {
    addItem(e.target.dataset.pizza);
  }
  if (e.target.dataset.hamburger) {
    addItem(e.target.dataset.hamburger);
  }
  if (e.target.dataset.beer) {
    addItem(e.target.dataset.beer);
  }
});

orderContainer.addEventListener('click', (e) => {
  if (e.target.dataset.pizzaRemove) {
    removeItem(e.target.dataset.pizzaRemove);
  }
  if (e.target.dataset.hamburgerRemove) {
    removeItem(e.target.dataset.hamburgerRemove);
  }
  if (e.target.dataset.beerRemove) {
    removeItem(e.target.dataset.beerRemove);
  }
});

let totalSum = 0;

const addItem = (itemId) => {
  thankYouContainer.innerHTML = '';
  let chosenItem = menuArray.filter((e) => {
    return e.id === itemId;
  })[0];
  chosenItem.orderedQuantity++;

  let orderItem = `

    <div class="order-summary-container">
      <div>
        <h2 id="${chosenItem.name}-item" class="order-summary-item">${
    chosenItem.name
  } x${chosenItem.orderedQuantity}</h2>
        <button class="remove-btn" data-${chosenItem.name}-remove="${
    chosenItem.id
  }">remove</button>
      </div>
      <p id="${chosenItem.name}-price" class="order-summary-price">$${
    chosenItem.price * chosenItem.orderedQuantity
  }</p>
    </div>

  `;
  if (chosenItem.orderedQuantity < 2) {
    orderSummary.innerHTML += orderItem;
  } else {
    document.getElementById(
      `${chosenItem.name}-item`
    ).innerHTML = `${chosenItem.name} x${chosenItem.orderedQuantity}`;
    document.getElementById(`${chosenItem.name}-price`).innerHTML = `$${
      chosenItem.price * chosenItem.orderedQuantity
    }`;
  }

  totalSum += chosenItem.price;
  document.getElementById('order-summary-price').textContent = `$${totalSum}`;
  if (totalSum) {
    orderContainer.style.display = 'flex';
  }
};

const removeItem = (itemId) => {
  let chosenItem = menuArray.filter((e) => {
    return e.id === itemId;
  })[0];

  chosenItem.orderedQuantity--;
  totalSum -= chosenItem.price;

  document.getElementById('order-summary-price').textContent = `$${totalSum}`;
  if (!totalSum) {
    orderContainer.style.display = 'none';
  }

  document.getElementById(
    `${chosenItem.name}-item`
  ).innerHTML = `${chosenItem.name} x ${chosenItem.orderedQuantity}`;
  document.getElementById(`${chosenItem.name}-price`).innerHTML = `$${
    chosenItem.price * chosenItem.orderedQuantity
  }`;

  if (chosenItem.orderedQuantity < 1) {
    document.getElementById(
      `${chosenItem.name}-item`
    ).parentElement.parentElement.innerHTML = '';
  }
};

completeBtn.addEventListener('click', () => {
  paymentModal.style.display = 'flex';
});

document.getElementById('pay-btn').addEventListener('click', (e) => {
  resetErrors();

  e.preventDefault();
  if (!nameInput.value) {
    nameError.textContent = 'Filed is empty';
  }
  if (!cardInput.value) {
    cardError.textContent = 'Filed is empty';
  } else if (cardInput.value.length !== 16) {
    cardError.textContent = 'Incorrect value!';
  }
  if (!cvvInput.value) {
    cvvError.textContent = 'Filed is empty';
  } else if (cvvInput.value.length !== 3) {
    cvvError.textContent = 'Incorrect value!';
  }

  if (
    nameInput.value &&
    cardInput.value.length === 16 &&
    cvvInput.value.length === 3
  ) {
    paymentModal.style.display = 'none';
    orderContainer.style.display = 'none';
    orderSummary.innerHTML = '';
    thankYouContainer.innerHTML = `<p class="thank-you-message">Thanks, ${nameInput.value}! Your order is on it's way</p>`;
    menuArray.forEach((e) => {
      e.orderedQuantity = 0;
    });
    nameInput.value = '';
    cardInput.value = '';
    cvvInput.value = '';
    totalSum = 0;
  }
});

const resetErrors = () => {
  nameError.textContent = '';
  cardError.textContent = '';
  cvvError.textContent = '';
};

closeModal.addEventListener('click', () => {
  paymentModal.style.display = 'none';
  nameInput.value = '';
  cardInput.value = '';
  cvvInput.value = '';
});
