import React from "react";
import Header from "../components/Header";
import NoteContainer from "../components/NoteContainer";
import { NoteAppProvider } from "../context/NoteAppContext";
import "./style.css";

export default function NotesPage() {
  return (
    <NoteAppProvider>
      <div className="main-container">
        <Header />
        <NoteContainer />
      </div>
    </NoteAppProvider>
  );
}
