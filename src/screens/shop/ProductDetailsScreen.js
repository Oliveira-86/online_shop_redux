import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as cartAction from '../../store/actions/Cart';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductDetailsScreen = (props) => {

    const productId = props.route.params.productId;
    console.log(productId)
    
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(prod => prod.id === productId)
    );
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imgUrl }} />
            <View style={styles.action}>
                <Button 
                    color={colors.primary} 
                    title="Add To Cart" 
                    onPress={() => {
                        dispatch(cartAction.addToCart(selectedProduct))
                    }} 
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

export const screenOptions = navData => {  
    return {
        title: navData.route.params.productTitle,
    }
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },

    action: {
        marginVertical: 20,
        alignItems: 'center'
    },  

    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: fonts.bold
    },

    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: fonts.semi
    }
});
