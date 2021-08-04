import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from '../styles/colors';

import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/Auth';


const StartupScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                // props.navigation.navigate('Auth');
                dispatch(authActions.setDidTryAL());
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryData } = transformedData;
            const expirationDate = new Date(expiryData);

            if (expirationDate <= new Date() || !token || !userId) {
                // props.navigation.navigate('Auth')
                dispatch(authActions.setDidTryAL());
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            // props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, expirationTime));
        }
        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
};

export default StartupScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
