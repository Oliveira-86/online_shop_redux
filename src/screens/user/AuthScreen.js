import React from 'react'
import { ScrollView, StyleSheet, KeyboardAvoidingView, Text, View } from 'react-native'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'

const AuthScreen = (props) => {
    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input 
                        id="email"
                        label="E-Mail"
                        keyboardType="email-address"
                        required
                        email
                        autoCapitalize="none"
                        erroeMessage="Please enter a valid email address."
                        onValueChange={() => {}}
                        initialValue=""
                    />
                    <Input 
                        id="password"
                        label="Password"
                        keyboardType="default"
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize="none"
                        erroeMessage="Please enter a valid password."
                        onValueChange={() => {}}
                        initialValue=""
                    />
                </ScrollView>
                <Button />
            </Card>
        </KeyboardAvoidingView>
    )
};


export default AuthScreen;

export const screenOptions= {
    headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({});
