import React, { 
    useState, 
    useReducer, 
    useCallback, 
    useEffect 
} from 'react';

import { 
    ScrollView, 
    Text, 
    StyleSheet, 
    Button, 
    View, 
    ActivityIndicator, 
    Alert 
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { useDispatch } from 'react-redux';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import colors from '../../styles/colors';

import * as authActions from '../../store/actions/Auth';
import fonts from '../../styles/fonts';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signUp(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(action);
            // props.navigation.navigate('ProductOverview');
        } catch(err) {
            setError(err.message)
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (error) {
            Alert.alert("An error occurred!", error, [{ text: 'Okay!' }]);
        }
    }, [error])

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <View
            style={styles.screen}
        >
            <LinearGradient colors={[colors.primary, colors.accent]} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Text style={styles.text}>Authenticate</Text>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={6}
                            autoCapitalize="none"
                            errorText="Please enter at least 6 characters for password."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color={colors.primary} />
                            ) : (
                                <Button
                                    title={isSignup ? 'Sign Up' : 'Login'}
                                    color={colors.primary}
                                    onPress={authHandler}
                                />
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                color={colors.accent}
                                onPress={() => {
                                    setIsSignup(prevState => !prevState);
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </View>
    );
};


export default AuthScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    text: {
        fontFamily: fonts.bold,
        fontSize: 20,
        color: colors.primary,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10
    }
});
