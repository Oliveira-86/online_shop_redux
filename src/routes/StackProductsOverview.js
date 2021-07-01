import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductsOverview from '../screens/shop/ProductOverviewScreen'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

const Stack = createStackNavigator();

const StackProductNav = () => {
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
                    }
                }}
            >
                 <Stack.Screen
                    name="ProductsOverview"
                    component={ProductsOverview}
                    options={{
                        title: "All Products",
                    }}
                />
               
            </Stack.Navigator>
    )
}

export default StackProductNav;