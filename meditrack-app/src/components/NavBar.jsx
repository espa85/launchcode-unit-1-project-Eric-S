// src/components/NavBar.jsx
import React, { useState } from "react";
import Button from "./Button.jsx";

function NavBar({ currentView, onNavChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "doctors", label: "Doctors" },
    { id: "credentials", label: "Credentials" },
    { id: "viewAll", label: "View All" },
  ];

  function handleNavClick(view) {
    onNavChange(view);
    setMenuOpen(false);
  }

  return (
    <nav className="app-nav">
      <div className="nav-links nav-links-desktop">
        {links.map((link) => (
          <button
            key={link.id}
            className={
              "nav-link" + (currentView === link.id ? " nav-link-active" : "")
            }
            onClick={() => handleNavClick(link.id)}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Hamburger for small screens */}
      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && (
        <div className="nav-links nav-links-mobile">
          {links.map((link) => (
            <button
              key={link.id}
              className={
                "nav-link" + (currentView === link.id ? " nav-link-active" : "")
              }
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
