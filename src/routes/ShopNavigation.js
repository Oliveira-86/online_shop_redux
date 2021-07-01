import React from 'react';

import Drawer from './DrawerNavigation';
import StackProductOverview from './StackProductsOverview';
import ProductDetails from '../screens/shop/ProductDetailsScreen';
import StackCart from './StackCart';
import StackOrder from './StackOrder';
import StackUser from './StackUser';
import EditProduct from '../screens/user/EditProductScreen';

import { createStackNavigator } from '@react-navigation/stack';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

import colors from '../styles/colors';
import fonts from '../styles/fonts';



const Stack = createStackNavigator();


const ShopNavigation = (props) => {
    return (           
        <Stack.Navigator>
            <Stack.Screen 
                name="Drawer" 
                component={Drawer} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="ProductOverview" 
                component={StackProductOverview} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="ProductDetails" 
                component={ProductDetails} 
                options={navData => {
                    return {                       
                        headerTintColor: 'white',
                        title: navData.route.params.productTitle,
                        headerStyle: {
                            backgroundColor: colors.primary
                        },
                        headerTitleStyle: {
                            fontFamily: fonts.bold,  
                        },
                        headerLeft: () => {
                            return (
                                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                    <Item
                                        title="Cart"
                                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                                        onPress={() => {
                                            navData.navigation.openDrawer();
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
            />
            <Stack.Screen 
                name="Cart" 
                component={StackCart} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="Order" 
                component={StackOrder}
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="User" 
                component={StackUser} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="EditProduct" 
                component={EditProduct} 
                options={{
                    headerTintColor: 'white',
                    title: 'Edit Product',
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    headerTitleStyle: {
                        fontFamily: fonts.bold,  
                    }
                }} 
            />
        </Stack.Navigator>
    )
}



export default ShopNavigation


