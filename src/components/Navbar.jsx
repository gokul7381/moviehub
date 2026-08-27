import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      <div className="logo">
        🎬 MovieHub
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="menu-toggle"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>

        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/movies" onClick={closeMenu}>
          Movies
        </NavLink>

        <NavLink to="/theatres" onClick={closeMenu}>
          Theatres
        </NavLink>

        <NavLink to="/bookings" onClick={closeMenu}>
          Bookings
        </NavLink>

        <NavLink to="/booking-history" onClick={closeMenu}>
          Booking History
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;