import React, { useState } from 'react';
import '../styles/AddToDo.css'
import CloseEvent from '../styles/assets/CloseEvent';

const TestingPage = () => {
    // // import buildPath and local storage functions
    // let bp = require('./Path.js');
    // var storage = require('../tokenStorage.js');

    // // retrieve user data and current jswt from local storage
    // const userData = JSON.parse(localStorage.getItem('user_data'));
    // const _id = userData.id;
    // const jwtToken = storage.retrieveToken();

    // async function handleAddToDO () {
    //     const response = await fetch(bp.buildPath('/api/addToDo'), {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json'},
    //         body: JSON.stringify({ _id, jwtToken })
    //     });
    //     const data = await response.json();
    // }



    const [title, setTitle] = useState('');

    return (
            <div className='add-task-container'>
                <div className='close-add-task'> <CloseEvent /> </div>
                <div className='task-name-container'>
                    <input type='text' className='task-name-input' placeholder='Task Name' value={title} onChange={e => setTitle(e.target.value)}></input>
                </div>
                <div className='add-task-button-container'> 
                    <button type='button' className='add-task-button'>Add</button>
                </div>
            </div>
    );
};

export default TestingPage;