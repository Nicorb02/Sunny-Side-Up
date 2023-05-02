import React from "react";
import Trash2 from '../styles/assets/Trash2'
import EditIcon from '../styles/assets/EditIcon';
import SearchIcon from '../styles/assets/SearchIcon';

const ReadRow = ({contact, handleEditClick, handleDeleteClick, deleteContact, }) => {
  return (
    <tr>
        <td className='nameSlot'>{contact.name} </td>
        <td className='emailSlot'>{contact.email} </td>
        <td className='phoneSlot'>{contact.phone}</td>
        <td className='trashSlot' onClick={() => deleteContact(contact._id)}> <Trash2 /> </td>
        <td className='editSlot' id='editBtn'> <EditIcon /> </td>
    </tr>
  );
};

export default ReadRow;