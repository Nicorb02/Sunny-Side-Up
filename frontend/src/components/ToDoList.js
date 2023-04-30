import React, { useState, useCallback, useEffect } from 'react';
import '../styles/ToDo.css'
import AddTodo from './AddToDo';
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

    const [list, setList] = useState([]);
    const [reloadTasks, setReloadTasks] = useState(false);

    // read todos api and populate list (useEffect on reloadTasks)
    useEffect (() => {
        async function handleReadTasks () {
            const response = await fetch(bp.buildPath('/api/readToDo'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id, jwtToken })
            });

            const data = await response.json();

            const listTemp = data.results
                .map((todo) => ({
                    name: todo.title,
                    complete: todo.complete
                }));
            setList(listTemp);
        }

        handleReadTasks();
    }, [reloadTasks]);
    
    // make delete functionality and connect to api  (toggle reload when done)
    async function handleDeleteTask () {
        const response = await fetch(bp.buildPath('/api/delToDo'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id, title, jwtToken })
        });

        const data = await response.json();

        if (data.error === '')
        {
            console.log("good delete task")
        }
        else
        {
            console.log(data.error)
        }
        setTitle('');
        toggleReloadTasks();
    }

    // make complete functionality and connect to api (toggle reload when done)
    async function handleCompleteTask (task) {
        const response = await fetch(bp.buildPath('/api/completeToDo'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id, title: task.name , jwtToken })
        });

        const data = await response.json();

        if (data.error === '')
        {
            console.log("good complete task")
        }
        else
        {
            console.log(data.error)
        }
        setTitle('');
        toggleReloadTasks();
    }

    // make incomplete functionality and connect to api (toggle reload when done)
    async function handleIncompleteTask (task) {
        const response = await fetch(bp.buildPath('/api/incompleteToDo'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id, title: task.name , jwtToken })
        });

        const data = await response.json();

        if (data.error === '')
        {
            console.log("good incomplete task")
        }
        else
        {
            console.log(data.error)
        }
        setTitle('');
        toggleReloadTasks();
    }

    // checks a task to call complete or incomplete api
    function checkCompletion (task) {
        // if task is incomplete, complete it
        if (task.complete == 0)
        {
            handleCompleteTask(task);
        }
        // task is complete, incomplete it
        else
        {
            handleIncompleteTask(task);
        }
    }
    
    // make useStates for getting title to delete and etc..
    const [title, setTitle] = useState('');
    const [displayAddToDo, setDisplayAddTodo] = useState(false);

    // function to reload tasks (calls readTodo api)
    function toggleReloadTasks () {
        if (reloadTasks) setReloadTasks(false);
        else setReloadTasks(true);
    }

    // for setting title for trash can and delete api parameter
    const handleTaskClick = useCallback((task) => {
        return () => setTitle(task.name);
    }, []);

    // hide todo list
    function toggleDisplayToDo () {
        setDisplayToDo(false);
    }

    // display add todo component
    function toggleDisplayAddTodo () {
        setDisplayAddTodo(true);
    }

    return (
            <div className='tasks-container'>
                <div className={`add-todo-component ${displayAddToDo ? '' : 'hide-todo-component'}`}>
                    <AddTodo 
                        setReloadTasks={setReloadTasks}
                        reloadTasks={reloadTasks}
                        setDisplayAddTodo={setDisplayAddTodo}
                    />
                </div>
                <div className='close-task' onClick={toggleDisplayToDo}>
                    <CloseEvent />
                </div>
                <div className='tasks-list'>
                    {list.map((task) => (
                        <li className='task-item'>
                            <div className={task.complete == 1 ? 'task-complete' : 'task-incomplete'} onClick={() => checkCompletion(task)}></div>
                            <p className={task.complete == 1 ? 'task-title-complete' : 'task-title'} onClick={handleTaskClick(task)}>{task.name}</p>
                            <div className={title === task.name ? 'delete-button' : 'delete-button-hidden'} onClick={handleDeleteTask}> <Trash /> </div>
                        </li>
                    ))}
                </div>
                <button type='button' className='add-task-button' onClick={toggleDisplayAddTodo}>Add Task</button>
            </div>
    );
};

export default ToDoList;