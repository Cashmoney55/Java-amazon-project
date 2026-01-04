import {cart, removeFromCart, updateQuantity} from '../data/cart.js';
import { product } from '../data/products.js';
import { formatCurrency } from './utils/money.js';





let cartSummaryHTML = '';

cart.forEach((cartItem) =>{
    const productId = cartItem.productId;

    let matchingProduct;

    product.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
    cartSummaryHTML +=  `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link"
                        data-product-id="${matchingProduct.id}">
                        Update
                        </span>

                        <input class="quantity-input js-quantity-input-${matchingProduct.id}"
                        value="${cartItem.quantity}">

                        <span class="save-quantity-link link-primary js-save-link"
                         data-product-id="${matchingProduct.id}">
                         Save
                         </span>

                        <span class="delete-quantity-link link-primary js-delete-link"
                        data-product-id="${matchingProduct.id}">
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                        <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                        <div>
                        <div class="delivery-option-date">
                            Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                            FREE Shipping
                        </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                        <div>
                        <div class="delivery-option-date">
                            Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                            $4.99 - Shipping
                        </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                        <div>
                        <div class="delivery-option-date">
                            Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                            $9.99 - Shipping
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

    `;
});

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () =>{
            const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            updateCheckout();

        });
    });



document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click',() => {
            const productId = link.dataset.productId;


            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity')

            link.style.display = 'none';

        });
    });


document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {

      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');

      const updateLink = container.querySelector('.js-update-link');
      updateLink.style.display = 'inline';

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );

      const newQuantity = Number(quantityInput.value);

      // ✅ Validate the input
      if (newQuantity <= 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 1 and less than 1000');
        return;
      }

      //update the cart
      updateQuantity(productId, newQuantity);

      //update the html
      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );

      quantityLabel.innerHTML = newQuantity;
      updateCheckout();

    });
  });



  document.querySelectorAll('.quantity-input')
  .forEach((inputElement) => {
    inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        // Find the productId based on class name
        const classList = Array.from(inputElement.classList);
        const match = classList.find(cls => cls.startsWith('js-quantity-input-'));
        if (!match) return;

        const productId = match.replace('js-quantity-input-', '');
        const newQuantity = Number(inputElement.value);

        // Validate
        if (newQuantity <= 0 || newQuantity >= 1000) {
          alert('Quantity must be at least 1 and less than 1000');
          return;
        }

        // Update cart
        updateQuantity(productId, newQuantity);

        // Update quantity label
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML = newQuantity;

        // Update cart total
        updateCheckout();

        // Hide input, show update
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');
        const updateLink = container.querySelector('.js-update-link');
        updateLink.style.display = 'inline';
      }
    });
  });






function updateCheckout() {
   let cartQuantity = 0;

     cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;

     });

     document.querySelector('.js-cart-count')
      .innerHTML = `${cartQuantity} item${cartQuantity !== 1 ? 's' : ''}`;

}

updateCheckout();