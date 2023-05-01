import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, Pressable, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import Logo from '../../assets/ssu_logo.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({navigation}) => {
    const {height} = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [resetPasswordEmail, setResetPasswordEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmed, setNewPasswordConfirmed] = useState('')

    const [passwordVisibility, setPasswordVisibility] = useState(true)

    // genereated code and code entered by user
    const [verCode, setVerCode] = useState('');
    const [enteredCode, setEnteredCode] = useState('');
    const [validCode, setValidCode] = useState(true);

    const [isValidEmail, setIsValidEmail] = useState(true);
    
    const view = require('../../assets/view.png')
    const hide = require('../../assets/hide.png')
    
    const storage = require('../tokenStorage.js');
    
    const app_name = 'ssu-testing'        // testing server

    const buildPath = (route) =>
    {
        return 'https://' + app_name + '.herokuapp.com' + route;
    }

    const onLoginPressed = async () => {
        const response = await fetch(buildPath('/api/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const data = await response.json();
          // prints to console for now (inspect element to see console)
          if (data.error == '') 
          {
            console.log('good login');
            console.log(data);
            // store the token locally
            await storage.storeToken(data);
      
            const id = data.id;
            const firstName = data.fn;
            const lastName = data.ln;
      
            // format user info and store locally
            const user = { id, firstName, lastName };
            await AsyncStorage.setItem('user_data', JSON.stringify(user));
      

              navigation.navigate('NavBar')
          }
          else 
          {
            console.error(data.error);
          }

    }

    //Toggle password visibility
    const toggleShowPassword = () => {
        setPasswordVisibility(!passwordVisibility)
    };
    return(
        
        <SafeAreaView style={styles.root}>

                <Image 
                    source={Logo} 
                    style={[styles.logo, {height: height * 0.25}]}
                    resizeMode="contain"
                />
                <KeyboardAvoidingView 
            behavior="padding"
            style={{ width: '100%', padding: 10 }}
            keyboardVerticalOffset={64} // adjust this value as needed
        >
                    <TextInput 
                        style={styles.input} 
                        mode="outlined" 
                        label="Email" 
                        value={email} 
                        onChangeText={email => setEmail(email)}
                        autoCapitalize="none"
                    />

                    <View style={{}}>
                        <TextInput 
                            style={styles.input} 
                            mode="outlined" 
                            label="Password" 
                            value={password} 
                            onChangeText={password => setPassword(password)} 
                            secureTextEntry={passwordVisibility}
                            autoCapitalize="none"
                        />
                            <Pressable
                            activeOpacity={0.8}
                            style={styles.visibilityBtn}
                            onPress={toggleShowPassword}>
                            <Image
                                source={
                                passwordVisibility
                                    ? view
                                    : hide
                                }
                                style={{height: 25, width: 25}}
                            />
                            </Pressable>
                    </View>
                    <View style={{}}>
                        <CustomButton text="Forgot Password?" onPress={() => {navigation.navigate('ForgotPassword')}} type="TERTIARY" />
                    </View>
                    </KeyboardAvoidingView>
                <View style={{width: '100%', padding: 10}}>
                    <CustomButton text="Log In" onPress={onLoginPressed}/>
                    <CustomButton text="Dont have an account? Register" onPress={() => navigation.navigate('Register', {name: 'Register'})} type="TERTIARY"/>
                </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#f0e9b2',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        marginVertical: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        marginTop: 50,
        color: '#343434'
    },
    visibilityBtn: {
        position: 'absolute',
        right: 10,
        top: 24,

        // right: 9,
        height: 25,
        width: 25,
        padding: 0,
        // marginTop: 10,
        // marginRight: 
      },
      input: {
          
        marginVertical: 5, 
        backgroundColor: '#f7fff7',
        width: '100%'
    },
});


export default LoginScreen;