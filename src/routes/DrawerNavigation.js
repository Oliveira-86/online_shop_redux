import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackProdOverview from './StackProductsOverview';
import StackOrder from './StackOrder';
import UserProducts from './StackUser';

import colors from '../styles/colors';
 
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator 
            initialRouteName="Home"
            drawerContentOptions={{
                activeTintColor: colors.primary
            }}
        >
            <Drawer.Screen name="Home" component={StackProdOverview} />
            <Drawer.Screen name="Orders" component={StackOrder} />
            <Drawer.Screen name="User" component={UserProducts} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
