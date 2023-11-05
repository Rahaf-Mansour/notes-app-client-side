import "./style.css";
import Search from "../Search";

export default function Header() {
  return (
    <nav className="navbar">
      <h1>Notes App</h1>
      <Search />
    </nav>
  );
}
