import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/Products';

import ProductItem from '../../components/shop/ProductItem';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import ButtonGradient from '../../components/UI/ButtonGradient';

const UserProductsScreen = (props) => {

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProducts', { productId: id });
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {
                text: 'No', 
                style: 'default'
            },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    dispatch(productsActions.deleteProduct(id))
                }
            }
        ]);
    };

    if (userProducts.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    No products found, maybe start creating some?
                </Text>
            </View>
        );
    };

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imgUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelected={() => {
                        editProductHandler(itemData.item.id);
                    }}
                >
                    <ButtonGradient
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }}
                        text="Edit"
                        style={styles.button}
                    />
                    <ButtonGradient
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                        text="Delete"
                        style={styles.button}
                    />
                    {/* <Button
                        color={colors.primary}
                        title="Edit"
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }}
                    />

                    <Button
                        color={colors.primary}
                        title="Delete"
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                    /> */}
                </ProductItem>
            )}
        />
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Cart"
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Add"
                        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        onPress={() => {
                            navData.navigation.navigate('EditProducts');
                        }}
                    />
                </HeaderButtons>
            )
        }
    };
};

export default UserProductsScreen;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    }
});