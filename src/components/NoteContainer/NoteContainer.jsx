import { useState } from "react";
import AddNote from "../AddNote";
import NoteList from "../NoteList";
import "./style.css";

export default function NoteContainer() {
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleAddForm = () => setShowAddForm((prev) => !prev);

  return (
    <div className="note-app-container">
      <div>
        {!showAddForm && (
          <button
            className="take-note-btn"
            onClick={toggleAddForm}
            aria-label="Toggle add note form"
          >
            Take A Note
          </button>
        )}

        {showAddForm ? (
          <AddNote setShowAddForm={setShowAddForm} />
        ) : (
          <img
            className="note-img"
            src="https://guts.wisc.edu/wp-content/uploads/sites/975/2021/02/Note-taking-1200x675.png"
            alt="note-taking"
          />
        )}
      </div>
      <NoteList />
    </div>
  );
}
