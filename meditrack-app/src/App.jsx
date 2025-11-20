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
  const isAdmin = currentUser?.role === "admin";

  function handleNavChange(view) {
    setCurrentView(view);
  }

  function notAdmin( action ) {
    return alert(`Only an admin can ${action}.`);
  }

  function handleSignIn(email, password) {
    // WARNING: mock only. Real apps never keep plain-text passwords on the front-end.
    const trimmedEmail = email.trim().toLowerCase();
    const existingUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!existingUser) {
      // Create new user with this email and password
      const newUser = {
        id: crypto.randomUUID(),
        email: trimmedEmail,
        password,
        role: "viewer", //not alowed to edit
      };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser({ email: newUser.email, role: newUser.role });
      return { status: "created", role: "viewer" };
    }

    if (existingUser.password === password) {
      setCurrentUser({ email: existingUser.email, role: existingUser.role });
      return { status: "ok", role: existingUser.role };
    }

    return { status: "error", message: "Incorrect password." };
  }

  function handleSignOut() {
    setCurrentUser(null);
  }

  // Doctor CRUD
  function addDoctor(newDoctor) {
    if (!isAdmin) {
      notAdmin("add doctors");
      return 
    }
    setDoctors((prev) => [
      ...prev, 
      { ...newDoctor, id: crypto.randomUUID(), credentials: [] }
    ]);
  }

  function deleteDoctor(id) {
    if (!isAdmin) {
      notAdmin("delete doctors");
      return 
    }
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  }

  // Credential CRUD (per doctor)
  function addCredential(doctorId, newCredential) {
    if (!isAdmin) {
      notAdmin("add credentials");
      return 
    }

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
    if (!isAdmin) {
      notAdmin("delete credentials");
      return 
    }

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
