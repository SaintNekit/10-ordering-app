// import { v4 as uuidv4 } from 'uuid';
import { menuArray } from './data.js';

const menuItems = document.getElementById('main-section');
const orderSummary = document.getElementById('order-summary');
const orderContainer = document.getElementById('order-container');

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
        <button data-${chosenItem.name}-remove="${
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
    ).innerHTML = `${chosenItem.name} x ${chosenItem.orderedQuantity}`;
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
    ).parentElement.parentElement.style.display = 'none';
  }
};
