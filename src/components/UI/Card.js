import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = (props) => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,

        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,

        elevation: 10,
    }
});

export default Card;


