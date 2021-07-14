import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Platform } from 'react-native';

import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import fonts from '../../styles/fonts';

const EditProductScreen = (props) => {
    const prodId = props.route.params ? props.route.params.productId : null;
    const editProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId));

    const [title, setTitle] = useState(editProduct ? editProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editProduct ? editProduct.imgUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editProduct ? editProduct.description : '');

    const submitHandler = useCallback(() => {
        console.log("Submitting!!")
    });

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
    }, [submitHandler])

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                {editProduct ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={text => setPrice(text)}
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
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

    formControl: {
        width: '100%'
    },

    label: {
        fontFamily: fonts.bold,
        marginVertical: 8
    },

    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});
