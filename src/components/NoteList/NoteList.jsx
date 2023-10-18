import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import { SearchTermContext } from "../../context/SearchTermContext";
import NoteItem from "../NoteItem/NoteItem";
import DeleteNote from "../DeleteNote/DeleteNote";
import UpdateNote from "../UpdateNote";
import "./NoteList.css";
import { useState } from "react";
import axios from "axios";

export default function NoteList() {
  const { setNotes } = useContext(NoteContext);
  const { searchTerm } = useContext(SearchTermContext);
  const { notes } = useContext(NoteContext);

  const filteredNotes = notes?.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("SearchTerm changed, new request happened");

  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isShow: false,
    id: null,
  });

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteNote = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/notes/${deleteConfirmation.id}`
      );
      setDeleteConfirmation({ id: null, isShow: false });
      getData();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      <div className="notes-grid">
        {filteredNotes?.map((note) => (
          <NoteItem
            setDeleteConfirmation={setDeleteConfirmation}
            key={note._id}
            note={note}
            setShowUpdateDialog={setShowUpdateDialog}
            setIdToUpdate={setIdToUpdate}
          />
        ))}
      </div>
      {deleteConfirmation.isShow && (
        <DeleteNote
          deleteNote={deleteNote}
          setDeleteConfirmation={setDeleteConfirmation}
        />
      )}
      {showUpdateDialog && (
        <UpdateNote
          setShowUpdateDialog={setShowUpdateDialog}
          idToUpdate={idToUpdate}
        />
      )}
    </>
  );
}
