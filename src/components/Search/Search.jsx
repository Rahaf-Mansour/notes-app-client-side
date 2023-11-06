import { useContext, useState, useEffect } from "react";
import { NoteAppContext } from "../../context/NoteAppContext";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import "./style.css";

export default function Search() {
  const { searchTerm, setSearchTerm } = useContext(NoteAppContext);
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 250);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, setSearchTerm]);

  return (
    <>
      <TextField
        label="Search Notes"
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleSearchChange}
        sx={{
          width: "100%",
          marginBottom: "20px",
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      />
    </>
  );
}
