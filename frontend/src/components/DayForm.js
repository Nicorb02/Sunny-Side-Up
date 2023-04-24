import React, { useState, useEffect } from 'react';
import '../styles/DayForm.css'
import LeftArrow from '../styles/assets/LeftArrow';
import RightArrow from '../styles/assets/RightArrow';
import Trash from '../styles/assets/Trash'
import NotesIcon from '../styles/assets/NotesIcon';
import ContactsIcon from '../styles/assets/ContactsIcon';
import ListIcon from '../styles/assets/ListIcon';
import AddIcon from '../styles/assets/AddIcon';

const DayForm = ({ date, setDate, setDisplayAddEvent, reloadEvents }) =>
{
    // import buildPath and local storage functions
    let bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    // retrieve user data and current jswt from local storage
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const _id = userData.id;
    const jwtToken = storage.retrieveToken();

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
          const sortedEvents = data.results
            .map((event) => ({
              id: event._id,
              title: event.title,
              startTime: new Date(event.startTime).toISOString()
            }))
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
            .map((event) => ({
                ...event,
                startTime: new Date(event.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
              }));
          setEvents(sortedEvents);
        }
        
        handleReadEvents();
      }, [date, reloadEvents]);

      
    const [weekday, setWeekday] = useState("");
    const [day, setDay] = useState("");


    function toggleDisplayAddEvent () {
        setDisplayAddEvent(true);
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

    // read events api and make list based on { date }

    // delete events api when click trash

    return (
        <div className='form'>
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
                          <li className='event-item' key={event.id}>
                            <div className='trash-icon'> <Trash /> </div>
                            <p className='event-title'>{event.title}</p>
                            <p className='event-time'>{event.startTime}</p>
                          </li>
                        ))}
                    </div>
                    <div className='add-event-button' onClick={toggleDisplayAddEvent}> <AddIcon /> </div>
                </div>
            </div>
            <div className='buttons-container'>
                <div className='notes-button-container'>
                    <div className='notes-button'> <NotesIcon /> </div>
                </div>
                <div className='contacts-button-container'>
                    <div className='contacts-button'><ContactsIcon /> </div>
                </div>
                <div className='list-button-container'>
                    <div className='list-button'><ListIcon /> </div>
                </div>
            </div>
        </div>
    );
};

export default DayForm;