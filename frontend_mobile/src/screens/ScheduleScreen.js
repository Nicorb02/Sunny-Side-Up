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
const ScheduleScreen = () => {
    const [selected, setSelected] = useState('');
  
    const [refresh, setRefresh] = useState(false)
    const [items, setItems] = useState({})
    const [savedItems, setSavedItems] = useState({
      '2023-04-23': [
          {title: 'test 1', description: 'description 1'},
          {title: 'test 2', description: 'description 2'},
          {title: 'test 3', description: 'description 3'},
          {title: 'test 1', description: 'description 1'},
          {title: 'test 2', description: 'description 2'},
          {title: 'test 3', description: 'description 3'},
          {title: 'test 1', description: 'description 1'},
          {title: 'test 2', description: 'description 2'},
          {title: 'test 3', description: 'description 3'},
          {title: 'test 1', description: 'description 1'},
          {title: 'test 2', description: 'description 2'},
          {title: 'test 3', description: 'description 3'},
      ],
      '2023-04-24': [{title: 'test 4', description: 'description 4'}] 
  })


    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    
    const [eventStartDate, setEventStartDate] = useState(new Date())
    const [eventEndDate, setEventEndDate] = useState(new Date())
    const [eventTitle, setEventTitle] = useState('')
    const [eventDescription, setEventDescription] = useState('')

    const toggleCreateHolidayModal = () => {
        return
    }
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
      setTimeout(() => {
          for (let i = -15; i < 85; i++) {
              const time = day.timestamp + i * 24 * 60 * 60 * 1000;
              const strTime = timeToString(time);

              if (!items[strTime]) {
                  items[strTime] = [];
              }
          }
          const newItems = {};
          Object.keys(items).forEach(key => {
              newItems[key] = items[key];
          });
          Object.keys(savedItems).forEach(key => {
              newItems[key] = savedItems[key];
          });

          setItems(newItems);
      }, 1000);
  }

      const renderItem = (item) => {
          return(
              <EventItem title={item.title} description={item.description} />
          )
      }

      const markMonth = (selectedMonth) => {
         // Create a new date object for the selected month
        const date = new Date(selectedMonth);

        // Get the number of days in the selected month
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        // Loop through each day of the month and add it to the array
        for (let i = 1; i <= daysInMonth; i++) {
          // Format the date as "year-month-day"
          const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

          items[dateString] = []

        }
      }
      
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
                items={items}
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