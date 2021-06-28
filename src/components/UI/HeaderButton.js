import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';


const CustomHeaderButton = (props) => {

    const cartQty = useSelector(state => state.cart.quantity)

    return (
        <View>
            <HeaderButton
                {...props}
                IconComponent={Ionicons}
                iconSize={23}
                color={Platform.OS === 'android' ? 'white' : colors.primary}
            />
        </View>
    )
};

export default CustomHeaderButton;

const styles = StyleSheet.create({
    container: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
        left: 0,
        top: 0
    },

    number: {
        fontFamily: fonts.bold,
        color: 'white'
    }
})