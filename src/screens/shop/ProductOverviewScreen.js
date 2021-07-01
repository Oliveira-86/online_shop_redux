import React from 'react';
import { FlatList, Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/Cart';

import ProductItem from '../../components/shop/ProductItem';

import colors from '../../styles/colors';

const ProductOverviewScreen = (props) => {

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title
        })
    }

    return <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
            <ProductItem
                title={itemData.item.title}
                image={itemData.item.imgUrl}
                price={itemData.item.price}
                onSelected={() => {
                    selectItemHandler(itemData.item.productId, itemData.item.productTitle);
                }}
            >
                <Button
                    color={colors.primary}
                    title="View Details"
                    onPress={() => {
                        selectItemHandler(itemData.item.productId, itemData.item.productTitle);
                    }}
                />

                <Button
                    color={colors.primary}
                    title="To Cart"
                    onPress={() => {
                        dispatch(cartActions.addToCart(itemData.item));
                    }}
                />
            </ProductItem>
        )}
    />

};

export default ProductOverviewScreen;
