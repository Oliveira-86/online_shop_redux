import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const ButtonGradient = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}

        >
            <LinearGradient
                colors={[colors.primary, colors.accent]}
                style={props.style}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: fonts.bold
                }}>
                    {props.text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default ButtonGradient;
