import React, { useState } from 'react';
import CloseEvent from '../styles/assets/CloseEvent';

const TestingPage = () => {
    // import buildPath and local storage functions
    // let bp = require('../Path.js');
    // var storage = require('../tokenStorage.js');

    // // retrieve user data and current jswt from local storage
    // const userData = JSON.parse(localStorage.getItem('user_data'));
    // const _id = userData.id;
    // const jwtToken = storage.retrieveToken();


    // async function handleAddNote () {
    //     const response = await fetch(bp.buildPath('/api/addToDo'), {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json'},
    //         body: JSON.stringify({ _id, title, jwtToken })
    //     });

    //     const data = await response.json();

    //     if (data.error === '')
    //     {
    //         console.log("good note add")
    //     }
    //     else
    //     {
    //         console.log("bad note add")
    //     }

    //     setTitle('');
        
    // }


    const [title, setTitle] = useState('');

    return (
        <div className='add-task-container'>
        <div className='close-add-task'> <CloseEvent /> </div>
        <div className='task-name-container'>
            <input type='text' className='task-name-input' placeholder='Note Name' value={title} onChange={e => setTitle(e.target.value)}></input>
        </div>
        <div className='add-task-button-container'> 
            <button type='button' className='add-newtask-button' >Add</button>
        </div>
    </div>
    );
};

export default TestingPage;