import React, {useState} from 'react';
import Calendar from 'react-calendar';
import '../styles/PlannerPage.css';
import '../styles/Calendar.css';

// import{
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// }from "react-router-dom" 

const CalendarCom = ({ date, setDate }) =>
{
    return(
        <div className="calendar-container">
            <Calendar 
            onChange={setDate} 
            value={date} 
            minDetail='year'
            calendarType='US'
            />
        </div>
    );
};
export default CalendarCom;