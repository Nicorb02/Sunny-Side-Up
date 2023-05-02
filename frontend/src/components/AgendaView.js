import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/AgendaView.css";
import Trash from '../styles/assets/Trash'


//Fullcalendar and Realted Plugins
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list'; //For List View


const AgendaView = ({ date, reloadEvents}) => 
{ 
    // import buildPath and local storage functions
    let bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    // retrieve user data and current jswt from local storage
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const _id = userData.id;
    const jwtToken = storage.retrieveToken();

    var first = date.getDate() - date.getDay();
    var last = first + 6;

    var firstDay = new Date(date.setDate(first));
    var lastDay = new Date(date.setDate(last));

    const navigate = useNavigate();
    

  const [events, setEvents] = useState([]);
  useEffect(() => {
      async function handleWeekEvents() {
          //monthly
          const response = await fetch(bp.buildPath('/api/searchMonthlyEvent'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id, searchTitle: '', firstDay, lastDay, jwtToken }),
          });

          const data = await response.json();
    
          console.log(data);
          console.log(firstDay.toUTCString());
          console.log(lastDay.toUTCString());

          // sorts the events into a readable format for mapping later in the jsx
          let idCounter = 1;
          const sortedEvents = data.results
            .map((event) => ({
              id: event._id,
              title: event.title,
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
      handleWeekEvents()
    }, [date, reloadEvents])


    async function getWeekEvents() {
      const response = await fetch(bp.buildPath('/api/searchMonthlyEvent'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, searchTitle: '', firstDay, lastDay, jwtToken }),
      });

      const data = await response.json();

    }
      return (
        <div className="maincontainer">
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
          initialView="listWeek"
          headerToolbar={{
            left: '',
            center: 'title',
            right: 'today,prev,next'
          }}
          
        />

    </div>
    
    )
  }
export default AgendaView;

