import React, { useState } from 'react';
import TimePicker from 'react-time-picker'
import '../styles/AddEvent.css'
import '../styles/TimePick.css'


const TestingPage = () => {
    const [time, onChange] = useState('12:00');

    return (
        <div className='container'>
            <div className='event-name-container'>
                <input type='text' className='name-input' placeholder='Event Name'></input>
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
                <button type='button' className='add-button'>Add</button>
            </div>
        </div>
    );
};

export default TestingPage;