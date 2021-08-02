import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';

import Card from '../UI/Card';

import fonts from '../../styles/fonts';

import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
    return (
        <Card style={styles.container}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}  </Text>
                <Text style={styles.mainText} numberOfLines={1}>{props.title}</Text>
            </View>
            <View style={[styles.itemData, { width: '50%', justifyContent: 'space-evenly' }]}>
                <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity
                    onPress={props.onRemove}
                    style={styles.deleteButton}
                >
                    <Ionicons  
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>}
            </View>
        </Card>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
    },

    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    quantity: {
        fontFamily: fonts.regular,
        color: '#888',
        fontSize: 16  
    },

    mainText: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: 'black',
    },

    deleteButton: {
    }
});
