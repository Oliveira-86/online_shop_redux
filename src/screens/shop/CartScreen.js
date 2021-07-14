import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux'; 
import CartItem from '../../components/shop/CartItem';

import * as removeCartItem from '../../store/actions/Cart';
import * as ordersActions from '../../store/actions/orders';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const CartScreen = () => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productPrice: state.cart.items[key].productPrice,
                productTitle: state.cart.items[key].productTitle,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:  <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <Button 
                    title="Order Now" 
                    color={colors.accent} 
                    disabled={cartItems.length === 0} 
                    onPress={() => {
                        dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
                    }}
                />
            </View>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem  
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(removeCartItem.removeFromCart(itemData.item.productId));
                        }}
                    />
                )}
            />
        </View>
    );
};

export const screenOptions = navData => {
    return {
        title: 'Your Cart',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Cart"
                        iconName={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
                        onPress={() => {
                            navData.navigation.goBack();
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
    }
}

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        margin: 20
    },

    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',

        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,

        elevation: 10,
    },

    summaryText: {
        fontFamily: fonts.bold,
        fontSize: 18
    },

    amount: {
        color: colors.primary
    }
});
