const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connecToMongo = require("./db");
const { default: mongoose} = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

connecToMongo();

const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    tag: {type: String, default: "General"},
    date: {type: String, default: new Date().toLocaleString()}
});

const Note = mongoose.model("Note", noteSchema);


app.get("/notes", async(req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch(error){
        res.status(500).json({ error: "Failed to fetch notes"});
    }
});

app.post("/notes", async(req, res) =>{
    try{
        const {title, description, tag} = req.body;
        const newNote = new Note({
            title,
            description,
            tag,
            date: new Date().toLocaleString(),
        });
        await newNote.save();
        res.json(newNote);
    }catch(error){
        console.error("Error saving note", error);
        res.status(500).json({error: "Failed to save Note"});
    }
});

app.put("/notes/:id", async(req,res) => {

    try{
        const {id} = req.params;
        const {title, description, tag} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {title, description, tag},
            {new: true},
        );
        res.json(updatedNote);
    }catch(error){
        console.error("Error updating note", error);
        res.status(500).json({error: "Failed to update note"});
    }
});

app.delete("/notes/:id", async (req,res)=>{
    try{
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.json({message: "Note deleted successfully"});
    }catch(error){
        console.error("Error deleting note", error);
        res.status(500).json({error: "Failed to delete note"});
    }
});

app.listen(PORT, () => console.log(`Server runing on http://localhost:${PORT}`));
