import React, { useState, useContext } from "react";
import axios from "axios";
import { NoteAppContext } from "../../context/NoteAppContext";
import { addNote } from "../../api/api";
import "./style.css";

export default function AddNote({ setShowAddForm }) {
  const initialInputsValue = { title: "", content: "" };
  const [inputs, setInputs] = useState(initialInputsValue);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const { setNotes } = useContext(NoteAppContext);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNote(inputs);
    getData();
    setInputs(initialInputsValue);
    setShowAddForm(false);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        className="title-input"
        placeholder="Title"
        name="title"
        required
        value={inputs.title}
        onChange={handleChange}
      />
      <textarea
        className="content-textarea"
        value={inputs.content}
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
