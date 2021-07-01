import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import UserProductScreen from '../screens/user/UserProductsScreen';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

const Stack = createStackNavigator();

const StackUser = () => {
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
                                    title="Add"
                                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                                    onPress={() => {
                                        navData.navigation.navigate('EditProduct');
                                    }}
                                />
                            </HeaderButtons>
                        )
                    }
                }
            }}
        >
            <Stack.Screen
                name="User"
                component={UserProductScreen}
                options={{
                    title: 'Your Products',
                }}
            />
        </Stack.Navigator>
    )
}

export default StackUser;
