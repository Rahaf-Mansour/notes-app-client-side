import React, { useState, useEffect } from "react";
import { NoteContext } from "./context/NoteContext";
import "./App.css";
import { SearchTermContext } from "./context/SearchTermContext";
import Main from "./pages/Main";
import { getData } from "./api/api";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      const data = await getData();
      console.log(data);
      setNotes(data);
    };
    getNotes();
  }, []);

  return (
    <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
      <NoteContext.Provider value={{ notes, setNotes }}>
        <div className="main-container">
          <Main />
        </div>
      </NoteContext.Provider>
    </SearchTermContext.Provider>
  );
}
