import { useContext, useState, useEffect } from "react";
import { NoteContext } from "../../context/NoteContext";
import { SearchTermContext } from "../../context/SearchTermContext";
import NoteItem from "../NoteItem";
import DeleteNoteDialog from "../DeleteNoteDialog";
import UpdateNote from "../UpdateNote";
import axios from "axios";
import "./style.css";

export default function NoteList() {
  const { setNotes, notes } = useContext(NoteContext);
  const { searchTerm } = useContext(SearchTermContext);

  const [loading, setLoading] = useState(true);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    id: null,
    isShow: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/notes");
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [setNotes]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteNote = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/notes/${deleteConfirmation.id}`
      );
      setDeleteConfirmation({ id: null, isShow: false });
      setLoading(true);
      await getData();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/notes");
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="spinner">
          <div className="loading-spinner"></div>
        </div>
      ) : (
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
      )}
      {deleteConfirmation.isShow && (
        <DeleteNoteDialog
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
