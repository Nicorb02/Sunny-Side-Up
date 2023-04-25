import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Card } from "react-native-paper";

const EventItem = ({ title, id, onPress }) => {
    return(
        <TouchableOpacity 
        style={{marginRight: 10, marginTop: 17}}
        onPress={() => {
            if (typeof onPress === 'function') onPress();
        }}
        >
                <Card style={{backgroundColor:'#fff'}}>
                    <Card.Content>    
                        <View>
                            <Text>
                                {title}
                            </Text>
                            <Text>
                                {id}
                            </Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
    )
}

export default EventItem;