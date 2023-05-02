import React from 'react'

const EditRow = () => {
    return(
        <div>
            <td>
                <input type="text" required="required" placeholder="edit name" name="name"></input>
            </td>
            <td>
                <input type="text" required="required" placeholder="edit email" name="email"></input>
            </td>
            <td>
                <input type="text" required="required" placeholder="edit phone" name="phone"></input>
            </td>
        </div>
    )
}

export default EditRow;