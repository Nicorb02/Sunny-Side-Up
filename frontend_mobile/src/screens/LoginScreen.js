import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet, useWindowDimensions, Modal, Pressable} from 'react-native';
import Logo from '../../assets/ssu_logo.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'



const LoginScreen = ({navigation}) => {
    const {height} = useWindowDimensions();
    const [email, setEmail] = useState('');
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

    const openSubmitCode = () => {
        setSubmitCodeModal(true)
    }
    const closeSubmitCode = () => {
        setSubmitCodeModal(false)
    }
    const openResetPassword = () => {
        setResetPasswordModal(true)
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
    return(
        <View style={styles.root}>

            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.25}]}
                resizeMode="contain"
                />
                <View style={{width: '100%', marginTop: 20}}>
                    <CustomInput placeholder="Email" value={email} setValue={setEmail}/>
                    <View>
                        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={passwordVisibility}/>
                        <Pressable
                        activeOpacity={0.8}
                        style={styles.visibilityBtn}
                        onPress={toggleShowPassword}>
                        <Image
                            source={
                            passwordVisibility
                                ? require('../../assets/show.png')
                                : require('../../assets/hide.png')
                            }
                            style={{height: 25, width: 25, bottom: 8}}
                        />
                        </Pressable>
                    </View>
                </View>
                <View style={{}}>
                    <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
                </View>
                <View style={{width: '100%', marginVertical: 100}}>
                    <CustomButton text="Log In" onPress={onLoginPressed}/>
                    <CustomButton text="Dont have an account? Register" onPress={() => navigation.navigate('Register', {name: 'Register'})} type="TERTIARY"/>
                </View>

            <Modal animationType="slide" transparent={false} visible={sendEmailModal}>
                <View style={styles.root}>
                    <Text style={styles.title}>Reset your password</Text>
                    <View style={{width: '100%', marginTop: 20}}>
                        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
                        </View>
                    <View style={{width: '100%', marginVertical: 100}}>
                        <CustomButton text="Send" onPress={openSubmitCode}/>
                        <CustomButton text="Back to Sign In" onPress={onReturnToSignInPressed} type="TERTIARY"/>
                    </View>
                </View>


                <Modal animationType="none" transparent={false} visible={submitCodeModal}>
                    <View style={styles.root}>
                        <Text style={styles.title}>Reset your password</Text>
                        <View style={{width: '100%', marginTop: 20}}>
                            <CustomInput placeholder="Reset Code" value={enteredCode} setValue={setEnteredCode} />
                            </View>
                        <View style={{width: '100%', marginVertical: 100}}>
                            <CustomButton text="Submit Code" onPress={openResetPassword}/>
                            <CustomButton text="Cancel" onPress={closeSubmitCode} type="TERTIARY"/>
                        </View>
                    </View>

                    <Modal animationType="none" transparent={false} visible={resetPasswordModal}>
                        <View style={styles.root}>
                            <Text style={styles.title}>Enter your new password</Text>
                            <View style={{width: '100%', marginTop: 20}}>
                                <CustomInput placeholder="New Password" value={newPassword} setValue={setNewPassword} secureTextEntry={true}/>
                                <CustomInput placeholder="Confirm Password" value={newPasswordConfirmed} setValue={setNewPasswordConfirmed} secureTextEntry={true}/>
                                </View>
                            <View style={{width: '100%', marginVertical: 100}}>
                                <CustomButton text="Reset Password"/>
                                <CustomButton text="Cancel" onPress={closeResetPassword} type="TERTIARY"/>
                            </View>
                        </View>
                    </Modal>
                </Modal>
            </Modal>

            
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 10,
        marginVertical: 50
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
        right: 9,
        height: 25,
        width: 25,
        padding: 0,
        marginTop: 21,
      },
});


export default LoginScreen;