import React, { useState } from 'react';
import TimePicker from 'react-time-picker'
import CloseEvent from '../styles/assets/CloseEvent';
import '../styles/AddEvent.css'
import '../styles/TimePick.css'

// connect to the api to actually add an event with user id
// make variable for event name and time, use default date, pass it in from dayform
// update other api's to pass on user id (login)


const AddEvent = ({ setDisplayAddEvent, date }) => {
    let bp = require('./Path.js');

    async function handleAddEvent () {
        const response = await fetch(bp.buildPath('api/addEvent'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ eventName, formattedDateTime})
        });
        const data = await response.json();

        if (data.error === '')
        {

        }
        else
        {
            
        }
    }

    // default display time
    const [time, onChange] = useState('12:00');

    // event title variable
    const [eventName, setEventName] = useState('');

    // format the time and date to input
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const formattedDateTime = `${formattedDate}T${time}`;


    function toggleDisplayAddEvent () {
        setDisplayAddEvent(false);
    }

    return (
        <div className='container'>
            <div className='close-event' onClick={toggleDisplayAddEvent}>
                <CloseEvent />
            </div>
            <div className='event-name-container'>
                <input type='text' className='name-input' placeholder='Event Name' value={eventName} onChange={e => setEventName(e.target.value)}></input>
            </div>
            <div className='time-pick-container'>
                <TimePicker 
                onChange={onChange} 
                value={time} 
                disableClock='true'
                format='h:mm a'
                />
            </div>
            <div className='add-event-button-container'> 
                <button type='button' className='add-button'>Add</button>{formattedDateTime.toLocaleString()}
            </div>
        </div>
    );
};

export default AddEvent;