import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet, useWindowDimensions} from 'react-native';

import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'


const ForgotPasswordScreen = () => {
    const {height} = useWindowDimensions();

    const [email, setEmail] = useState('');
    
    const onSendPressed = () => {
        console.warn("registered");
    }

    const onSignInPressed = () => {
        console.warn("sign in");
    }


    return (
        <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>
            <View style={{width: '100%', marginTop: 20}}>
                <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={true}/>
                </View>
            <View style={{width: '100%', marginVertical: 100}}>
                <CustomButton text="Send" onPress={onSendPressed}/>
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
        // fontFamily: 'SoapRegular',
        color: '#343434'
    },
});


export default ForgotPasswordScreen;