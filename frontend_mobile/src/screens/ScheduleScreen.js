import React,{useEffect, useState} from "react";
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
import EventItem from "../components/EventItem";
import Day from "react-native-calendars/src/calendar/day";
import { TextInput } from "react-native-paper";
const ScheduleScreen = () => {
    const [selected, setSelected] = useState('');
  
    const [refresh, setRefresh] = useState(false)
    const [items, setItems] = useState({})

    
    const [firstTimeInvoke, setFirstTimeInvoke] = useState(true)

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    
    const [eventStartDate, setEventStartDate] = useState(new Date())
    const [eventEndDate, setEventEndDate] = useState(new Date())
    const [eventTitle, setEventTitle] = useState('')


    const [editStartDate, setEditStartDate] = useState(new Date())
    const [editEndDate, setEditEndDate] = useState(new Date())
    const [editTitle, setEditTitle] = useState('')

    const [editItem, setEditItem] = useState({id: null})

    const [createEventModal, setCreateEventModal] = useState(false)
    const [editEventModal, setEditEventModal] = useState(false)
    
    const openEditModal = (item) => {
      setEditItem(item)
      setEditTitle(item.title)

      setEditStartDate(item.startDate);
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

    const editEvent = () => {
      const updatedEvents = {...items}; 
      const eventToEdit = updatedEvents[timeToString(editItem.startDate)].find(event => event.id === editItem.id); 
      if (eventToEdit.startDate == editStartDate) { 
        eventToEdit.title = editTitle; 
        eventToEdit.startDate = editStartDate; 
        eventToEdit.endDate = editEndDate; 
      }
      
      setItems(updatedEvents); 
      setEditEventModal(false);
  } 

  const deleteEvent = () => {
    const dateString = timeToString(editItem.startDate)

    const updatedEvents = {...items}; // create a copy of the original object
    updatedEvents[dateString] = updatedEvents[dateString].filter((event) => event.id !== editItem.id)
    setItems(updatedEvents); // set the updated object to the state

    setEditEventModal(false)
  }

  const addEvent = (t, s, e) => {
      const sString = timeToString(s)
      if (t)
      {
          if (!items[sString])
              items[sString] = []

          items[sString].push({
              title: t,
              startDate: s,
              endDate: e
          })

          setCreateEventModal(false)
          console.log(items)
      }
      else
      console.warn("fill all fields")
  }
    
    const transformArrayToItems = (arr) => {
      const itemsObject = {}
        arr.forEach((item) => {
          const dateString = timeToString(item.startDate)
          
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
        
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - pastDays)
        
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + futureDays)
        
        const newItems = await getItemsFromServer(startDate, endDate);
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

      const renderItem = (item) => {
        
        console.log(item.title)
          return(
              <EventItem title={item.title} id={item.id} onPress={() => {

                openEditModal(item)
              }}/>
          )
      }
      
      
      const getItemsFromServer = async (startDate, endDate) => {
        try {
          const data = [  
            {id: 1, name: 1, title: 'test 1', startDate: new Date(), endDate: new Date()},
            {id: 3, name: 3, title: 'test 3', startDate: new Date(), endDate: new Date()},
            {id: 4, name: 4, title: 'test 4', startDate: new Date(), endDate: new Date()},
            {id: 5, name: 5, title: 'test 5', startDate: new Date(), endDate: new Date()},
            {id: 6, name: 6, title: 'test 6', startDate: new Date(), endDate: new Date()},
            {id: 7, name: 7, title: 'test 7', startDate: new Date(), endDate: new Date()},
            {id: 8, name: 8, title: 'test 8', startDate: new Date(), endDate: new Date()},
            {id: 9, name: 9, title: 'test 9', startDate: new Date(), endDate: new Date()},
            {id: 10, name: 10, title: 'test 10', startDate: new Date(), endDate: new Date()},
            {id: 11, name: 11, title: 'test 11', startDate: new Date(), endDate: new Date()},
            {id: 12, name: 12, title: 'test 12', startDate: new Date(), endDate: new Date()},
            {id: 13, name: 13, title: 'test 13', startDate: new Date(), endDate: new Date()}
        ]
        return data
        } catch(e) {
          return []
        }
      }
     
      // useEffect(() => {
      //   if (editComplete === true)
      //   {
          
      //     setEditComplete(false)
      //   }
      // }, [editComplete])
      useEffect(() => {
        console.log('items')
        console.log(items[timeToString(new Date())])
      }, [items[timeToString(new Date())]])

      useEffect(() => {
        console.log(editItem)
      }, [editItem])
    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#ffffff', marginBottom: 50}}>
            <Agenda
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
            <View style={styles.root}>
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
                </View>
            <View style={{width: '100%', marginTop: 30}}>
                <View style={styles.dateContainer}>
                    <Text style={styles.text}>Start</Text>
                    <DTPicker value={editStartDate} onChange={changeStartDate}/>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.text}>End</Text>
                    <DTPicker value={editEndDate} onChange={changeEndDate}/>
                </View>
            </View>
            <View style={{width: '100%', marginVertical: 100}}>
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
        </View>
        {/* <EditEventScreen title={editTitle} startDate={editStartDate} endDate={editEndDate} onPressCancel={()=> {
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

    },
    input: {
      marginVertical: 5, 
      backgroundColor: '#fff'
  }
})

export default ScheduleScreen;