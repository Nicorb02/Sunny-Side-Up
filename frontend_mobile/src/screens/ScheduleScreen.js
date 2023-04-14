import React,{useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, Modal } from "react-native";
import { Agenda } from 'react-native-calendars';
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleButton from "../components/CircleButton";
import Icon from "react-native-vector-icons/FontAwesome"
import ActionButtons from "../components/ActionButtons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import DateTimePicker from '@react-native-community/datetimepicker';


const ScheduleScreen = () => {
    const [selected, setSelected] = useState('');

    const [items, setItems] = useState({});
    const [event] = useState(new Animated.Value(40));
    const [holiday] = useState(new Animated.Value(40));
    
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    
    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
      }

    const loadItems = (day) => {
        const items = items || {};
    
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
    
            if (!items[strTime]) {
              items[strTime] = [];
              
              const numItems = Math.floor(Math.random() * 3 + 1);
              for (let j = 0; j < numItems; j++) {
                // items[strTime].push({
                //   title: 'Item for ' + strTime + ' #' + j,
                //   content: 'Content for ' + strTime,
                //   height: Math.max(50, Math.floor(Math.random() * 150)),
                //   day: strTime
                // });
            }
            }
          }
          items['2017-06-02'].push({
            title: 'Custom Added Item',
            day: '2017-06-02'
        })
          
          const newItems = {};
          Object.keys(items).forEach(key => {
            newItems[key] = items[key];
          });
          setItems(newItems)
        }, 1000);
      }
      
      const renderItem = (item) => {
          return(
              <TouchableOpacity style={{
              marginRight: 10,
              marginTop: 17}}>
                  <Card style={{backgroundColor:'#fff'}}>
                      <Card.Content>    
                          <View>
                              <Text>
                                  {item.title}
                              </Text>
                              <Text>
                                  {item.day}
                              </Text>
                          </View>
                      </Card.Content>
                  </Card>
              </TouchableOpacity>
          )
      }


    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#ffffff'}}>

            <Agenda
                // onDayPress={day => {
                //     setSelected(day.dateString);
                // }}
                // markedDates={{
                //     [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                // }}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#ff9900',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#ff9900',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#b6c1cd',
                    dotColor: '#ff9900'
                }}
                items={items}
                loadItemsForMonth={loadItems}
                selected={'2017-05-16'}
                renderItem={renderItem}
            />
            <ActionButtons/>

            <Modal animationType="none" transparent={false} visible={true}>
                <View style={styles.root}>
                    <Text style={styles.title}>Create Event</Text>
                    <View style={{width: '100%', marginTop: 20}}>
                        <CustomInput placeholder="Event"/>
                        <CustomInput placeholder="Description" />
                    </View>

                    <View style={{flexDirection:'row', justifyContent:"center", alignItems: "center", width: '100%'}}>
                        <Text style={{fontSize: 16}}>Start</Text>
                        <DateTimePicker
                            value={date}
                            mode='datetime'
                            display="default"
                        />
                    </View>
                    <View>
                        <Text>End</Text>
                        <DateTimePicker
                            value={date}
                            mode='datetime'
                            display="default"
                        />
                    </View>
                    <View style={{width: '100%', marginVertical: 100}}>
                        <CustomButton text="Add Event"/>
                        <CustomButton text="Cancel" type="TERTIARY"/>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}   

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 10,
        marginVertical: 50
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        marginTop: 50,
        color: '#343434'
    },
})

export default ScheduleScreen;