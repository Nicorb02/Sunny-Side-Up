import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import '../styles/DayForm.css'
import LeftArrow from '../styles/assets/LeftArrow';
import RightArrow from '../styles/assets/RightArrow';
import Trash from '../styles/assets/Trash'
import NotesIcon from '../styles/assets/NotesIcon';
import ContactsIcon from '../styles/assets/ContactsIcon';
import ListIcon from '../styles/assets/ListIcon';
import AddIcon from '../styles/assets/AddIcon';
import LogoutButton from '../styles/assets/LogoutButton';
import ToDoIcon from '../styles/assets/ToDoIcon';

const DayForm = ({ date, setDate, setDisplayAddEvent, toggleReloadEvents, reloadEvents, setDisplayToDo, setDisplayNotes }) =>
{
    // import buildPath and local storage functions
    let bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    // retrieve user data and current jswt from local storage
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const _id = userData.id;
    const jwtToken = storage.retrieveToken();

    const navigate = useNavigate();

    // logout 
    function doLogout () {
        // go to login page then expire jswt
        navigate("/");
    }

    // reads all the events corresponding to a date
    // automatically calls when date changes
    const [events, setEvents] = useState([]);
    useEffect(() => {
        async function handleReadEvents() {
          const response = await fetch(bp.buildPath('/api/searchDailyEvent'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id, searchTitle: '', date, jwtToken }),
          });
    
          const data = await response.json();
    
          // sorts the events into a readable format for mapping later in the jsx
          let idCounter = 1;
          const sortedEvents = data.results
            .map((event) => ({
              title: event.title,
              event_id: event._id,
              startTime: new Date(event.startTime).toISOString(),
              isHoliday: event.isHoliday
            }))
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
            .map((event) => ({
                ...event,
                id: idCounter++,
                startTime: new Date(event.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
              }));
          setEvents(sortedEvents);
        }
        
        handleReadEvents();
      }, [date, reloadEvents]);

    const [weekday, setWeekday] = useState("");
    const [day, setDay] = useState("");

    // functions to display following components
    function toggleDisplayAddEvent () {
        setDisplayAddEvent(true);
    }

    function toggleDisplayToDo () {
        setDisplayToDo(true);
    }

    function toggleDisplayNotes () {
        setDisplayNotes(true);
    }
  
    useEffect(() => {
      setWeekday(date.toLocaleString("en-US", { weekday: "long" }));
      setDay(date.toLocaleString("en-US", { day: "numeric" }));
    }, [date]);

    const handleNextDate = () => {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1); // add one day to current date
        setDate(nextDate);
    };

    const handlePrevDate = () => {
        const prevDate = new Date(date);
        prevDate.setDate(date.getDate() - 1); // minus one day to current date
        setDate(prevDate);
    };

    function toggleReload () {
        if(reloadEvents) toggleReloadEvents(false)
        else toggleReloadEvents(true);
    }

    async function handleDelEvent () {
        const response = await fetch(bp.buildPath('/api/delEvent'), {
            method :'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ _id, itemId: eventObjectId, jwtToken })
        });

        const data = await response.json();
        if (data.error === '')
        {
            console.log("good delete");
            console.log(eventObjectId);
            setEventObjectId('');
            setSelectedEventId(null);
            toggleReload();

        }
        else
        {
            console.log(data.error);
            console.log("bad delete");
        }
    }
   

    const [selectedEventId, setSelectedEventId] = useState(null);
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventObjectId, setEventObjectId] = useState('');

    const handleItemClick = (event) => {
        setSelectedEventId(event.id);
        setTitle(event.title);
        setEventTime(event.startTime);
        setEventObjectId(event.event_id)
    };


    return (
        <div className='form'>
            <div className='logout-button' onClick={doLogout}> <LogoutButton /> </div>
            <div className='listview-button'> <ListIcon /> </div>
            <div className='content-container'>
                <div className='day-container'>
                    <div className='prev-day-container'>
                        <div className='prev-day-button' onClick={handlePrevDate}> <LeftArrow /> </div>
                    </div>
                    <div className='date-container'>
                        <span className='weekday-span'>{weekday}</span>
                        <span className='date-day-span'>{day}</span>
                    </div>
                    <div className='next-day-container'>
                        <div className='next-day-button' onClick={handleNextDate}> <RightArrow /> </div>
                    </div>
                </div>
                <div className='events-container'>
                    <div className='events-list'>
                        {events.map((event) => (
                          <li className={event.isHoliday ? 'event-item holiday' : 'event-item' }key={event.id}>
                            <div className={selectedEventId === event.id ? 'trash-icon' : 'trash-icon-hidden'} onClick={() => {handleDelEvent(event)}}> <Trash /> </div>
                            <p className='event-title' onClick={() => handleItemClick(event)}>{event.title}</p>
                            {event.isHoliday ? <p className='event-time'>Holiday</p> : <p className='event-time'>{event.startTime}</p>}
                          </li>
                        ))}
                    </div>
                    <div className='add-event-button' onClick={toggleDisplayAddEvent}> <AddIcon /> </div>
                </div>
            </div>
            <div className='buttons-container'>
                <div className='notes-button-container'>
                    <div className='notes-button' onClick={toggleDisplayNotes}> <NotesIcon /> </div>
                </div>
                <div className='contacts-button-container'>
                    <div className='contacts-button'><ContactsIcon /> </div>
                </div>
                <div className='list-button-container'>
                    <div className='list-button' onClick={toggleDisplayToDo}><ToDoIcon /> </div>
                </div>
            </div>
        </div>
    );
};

export default DayForm;