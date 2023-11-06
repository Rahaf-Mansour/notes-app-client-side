import React from "react";
import Header from "./components/Header";
import { NoteAppProvider } from "./context/NoteAppContext";
import "./App.css";
import NotesPage from "./pages/NotesPage";

export default function App() {
  return (
    <div>
      <Header />
      <NoteAppProvider>
        <NotesPage />
      </NoteAppProvider>
    </div>
  );
}
