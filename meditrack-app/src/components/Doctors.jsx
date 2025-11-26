// src/components/Doctors.jsx
import React, { useState } from "react";
import Button from "./Button.jsx";

function Doctors({
  doctors,
  onAddDoctor,
  onDeleteDoctor,
  onUpdateDoctor,
  isAdmin,
  editableDoctorId,
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
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

  function startEdit(doc) {
    setEditingId(doc.id);
    setEditForm({
      firstName: doc.firstName,
      lastName: doc.lastName,
      specialty: doc.specialty || "",
    });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  function saveEdit(e) {
    e.preventDefault();
    if (!editingId) return;
    onUpdateDoctor(editingId, editForm);
    setEditingId(null);
  }

  return (
    <section className="doctors-page">
      <h2>Doctors</h2>

      {/* Admin-only: add doctor */}
      {isAdmin && (
        <form className="simple-form" onSubmit={handleSubmit}>
          <h3>Add Doctor (Admin only)</h3>
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
      )}

      {!isAdmin && (
        <p className="locked-message">
          Only admins can add or delete doctors. If you are a doctor, you can
          edit your own profile.
        </p>
      )}

      <h3>Current Doctors</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {doctors.length === 0 && (
            <tr>
              <td colSpan="3">No doctors added yet.</td>
            </tr>
          )}
          {doctors.map((doc) => {
            const canEditThis =
              isAdmin || (editableDoctorId != null && editableDoctorId === doc.id);

            if (editingId === doc.id && canEditThis) {
              // Edit row
              return (
                <tr key={doc.id}>
                  <td>
                    <input
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleEditChange}
                    />
                    <input
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="specialty"
                      value={editForm.specialty}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <Button onClick={saveEdit}>Save</Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              );
            }

            // Normal row
            return (
              <tr key={doc.id}>
                <td>
                  {doc.lastName}, {doc.firstName}
                </td>
                <td>{doc.specialty || "—"}</td>
                <td>
                  {canEditThis && (
                    <Button variant="secondary" onClick={() => startEdit(doc)}>
                      Edit
                    </Button>
                  )}
                  {isAdmin && (
                    <Button
                      variant="danger"
                      onClick={() => onDeleteDoctor(doc.id)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Doctors;
