import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Card } from "react-native-paper";

const EventItem = ({ title, description }) => {
    return(
        <TouchableOpacity style={{
            marginRight: 10,
            marginTop: 17}}>
                <Card style={{backgroundColor:'#fff'}}>
                    <Card.Content>    
                        <View>
                            <Text>
                                {title}
                            </Text>
                            <Text>
                                {description}
                            </Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
    )
}

export default EventItem;