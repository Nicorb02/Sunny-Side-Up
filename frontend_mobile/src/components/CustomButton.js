import React, { useState } from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'

const CustomButton = ( {onPress, text, type = "PRIMARY", disabled = false} ) => {
    
        return (     
        <Pressable onPress={onPress} disabled={disabled} style={[styles.container, styles[`container_${type}`], disabled && styles.disabledButton]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
        );
   
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },
    container_PRIMARY: {
        backgroundColor: '#FF9900',
    },
    container_SECONDARY: {
        borderColor: '#FF9900',
        borderWidth: 2,
    },
    container_TERTIARY: {
    },
    container_DELETE: {
        borderColor: 'red',
        borderWidth: 2,
    },
    text: {
        fontFamily: "Arial",
        fontWeight: 'bold',
        
        color: '#F7FFF7'
    },
    text_TERTIARY: {
        color: 'gray',
    },
    text_SECONDARY: {
        color: '#FF9900',

    },
    text_DELETE: {
        color: 'red',

    }, 
    disabledButton: {
        opacity: 0.5
    },
    
});

export default CustomButton;