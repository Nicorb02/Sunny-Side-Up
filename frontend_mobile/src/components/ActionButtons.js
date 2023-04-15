import React, {useState} from "react";
import { View, Animated } from "react-native";
import CircleButton from "./CircleButton";

const ActionButtons = ({ onPressEvent, onPressHoliday}) => {
    const [items, setItems] = useState({});
    const [event] = useState(new Animated.Value(40));
    const [holiday] = useState(new Animated.Value(40));
    

    const [pop, setPop] = useState(false)

    const popIn = () => {
        setPop(true);
        Animated.timing(event, {
            toValue: 110,
            duration: 300,
            useNativeDriver: false
        }).start();
        Animated.timing(holiday, {
            toValue: 180,
            duration: 300,
            useNativeDriver: false
        }).start();
    }

    const popOut = () => {
        setPop(false)
        Animated.timing(event, {
            toValue: 40,
            duration: 300,
            useNativeDriver: false
        }).start();
        Animated.timing(holiday, {
            toValue: 40,
            duration: 300,
            useNativeDriver: false
        }).start()
    }

    return(
        <View>

            <Animated.View style={{bottom: event}}>
                <CircleButton icon="calendar" onPress={onPressEvent}/>    
            </Animated.View>
        
            <Animated.View style={{bottom: holiday}}>
                <CircleButton icon="birthday-cake" onPress={onPressHoliday}/>
            </Animated.View>
        
            <CircleButton icon="plus" main={true} onPress={() => {
                pop === false ? popIn() : popOut();
            }
            }/>
        </View>
    )
}

export default ActionButtons;