import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../assets/ssu_logo.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import axios from 'axios';


const LoginScreen = ({navigation}) => {
    const {height} = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onLoginPressed = async () => {
          // connects to login api
        // const response = await axios.get(('/api/login'), {
            // method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ email, password })
        // });
        // const data = await response.json();
        // // prints to console for now (inspect element to see console)
        // if (data.error == '') 
        // {
        //     console.warn('good login');
        // }
        // else 
        // {
        //     console.error(data.error);
        // }
        // axios.get('/api/login')
        // .then((response) => {
        //     console.log(response.data);
        // })
        // .catch((error) => {
        //     console.error(error);
        // });
        // try {
        //     const response = await axios.get(('/api/login'), {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ email, password })
        //     }
        //     );
        //     console.warn(response.data)
        // } catch (err) {
        //     console.error(err)
        // }
        console.warn("logged in");

    }

    const onForgotPasswordPressed = () => {
        console.warn("forgot password");
    }

    const onRegisterPressed = () => {
        console.warn("register");
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
                    <CustomButton text="Forgot Password?" onPress={() => navigation.navigate('ForgotPassword')} type="TERTIARY" />
                </View>
                <View style={{width: '100%', marginVertical: 100}}>
                    <CustomButton text="Log In" onPress={onLoginPressed}/>
                    <CustomButton text="Dont have an account? Register" onPress={() => navigation.navigate('Register', {name: 'Register'})} type="TERTIARY"/>
                </View>
            
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
});


export default LoginScreen;