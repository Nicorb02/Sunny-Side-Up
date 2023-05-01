import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper"; 
import Icon from "react-native-vector-icons/Feather"
import { Swipeable } from "react-native-gesture-handler";


const EventItem = ({ title, isHoliday, startTime, onPress }) => {
    if (isHoliday)
    {
        return(
            <TouchableOpacity 
            style={{marginRight: 10, marginTop: 10}}>
                    <Card style={{backgroundColor:'#F0E9B2', borderRadius: 0}}>
                        <Card.Content>    
                            <View>
                                <Text>
                                    {title}
                                </Text>
                            </View>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
        )
    }

    return(
        <Swipeable
            renderRightActions={() => (
            <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
                if (typeof onPress === 'function') onPress();
            }}
            >
            <Icon name="trash-2" size={30} color="#fff"/>
            </TouchableOpacity>
            )}
        >
                <Card style={{backgroundColor:'#fff', borderRadius: 0, marginTop: 10, marginRight: 10}}>
                    <Card.Content>    
                        <View>
                            <Text>
                                {title}
                            </Text>
                            <Text>
                                {startTime}
                            </Text>
                        </View>
                    </Card.Content>
                </Card>
             </Swipeable>
    )
}

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        width: 50,
        marginRight: 10, 
        marginTop: 10
      },
})
export default EventItem;