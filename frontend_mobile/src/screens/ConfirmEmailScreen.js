import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet, useWindowDimensions} from 'react-native';

import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

const buildPath = (route) =>
    {
        return 'https://' + app_name + '.herokuapp.com' + route;
    }

    // checking for password complexity 
    // 1 lowercase, 1 uppercase, 1 special, 1 num, length >= 8
    function isPasswordValidFunc(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let flag = regex.test(password);
        setIsPasswordValid(flag);
        return flag;
    }
    
    const onSignInPressed = () => {
        console.warn("Sign in");
    }
    const onRegisterPressed = async () => {
        // checks for valid password complexity first
        if (!isPasswordValidFunc(password))
        {
            setIsPassCompFormSlid(true);
            console.warn("invalid password")
            return;
        }
        else
        {
            setIsPassCompFormSlid(false);
            const response = await fetch(buildPath('/api/register'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password })
            });
            const data = await response.json();
            // prints to console for now (inspect element to see console)
            if (data.error === '') 
            {
                console.warn('good register');
            } 
            else 
            {
                console.error(data.error);
            }
        }
    }

    


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