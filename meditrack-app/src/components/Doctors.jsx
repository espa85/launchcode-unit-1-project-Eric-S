// src/components/Doctors.jsx
import React, { useState } from "react";
import Button from "./Button.jsx";

function Doctors({ doctors, onAddDoctor, onDeleteDoctor }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) return;
    onAddDoctor(form);
    setForm({ firstName: "", lastName: "", specialty: "" });
  }

  return (
    <section className="doctors-page">
      <h2>Doctors</h2>

      <form className="simple-form" onSubmit={handleSubmit}>
        <h3>Add Doctor</h3>
        <label>
          First Name
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Specialty
          <input
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
          />
        </label>
        <Button type="submit">Add Doctor</Button>
      </form>

      <h3>Current Doctors</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Credential Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length === 0 && (
            <tr>
              <td colSpan="4">No doctors added yet.</td>
            </tr>
          )}
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td>
                {doc.lastName}, {doc.firstName}
              </td>
              <td>{doc.specialty || "—"}</td>
              <td>{doc.credentials?.length ?? 0}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => onDeleteDoctor(doc.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Doctors;
