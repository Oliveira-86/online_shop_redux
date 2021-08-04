import Product from '../../models/product';
import {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    SET_PRODUCTS,
    UPDATE_PRODUCT
} from '../actions/Products';

const initialState = {
    availableProducts: [],
    userProducts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            };

        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                action.productData.ownerId,
                action.productData.title,
                action.productData.imgUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };

        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updateProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imgUrl,
                action.productData.description,
                state.availableProducts[productIndex].price
            );
            const updateUserProducts = [...state.userProducts];
            updateUserProducts[productIndex] = updateProduct;
            const availableProductsIndex = state.availableProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updateAvailableProducts = [...state.availableProducts];
            updateAvailableProducts[availableProductsIndex] = updateProduct;
            return {
                ...state,
                availableProducts: updateAvailableProducts,
                userProducts: updateUserProducts
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.pid
                ),
                availableProducts: state.availableProducts.filter(
                    product => product.id !== action.pid
                )
            };
    };
    return state;
};