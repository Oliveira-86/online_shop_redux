import React from 'react';
import { Platform, View, SafeAreaView, Button, } from 'react-native';

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

import AuthScreen, {
    screenOptions as AuthScreenOptions
} from '../screens/user/AuthScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/Auth';

import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import ButtonGradient from '../components/UI/ButtonGradient';

const navigationOptions = {
    headerBackground: () => (
        <LinearGradient
            colors={[colors.primary, colors.accent]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        />
    ),
    headerTitleStyle: {
        color: '#fff',
        fontFamily: fonts.bold
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
}

const AuthStackNavigation = createStackNavigator();

export const AuthNavigation = () => {
    return (
        <AuthStackNavigation.Navigator headerMode="none">
            <AdminStackNavigator.Screen
                name='Auth'
                component={AuthScreen}
            />
        </AuthStackNavigation.Navigator>
    )
}

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={navigationOptions}>
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
        <OrdersStackNavigator.Navigator screenOptions={navigationOptions}>
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
        <AdminStackNavigator.Navigator screenOptions={navigationOptions}>
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
    const dispatch = useDispatch();

    return (
        <ShopDrawerNavigator.Navigator
            drawerContentOptions={{
                activeTintColor: colors.primary
            }}
            drawerContent={props => {
                return (
                    <View style={{ flex: 1, paddingVertical: 40, }}>
                        <SafeAreaView
                            forceInset={{ top: 'always', horizontal: 'never' }}
                            style={{ flex: 1 }}
                        >
                            <DrawerItemList {...props} />
                            <View style={{ position: 'absolute', width: '100%', bottom: 0 }}>
                                <ButtonGradient
                                    onPress={() => {
                                        dispatch(authActions.logout());
                                        // props.navigation.navigate('Auth');
                                    }}
                                    text="Logout"
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingVertical: 5,
                                    }}
                                />
                            </View>
                        </SafeAreaView>
                    </View>
                );
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

