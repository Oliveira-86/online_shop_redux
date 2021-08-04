import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator, StyleSheet, View, Text } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as ordersActions from '../../store/actions/orders'

import OrderItem from '../../components/shop/OrderItem';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import colors from '../../styles/colors';

const OrderScreen = () => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    };

    if (orders.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    No orders found, maybe start ordering some products?
                </Text>
            </View>
        );
    };

    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            )}
        />
    )
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Cart"
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        },
    };
};

export default OrderScreen;

const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });