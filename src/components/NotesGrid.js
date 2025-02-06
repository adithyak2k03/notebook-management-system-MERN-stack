import React, { useState } from "react";
import "../stylesheets/NotesGrid.css";

const NotesGrid = ({ notes, onEditNote, onDeleteNote }) => {
    const [selectedNote, setSelectedNote] = useState(null);

    const truncateText = (text, maxLength) =>{
        return text.length > maxLength ? text.substring(0, maxLength)+"...": text;
    };

    return(
        <>
            <div className="notes-grid">
                {notes.map((note)=>(
                    <div
                        key={note._id}
                        className="note-card"
                        onClick={(e)=>{
                            if(e.target.tagName !== "BUTTON"){
                                setSelectedNote(note);
                            }
                        }}
                    >
                        <h4 className="card-title">{truncateText(note.title, 15)}</h4>
                        {/* <p className="text-wrap">{truncateText(note.description, 70)}</p> */}
                        <p className="card-text">{truncateText(note.description, 50)}</p>
                        
                        <span>{note.tag}</span>
                        <small>{note.date}</small>
                        <hr/>                  
                        <div className="card-footer">
                            <button className="btn btn-warning" onClick={() => onEditNote(note)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => onDeleteNote(note)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
                
            {/* {false &&( */}
            {selectedNote &&(
                <div className="modal-overlay" onClick={() => setSelectedNote(null)}>
                    <div className="modal-content" onClick={(e)=> e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedNote(null)}>×</button>
                        <h3>{selectedNote.title}</h3>
                        <p>{selectedNote.description}</p>
                        <span>{selectedNote.tag}</span><br/><hr/>
                        <small>{selectedNote.date}</small>
                    </div>
                </div>
            )}
        </>
    );
};

export default NotesGrid;