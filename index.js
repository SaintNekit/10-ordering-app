// import { v4 as uuidv4 } from 'uuid';
import { menuArray } from './data.js';

const mainSection = document.getElementById('main-section');

const render = () => {
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
          <button id="button-${e.id}" class="add-button">+</button>
        </div>
    `;
  });
  return (mainSection.innerHTML = itemHtml);
};

render();
