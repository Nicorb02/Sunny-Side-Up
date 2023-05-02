import { Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect, Fragment } from 'react';
import '../styles/editContact.css';
import ExitEdit from '../styles/assets/ExitEdit';
import SaveEdit from '../styles/assets/SaveEdit';

const EditContact = (props, contact, editItem )=> {

            // import buildPath and local storage functions
            let bp = require('./Path.js');
            var storage = require('../tokenStorage.js');
        
            // retrieve user data and current jswt from local storage
            const userData = JSON.parse(localStorage.getItem('user_data'));
            const _id = userData.id;
            const jwtToken = storage.retrieveToken();
        
            const navigate = useNavigate();
    
            const [contacts, setContacts] = useState([]);
            const [contactName, setContactName] = useState('')
            const [contactPhone, setContactPhone] = useState('')
            const [contactEmail, setContactEmail] = useState('')

        //get data
        async function getUserDataAndToken () {
            const userDataString = localStorage.getItem('user_data');
            const userData = JSON.parse(userDataString);
            const jwtToken = storage.retrieveToken();
    
            return { userData, jwtToken };
        }



        //load items
        async function loadItemsFromServer() {
            const { userData, jwtToken } = await getUserDataAndToken();
            const response = await fetch(bp.buildPath('/api/searchContact'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({_id: userData.id, name: ''})
            });
    
            const data = await response.json();
    
            if (data.error === '')
            {
                console.log('load success');
                setContacts(data.results);
            }
            else
            {
                console.log('load fail');
            }
        }

        //edit contact
        async function editContact2() {

            let editname = document.getElementById("editname").value;
            let editphone = document.getElementById("editphone").value;
            let editemail = document.getElementById("editemail").value;

            console.log(editItem);

            const { userData, jwtToken } = await getUserDataAndToken();
            const response = await fetch(bp.buildPath('/api/editContact'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ _id: userData.id, itemId: editItem, name: editname, email: editemail, phone: editphone })
            });
    
            console.log(editItem)
            console.log(userData.id)
            const data = await response.json();
            if (data.error === '')
            {
                console.log('edit successful');
                loadItemsFromServer(); 
            }
            else
            {
                console.log('edit failed');
            }
        };  

            //editform
    const [isClosed, setIsClosed] = useState(false);
    const toggleEditContactClosed = () =>{
        setIsClosed(!isClosed);
    }


    return(
        <div className="editform">
        <span className="name-contacts">Name</span>
        <input type="text" id='editname' className="field-input" ></input>

        <span className="name-contacts">Email</span>
        <input type="text" id='editemail' className="field-input" ></input>

        <span className="name-contacts">Phone Number</span>
        <input type="text" id='editphone' className="field-input" ></input>

        
        <div className='saveBtn' onClick={() =>{editContact2(); toggleEditContactClosed();}}>  <SaveEdit />      </div>
        </div>
    )
}

export default EditContact;