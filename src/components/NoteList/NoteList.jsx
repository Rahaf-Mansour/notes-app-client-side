import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { NoteAppContext } from "../../context/NoteAppContext";
import NoteItem from "../NoteItem";
import DeleteNoteDialog from "../DeleteNoteDialog";
import UpdateNote from "../UpdateNote";
import { getData, deleteNote } from "../../api/api";
import "./style.css";

export default function NoteList() {
  const { setNotes, notes, searchTerm } = useContext(NoteAppContext);
  const [loading, setLoading] = useState(true);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    id: null,
    isShow: false,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      await getData().then((response) => {
        setNotes(response.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }, [setNotes]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredNotes = useMemo(() => {
    return notes?.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  const handleDeleteNote = async () => {
    try {
      await deleteNote(deleteConfirmation.id);
      setDeleteConfirmation({ id: null, isShow: false });
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== deleteConfirmation.id)
      );
    } catch (error) {
      console.error("Error deleting note:", error);
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
          handleDeleteNote={handleDeleteNote}
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
