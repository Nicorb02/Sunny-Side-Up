import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"


const CircleButton = ({icon, main = false, onPress}) => {
    const [focused, setFocused] = useState(false)

    const toggleFocus = () => {
        setFocused(previous => !previous);
    }
    
    return(
        <View>
            <TouchableOpacity
                style={[styles.circle, main ? styles.circle_plus : styles.circle_other,{backgroundColor: main ? (focused ? '#fff' : '#e94d0b') : '#e94d0b'}]} 
                onPress={() => {
                    if (typeof onPress === 'function') onPress();


                    toggleFocus()
                }}

                >
            <Icon name={main ? (focused ? 'close' : icon) : icon}  size={25} color={main ? (focused ? '#e94d0b' : '#ffff') : '#ffff'}/>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 60,
        height: 60,
        position: 'absolute',
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        right: 25,
    },
    circle_plus: {
        bottom: 75,
    },
    circle_other: {
        bottom: 35,
    }

})


export default CircleButton;