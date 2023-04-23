import React, { useState, useEffect } from 'react';
import '../styles/DayForm.css'
import LeftArrow from '../styles/assets/LeftArrow';
import RightArrow from '../styles/assets/RightArrow';
import Trash from '../styles/assets/Trash'
import NotesIcon from '../styles/assets/NotesIcon';
import ContactsIcon from '../styles/assets/ContactsIcon';
import ListIcon from '../styles/assets/ListIcon';
import AddIcon from '../styles/assets/AddIcon';

const DayForm = ({ date, setDate, setDisplayAddEvent}) =>
{
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

    // create event api, take name, time, use { date } (the current day)

    // read events api and make list based on { date }

    // delete events api when click trash

    const events = [
        { id: 1, text1: 'Something', text2: '9:30 PM' },
        { id: 2, text1: 'Something Else', text2: '5:00 AM' },
        { id: 3, text1: 'test', text2: '10:30 PM' },
        { id: 4, text1: 'COP4331', text2: '6:00 PM' },
        { id: 5, text1: 'Presentation', text2: '5:30 PM' },
      ];

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
                            <p className='event-title'>{event.text1}</p>
                            <p className='event-time'>{event.text2}</p>
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