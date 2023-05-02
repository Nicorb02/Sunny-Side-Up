import '../styles/Contacts.css';
import ContactsForm from '../components/ContactsForm';
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import BackButton from '../styles/assets/BackButton';
import AddContactIcon from '../styles/assets/AddContactIcon';
import Trash2 from '../styles/assets/Trash2'
import EditIcon from '../styles/assets/EditIcon';
import SearchIcon from '../styles/assets/SearchIcon';
import validator from 'validator'


const Contacts = () => {

        // import buildPath and local storage functions
        let bp = require('./Path.js');
        var storage = require('../tokenStorage.js');
    
        // retrieve user data and current jswt from local storage
        const userData = JSON.parse(localStorage.getItem('user_data'));
        const _id = userData.id;
        const jwtToken = storage.retrieveToken();
    
        const navigate = useNavigate();

        const [contacts, setContacts] = useState([]);
        const [editItem, setEditItem] = useState({_id: null});
        const [contactName, setContactName] = useState('')
        const [contactPhone, setContactPhone] = useState('')
        const [contactEmail, setContactEmail] = useState('')

    async function getUserDataAndToken () {
        const userDataString = localStorage.getItem('user_data');
        const userData = JSON.parse(userDataString);
        const jwtToken = storage.retrieveToken();

        return { userData, jwtToken };
    }

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
  
        const [emailError, setEmailError] = useState('')
        const validateEmail = (e) => {
          var email = e.target.value
        
          if (validator.isEmail(email)) {
            setEmailError('Valid Email :)')
          } else {
            setEmailError('Enter valid Email!')
          }
        }

    function displayContacts(){
        if (contacts.length === 0)
        {
            loadItemsFromServer();
        }
        console.log(contacts.length);
        if (contacts.length === 0)
            return(
                <div style={{alignItems: "center", justifyContent: "center", marginTop: 300}}>
                    <p>You have no contacts</p>
                </div>
            )
        else
            return(
                <div className='contactsFilled'>
                {contacts.map(contact => 
                <div className = 'contactSlip'>
                <td className='nameSlot'>{contact.name} </td>
                <td className='emailSlot'>{contact.email} </td>
                <td className='phoneSlot'>{contact.phone}</td>
                <td className='trashSlot' onClick={() => deleteContact(contact._id)}> <Trash2 /> </td>
                <td className='editSlot' onClick={editContact}> <EditIcon /> </td>
                
                
                
                </div>)}
                
                </div>
            )
    }

    function doBack () {
        navigate("/PlannerPage");
    }

    function ClearFields() {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";

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

        if (data.error === '')
        {
            console.log('add successful')
            loadItemsFromServer();  
        }
        else
        {
            console.log('add failed')
        }
        
    }

    //delete function
    async function deleteContact (itemId) {
        console.log(itemId);
        const response = await fetch(bp.buildPath('/api/deleteContact'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ _id, itemId})
        });

        const data = await response.json();

        if (data.error === '')
        {
            console.log('delete successful');
            loadItemsFromServer();
        }
        else
        {
            console.log('delete failed');
        }
    };

    //edit contact
    async function editContact() {
        const { userData, jwtToken } = await getUserDataAndToken();
        const response = await fetch(bp.buildPath('/api/editContact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ _id, itemId: editItem._id, name: contactName, email: contactEmail, phone: contactPhone })
        });

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

    async function searchContacts(){
        let content = document.getElementById("searchData").value;
        console.log(content);
        const selections = content.value;
        const table = document.getElementById("contacts");
        const tr = table.getElementsByTagName("tr");

        for (let i = 0; i < tr.length; i++) {
            const td_fn = tr[i].getElementsByTagName("td")[0]; // Table Data: First Name
            const td_ln = tr[i].getElementsByTagName("td")[1]; // Table Data: Last Name
        
            if (td_fn && td_ln) {
              const txtValue_fn = td_fn.textContent || td_fn.innerText;
              const txtValue_ln = td_ln.textContent || td_ln.innerText;
              tr[i].style.display = "none";
        
              for (const selection of selections) {
                if (
                  txtValue_fn.toUpperCase().indexOf(selection) > -1 ||
                  txtValue_ln.toUpperCase().indexOf(selection) > -1
                ) {
                  tr[i].style.display = "";
                  break;
                }
              }
            }
          }
    }


    return (
        <React.Fragment>
            
        <body className="contacts-body">
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
                <div className='back-button' onClick={() => {
                            addContact();
                            ClearFields();
                    }}> <AddContactIcon /> </div>
                

            </div>
        <div class="table-responsive" id="contactsTable">
            
          <section class="search-bar">
            <input type="text" class="searchInput" id="searchData" placeholder="Search Contacts"/>
            <p className='search-button' onClick={searchContacts}>
                <SearchIcon />
            </p>
          </section>
          

          <div class="tables">
			<div class="tbl-content" id="contactsTable">
				<table id="contacts" cellpadding="0" cellspacing="0" border="0">

					<tbody id="tbody">
                    <thread>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>

						</tr>
					</thread>
                    {displayContacts()}
                    </tbody>

				</table>
			</div>
		</div>


      </div>
        
    </body>
   
    </React.Fragment>

    )
}

export default Contacts;