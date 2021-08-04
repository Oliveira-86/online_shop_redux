import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import CartItem from './CartItem';

import { LinearGradient } from 'expo-linear-gradient';

import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import ButtonGradient from '../UI/ButtonGradient';

const OrderItem = (props) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>

            <ButtonGradient
                style={styles.button}
                text={showDetails ? 'Hide Details' : "Show Details"}
                onPress={() => {
                    setShowDetails(!showDetails)
                }}
            />
            {showDetails && (
                <View style={{ width: '100%', marginTop: 15 }}>
                    {props.items.map(cartItem =>
                        <CartItem
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            amount={cartItem.sum}
                            title={cartItem.productTitle}
                        />)}
                </View>
            )}
        </View>
    )
}

export default OrderItem;

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,

        elevation: 10,

        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
    },

    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20
    },

    totalAmount: {
        fontFamily: fonts.bold,
        fontSize: 16
    },

    date: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: '#888'
    },

    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        borderRadius: 5
    }
});
