// src/components/Home.jsx
import React, { useState } from "react";
import Button from "./Button.jsx";
import heroImage from "../assets/doc-office-2.jpg"; // add later

function Home({ currentUser, onSignIn, onSignOut }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const result = onSignIn(email.trim(), password);
    if (result.status === "ok") {
      setStatusMessage("Welcome back!");
    } else if (result.status === "created") {
      setStatusMessage("New admin profile created and signed in.");
    } else if (result.status === "error") {
      setStatusMessage(result.message || "Sign-in error.");
    }
  }

  return (
    <section className="home">
      <div className="home-hero">
        {/* Replace with user-uploaded image when ready */}
        <div className="home-hero-image" aria-label="MediTrack illustration">
          {<img src={heroImage} alt="MediTrack dashboard illustration" className="home-hero-img" />}
        </div>
        <div className="home-hero-text">
          <h1>Welcome!</h1>
          <p>Track healthcare credentials quickly and reliably.</p>

          {!currentUser && (
            <form className="signin-form" onSubmit={handleSubmit}>
              <label>
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <Button type="submit">Sign In</Button>
              {statusMessage && (
                <p className="signin-status" role="status">
                  {statusMessage}
                </p>
              )}
              <p className="signin-help">
                If this email is new, a password will be set and a new admin
                profile will be created.
              </p>
            </form>
          )}

          {currentUser && (
            <div className="signin-logged-in">
              <p>You are signed in as {currentUser.email}.</p>
              <Button variant="secondary" onClick={onSignOut}>
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
