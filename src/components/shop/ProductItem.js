import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const ProductItem = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onViewDetails}
            activeOpacity={0.7}
        >
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: props.image }}
                />

                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price}</Text>
                </View>

                <View style={styles.action}>
                    <Button color={colors.primary} title="View Details" onPress={props.onViewDetails} />
                    <Button color={colors.primary} title="To Cart" onPress={props.onAddToCart} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,

        elevation: 10,

        borderRadius: 10,
        backgroundColor: 'white',
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
