import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import fonts from '../../styles/fonts';
import Card from '../UI/Card';

const ProductItem = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onSelected}
            activeOpacity={0.7}
        >
            <Card style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: props.image }}
                />

                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price}</Text>
                </View>

                <View style={styles.action}>
                    {props.children}
                </View>
            </Card>
        </TouchableOpacity>

    )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        height: 300,
        margin: 20
    },

    image: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    details: {
        alignItems: 'center',
        paddingVertical: 10,
        height: '15%'
    },

    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily: fonts.bold
    },

    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: fonts.bold
    },

    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20,
    }
})
