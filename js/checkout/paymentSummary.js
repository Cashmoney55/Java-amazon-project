import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";
import {formatCurrency} from "../utils/money.js";





export function renderPaymentSummary() {
    let ProductPriceCents = 0;
    let ShippingPriceCents = 0;
    let cartQuantity = 0;





    cart.cartItems.forEach((cartItem) =>{
      const product =  getProduct(cartItem.productId);
      ProductPriceCents += product.priceCents * cartItem.quantity;

      const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionID);
      ShippingPriceCents += deliveryOption.priceCents;

      cartQuantity += cartItem.quantity;


    });
    const totalBeforeTaxCents = ProductPriceCents + ShippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(ProductPriceCents)};
            </div>
          </div>



          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-payment-summary-shipping"
            >$${formatCurrency(ShippingPriceCents)}
            </div>
          </div>


          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-payment-summary-total
            ">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>


    `
    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;

}