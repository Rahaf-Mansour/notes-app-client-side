import { useState, useContext } from "react";
import { updateNote } from "../../api/api";
import { NoteContext } from "../../context/NoteContext";
import "./UpdateNote.css";

const initialInputsValue = { title: "", content: "" };

export default function UpdateNote({ idToUpdate: id, setShowUpdateDialog }) {
  const { setNotes } = useContext(NoteContext);
  const [inputs, setInputs] = useState(initialInputsValue);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...inputs };
    if (values["title"] === "") delete values.title;
    if (values["content"] === "") delete values.content;
    const newData = await updateNote(id, values);
    setNotes(newData);
    setShowUpdateDialog(false);
  };

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-dialog edit-dialog">
        <form className="edit-form" onSubmit={handleSubmit}>
          <h2>Edit Note</h2>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
          <label>Content:</label>
          <textarea
            name="content"
            value={inputs.content}
            onChange={handleChange}
          />
          <div className="edit-form-buttons">
            <button className="update-note-btn" type="submit">
              Update Note
            </button>
            <button
              className="cancel-btn"
              onClick={() => setShowUpdateDialog(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
