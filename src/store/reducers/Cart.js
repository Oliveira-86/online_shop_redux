import CartItem from '../../models/cart-item';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/Cart';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/Products';

const initialState = {
    items: {},
    totalAmount: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            let updateOrNewCart;

            if (state.items[addedProduct.id]) {
                // already have the item in the cart
                updateOrNewCart = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                );
            } else{
                updateOrNewCart=  new CartItem(1, productPrice, productTitle, productPrice);                
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updateOrNewCart },
                totalAmount: state.totalAmount + productPrice
            };

            case REMOVE_FROM_CART:
                const selectedCartItem = state.items[action.prodId]; 
                const currentQty = selectedCartItem.quantity;
                let updatedCartItems;
                if (currentQty >1) {
                    const updateCartItem = new CartItem(
                        selectedCartItem.quantity - 1,
                        selectedCartItem.productPrice,
                        selectedCartItem.productTitle,
                        selectedCartItem.sum - selectedCartItem.productPrice
                    );
                    updatedCartItems = { ...state.items, [action.prodId]: updateCartItem };
                } else {
                    updatedCartItems = { ...state.items };
                    delete updatedCartItems[action.prodId];
                }
                return {
                    ...state,
                    items: updatedCartItems,
                    totalAmount: state.totalAmount - selectedCartItem.productPrice
                };
            case ADD_ORDER:
                return initialState;
            case DELETE_PRODUCT:
                if (!state.items[action.pid]) {
                    return state
                }
                const updateItems = { ...state.items };
                const itemTotal = state.items[action.pid].sum;
                delete updateItems[action.pid];
                return {
                    ...state,
                    items: updateItems,
                    totalAmount: state.totalAmount - itemTotal
                }
    }
    return state;
}