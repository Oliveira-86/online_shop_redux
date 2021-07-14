import React from 'react';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import AppNavigator from './src/routes/AppNavigator';

import ProductsReducer from './src/store/reducers/Products';
import CartReducer from './src/store/reducers/Cart';
import orderReducer from './src/store/reducers/order';

import ShopNavigation from './src/routes/ShopNavigation';

import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold
} from '@expo-google-fonts/open-sans';

import AppLoading from 'expo-app-loading';

const rootReducer = combineReducers({
  products: ProductsReducer,
  cart: CartReducer,
  orders: orderReducer
});

const store = createStore(rootReducer);

export default function App() {

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
  );
}

