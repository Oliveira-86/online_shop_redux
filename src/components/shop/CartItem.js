import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';

import fonts from '../../styles/fonts';

import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}  </Text>
                <Text style={styles.mainText} numberOfLines={1}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
                <TouchableOpacity
                    onPress={props.onRemove}
                    style={styles.deleteButton}
                >
                    <Ionicons  
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,

        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,

        elevation: 10,
    },

    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100
    },

    quantity: {
        fontFamily: fonts.regular,
        color: '#888',
        fontSize: 16  
    },

    mainText: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: 'black'
    },

    deleteButton: {
        marginLeft: 20
    }
});