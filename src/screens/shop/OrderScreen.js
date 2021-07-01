import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';

const OrderScreen = (props) => {

    const orders = useSelector(state => state.orders.orders)

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
}

export default OrderScreen

const styles = StyleSheet.create({})
