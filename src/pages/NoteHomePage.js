import React, { useEffect, useState } from "react";
import "../stylesheets/NotesHomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddModal from "../components/AddModal";
import NotesGrid from "../components/NotesGrid";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

import {
    fetchNotesApi,
    addNoteApi,
    editNoteApi,
    deleteNoteApi,
} from "../services/api";

const NoteHomePage = (props) => {


    const [showAddModal, setShowAddModal] = useState(false);
    const [notes, setNotes] = useState([]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("All");


    const fetchNotes = async () => {
        try {
            const data = await fetchNotesApi();
            setNotes(data);

            const uniqueTags = ["All", ...new Set(data.map((note) => note.tag))];
            setTags(uniqueTags);
        } catch (error) {
            console.error("Error fetching notes", error);
        }
    };

    const handleAddNote = async (newNote) => {
        try {
            const savedNote = await addNoteApi(newNote);

            setNotes([...notes, savedNote]);

            if (!tags.includes(savedNote.tag)) {
                setTags([...tags, savedNote.tag]);
            }

            setShowAddModal(false);
        } catch (error) {
            console.error("Error adding note", error);
        }
    };

    const handleEditNote = async (updatedNote) => {
        try {
            const savedNote = await editNoteApi(updatedNote);
            setNotes(
                notes.map((note) => (note._id === savedNote._id ? savedNote : note))
            );
        } catch (error) {
            console.error("Error updating note", error);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const success = await deleteNoteApi(id);

            if (success) {
                setNotes(notes.filter((note) => note._id !== id));
                setShowDeleteModal(false);
            }
        } catch (error) {
            console.error("Error deleting note", error);
        }
    };

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

    // useEffect( () => {
    //     console.log(notes);
    // },[notes]);

    const filteredNotes = selectedTag === "All" ? notes : notes.filter(note => note.tag === selectedTag);

    return(
        <>
            <div className="page-title">
                <h1>Your Note Book</h1>
            </div>

            <select
                className="tag-filter"
                value = {selectedTag}
                onChange={(e)=> setSelectedTag(e.target.value)}
            >
                {tags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                ))}
            </select>
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
                notes={filteredNotes} 
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