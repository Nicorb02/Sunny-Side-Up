import React, { useState } from 'react';
import '../styles/ToDo.css'

const TestingPage = () => {

    let list = [
        { }
    ]


    return (
        <div className='container'>
            <div className='tasks-list'>
                <li className='task-item'>
                    <div className='task-circle'>

                    </div>
                    <div className='task-title'>

                    </div>
                </li>

            </div>
        </div>
    );
};

export default TestingPage;