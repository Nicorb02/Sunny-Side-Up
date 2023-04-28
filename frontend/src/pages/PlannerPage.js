import React, { useState } from 'react'
import CalendarCom from '../components/CalendarCom'
import '../styles/PlannerPage.css'
import DayForm from '../components/DayForm'
import AddEvent from '../components/AddEvent';
import ToDoList from '../components/ToDoList';

const PlannerPage = () => {
    const [displayAddEvent, setDisplayAddEvent] = useState(false);
    const [displayToDo, setDisplayToDo] = useState(false);
    const [date, setDate] = useState(new Date());
    const [reloadEvents, toggleReloadEvents] = useState(false);

    return (
        <div className='page'>
            <DayForm 
                date={date} setDate={setDate} 
                setDisplayAddEvent={setDisplayAddEvent}
                toggleReloadEvents={toggleReloadEvents} 
                reloadEvents={reloadEvents}
                setDisplayToDo={setDisplayToDo}
            />
            <CalendarCom 
                date={date} 
                setDate={setDate}
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
        </div>
    )
}

export default PlannerPage;