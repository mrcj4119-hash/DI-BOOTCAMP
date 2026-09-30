const fs = require('fs');

const NOTES_FILE = 'notes-data.json';

// Helper function to fetch existing notes
const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync(NOTES_FILE, 'utf8');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

// Helper function to save notes array to file
const saveNotes = (notes) => {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
};

// Add a new note
const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = { title, body };

  // Check if note title already exists
  const duplicateNotes = notes.filter((n) => n.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

// Get all notes
const getAll = () => {
  return fetchNotes();
};

// Read a single note by title
const getNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((n) => n.title === title);
  return filteredNotes[0];
};

// Remove a note by title
const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((n) => n.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

// Utility function to print note details cleanly
const logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};