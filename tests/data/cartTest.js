import { addToCart, cart, LoadFromStorage, removeFromCart} from "../../data/cart.js";


describe('test suite : addToCart', () => {
    beforeEach(() => {
        cart.length = 0;
        spyOn(localStorage, 'setItem');

    });

    it('adds an existing product to the cart', () => {



        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: '4f64a65-1377-42bc-89a5-e572d19252e2',
                quantity: 1,
                deliveryOptionId: '1'
            }]);

        });

        LoadFromStorage();

        addToCart('4f64a65-1377-42bc-89a5-e572d19252e2');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: '4f64a65-1377-42bc-89a5-e572d19252e2',
      quantity: 2,
      deliveryOptionId: '1'
    }]));


        expect(cart[0].productId).toEqual('4f64a65-1377-42bc-89a5-e572d19252e2');
        expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart', () => {


        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([]);
        });

        LoadFromStorage();

        addToCart('4f64a65-1377-42bc-89a5-e572d19252e2');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('4f64a65-1377-42bc-89a5-e572d19252e2');
        expect(cart[0].quantity).toEqual(1);


        });
    });


    describe('test suite: removeFromCart', () => {
        beforeEach(() => {
            cart.length = 0;
            spyOn(localStorage, 'setItem');
            spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
                },
                {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
                }
            ]);
            });
        });


        it('removes product from cart', () => {
            LoadFromStorage();

            removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

            expect(cart.length).toEqual(1);
            expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');



            expect(localStorage.setItem).toHaveBeenCalled();
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
             expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                    }]));

        });
     });