const API_URL = "http://localhost:5000/notes";

const fetchNotesApi = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("Error fetching notes", error);
        throw error;
    }
};

const addNoteApi = async (newNote) => {
    const payload = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
    };

    try {
        const response = await fetch(API_URL, payload);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Failed to add note");
            throw new Error("Failed to add note");
        }
    } catch (error) {
        console.error("Error adding note", error);
        throw error;
    }
};

const editNoteApi = async (updatedNote) => {
    const payload = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
    };

    try {
        const response = await fetch(`${API_URL}/${updatedNote._id}`, payload);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Failed to update note");
            throw new Error("Failed to update note");
        }
    } catch (error) {
        console.error("Error updating note", error);
        throw error;
    }
};

const deleteNoteApi = async (id) => {
    const payload = {
        method: "DELETE",
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, payload);
        if (response.ok) {
            return true;
        } else {
            console.error("Failed to delete note");
            throw new Error("Failed to delete note");
        }
    } catch (error) {
        console.error("Error deleting note", error);
        throw error;
    }
};

export {fetchNotesApi, addNoteApi, editNoteApi, deleteNoteApi};