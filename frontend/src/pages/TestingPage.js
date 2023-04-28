import React, { useState } from 'react';
import '../styles/ToDo.css'
import CloseEvent from '../styles/assets/CloseEvent';
import Trash from '../styles/assets/Trash'


const TestingPage = () => {

    let list = [
        {title: 'Numero one', complete: '0' },
        {title: 'Two', complete: '0' },
        {title: 'Tres/three', complete: '1' },
        {title: 'Quatro', complete: '1' },
        {title: 'Cinco five', complete: '0' },
        {title: '6 six', complete: '0' },
    ]
// <button type='button' className='add-task-button'>Add Task</button>
    return (
            <div className='tasks-container'>
                <div className='close-task' >
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

export default TestingPage;