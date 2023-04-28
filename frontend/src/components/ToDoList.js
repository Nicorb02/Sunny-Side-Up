import React, { useState } from 'react';
import '../styles/ToDo.css'
import CloseEvent from '../styles/assets/CloseEvent';
import Trash from '../styles/assets/Trash'


const ToDoList = ({ setDisplayToDo }) => {
    // import buildPath and local storage functions
    let bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    // retrieve user data and current jswt from local storage
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const _id = userData.id;
    const jwtToken = storage.retrieveToken();

    async function handleAddToDO () {
        const response = await fetch(bp.buildPath('/api/addToDo'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ _id, jwtToken })
        });
        const data = await response.json();
    }

    // make component for adding a task (input name)
    // connect to add todo api (make a variable to toggle for useEffect dependency on readToDos)
    
    // make delete functionality and connect to api  (make a variable to toggle for useEffect dependency on readToDos)
    
    // make useStates for getting title to delete and etc..

    let list = [
        {title: 'Numero one', complete: '0' },
        {title: 'Two', complete: '0' },
        {title: 'Tres/three', complete: '1' },
        {title: 'Quatro', complete: '1' },
        {title: 'Cinco five', complete: '0' },
        {title: '6 six', complete: '0' },
        {title: 'Numero one', complete: '0' },
        {title: 'Two', complete: '0' },
        {title: 'Tres/three', complete: '1' },
        {title: 'Quatro', complete: '1' },
        {title: 'Cinco five', complete: '0' },
        {title: '6 six', complete: '0' }
    ]
    
    function toggleDisplayToDo () {
        setDisplayToDo(false);
    }

    return (
            <div className='tasks-container'>
                <div className='close-task' onClick={toggleDisplayToDo}>
                    <CloseEvent />
                </div>
                <div className='tasks-list'>
                    {list.map((task) => (
                        <li className='task-item'>
                            <div className={task.complete == 1 ? 'task-complete' : 'task-incomplete'} ></div>
                            <p className={task.complete == 1 ? 'task-title-complete' : 'task-title'}>{task.title}</p>
                            <div className='delete-button'> <Trash /> </div>
                        </li>
                    ))}
                </div>
                <button type='button' className='add-task-button'>Add Task</button>
            </div>
    );
};

export default ToDoList;