// src/components/Header.jsx
import React from "react";
import NavBar from "./NavBar.jsx";

function Header({ currentView, onNavChange }) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-title">MediTrack Lite</div>

        <NavBar currentView={currentView} onNavChange={onNavChange} />
      </div>
    </header>
  );
}

export default Header;
