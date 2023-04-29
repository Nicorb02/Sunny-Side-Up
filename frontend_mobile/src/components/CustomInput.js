import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput 
            style={styles.input} 
            placeholder={placeholder}
            placeholderTextColor='#c2c2c2'
            value={value}
            onChangeText={setValue}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            autoCapitalize='none'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#343434',
        borderWidth: 1,
        borderRadius: 10,

        padding: 10,
        marginVertical: 5,
    },
    input: {

    },
})

export default CustomInput