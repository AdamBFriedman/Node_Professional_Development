const fs = require("fs");
// const chalk = require("chalk");
// import chalk from "chalk";

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  // Filter through notes and remove duplicates
  const duplicateNote = notes.find((note) => {
    return note.title === title;
  });

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Duplicate title!");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  // Filter through notes and remove duplicates
  const filteredNotes = notes.filter((note) => {
    return note.title !== title;
  });
  saveNotes(filteredNotes);
  if (filteredNotes.length !== notes.length) {
    console.log("Note Removed");
  } else {
    console.log("No note found!");
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNotes();
  const foundNote = notes.find((note) => {
    return note.title === title;
  });
  if (foundNote) {
    console.log(foundNote.title, foundNote.body);
  } else {
    console.log("Error: No note found");
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    const parsedData = JSON.parse(dataJSON);
    return parsedData;
  } catch (error) {
    return [];
  }
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
