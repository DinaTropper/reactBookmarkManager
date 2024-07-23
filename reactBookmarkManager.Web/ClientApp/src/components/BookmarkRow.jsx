
import React, { useState } from "react";

const BookmarkRow = ({ bookmark, onTextChange, onEditClick, isEditClicked, onUpdateClick, onCancelClick, onDeleteClick }) => {

    return (
        <tr>
            {!isEditClicked && <td>{bookmark.title}</td>}
            {isEditClicked && <input type="text" className='form-control' name='title' value={bookmark.title} onChange={onTextChange} />}
            <td>
                <a href={bookmark.url} target="_blank">{bookmark.url}</a>
            </td>
            <td>
                {!isEditClicked ?
                    <>
                        <button onClick={onEditClick} className="btn btn-success">Edit Title</button>
                        <button onClick={onDeleteClick} className="btn btn-danger" style={{ marginLeft: 10 }}>Delete</button>
                    </> :
                    <>
                        <button onClick={onUpdateClick} className="btn btn-warning" style={{ marginLeft: 10 }}>Update</button>
                        <button onClick={onCancelClick} className="btn btn-info" style={{ marginLeft: 10 }}>Cancel</button>
                    </>
                }
            </td>
        </tr>
    );
}

export default BookmarkRow;
