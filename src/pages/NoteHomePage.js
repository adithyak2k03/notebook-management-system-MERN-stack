import React, { useEffect, useState } from "react";
import "../stylesheets/NotesHomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddModal from "../components/AddModal";
import NotesGrid from "../components/NotesGrid";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

const API_URL = "http://localhost:5000/notes";

const NoteHomePage = (props) => {


    const [showAddModal, setShowAddModal] = useState(false);
    const [notes, setNotes] = useState([]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    
    const fetchNotes = async() =>{
        try{
            const response = await fetch(API_URL);
            const data = await response.json();
            setNotes(data);
        }catch(error){
            console.error("Error fetching notes ", error);
        }
    };

    const handleAddNote = async(newNote) => {
        
        const payload = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        };
        
        try{
            const response = await fetch(API_URL, payload);

            if(response.ok){
                const savedNote = await response.json();
                
                setNotes([...notes, savedNote]);
                setShowAddModal(false);
            }else{
                console.error("Failed to add note");
            }
        }catch(error){
            console.error("Error adding note", error);
        }


    };

    const handleEditNote = async(updatedNote) => {
        const payload = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedNote),
        };
        try{
            const response = await fetch(`${API_URL}/${updatedNote._id}`, payload);
            
            if(response.ok){
                const savedNote = await response.json();
                setNotes(notes.map((note) => (note._id === savedNote._id ? savedNote : note)));
            } else{
                console.error("Failed to update note");
            }
        }catch(error){
            console.error("Error updating note", error);
        }
    };

    const handleDeleteNote = async (id) => {
        const payload = {
            method: "DELETE",
        };

        try{
            const response = await fetch(`${API_URL}/${id}`, payload);

            if(response.ok){
                setNotes(notes.filter((note) => note._id !== id));
                setShowDeleteModal(false);
            } else{
                console.error("Failed to delete note");
            }
        }catch(error){
            console.error('Error deleting note', error);
        };
    }

    const handleDeleteClick = (note) =>{
        setNoteToDelete(note);
        setShowDeleteModal(true);
    };

    const handleEditClick = (note) => {
        setCurrentNote(note);
        setShowEditModal(true);
        
    };

    useEffect( () => {
        fetchNotes();
    },[]);

    useEffect( () => {
        console.log(notes);
    },[notes]);

    return(
        <>
            <div className="page-title">
                <h1>Your Note Book</h1>
            </div>

            <button className="add-note-btn" onClick={() => setShowAddModal(true) }>
                    <FontAwesomeIcon icon={faPlus} /> Add Note
            </button>

            {showAddModal &&
                <AddModal
                    onClose={()=> setShowAddModal(false)}
                    onAddNote={handleAddNote}
                />
            }

            <NotesGrid
                notes={notes} 
                onEditNote={handleEditClick}
                onDeleteNote={handleDeleteClick}
            />

            {showEditModal && (
                <EditModal
                    note={currentNote}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleEditNote}
                />
            )}

            {showDeleteModal && (
                <DeleteModal
                    note={noteToDelete}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteNote}
                />
            )}

            {/* Grid to show all Notes

            Notes component has (title, description, tag, add button, 
            and Date Time should be stored in the note) */}

            {/* 
                viewing note pop up modal
                edit and delete also has pop up modal
             */}
        </>
    );
};

export default NoteHomePage;