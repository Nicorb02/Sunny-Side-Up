import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet, useWindowDimensions} from 'react-native';

import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'


const RegisterScreen = () => {
    const {height} = useWindowDimensions();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    
    const onSignInPressed = () => {
        console.warn("sign in");
    }
    const onRegisterPressed = () => {
        console.warn("registered");
    }
    const [fontsloaded, setFontsLoaded] = useState(false);


        return (
            <View style={styles.root}>
            <Text style={styles.title}>Create an Account</Text>
                <View style={{width: '100%', marginTop: 20}}>
                    <CustomInput placeholder="First Name" value={firstName} setValue={setFirstName}/>
                    <CustomInput placeholder="Last Name" value={lastName} setValue={setLastName}/>
                    <CustomInput placeholder="Email" value={email} setValue={setEmail}/>
                    <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
                    <CustomInput placeholder="Confirm Password" value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry={true}/>
                </View>
                <View style={{width: '100%', marginVertical: 100}}>
                    <CustomButton text="Register" onPress={onRegisterPressed}/>
                    <CustomButton text="Already have an account? Sign In" onPress={onSignInPressed} type="TERTIARY"/>
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


export default RegisterScreen;