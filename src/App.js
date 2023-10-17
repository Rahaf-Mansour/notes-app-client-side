import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./pages/Main";
import axios from "axios";

export default function App() {
  return (
    <div className="main-container">
      <Main />
    </div>
  );
}
