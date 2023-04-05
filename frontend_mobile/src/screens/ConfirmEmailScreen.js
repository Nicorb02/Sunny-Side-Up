import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet, useWindowDimensions} from 'react-native';

import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

const ConfirmEmailScreen = () => {
    const {height} = useWindowDimensions();

    const [code, setCode] = useState('');
    
    const onConfirmPressed = () => {
        console.warn("registered");
    }

    const onSignInPressed = () => {
        console.warn("sign in");
    }

    const onResendPressed = () => {
        console.warn("sign in");
    }

        return (
            <View style={styles.root}>
            <Text style={styles.title}>Confirm your email</Text>
                <View style={{width: '100%', marginTop: 20}}>
                    <CustomInput placeholder="Activation Code" value={code} setValue={setCode} secureTextEntry={true}/>
                    </View>
                <View style={{width: '100%', marginVertical: 100}}>
                    <CustomButton text="Confirm" onPress={onConfirmPressed}/>
                    <CustomButton text="Resend Code" onPress={onResendPressed} type="SECONDARY"/>
                    <CustomButton text="Back to Sign In" onPress={onSignInPressed} type="TERTIARY"/>
                </View>
            
        </View>
        );
    
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        marginTop: 50,

        color: '#343434'
    },
});


export default ConfirmEmailScreen;