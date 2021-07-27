import React from 'react';
import { Platform, View, Text, SafeAreaView } from 'react-native';

import ProductOverviewScreen, {
    screenOptions as ProductOverviewScreenOptions
} from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen, {
    screenOptions as ProductDetailsScreenOptions
} from '../screens/shop/ProductDetailsScreen';
import CartScreen, {
    screenOptions as CartScreenOptions
} from '../screens/shop/CartScreen';

import OrdersScreens, {
    screenOptions as OrdersScreensOptions
} from '../screens/shop/OrderScreen'

import EditProductScreen, {
    screenOptions as EditScreensOptions
} from '../screens/user/EditProductScreen';
import UserProductScreen, {
    screenOptions as UserScreensOptions
} from '../screens/user/UserProductsScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
    headerTitleStyle: {
        fontFamily: fonts.bold
    },
    headerBackTitleStyle: {
        fontFamily: fonts.regular
    }
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProductsStackNavigator.Screen
                name="ProductOverview"
                component={ProductOverviewScreen}
                options={ProductOverviewScreenOptions}
            />
            <ProductsStackNavigator.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={ProductDetailsScreenOptions}
            />
            <ProductsStackNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={CartScreenOptions}
            />
        </ProductsStackNavigator.Navigator>
    )
};

const OrdersStackNavigator = createStackNavigator();

export const OrderNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <OrdersStackNavigator.Screen
                name='Orders'
                component={OrdersScreens}
                options={OrdersScreensOptions}
            />
        </OrdersStackNavigator.Navigator>
    )
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AdminStackNavigator.Screen
                name="UserProducts"
                component={UserProductScreen}
                options={UserScreensOptions}
            />
            <AdminStackNavigator.Screen
                name="EditProducts"
                component={EditProductScreen}
                options={EditScreensOptions}
            />
        </AdminStackNavigator.Navigator>
    )
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    return (
        <ShopDrawerNavigator.Navigator
            drawerContentOptions={{
                activeTintColor: colors.primary
            }}
        >


            <ShopDrawerNavigator.Screen
                name="Products"
                component={ProductsNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
            <ShopDrawerNavigator.Screen
                name="Orders"
                component={OrderNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
            <ShopDrawerNavigator.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
        </ShopDrawerNavigator.Navigator>
    )
}



