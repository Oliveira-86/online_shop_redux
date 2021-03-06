import React from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './src/routes/AppNavigator';

import ProductsReducer from './src/store/reducers/Products';
import CartReducer from './src/store/reducers/Cart';
import orderReducer from './src/store/reducers/order';
import authReducer from './src/store/reducers/Auth';

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
  orders: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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

