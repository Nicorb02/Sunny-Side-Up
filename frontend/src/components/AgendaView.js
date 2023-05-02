import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/AgendaView.css";
import LeftArrow from '../styles/assets/LeftArrow';
import RightArrow from '../styles/assets/RightArrow';


const AgendaView = ({ reloadEvents }) => 
{ 
  // import buildPath and local storage functions
  let bp = require('./Path.js');
  var storage = require('../tokenStorage.js');
  
  const [date, setDate] = useState(new Date());
  // retrieve user data and current jswt from local storage
  const userData = JSON.parse(localStorage.getItem('user_data'));
  const _id = userData.id;
  const jwtToken = storage.retrieveToken();
    
  const navigate = useNavigate();
    
  function getWeekendDates(date) {
    const currentDay = date.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const sundayDate = new Date(date.getTime() - (currentDay * 24 * 60 * 60 * 1000));
    const saturdayDate = new Date(sundayDate.getTime() + (6 * 24 * 60 * 60 * 1000));
    return { firstDay: sundayDate, lastDay: saturdayDate };
  }
    
  const {firstDay, lastDay}  = getWeekendDates(date);
  //console.log("first day: " + firstDay.toISOString())
  //console.log("last day: " + lastDay.toISOString())
  const options = {
    month: 'long', // display month in short format (e.g. Jan, Feb)
    day: 'numeric' // display day as a number
  };
  const formattedFirstDay = firstDay.toLocaleDateString('en-US', options); 
  const formattedLastDay = lastDay.toLocaleDateString('en-US', options); 

  function goNextWeek () {
    const nextWeekDate = new Date(date);
    nextWeekDate.setDate(date.getDate() + 7);
    setDate(nextWeekDate);
  }

  function goLastWeek () {
    const lastWeekDate = new Date(date);
    lastWeekDate.setDate(date.getDate() - 7);
    setDate(lastWeekDate);
  }

  
  const [weekdays, setWeekdays] = useState([]);
    
  useEffect(() => {
      async function handleWeekEvents() {
          //monthly
          const response = await fetch(bp.buildPath('/api/searchMonthlyEvent'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id, searchTitle: '', firstOfMonth: firstDay, lastOfMonth: lastDay, jwtToken }),
          });

          const data = await response.json();
          console.log(data.results)
          const weekdaysTemp = [      
            { weekday: 'Sunday', events: [] },
            { weekday: 'Monday', events: [] },
            { weekday: 'Tuesday', events: [] },
            { weekday: 'Wednesday', events: [] },
            { weekday: 'Thursday', events: [] },
            { weekday: 'Friday', events: [] },
            { weekday: 'Saturday', events: [] },
          ];

          // Sort events into weekdays based on day of the week
          data.results.forEach((event) => {
            // Convert to EST timezone
            const tempDate = new Date(event.startTime).toLocaleDateString();
            const eventDate = new Date(tempDate);
            const eventTime = new Date(event.startTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            
            // Add event to the corresponding weekday
            const dayOfWeek = eventDate.getDay();
            weekdaysTemp[dayOfWeek].events.push({
              title: event.title,
              time: eventTime
            });
          });
          weekdaysTemp.forEach((weekday) => {
            weekday.events.sort((a, b) => {
              const timeA = new Date(`1970/01/01 ${a.time}`);
              const timeB = new Date(`1970/01/01 ${b.time}`);
              return timeA - timeB;
            });
          });
          setWeekdays(weekdaysTemp.filter((weekday) => weekday.events.length > 0));
      }
      handleWeekEvents()
    }, [date, reloadEvents])

    console.log(weekdays);

      return (
        <div className='maincontainer'>
            <div className='weekly-header'>
              <div className='prev-week-button' onClick={goLastWeek}>
                  <LeftArrow  />
              </div>
              <div className='current-week-dates'>
                  <p>{formattedFirstDay} - {formattedLastDay}</p>
              </div>
              <div className='next-week-button' onClick={goNextWeek}>
                  <RightArrow />
              </div>
            </div>
            <div className='weekly-container'>
              <div className='weekdays-list'>
                  {weekdays.map((weekday) => (
                    (weekday.events.length > 0) && (
                    <li className='listed-day'>
                      <p className='listed-day-weekday'>{weekday.weekday}</p>
                      <div className='listed-day-events'>
                      {weekday.events.map((event) => (
                        <div className='listed-event'>
                          <p className='listed-event-time'>{event.time}</p>
                          <p className='listed-event-title'>{event.title}</p>
                        </div>
                      ))}
                      </div>
                    </li>
                    )
                  ))}
              </div>
            </div>
        </div>
    )
}

export default AgendaView;