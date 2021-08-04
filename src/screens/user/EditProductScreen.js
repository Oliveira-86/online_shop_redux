import React, {
    useState,
    useEffect,
    useCallback,
    useReducer
} from 'react';

import {
    ScrollView,
    StyleSheet,
    View,
    Platform,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/Products';

import Input from '../../components/UI/Input';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import colors from '../../styles/colors';

const FORM_INPUT_REDUCER = 'FORM_INPUT_REDUCER';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_REDUCER) {
        const updateValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updateFormIsValid = true;
        for (const key in updateValidities) {
            updateFormIsValid = updateFormIsValid && updateValidities[key];
        }
        return {
            formIsValid: updateFormIsValid,
            inputValidities: updateValidities,
            inputValues: updateValues
        }
    }
    return state;
};

const EditProductScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.route.params ? props.route.params.productId : null;
    const editProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editProduct ? editProduct.title : '',
            imgUrl: editProduct ? editProduct.imgUrl : '',
            description: editProduct ? editProduct.description : '',
            price: '',
        },
        inputValidities: {
            title: editProduct ? true : false,
            imgUrl: editProduct ? true : false,
            description: editProduct ? true : false,
            price: editProduct ? true : false,
        },
        formIsValid: editProduct ? true : false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        };
        setError(null);
        setIsLoading(true);
        try {
            if (editProduct) {
                await dispatch(
                    productsActions.updateProduct(
                        prodId,
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imgUrl,
                    )
                );
            } else {
                await dispatch(
                    productsActions.createProduct(
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imgUrl,
                        +formState.inputValues.price)
                );
            }
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);
    }, [dispatch, prodId, formState]);

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_REDUCER,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        }, [dispatchFormState]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Check"
                        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                        onPress={submitHandler}
                    />
                </HeaderButtons>
            )
        });
    }, [submitHandler]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={colors.primary} />
            </View>
        )
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
        >
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.form}>
                    <Input
                        id="title"
                        label="Title"
                        errorText="Please enter a valid title!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editProduct ? editProduct.title : ''}
                        initiallyValid={!!editProduct}
                        required
                    />
                    <Input
                        id="imgUrl"
                        label="Image URL"
                        errorText="Please enter a valid image url!"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editProduct ? editProduct.imgUrl : ''}
                        initiallyValid={!!editProduct}
                        required
                    />
                    {editProduct ? null : (
                        <Input
                            id="price"
                            label="Price"
                            errorText="Please enter a valid price!"
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    )}
                    <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editProduct ? editProduct.description : ''}
                        initiallyValid={!!editProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export const screenOptions = navData => {
    const routeParams = navData.route.params ? navData.route.params : {};
    return {
        headerTitle: routeParams.productId
            ? 'Edit Product'
            : 'Add Product',
    }
}

export default EditProductScreen;

const styles = StyleSheet.create({
    form: {
        padding: 20
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
