const { faker } = require("@faker-js/faker"); // Install with `npm install @faker-js/faker`

const API_URL = "http://localhost:5000/notes";

// Function to generate random notes
const generateRandomNotes = (count) => {
    return Array.from({ length: count }, () => ({
        title: faker.lorem.words(3), // Random title
        description: faker.lorem.sentences(2), // Random description
        tag: faker.helpers.arrayElement(["work", "personal", "health", "misc"]), // Random tag
    }));
};

// Function to add a single note
const addNote = async (note) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`Successfully added note: ${data.title}`);
        } else {
            console.error(`Failed to add note: ${note.title}`);
        }
    } catch (error) {
        console.error("Error adding note:", error);
    }
};

// Function to add all notes
const addAllNotes = async () => {
    const notes = generateRandomNotes(10); // Generate 10 random notes
    for (const note of notes) {
        await addNote(note); // Add each note sequentially
    }
    console.log("All 10 notes have been added successfully!");
};

// Run the script
addAllNotes();
