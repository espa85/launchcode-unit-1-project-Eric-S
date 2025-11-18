// src/components/ProfileBar.jsx
import React from "react";

function ProfileBar({ currentUser }) {
  return (
    <section className="profile-bar">
      {currentUser ? (
        <>
          <span className="profile-name">{currentUser.email}</span>
          <span className="profile-role">({currentUser.role})</span>
        </>
      ) : (
        <span className="profile-empty">No user signed in.</span>
      )}
    </section>
  );
}

export default ProfileBar;
