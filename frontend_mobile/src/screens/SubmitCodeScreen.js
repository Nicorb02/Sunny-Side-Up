import React, {useState} from "react";
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";


const SubmitCodeScreen = ({ onSubmitVerificationCode, onCancel }) => {
    const [enteredCode, setEnteredCode] = useState('')
    
    const handleSubmitVerificationCode = () => {
        onSubmitVerificationCode(enteredCode);
    };

    return(
        <SafeAreaView style={styles.root}>
            <Text style={styles.title}>Enter reset code</Text>
            <View style={{width: '100%', marginVertical: 50, padding: 10}}>
                <CustomInput placeholder="Reset Code" value={enteredCode} setValue={setEnteredCode} />
                </View>
            <View style={{width: '100%', marginBottom: 0, padding: 10}}>
                <CustomButton text="Submit Code" onPress={handleSubmitVerificationCode}/>
                <CustomButton text="Cancel" onPress={onCancel} type="TERTIARY"/>
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
        color: '#343434'
    },
})

export default SubmitCodeScreen;