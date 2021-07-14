import React from 'react';
import { FlatList, Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/Cart';

import ProductItem from '../../components/shop/ProductItem';

import colors from '../../styles/colors';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductOverviewScreen = (props) => {

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title
        });
    };

    return <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
            <ProductItem
                title={itemData.item.title}
                image={itemData.item.imgUrl}
                price={itemData.item.price}
                onSelected={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title);
                }}
            >
                <Button
                    color={colors.primary}
                    title="View Details"
                    onPress={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
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

export const screenOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Menu"
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Cart"
                        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        onPress={() => {
                            navData.navigation.navigate('Cart');
                        }}
                    />
                </HeaderButtons>
            )
        }
    };
};

export default ProductOverviewScreen;
