import React, { useState } from "react";

const EditModal = ({ note, onClose, onSave}) => {

    const [title, setTittle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const [tag, setTag] = useState(note.tag);

    const handleSave = () =>{
        onSave({...note, title, description, tag});
        onClose();
    };

    return(
        <div className="modal-overlay" onClick={()=> onClose()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>x</button>
                <h2>Edit Note</h2>
                <input type="text" value={title} onChange={(e)=> setTittle(e.target.value)}/>
                <textarea value={description} onChange={(e)=> setDescription(e.target.value)}/>
                <input type="text" value={tag} onChange={(e)=> setTag(e.target.value)}/>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
        </div>
    )
};

export default EditModal;