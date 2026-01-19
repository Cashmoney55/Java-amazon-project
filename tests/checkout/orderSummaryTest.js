import { renderOrderSummary } from "../../js/checkout/orderSummary.js";
import {LoadFromStorage, cart} from "../../data/cart.js";
import { renderPaymentSummary } from "../../js/checkout/paymentSummary.js";




describe('test suite: renderOrderSummary', () => {

   const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
   const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
          spyOn(localStorage, 'setItem');

   document.querySelector('.js-test-container').innerHTML = `
         <div class="js-order-summary"></div>
          <div class="js-cart-count"></div>
          <div class="js-payment-summary"></div>

        `
   const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
   const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';



    spyOn(localStorage, 'getItem').and.callFake(() =>{
        return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '3'

      },{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

      LoadFromStorage();
      renderOrderSummary();
    });

    afterEach(() =>{
        document.querySelector('.js-test-container').innerHTML = ``;

    })




    it('displays the cart', () => {
    expect(
        document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2)

   expect(
    document.querySelector(`.js-product-quantity-${productId1}`).innerText
   ).toContain('Quantity: 2');


   expect(
    document.querySelector(`.js-product-quantity-${productId2}`).innerText
   ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');


  });

  it('removes a product',() =>{

    document.querySelector(`.js-delete-link-${productId1}`).click();

     expect(
        document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
    document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null)

     expect(
    document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);


    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);


  });

    it('updates the delivery option', () => {
  // Click the 3rd delivery option for productId1
      const deliveryOptionElement = document.querySelector(`.js-delivery-option-${productId1}-3`);
      deliveryOptionElement.click();

      // ✅ Check input is now selected (checked)
      const input = document.querySelector(`.js-delivery-option-input-${productId1}-3`);
      expect(input.checked).toEqual(true);

      // ✅ Check cart updated
      expect(cart.length).toEqual(2);
      expect(cart[0].productId).toEqual(productId1);
      expect(cart[0].deliveryOptionID).toEqual('3'); // not 'Id', must match actual property in your cart!

    
    });


});