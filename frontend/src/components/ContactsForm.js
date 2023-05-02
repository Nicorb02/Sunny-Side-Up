
import '../styles/ContactsForm.css';
import BackButton from '../styles/assets/BackButton';
import { Navigate, useNavigate } from "react-router-dom";
import AddContactIcon from '../styles/assets/AddContactIcon';
import React, { useState, useEffect } from 'react';
import '../components/Contacts';

const ContactsForm = () => {

        // import buildPath and local storage functions
        let bp = require('./Path.js');
        var storage = require('../tokenStorage.js');
    
        // retrieve user data and current jswt from local storage
        const userData = JSON.parse(localStorage.getItem('user_data'));
        const _id = userData.id;
        const jwtToken = storage.retrieveToken();
    
        const navigate = useNavigate();
    

    function doBack () {
        navigate("/PlannerPage");
    }

    async function addContact () {

        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;

        console.log(name);
        console.log(phone);
        console.log(email);

        const response = await fetch(bp.buildPath('/api/addContact'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id, name, email, phone })
        });
        const data = await response.json();
        
    }



    return (
        <React.Fragment>

            <div className='form-container'>
                <div className='back-button' onClick={doBack}> <BackButton /> </div>

                <div className='contacts-header'>
                </div>

                <div className='contacts-header'>
                    <h1>Add Contact</h1>
                </div>
                
                <div className="addContact-form">
                    <span className="name-contacts">Name</span>
                    <input type="text" id='name' className="field-input" ></input>

                    <span className="name-contacts">Email</span>
                    <input type="text" id='email' className="field-input" ></input>

                    <span className="name-contacts">Phone Number</span>
                    <input type="text" id='phone' className="field-input" ></input>

                </div>
                <div className='back-button' onClick={addContact} > <AddContactIcon /> </div>
                

            </div>
        </React.Fragment>
    )
}

export default ContactsForm;