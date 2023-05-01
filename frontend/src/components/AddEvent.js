import React, { useState } from 'react';
import TimePicker from 'react-time-picker'
import CloseEvent from '../styles/assets/CloseEvent';
import '../styles/AddEvent.css'
import '../styles/TimePick.css'

const AddEvent = ({ setDisplayAddEvent, date, toggleReloadEvents, reloadEvents }) => {
    // import buildPath and local storage functions
    let bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    // retrieve user data and current jswt from local storage
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const _id = userData.id;
    const jwtToken = storage.retrieveToken();
    
    async function handleAddEvent () {
        const response = await fetch(bp.buildPath('/api/addEvent'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ _id, title, startTime, endTime: '', jwtToken })
        });
        const data = await response.json();

        if (data.error === '')
        {
            console.log("it worked");
            toggleDisplayAddEvent();
            toggleReload();
            setTitle('');
            setTime('12:00');
            // store refreshed jswt
            // storage.storeToken(data);
        }
        else
        {
            console.log("it didnt work");
        }
    }

    function toggleReload () {
        if(reloadEvents) toggleReloadEvents(false)
        else toggleReloadEvents(true);
    }

    // default display time
    const [time, setTime] = useState('12:00');

    // event title variable
    const [title, setTitle] = useState('');

    // format the time and date to input
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const formattedDateTime = `${formattedDate}T${time}`;
    const startTime = formattedDateTime;

    function toggleDisplayAddEvent () {
        setDisplayAddEvent(false);
    }

    return (
        <div className='container'>
            <div className='close-event' onClick={toggleDisplayAddEvent}>
                <CloseEvent />
            </div>
            <div className='event-name-container'>
                <input type='text' className='name-input' placeholder='Event Name' value={title} onChange={e => setTitle(e.target.value)}></input>
            </div>
            <div className='time-pick-container'>
                <TimePicker 
                onChange={setTime} 
                value={time} 
                disableClock='true'
                format='h:mm a'
                />
            </div>
            <div className='add-event-button-container'> 
                <button type='button' className='add-button' onClick={handleAddEvent}>Add</button>
            </div>
        </div>
    );
};

export default AddEvent;