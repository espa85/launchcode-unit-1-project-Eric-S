// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import Home from "./components/Home.jsx";
import Doctors from "./components/Doctors.jsx";
import Credentials from "./components/Credentials.jsx";
import { seedDoctors } from "./data/seedDoctors.js";
import { seedUsers } from "./data/seedUsers.js";

function App() {
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'doctors' | 'credentials' | 'viewAll'
  const [doctors, setDoctors] = useState(seedDoctors);
  const [users, setUsers] = useState(seedUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const isLoggedIn = Boolean(currentUser);

  function handleNavChange(view) {
    setCurrentView(view);
  }

  function handleSignIn(email, password) {
    // WARNING: mock only. Real apps never keep plain-text passwords on the front-end.
    const existingUser = users.find((u) => u.email === email);

    if (!existingUser) {
      // Create new user with this email and password
      const newUser = {
        id: crypto.randomUUID(),
        email,
        password,
        role: "admin",
      };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser({ email: newUser.email, role: newUser.role });
      return { status: "created" };
    }

    if (existingUser.password === password) {
      setCurrentUser({ email: existingUser.email, role: existingUser.role });
      return { status: "ok" };
    }

    return { status: "error", message: "Incorrect password." };
  }

  function handleSignOut() {
    setCurrentUser(null);
  }

  // Doctor CRUD
  function addDoctor(newDoctor) {
    if (!isLoggedIn) return alert("You must be logged in to add a doctor.");
    setDoctors((prev) => [...prev, { ...newDoctor, id: crypto.randomUUID(), credentials: [] }]);
  }

  function deleteDoctor(id) {
    if (!isLoggedIn) return alert("You must be logged in to delete a doctor.");
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  }

  // Credential CRUD (per doctor)
  function addCredential(doctorId, newCredential) {
    if (!isLoggedIn) return alert("You must be logged in to add a credential.");

    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === doctorId
          ? {
              ...doc,
              credentials: [
                ...doc.credentials,
                { ...newCredential, id: crypto.randomUUID() },
              ],
            }
          : doc
      )
    );
  }

  function deleteCredential(doctorId, credentialId) {
    if (!isLoggedIn) return alert("You must be logged in to delete a credential.");

    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === doctorId
          ? {
              ...doc,
              credentials: doc.credentials.filter((c) => c.id !== credentialId),
            }
          : doc
      )
    );
  }

  // View selector
  let content = null;
  if (currentView === "home") {
    content = <Home currentUser={currentUser} onSignIn={handleSignIn} onSignOut={handleSignOut} />;
  } else if (currentView === "doctors") {
    content = (
      <Doctors
        doctors={doctors}
        onAddDoctor={addDoctor}
        onDeleteDoctor={deleteDoctor}
        isLoggedIn={isLoggedIn}
      />
    );
  } else if (currentView === "credentials") {
    content = (
      <Credentials
        doctors={doctors}
        onAddCredential={addCredential}
        onDeleteCredential={deleteCredential}
        isLoggedIn={isLoggedIn}
        mode="byDoctor"
      />
    );
  } else if (currentView === "viewAll") {
    content = (
      <Credentials
        doctors={doctors}
        onAddCredential={addCredential}
        onDeleteCredential={deleteCredential}
        mode="all"
      />
    );
  }

  return (
    <div className="app-root">
      <Header currentView={currentView} onNavChange={handleNavChange} />
      <ProfileBar currentUser={currentUser} />

      <main className="app-main">
        <div className="app-content">
          {content}
        </div>
      </main>

      <footer className="app-footer">© {new Date().getFullYear()} MediTrack Lite</footer>
    </div>
  );

}

export default App;
