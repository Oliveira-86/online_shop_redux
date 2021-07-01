import React from 'react';
import { FlatList, Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/Products';

import ProductItem from '../../components/shop/ProductItem';

import colors from '../../styles/colors';

const UserProductsScreen = (props) => {

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id });
    }

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
                    <Button
                        color={colors.primary}
                        title="Edit"
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }}
                    />

                    <Button
                        color={colors.primary}
                        title="Delete"
                        onPress={() => {
                            dispatch(productsActions.deleteProduct(itemData.item.id));
                        }}
                    />
                </ProductItem>
            )}
        />
    );
};

export default UserProductsScreen;
