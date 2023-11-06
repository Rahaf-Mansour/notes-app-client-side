import React, { useState, useContext } from "react";
import { NoteAppContext } from "../../context/NoteAppContext";
import { addNote, getData } from "../../api/api";
import "./style.css";

export default function AddNote({ setShowAddForm }) {
  const initialNoteInputValues = { title: "", content: "" };
  const [noteInputs, setNoteInputs] = useState(initialNoteInputValues);
  const { setNotes } = useContext(NoteAppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteInputs({ ...noteInputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNote(noteInputs);
      getData().then((data) => {
        setNotes(data);
        setNoteInputs(initialNoteInputValues);
        setShowAddForm(false);
      });
    } catch (error) {
      console.error("Error adding the note:", error);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        className="title-input"
        placeholder="Title"
        name="title"
        required
        value={noteInputs.title}
        onChange={handleChange}
      />
      <textarea
        className="content-textarea"
        value={noteInputs.content}
        onChange={handleChange}
        placeholder="Content"
        name="content"
        rows={10}
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
}
