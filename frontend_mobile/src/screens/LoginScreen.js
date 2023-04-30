import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, Modal, Pressable, SafeAreaView, KeyboardAvoidingView} from 'react-native';
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
    const [sendEmailModal, setSendEmailModal] = useState(false);
    const [submitCodeModal, setSubmitCodeModal] = useState(false);
    const [resetPasswordModal, setResetPasswordModal] = useState(false);
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

    const onForgotPasswordPressed = () => {
        setSendEmailModal(true);
    }

    const onReturnToSignInPressed = () => {
        setSendEmailModal(false);
    }
    const body = JSON.stringify({email: resetPasswordEmail})
    const openSubmitCode = async () => {
        console.log(body)
        // password is valid, check if email is valid
        const response = await fetch(buildPath('/api/forgot-password'), {
            method: 'POST',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: resetPasswordEmail})
        });
        const data = await response.json();
        
        // found email, store the verification code
        if (data.error == '')
        {
            setVerCode(data.code);
            setSubmitCodeModal(true);
            console.warn(data.code);
        }
        // didnt find valid email address
        else
        {
            // email is invalid, display Invalid Alert
            setIsValidEmail(false);
            console.error(data.error);
        }
    }

    const closeSubmitCode = () => {
        setSubmitCodeModal(false)
    }

    const openResetPassword = () => {
        console.log(resetPasswordModal)
         // checks for entered code to match generated code
         if (enteredCode == verCode) {
            // true so call register api and hide form for code input
            setResetPasswordModal(true)
        } 
        else 
        {
            // entered code is wrong
            setValidCode(false);
            console.error('Invalid code, try again');
        }
    }

    const handleResetPassword = () => {

    }

    const closeResetPassword = () => {
        setNewPassword('')
        setNewPasswordConfirmed('')
        setResetPasswordModal(false)
    }

    const onRegisterPressed = () => {
        console.warn("register");
    }
    //Toggle password visibility
    const toggleShowPassword = () => {
        setPasswordVisibility(!passwordVisibility)
    };

    useEffect(() => {
        if (submitCodeModal)
        {
            setSendEmailModal(false)
        }
    }, [ submitCodeModal ])
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
                {/* <View style={{width: '100%', padding: 10}}> */}
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
                        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
                    </View>
                    </KeyboardAvoidingView>
                {/* </View> */}
                <View style={{width: '100%', padding: 10}}>
                    <CustomButton text="Log In" onPress={onLoginPressed}/>
                    <CustomButton text="Dont have an account? Register" onPress={() => navigation.navigate('Register', {name: 'Register'})} type="TERTIARY"/>
                </View>




            <Modal animationType="slide" transparent={false} visible={sendEmailModal}>
                <View style={styles.root}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Reset your password</Text>
                        <View style={{width: '100%', marginVertical: 50}}>
                            <CustomInput placeholder="Email" value={resetPasswordEmail} setValue={setResetPasswordEmail} />
                            </View>
                        <View style={{width: '100%', marginBottom: 0}}>
                            <CustomButton text="Send" onPress={openSubmitCode}/>
                            <CustomButton text="Back to Sign In" onPress={onReturnToSignInPressed} type="TERTIARY"/>
                        </View>
                    </View>
                </View>


                <Modal animationType="none" transparent={false} visible={submitCodeModal}>
                    <View style={styles.root}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.title}>Reset your password</Text>
                            <View style={{width: '100%', marginVertical: 50}}>
                                <CustomInput placeholder="Reset Code" value={enteredCode} setValue={setEnteredCode} />
                                </View>
                            <View style={{width: '100%', marginBottom: 0}}>
                                <CustomButton text="Submit Code" onPress={openResetPassword}/>
                                <CustomButton text="Cancel" onPress={closeSubmitCode} type="TERTIARY"/>
                            </View>
                        </View>
                    </View>

                    <Modal animationType="none" transparent={false} visible={resetPasswordModal}>
                        <View style={styles.root}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.title}>Enter your new password</Text>
                                <View style={{width: '100%', marginVertical: 50}}>
                                    <CustomInput placeholder="New Password" value={newPassword} setValue={setNewPassword} secureTextEntry={true}/>
                                    <CustomInput placeholder="Confirm Password" value={newPasswordConfirmed} setValue={setNewPasswordConfirmed} secureTextEntry={true}/>
                                    </View>
                                <View style={{width: '100%', marginBottom: 0}}>
                                    <CustomButton text="Reset Password" onPress={handleResetPassword}/>
                                    <CustomButton text="Cancel" onPress={closeResetPassword} type="TERTIARY"/>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Modal>
            </Modal>
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
    modalContainer: {
        width:'100%', 
        padding: 10, 
        alignItems: 'center', 
        marginVertical: 20
}
});


export default LoginScreen;