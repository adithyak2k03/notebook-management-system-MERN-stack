import React, { useState } from "react";
import {faTimes} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../stylesheets/AddModal.css"

const AddModal = ( {onClose, onAddNote} ) => {

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "",
    });

    const handleChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value});
    };

    const handleAddNote = () =>{
        // console.log(note);
        if(!note.title || !note.description){
            alert("Title and Description are required!");
            return;
        }
        onAddNote(note);
    }

    
    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <FontAwesomeIcon
                    icon={faTimes}
                    className="close-icon"
                    onClick={onClose}
                />
                <h2> Add a Note</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={note.title}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={note.description}
                    onChange={handleChange}
                ></textarea>
                <input
                    type="text"
                    name="tag"
                    placeholder="Tag"
                    value={note.tag}
                    onChange={handleChange}
                />
                <button className="add-btn" onClick={handleAddNote}>
                    Add Note
                </button>
            </div>
        </div>
    );
};

export default AddModal;