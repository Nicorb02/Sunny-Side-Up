import React, {useState} from "react";
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useFonts } from 'expo-font';
import { SoapRegular } from '../../assets/fonts/expo-fonts';

const SendEmailScreen = ({ onSubmitEmail, onCancel }) => {
    const [email, setEmail] = useState('');

    const handleSubmitEmail = () => {
        onSubmitEmail(email);
    };

    const [fontsLoaded] = useFonts({
        SoapRegular,
    });
    
    if (!fontsLoaded) {
        return null;
    }
    return(
        <SafeAreaView style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>
                <View style={{width: '100%', marginVertical: 50, padding: 10}}>
                    <CustomInput placeholder="Email" value={email} setValue={setEmail} />
                </View>
                <View style={{width: '100%',  bottom: 0, padding: 10}}>
                    <CustomButton text="Send" onPress={() => {handleSubmitEmail()}}/>
                    <CustomButton text="Back to Sign In" onPress={onCancel} type="TERTIARY"/>
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
        width: '100%',
    },
    input: {
        marginVertical: 5, 
        backgroundColor: '#f7fff7',
        width: '100%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        marginTop: 50,
        color: '#343434',
        fontFamily: 'SoapRegular'
    },
})

export default SendEmailScreen;