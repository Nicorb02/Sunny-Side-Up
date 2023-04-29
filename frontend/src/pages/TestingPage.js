import React, { useState } from 'react';
import '../styles/Notes.css'
import Trash from '../styles/assets/Trash'
import AddIcon from '../styles/assets/AddIcon';

const TestingPage = () => {

    let notes = [
        {name: 'one', content: 'random string lols lasodslfsdf'},
        {name: 'dos', content: 'im awesomeodmasfsdfsdf'},
        {name: 'tresssss', content: 'whats seems to to be the occifer problem?'},
        {name: 'fourfourfour', content: 'random string lols lasodslfsdf'},
    ];

    return (
            <div className='notes-container'>
                <div className='notes-list'>
                    {notes.map((note) => (
                        <li className='listed-note'>
                            <div className='listed-note-name'>{note.name}</div>
                            <div className='delete-note'> <Trash /> </div>
                        </li>
                    ))}
                    <AddIcon />
                </div>
                <div className='current-note-container'>
                    <p className='current-note-string'></p>
                </div>
            </div>
    );
};

export default TestingPage;