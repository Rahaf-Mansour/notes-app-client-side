import React from "react";
import "./style.css";

export default function NoteItem({
  note,
  setDeleteConfirmation,
  setShowUpdateDialog,
  setIdToUpdate,
}) {
  const date = new Date(note.creationDate);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <div key={note._id} className="note-item">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <div className="note-footer">
        <button
          className="edit-btn"
          onClick={() => {
            setShowUpdateDialog(true);
            setIdToUpdate(note._id);
          }}
        >
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={(event) =>
            setDeleteConfirmation({ isShow: true, id: note._id })
          }
        >
          x
        </button>
      </div>
    </div>
  );
}
