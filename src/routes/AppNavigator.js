import React from 'react';
import { useSelector } from 'react-redux';

import { ShopNavigator, AuthNavigation } from './ShopNavigation';
import { NavigationContainer } from '@react-navigation/native';

import StartupScreen from '../screens/StartupScreen';

const AppNavigator = () => {
    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin =  useSelector(state => state.auth.didTryAutoLogin);

    return (
       <NavigationContainer>
           {isAuth && <ShopNavigator />}
           {!isAuth && didTryAutoLogin && <AuthNavigation />}
           {!isAuth && !didTryAutoLogin && <StartupScreen />}
       </NavigationContainer>
    )
}

export default AppNavigator
