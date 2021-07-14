import React from 'react';

import { ProductsNavigator, ShopNavigator } from './ShopNavigation';

import { NavigationContainer } from '@react-navigation/native';

const AppNavigator = () => {
    return (
       <NavigationContainer>
           <ShopNavigator />
       </NavigationContainer>
    )
}

export default AppNavigator
