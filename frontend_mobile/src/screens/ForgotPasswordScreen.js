import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';

import SendEmailScreen from './SendEmailScreen';
import SubmitCodeScreen from './SubmitCodeScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPasswordScreen = ({navigation}) => {
  const [step, setStep] = useState('submitEmail');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const storage = require('../tokenStorage.js');
    
  const app_name = 'ssu-testing'        // testing server

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
    
  const handleSubmitEmail = async (email) => {
    // password is valid, check if email is valid
    const response = await fetch(buildPath('/api/forgot-password'), {
        method: 'POST',
        headers : { 'Content-Type': 'application/json' },
        body: JSON.stringify({email})
    });
    const data = await response.json();
    
    // found email, store the verification code
    if (data.error == '')
    {
        setVerificationCode(data.code);
        setEmail(email);
        Alert.alert(
            "Reset code sent",
            "Check your inbox for the password reset code.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        setStep('submitVerificationCode');
        console.log(data.code);
    }
    // didnt find valid email address
    else
    {
        // email is invalid, display Invalid Alert
        console.log(data.error);
        Alert.alert(
            "User does not exist",
            "Incorrect username or password.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );

    }
  };

  const handleCancelSubmitEmail = () => {
      navigation.navigate('Login')
  }
  const handleCancelSubmitVerificationCode = () => {
      setStep('submitEmail')
  }
  const handleCancelResetPassword = () => {
      setStep('submitVerificationCode')
  }


  const handleSubmitVerificationCode = (code) => {
    if (code == verificationCode)
    {
        console.log('valid code');
        setStep('resetPassword');
    }
    else
    {
        Alert.alert(
            "Invalid Code",
            "Make sure entered the reset code correctly.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        console.log('invalid code');
    }
  };

  const handleSubmitNewPassword = async (newPassword) => {
      
    // first check for password complexity
    if (!isPasswordValidFunc(newPassword))
    {
        Alert.alert(
            "Password does not meet requirements",
            "Make sure it's at least 8 characters including a number, 1 uppercase and 1 lowercase letter, and a special character.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        console.log("invalid password")

        return;
    }
    else 
    {
        // password is valid, check if email is valid
        const response = await fetch(buildPath('/api/reset-password'), {
            method: 'POST',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password_new: newPassword})
        });
        const data = await response.json();
        
        // found email, store the verification code
        if (data.error == '')
        {
            Alert.alert(
                "Password Reset Successful",
                "Your password has been reset successfully!",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            navigation.navigate('Login')
        }
        // didnt find valid email address
        else
        {
            // email is invalid, display Invalid Alert
            // setIsValidEmail(false);
            console.error(data.error);
        }
    }
  };

  return (
    <View>
    {step === 'submitEmail' && <SendEmailScreen onSubmitEmail={handleSubmitEmail} onCancel={handleCancelSubmitEmail}/>}
    {step === 'submitVerificationCode' && (
      <SubmitCodeScreen onSubmitVerificationCode={handleSubmitVerificationCode} onCancel={handleCancelSubmitVerificationCode}/>
    )}
    {step === 'resetPassword' && <ResetPasswordScreen onSubmitNewPassword={handleSubmitNewPassword} onCancel={handleCancelResetPassword}/>}
  </View>
  );
};
export default ForgotPasswordScreen;
