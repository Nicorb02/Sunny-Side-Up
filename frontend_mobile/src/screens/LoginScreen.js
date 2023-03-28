import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../assets/ssu_logo.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'


const LoginScreen = () => {
    const {height} = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSignInPressed = () => {
        console.warn("sign in");
    }
    const onForgotPasswordPressed = () => {
        console.warn("forgot password");
    }

    return(
        <View style={styles.root}>

            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.25}]}
                resizeMode="contain"
                />
                <View style={{width: '100%', marginTop: 20}}>
                    <CustomInput placeholder="Email" value={email} setValue={setEmail}/>
                    <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
                </View>
                <View style={{}}>
                    <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
                </View>
                <View style={{width: '100%', marginVertical: 100}}>
                    <CustomButton text="Sign In" onPress={onSignInPressed}/>
                    <CustomButton text="Dont have an account? Register" onPress={onSignInPressed} type="TERTIARY"/>
                </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        marginVertical: 40,
    },
});


export default LoginScreen;