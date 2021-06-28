import React from 'react';
import { Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

import ProductsOverview from '../screens/shop/ProductOverviewScreen';
import ProductDetails from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

const Stack = createStackNavigator();

const ShopNavigation = () => {
    return (
        <NavigationContainer>
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
                        headerRight: () => {
                            return (                              
                                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                    <Item
                                        title="Cart"
                                        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                                        onPress={() => {
                                            navData.navigation.navigate('Cart')
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
                <Stack.Screen
                    name="ProductDetail"
                    component={ProductDetails}
                    options={(navData) => {
                        return {
                            headerTitle: navData.route.params.productTitle
                        }
                    }}
                />
                <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ShopNavigation


