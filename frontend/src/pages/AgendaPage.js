import React, { useState } from 'react'
import CalendarCom from '../components/CalendarCom'
import DayForm from '../components/DayForm'
import '../styles/AgendaPage.css';
import AddEvent from '../components/AddEvent';
import ToDoList from '../components/ToDoList';
import Notes from '../components/Notes';

import AgendaView from '../components/AgendaView'

const AgendaPage = () => {

    const [displayAddEvent, setDisplayAddEvent] = useState(false);
    const [displayToDo, setDisplayToDo] = useState(false);
    const [date, setDate] = useState(new Date());
    const [reloadEvents, toggleReloadEvents] = useState(false);
    const [displayNotes, setDisplayNotes] = useState(false);

    return (
        <div className='page'>
            <DayForm 
                 date={date} setDate={setDate} 
                 setDisplayAddEvent={setDisplayAddEvent}
                 toggleReloadEvents={toggleReloadEvents} 
                 reloadEvents={reloadEvents}
                 setDisplayToDo={setDisplayToDo}
                 setDisplayNotes={setDisplayNotes}
            />
            <AgendaView 
                date = {date} 
                reloadEvents={reloadEvents}
            />

            <div className={`add-event-container ${displayAddEvent ? '' : 'hidden'}`}> 
                <AddEvent 
                    setDisplayAddEvent={setDisplayAddEvent}
                    date={date}
                    toggleReloadEvents={toggleReloadEvents}
                    reloadEvents={reloadEvents}
                />
            </div>
            <div className={`todo-container ${displayToDo ? '' : 'hidden'}`}>
                <ToDoList 
                    setDisplayToDo={setDisplayToDo}
                />
            </div>
            <div className={`notes-planner-container ${displayNotes ? '' : 'hidden'}`}>
                <Notes
                    setDisplayNotes={setDisplayNotes}
                />
            </div>
        </div>
        
    )
}

export default AgendaPage;