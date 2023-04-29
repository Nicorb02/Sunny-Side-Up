import React, { useState } from 'react';
import '../styles/AddToDo.css'
import CloseEvent from '../styles/assets/CloseEvent';

const AddTodo = ({ setReloadTasks, reloadTasks, setDisplayAddTodo }) => {
    // import buildPath and local storage functions
    let bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    // retrieve user data and current jswt from local storage
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const _id = userData.id;
    const jwtToken = storage.retrieveToken();

    // add new task and then close and reload tasks
    async function handleAddTodo () {
        const response = await fetch(bp.buildPath('/api/addToDo'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ _id, title, jwtToken })
        });
        const data = await response.json();

        if (data.error === '')
        {
            console.log("good task add")
        }
        else 
        {
            console.log("bad task add")
        }
        
        //  clear title, reload and close tasks after adding
        setTitle('');
        toggleReloadTasks();
        toggleDisplayAddTodo();
    }

    // toggle reload of tasks 
    function toggleReloadTasks () {
        if (reloadTasks) setReloadTasks(false);
        else setReloadTasks(true);
    }

    // toggle display of this component
    function toggleDisplayAddTodo () {
        setDisplayAddTodo(false);
    }

    const [title, setTitle] = useState('');

    return (
            <div className='add-task-container'>
                <div className='close-add-task' onClick={toggleDisplayAddTodo}> <CloseEvent /> </div>
                <div className='task-name-container'>
                    <input type='text' className='task-name-input' placeholder='Task Name' value={title} onChange={e => setTitle(e.target.value)}></input>
                </div>
                <div className='add-task-button-container'> 
                    <button type='button' className='add-newtask-button' onClick={handleAddTodo}>Add</button>
                </div>
            </div>
    );
};

export default AddTodo;