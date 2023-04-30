import React, { useEffect, useState } from 'react';
import '../styles/Notes.css'
import AddNote from './AddNote';
import Trash from '../styles/assets/Trash'
import NewNoteIcon from '../styles/assets/NewNoteIcon';
import CloseEventBlack from '../styles/assets/CloseEventBlack';

const Notes = ({ setDisplayNotes }) => {
    // import buildPath and local storage functions
    let bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    // retrieve user data and current jswt from local storage
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const _id = userData.id;
    const jwtToken = storage.retrieveToken();

    const [reloadNotes, setReloadNotes] = useState(false);
    const [notes, setNotes] = useState([]);

    useEffect (() => {
        async function handleReadNotes () {
            const response = await fetch(bp.buildPath('/api/searchNote'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id, title:'', jwtToken })
            });

            const data = await response.json();

            let indexCounter = 1;
            const tempNotes = data.results
                .map((note) => ({
                    index: indexCounter++,
                    id: note._id,
                    name: note.title,
                    content: note.content
                }));
            setNotes(tempNotes);
        }

        handleReadNotes();
    }, [reloadNotes]);

    // function to delete note, connects to api
    async function handleDeleteNote () {
        const response = await fetch(bp.buildPath('/api/delNote'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id, itemId: selectedNoteId, jwtToken })
        });

        const data = await response.json();

        if (data.error === '')
        {
            console.log("good note delete")
        }
        else 
        {
            console.log("bad note delete")
        }

        toggleReloadNotes();
        setSelectedNoteString('');
        setSelectedNoteId('');
        if (notes.length > 0)
        {
            setSelectedNoteIndex(0);
        }
    }

    // const [selectedNote, setSelectedNote] = useState(null);
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);
    const [selectedNoteString, setSelectedNoteString] = useState('');
    const [selectedNoteId, setSelectedNoteId] = useState('');
    const [selectedNoteName, setSelectedNoteName] = useState('');

    useEffect(() => {
        if (notes.length == 1) {
            setSelectedNoteString(notes[0].content);
            setSelectedNoteIndex(notes[0].index);
            setSelectedNoteId(notes[0].id)
        }
    }, [notes]);

    function handleNoteClick (note) {
        setSelectedNoteIndex(note.index);
        setSelectedNoteString(note.content);
        setSelectedNoteId(note.id);
        setSelectedNoteName(note.name);
    }

    const handleNoteInputChange = (event) => {
        setSelectedNoteString(event.target.value);
    };

    const handleNoteUpdate = async () => {
        const response = await fetch(bp.buildPath('/api/editNote'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id, itemId: selectedNoteId, newTitle: selectedNoteName, newContent: selectedNoteString, jwtToken })
        })
    
        const data = await response.json();
    
        if (data.error === '')
        {
            console.log("good note edit")
        }
        else 
        {
            console.log("bad note edit");
        }
    
        toggleReloadNotes();
    };

    const [displayAddNote, setDisplayAddNote] = useState(false);
    
    function toggleDisplayAddNote () {
        setDisplayAddNote(true);
    }

    function toggleReloadNotes () {
        if(reloadNotes) setReloadNotes(false);
        else setReloadNotes(true); 
    }

    function toggleDisplayNotes () {
        setDisplayNotes(false);
    }

    return (
            <div className='notes-container'>
                <div className='notes-list'>
                    {notes.map((note) => (
                        <li className={selectedNoteIndex == note.index ? 'selected-listed-note' : 'listed-note'}>
                            <div className='listed-note-name' onClick={() => handleNoteClick(note)}>{note.name}</div>
                            <div className='delete-note' onClick={handleDeleteNote}>
                                {selectedNoteIndex === note.index ? <Trash /> : <div></div>}
                            </div>
                        </li>
                    ))}
                </div>
                <div className='current-note-container'>
                    {notes.length > 0 ? (
                        <textarea
                            className='current-note-string'
                            type='text'
                            value={selectedNoteString}
                            onChange={handleNoteInputChange}
                            onBlur={handleNoteUpdate}
                        />
                    ) : (
                        <textarea className='current-note-string' disabled={true} />
                    )}
                    <div className='close-notes' onClick={toggleDisplayNotes}>
                        <CloseEventBlack />
                    </div>
                    <div className='new-note' onClick={toggleDisplayAddNote}>
                        <NewNoteIcon />
                    </div>
                </div>
                <div className={`notes-planner-container ${displayAddNote ? '' : 'hidden'}`}>
                    <AddNote
                        setDisplayAddNote={setDisplayAddNote}
                        setReloadNotes={setReloadNotes}
                        reloadNotes={reloadNotes}
                    />
                </div>
            </div>
    );
};

export default Notes;