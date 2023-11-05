import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NoteContainer from "../components/NoteContainer";
import { NoteContext } from "../context/NoteContext";
import "./style.css";
import { SearchTermContext } from "../context/SearchTermContext";
import { getData } from "../api/api";

export default function Main() {
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
          <Header />
          <NoteContainer />
        </div>
      </NoteContext.Provider>
    </SearchTermContext.Provider>
  );
}
