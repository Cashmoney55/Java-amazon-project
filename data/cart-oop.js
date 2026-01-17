 function Cart(localStorageKay) {

  const cart = {
    cartItems : undefined,


   LoadFromStorage() {
   this.cartItems = JSON.parse(localStorage.getItem(localStorageKay));

    if (!this.cartItems) {
    this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionID: '1'

        },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionID: '2'

        }];
    }
  },
    saveToStorage(){
        localStorage.setItem(localStorageKay, JSON.stringify(this.cartItems))


  },


     addToCart(productId, quantity = 1) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingItem = cartItem;
        }
        });

        if (matchingItem) {
        matchingItem.quantity += quantity;
        } else {

        this.cartItems.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionID: '1'
        });
          }

        this.saveToStorage();



    },

      removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId !== productId){
            newCart.push(cartItem)
          }
        })

        this.cartItems = newCart;
        this.saveToStorage();

    },



      updateQuantity(productId, newQuantity) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });

        matchingItem.quantity = newQuantity;

        this.saveToStorage();

      },



      updateDeliveryOption(productId, deliveryOptionID){
        let matchingItem;

          this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId){
              matchingItem = cartItem;
            }
          });


            if (matchingItem) {
              matchingItem.deliveryOptionID = deliveryOptionID;
              this.saveToStorage();
            }


          this.saveToStorage();


        }

  };



  return cart
 }


 const cart = Cart('cart-oop');
 const businessCart = Cart('cart-business');





cart.LoadFromStorage();


businessCart.LoadFromStorage();


console.log(cart);
console.log(businessCart);