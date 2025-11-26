// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import Home from "./components/Home.jsx";
import Doctors from "./components/Doctors.jsx";
import Credentials from "./components/Credentials.jsx";
import { seedDoctors } from "./data/seedDoctors.js";
import { seedUsers } from "./data/seedUsers.js";
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'doctors' | 'credentials' | 'viewAll'
  const [doctors, setDoctors] = useState(seedDoctors);
  const [users, setUsers] = useState(seedUsers);
  const [currentUser, setCurrentUser] = useState(null);

  // roles
  const isAdmin = currentUser?.role === "admin";
  const isDoctor = currentUser?.role === "doctor";

  // doctor id this user is allowed to edit (if they are a doctor)
  const editableDoctorId = isDoctor ? currentUser.doctorId : null;

  // check admin or doc
  function canEditDoctor(doctorId) {
    return isAdmin || (isDoctor && editableDoctorId === doctorId);
  }

  function handleNavChange(view) {
    setCurrentView(view);
  }

  function notAdmin(action) {
    alert(`Only an admin can ${action}.`);
  }

  function handleSignIn(email, password) {
    // WARNING: mock only. Real apps never keep plain-text passwords on the front-end.
    const trimmedEmail = email.trim().toLowerCase();

    // 1) Check existing "users" (admin or previously-created viewer)
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === trimmedEmail
    );

    if (existingUser) {
      if (existingUser.password === password) {
        setCurrentUser({
          email: existingUser.email,
          role: existingUser.role,
        });
        return { status: "ok", role: existingUser.role };
      } else {
        return { status: "error", message: "Incorrect password." };
      }
    }

    // 2) Check doctors list for doctor login
    const doctorUser = doctors.find(
      (d) => d.email && d.email.toLowerCase() === trimmedEmail
    );

    if (doctorUser) {
      if (doctorUser.password === password) {
        setCurrentUser({
          email: doctorUser.email,
          role: "doctor",
          doctorId: doctorUser.id,
          name: `${doctorUser.firstName} ${doctorUser.lastName}`,
        });
        return { status: "ok", role: "doctor" };
      } else {
        return { status: "error", message: "Incorrect password." };
      }
    }

    // 3) New email → create viewer (read-only)
    const newUser = {
      id: crypto.randomUUID(),
      email: trimmedEmail,
      password,
      role: "viewer", // not allowed to edit
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser({ email: newUser.email, role: newUser.role });
    return { status: "created", role: "viewer" };
  }

  function handleSignOut() {
    setCurrentUser(null);
  }

  function updateDoctor(doctorId, updates) {
    if (!canEditDoctor(doctorId)) {
      alert("You can only edit your own doctor profile (or be an admin).");
      return;
    }
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === doctorId ? { ...doc, ...updates } : doc))
    );
  }

  // Doctor CRUD
  function addDoctor(newDoctor) {
    if (!isAdmin) {
      notAdmin("add doctors");
      return;
    }
    setDoctors((prev) => {
      //find high numeric id we already have
      const maxId = prev.reduce((max, doc) => {
        const numericId = typeof doc.id === "number" ? doc.id : Number(doc.id);
        return Number.isNaN(numericId) ? max: Math.max(max, numericId);
      }, 0);

      return [
        ...prev,
        {
          ...newDoctor,
          id: maxId + 1,
          credentials: [],
        },
      ];
    });
  }

  function deleteDoctor(id) {
    if (!isAdmin) {
      notAdmin("delete doctors");
      return;
    }
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  }

  // Credential CRUD (per doctor)
  function addCredential(doctorId, newCredential) {
    if (!canEditDoctor(doctorId)) {
      alert("You can only add credentials for your own profile (or be an admin).");
      return;
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
    if (!canEditDoctor(doctorId)) {
      notAdmin("delete credentials");
      return;
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
    content = (
      <Home
        currentUser={currentUser}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />
    );
  } else if (currentView === "doctors") {
    content = (
      <Doctors
        doctors={doctors}
        onAddDoctor={addDoctor}
        onDeleteDoctor={deleteDoctor}
        onUpdateDoctor={updateDoctor}
        isAdmin={isAdmin}
        editableDoctorId={editableDoctorId}
      />
    );
  } else if (currentView === "credentials") {
    content = (
      <Credentials
        doctors={doctors}
        onAddCredential={addCredential}
        onDeleteCredential={deleteCredential}
        isAdmin={isAdmin}
        editableDoctorId={editableDoctorId}
        mode="byDoctor"
      />
    );
  } else if (currentView === "viewAll") {
    content = (
      <Credentials
        doctors={doctors}
        onAddCredential={addCredential}
        onDeleteCredential={deleteCredential}
        isAdmin={isAdmin}
        editableDoctorId={editableDoctorId}
        mode="all"
      />
    );
  }

  return (
    <div className="app-root">
      <Header currentView={currentView} onNavChange={handleNavChange} />
      <ProfileBar currentUser={currentUser} />

      <main className="app-main">
        <div className="app-content">{content}</div>
      </main>

      <footer className="app-footer">
        © {new Date().getFullYear()} MediTrack Lite
      </footer>
    </div>
  );
}

export default App;
