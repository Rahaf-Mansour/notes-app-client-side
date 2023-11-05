import React from "react";
import "./style.css";

export default function DeleteNoteDialog({
  setDeleteConfirmation,
  deleteNote: handleDeleteNote,
}) {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-dialog">
        <h2>Delete Note</h2>
        <p>Are you sure you want to delete this note?</p>
        <button onClick={handleDeleteNote}>Yes, Delete</button>
        <button
          onClick={() =>
            setDeleteConfirmation((prev) => ({ ...prev, isShow: false }))
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
