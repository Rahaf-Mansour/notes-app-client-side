import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NoteItem.css";

export default function NoteItem() {
  const [notes, setNotes] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/notes/${id}`);
      getData();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div key={note._id} className="note-item">
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p className="note-date">{note.creationDate}</p>
          <div className="note-footer">
            <button onClick={(event) => deleteNote(note._id)}>x</button>
          </div>
        </div>
      ))}
    </div>
  );
}
