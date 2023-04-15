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
import DTPicker from "../components/DTPicker";
import CreateEventScreen from "./CreateEventScreen";

const ScheduleScreen = () => {
    const [selected, setSelected] = useState('');
    
    const [items, setItems] = useState({
        '2023-04-15': [
            {title: 'test 1', description: 'description 1'},
            {title: 'test 2', description: 'description 2'},
            {title: 'test 3', description: 'description 3'},
        ],
        '2023-04-16': [{title: 'test 4', description: 'description 4'}] 
    })

    const [event] = useState(new Animated.Value(40));
    const [holiday] = useState(new Animated.Value(40));
    
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    
    const [eventStartDate, setEventStartDate] = useState(new Date())
    const [eventEndDate, setEventEndDate] = useState(new Date())
    const [eventTitle, setEventTitle] = useState('')
    const [eventDescription, setEventDescription] = useState('')

    const [createEventModal, setCreateEventModal] = useState(false)

    const toggleCreateEventModal = () => {
        setCreateEventModal(previous => !previous)
        console.log(items)
    }
    
    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
    
    const today = timeToString(new Date())
    const changeStartDate = (event, selectedDate) => {
        if (event.type === 'dismissed') {
            console.log(
              'picker was dismissed',
              undefined,
              [
                {
                  text: 'great',
                },
              ],
              {cancelable: true},
            );
            return;
          }
      
          if (event.type === 'neutralButtonPressed') {
            setEventStartDate(new Date(0));
          } else {
            setEventStartDate(selectedDate);
          }
    }
    const changeEndDate = (event, selectedDate) => {
        if (event.type === 'dismissed') {
            console.log(
              'picker was dismissed',
              undefined,
              [
                {
                  text: 'great',
                },
              ],
              {cancelable: true},
            );
            return;
          }
      
          if (event.type === 'neutralButtonPressed') {
            setEventEndDate(new Date(0));
          } else {
            setEventEndDate(selectedDate);
          }
    }

    const addEvent = (t, d, s, e) => {
        const sString = timeToString(s)
        if (t && d)
        {
            if (!items[sString])
                items[sString] = []

            items[sString].push({
                title: t,
                description: d,
                startDate: s,
                endDate: e
            })

            setCreateEventModal(false)
            console.log(items)
        }
        else
        console.warn("fill all fields")
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
          if (!items['2017-06-02'])
            items['2017-06-02'] = []
          items['2017-06-02'].push({
            title: 'Custom Added Item',
            description: '2017-06-02'
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
                                  {item.description}
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
                    dotColor: '#ff9900',
                    
                }}

                items={items}
                // loadItemsForMonth={loadItems}
                selected={today}
                renderItem={renderItem}
            />

            <ActionButtons onPressEvent={toggleCreateEventModal}/>

            <Modal animationType="none" transparent={false} visible={createEventModal}>
                {/* <View style={styles.root}>
                    <Text style={styles.title}>Create Event</Text>
                    <View style={{width: '100%', marginTop: 20}}>
                        <CustomInput placeholder="Event" value={eventTitle} setValue={setEventTitle}/>
                        <CustomInput placeholder="Description" value={eventDescription} setValue={setEventDescription}/>
                    </View>
                    <View style={{width: '100%', marginTop: 30}}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.text}>Start</Text>
                            <DTPicker value={eventStartDate} onChange={changeStartDate}/>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.text}>End</Text>
                            <DTPicker value={eventEndDate} onChange={changeEndDate}/>
                        </View>
                    </View>
                    <View style={{width: '100%', marginVertical: 100}}>
                        <CustomButton text="Add Event" onPress={() => {
                            if (eventTitle && eventDescription)
                            {
                                if (!items[timeToString(eventStartDate)])
                                    items[timeToString(eventStartDate)] = []

                                items[timeToString(eventStartDate)].push({
                                    title: eventTitle,
                                    description: eventDescription,
                                    startDate: eventStartDate,
                                    endDate: eventEndDate
                                })

                                setCreateEventModal(false)
                                console.log(items)
                            }
                            else
                            console.warn("fill all fields")
                        }}/>
                        <CustomButton text="Cancel" onPress={() =>{

                            setCreateEventModal(false)
                        }} type="TERTIARY"/>
                    </View>
                </View> */}

                <CreateEventScreen onPressAdd={addEvent} onPressCancel={() => {setCreateEventModal(false)}}/>
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
    dateContainer: {
        flexDirection:'row', 
        justifyContent:"center",
        alignItems: "center", 
        width: '100%',
        padding: 10,

    },
    text: {
        fontSize: 16,

    }   
})

export default ScheduleScreen;