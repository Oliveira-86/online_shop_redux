import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import CartScreen from '../screens/shop/CartScreen';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

const Stack = createStackNavigator();

const StackCart = () => {
    return (           
        <Stack.Navigator
                screenOptions={(navData) => {
                    return {
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? colors.primary : ''
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
                        headerTitleStyle: {
                            fontFamily: fonts.bold
                        },
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
                }}
            >
                 <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{
                        title: 'Your Cart'
                    }}
                />
            </Stack.Navigator>
    )
}

export default StackCart;