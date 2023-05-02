import React from 'react'
import '../styles/EditForm.css';

const EditForm = () => {
    return (
        <div className="addContact-form">
        <span className="name-contacts">Name</span>
        <input type="text" id='editname' className="field-input" ></input>

        <span className="name-contacts">Email</span>
        <input type="text" id='editemail' className="field-input" ></input>

        <span className="name-contacts">Phone Number</span>
        <input type="text" id='editphone' className="field-input" ></input>

    </div>
    )

}

export default EditForm;