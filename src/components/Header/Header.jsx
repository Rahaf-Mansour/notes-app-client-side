import React, { useState, useEffect } from "react";
import "./Header.css";

// const [searchTerm, setSearchTerm] = useState("");

// const handleSearchChange = (event) => {
//   setSearchTerm(event.target.value);
// };

export default function Header() {
  return (
    <nav className="navbar">
      <h1>Notes App</h1>
      <input
        type="search"
        placeholder="search notes..."
        className="search-notes"
        // value={searchTerm}
        // onChange={handleSearchChange}
      ></input>
    </nav>
  );
}
