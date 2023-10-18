import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import "./AddNote.css";
import { addNote } from "../../api/api";
const initialInputsValue = { title: "", content: "" };

export default function AddNote({ setShowAddForm }) {
  const [inputs, setInputs] = useState(initialInputsValue);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };

  const { setNotes } = useContext(NoteContext);
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
    // if (inputs.title.trim().length !== 0 || inputs.content.trim().length !== 0)
    //   alert("input is empty");
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
