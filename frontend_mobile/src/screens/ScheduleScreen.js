import React,{useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, Modal } from "react-native";
import { Agenda } from 'react-native-calendars';
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleButton from "../components/CircleButton";
import Icon from "react-native-vector-icons/MaterialIcons"
import ActionButtons from "../components/ActionButtons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import DateTimePicker from '@react-native-community/datetimepicker';
import DTPicker from "../components/DTPicker";
import CreateEventScreen from "./CreateEventScreen";
import EventItem from "../components/EventItem";
import Day from "react-native-calendars/src/calendar/day";
import { TextInput } from "react-native-paper";
import {SoapRegular} from '../../assets/fonts/expo-fonts'
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScheduleScreen = ({ navigation }) => {
    const [selected, setSelected] = useState('');
  
    const [refresh, setRefresh] = useState(false)
    const [items, setItems] = useState({})

    
    const [firstTimeInvoke, setFirstTimeInvoke] = useState(true)

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    
    const [eventStartTime, setEventStartTime] = useState(new Date())
    const [eventEndDate, setEventEndDate] = useState(new Date())
    const [eventTitle, setEventTitle] = useState('')


    const [editStartTime, setEditStartTime] = useState(new Date())
    const [editEndDate, setEditEndDate] = useState(new Date())
    const [editTitle, setEditTitle] = useState('')

    const [editItem, setEditItem] = useState({id: null})

    const [createEventModal, setCreateEventModal] = useState(false)
    const [editEventModal, setEditEventModal] = useState(false)
    
    const storage = require('../tokenStorage.js');

    // retrieve user data and current jwt from local storage
    const getUserDataAndToken = async () => {
      const userDataString = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userDataString);
      const jwtToken = await storage.retrieveToken();
      
      return { userData, jwtToken };
    }

    const app_name = 'ssu-testing'        // testing server

    const buildPath = (route) =>
    {
        return 'https://' + app_name + '.herokuapp.com' + route;
    }

    const openEditModal = (item) => {
      setEditItem(item)
      setEditTitle(item.title)

      setEditStartTime(item.startTime);
      setEditEndDate(item.endDate)

      setEditEventModal(true)
  }

    const toggleCreateEventModal = () => {
        setCreateEventModal(previous => !previous)
        console.log(items)
    }
    
    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
    
    const today = timeToString(new Date())

    
    
    const changeStartTime = (event, selectedDate) => {
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
            setEventStartTime(new Date(0));
          } else {
            setEventStartTime(selectedDate);
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

    const editEvent = () => {
      const updatedEvents = {...items}; 
      const eventToEdit = updatedEvents[timeToString(editItem.startTime)].find(event => event.id === editItem.id); 
      if (eventToEdit.startTime == editStartTime) { 
        eventToEdit.title = editTitle; 
        eventToEdit.startTime = editStartTime; 
        eventToEdit.endDate = editEndDate; 
      }
      
      setItems(updatedEvents); 
      setEditEventModal(false);
  } 

  const deleteEvent = () => {
    const dateString = timeToString(editItem.startTime)

    const updatedEvents = {...items}; // create a copy of the original object
    updatedEvents[dateString] = updatedEvents[dateString].filter((event) => event.id !== editItem.id)
    setItems(updatedEvents); // set the updated object to the state

    setEditEventModal(false)
  }

  const addEvent = async (title, startTime) => {

      const { userData, jwtToken } = await getUserDataAndToken();

      if (title)
      {
          const response = await fetch(buildPath('/api/addEvent'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ _id: userData.id, title, startTime, endTime: '', jwtToken })
          });

          const data = await response.json();

          if (data.error === '')
          { 
            console.log('add successful');
            const dateString = timeToString(startTime)

            const updatedEvents = {...items}; // create a copy of the original object
            if (!updatedEvents[dateString])
              updatedEvents[dateString] = []
            updatedEvents[dateString].push(
              {
                _id: userData.id,
                title,
                startTime: startTime.toISOString(),
                endTime: startTime.toISOString(),
              }
            )
            setItems(updatedEvents)
            setCreateEventModal(false);
          }
          else
          {
            console.log('failed');
            console.log(eventTitle)
            console.log(eventStartTime)
          }
      }
      else
      console.warn("fill all fields")
  }
    
    const transformArrayToItems = (arr) => {
      const itemsObject = {}
      
      if (!arr)
      {
        return itemsObject
      }
      
      arr.forEach((item) => {
        const dateString = timeToString(item.startTime)
        
        if (!itemsObject[dateString])
        {
          itemsObject[dateString] = []
        }
        
        itemsObject[dateString].push(item)
      })
       

      return itemsObject
    }

    const loadItems = async (day) => {
      // setTimeout(() => {
        const pastDays = 15
        const futureDays = 85

        const startTime = new Date()
        startTime.setDate(startTime.getDate() - pastDays)
        
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + futureDays)
        
        console.log(startTime)
        console.log(endDate)

        const newItems = await getItemsFromServer(startTime, endDate);
        const transformedItems = transformArrayToItems(newItems);

        for (let i = -pastDays; i < futureDays; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            
            if (!transformedItems[strTime]) {
              transformedItems[strTime] = [];
            }
        }

        setItems(transformedItems);
          // console.log('items')
          // console.log(items[timeToString(new Date())])
      // }, 1000);
  }
  const getTime = (dateString) => {
    // extract the hours and minutes from the string
    let time = '';
    let hours = parseInt(dateString.substring(11, 13));
    if (hours < 10) {
    time += '0'; // add leading zero if necessary
    }
    time += hours + ':';

    let minutes = parseInt(dateString.substring(14, 16));
    if (minutes < 10) {
    time += '0'; // add leading zero if necessary
    }
    time += minutes;
    return time
  }
      const renderItem = (item) => {
        const time = getTime(item.startTime)
        console.log(item.title)
          return(
              <EventItem title={item.title} id={item.id} isHoliday={item.isHoliday} startTime={time} onPress={() => {

                openEditModal(item)
              }}/>
          )
      }
      const getItemsFromServer = async (startTime, endDate) => {
        const { userData, jwtToken } = await getUserDataAndToken();

        try {
          const response = await fetch(buildPath('/api/searchMonthlyEvent'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: userData.id, searchTitle: '', firstOfMonth: startTime, lastOfMonth: endDate, jwtToken})
          });
          const data = await response.json();
          console.log(data.results)
          return data.results;
        } catch(e) {
          return []
        }
      }
      
      const [fontsLoaded] = useFonts({
        SoapRegular,
      });
    
      if (!fontsLoaded) {
        return null;
      }
    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#fff', marginBottom: 50}}>
          <View style={{flexDirection:"row", justifyContent:'space-between', alignItems: "center", marginRight: 25}}>
                <Text style={styles.header}>Home</Text>
                <View>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate('Register', {name: 'Register'})
                    }}>
                      <View style={{flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="logout" size={35} color="red"/>
                        <Text style={{color: 'red'}}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Agenda
                theme={{
                    backgroundColor: '#fff',
                    calendarBackground: '#fff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#ff9900',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#ff9900',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#b6c1cd',
                    dotColor: '#ff9900',
                }}
                items={console.log(items) || items}
                loadItemsForMonth={loadItems}
                selected={timeToString(date)}

                refreshControl={null}
                showClosingKnob={true}
                refreshing={false}
                renderItem={renderItem}
                
            />

            {/* <ActionButtons onPressEvent={toggleCreateEventModal} onPressHoliday={toggleCreateHolidayModal}/> */}
            <CircleButton icon="plus" onPress={toggleCreateEventModal}/>
            <Modal animationType="none" transparent={false} visible={createEventModal}>
                <CreateEventScreen onPressAdd={addEvent} onPressCancel={() => {setCreateEventModal(false)}}/>
            </Modal>

            <Modal animationType="slide" transparent={false} visible={editEventModal}>
            <SafeAreaView style={styles.root}>

            <Text style={styles.title}>Edit Event</Text>

            <View style={{width: '100%', marginTop: 20}}>
                <TextInput 
                    style={styles.input} 
                    mode="outlined" 
                    label="Event" 
                    value={editTitle} 
                    onChangeText={editTitle => setEditTitle(editTitle)}
                    autoCapitalize="none"
                    />
            <View style={{width: '100%', marginTop: 30}}>
                <View style={styles.dateContainer}>
                    <Text style={styles.text}>Start</Text>
                    <DTPicker value={editStartTime} onChange={changeStartTime}/>
                </View>
            </View>
                </View>

            <View style={{width: '100%', marginBottom: 50}}>
                <CustomButton text="Apply Changes" onPress={() => {
                  editEvent()
                }}/>
                <CustomButton text="Delete Event" type="DELETE" onPress={() => {
                    deleteEvent()
                }}/>
                <CustomButton text="Cancel" onPress={() =>{
                  setEditEventModal(false)
                }} type="TERTIARY"/>
            </View>
        </SafeAreaView>
        {/* <EditEventScreen title={editTitle} startTime={editstartTime} endDate={editEndDate} onPressCancel={()=> {
          setEditEventModal(false)}
          } onPressEdit={editEvent}/> */}
            </Modal>

        </SafeAreaView>
    );
}   

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 10,
        marginVertical: 50,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        height: '100%'

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        marginTop: 50,
        color: '#343434',
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

    },
    input: {
      marginVertical: 5, 
      backgroundColor: '#fff'
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    margin: 15,
    color: '#343434',
    fontFamily: 'SoapRegular'

},
})

export default ScheduleScreen;