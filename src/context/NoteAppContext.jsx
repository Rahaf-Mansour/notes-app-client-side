import React, { useState, useEffect } from "react";
import { getData } from "../api/api";

export const NoteAppContext = React.createContext();

export const NoteAppProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await getData();
        console.log(data);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getNotes();
  }, []);

  const contextValue = {
    notes,
    setNotes,
    searchTerm,
    setSearchTerm,
  };

  return (
    <NoteAppContext.Provider value={contextValue}>
      {children}
    </NoteAppContext.Provider>
  );
};
