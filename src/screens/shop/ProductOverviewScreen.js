import React from 'react';
import { FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/Cart';

import ProductItem from '../../components/shop/ProductItem';


const ProductOverviewScreen = (props) => {

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return <FlatList 
        data={products} 
        keyExtractor={(item) => item.id}  
        renderItem={(itemData) => (
            <ProductItem 
                title={itemData.item.title} 
                image={itemData.item.imgUrl}
                price={itemData.item.price} 
                onViewDetails={() => {
                    props.navigation.navigate('ProductDetail', {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title
                    })
                }} 
                onAddToCart={() => {
                    dispatch(cartActions.addToCart(itemData.item));
                }} 
            />
        )}
    />
    
};

export default ProductOverviewScreen;
