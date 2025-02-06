const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/notesDB";


const connectMongo = async() => {
    try {
        await mongoose.connect(mongoURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully")
    } catch(error){
        console.error("MongoDB connection Error: ", error);
    }
}


module.exports = connectMongo;

