import React from "react";
import Search from "../components/Search";
import NoteContainer from "../components/NoteContainer";
import "./style.css";

export default function NotesPage() {
  return (
    <div className="main-container">
      <Search />
      <NoteContainer />
    </div>
  );
}
