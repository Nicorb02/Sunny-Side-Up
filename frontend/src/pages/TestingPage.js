import React, { useState } from 'react';
import '../styles/Notes.css'
import Trash from '../styles/assets/Trash'
import NewNoteIcon from '../styles/assets/NewNoteIcon';

const TestingPage = () => {

    const [notes, setNotes] = useState([
        {index: 0, name: 'one', content: 'random string lols lasodslfsdf'},
        {index: 1, name: 'dos', content: 'im awesomeodmasfsdfsdf'},
        {index: 2, name: 'tresssss', content: 'whats seems to to be the occifer problem?'},
        {index: 3, name: 'fourfourfour', content: 'random string lols lasodslfsdf'},
    ]);

    // const [selectedNote, setSelectedNote] = useState(null);
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);
    const [selectedNoteString, setSelectedNoteString] = useState(notes[0].content);
    function handleNoteClick (note) {
        setSelectedNoteIndex(note.index);
        setSelectedNoteString(note.content);
    }

    const handleNoteInputChange = (event) => {
        setSelectedNoteString(event.target.value);
    };

    const handleNoteUpdate = () => {
        const updatedNotes = [...notes];
        notes[selectedNoteIndex].content = selectedNoteString;
        setNotes(updatedNotes);
      };

    return (
            <div className='notes-container'>
                <NewNoteIcon className='new-note'/>
                <div className='notes-list'>
                    {notes.map((note) => (
                        <li className={selectedNoteIndex == note.index ? 'selected-listed-note' : 'listed-note'}>
                            <div className='listed-note-name' onClick={() => handleNoteClick(note)}>{note.name}</div>
                            <div className={selectedNoteIndex == note.index ? 'delete-note' : 'hide'}> <Trash /> </div>
                        </li>
                    ))}
                </div>
                <div className='current-note-container'>
                    <textarea
                            className='current-note-string'
                            type='text'
                            value={selectedNoteString}
                            onChange={handleNoteInputChange}
                            onBlur={handleNoteUpdate}
                    />
                </div>
            </div>
    );
};

export default TestingPage;