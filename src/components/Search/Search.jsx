import { useContext, useState, useEffect } from "react";
import { SearchTermContext } from "../../context/SearchTermContext";
import "./Search.css";

export default function Search() {
  const { searchTerm, setSearchTerm } = useContext(SearchTermContext);
  const [inputValue, setInputValue] = useState(searchTerm);
  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
  };

  // debouncing => delays the search term update, so that it doesn't update on every keystroke
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 250);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, setSearchTerm]);

  return (
    <input
      onChange={handleSearchChange}
      type="search"
      value={inputValue}
      placeholder="search notes..."
      className="search-notes"
    />
  );
}
