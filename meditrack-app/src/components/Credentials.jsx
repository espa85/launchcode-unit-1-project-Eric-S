// src/components/Credentials.jsx
import React, { useState } from "react";
import Button from "./Button.jsx";

function Credentials({
  doctors,
  onAddCredential,
  onDeleteCredential,
  mode,
  isAdmin,
  editableDoctorId,
}) {
  // Build doctor options once
  const doctorOptions = doctors.map((d) => ({
    value: d.id,
    label: `${d.lastName}, ${d.firstName}`,
  }));

  const isDoctorLimited = !isAdmin && editableDoctorId != null;

  const [selectedDoctorId, setSelectedDoctorId] = useState(
    isDoctorLimited ? editableDoctorId : doctorOptions[0]?.value ?? ""
  );

  const [form, setForm] = useState({
    name: "",
    status: "active",
    effectiveDate: "",
    expirationDate: "",
  });
  
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedDoctorId || !form.name.trim()) return;

    onAddCredential(Number(selectedDoctorId), form);
    setForm({
      name: "",
      status: "active",
      effectiveDate: "",
      expirationDate: "",
    });
  }

  // Build full credential list for "view all" mode
  const flattenedCredentials = doctors.flatMap((doc) =>
    (doc.credentials || []).map((cred) => ({
      doctorId: doc.id,
      doctorName: `${doc.lastName}, ${doc.firstName}`,
      ...cred,
    }))
  );

  const displayDoctorId =
    mode === "byDoctor" ? selectedDoctorId : doctors[0]?.id || "";

  const selectedDoctor =
    doctors.find((d) => d.id === Number(displayDoctorId)) || doctors[0];

  return (
    <section className="credentials-page">
      <h2>Credentials</h2>

      {!isAdmin && !isDoctorLimited && (
        <p className="locked-message">
          You are signed in as a viewer. Only an admin can modify credentials.
        </p>
      )}

      <form className="simple-form" onSubmit={handleSubmit}>
        <h3>Add Credential</h3>

        <label>
          Doctor
          <select
            value={selectedDoctorId}
            onChange={(e) => {
              if (isDoctorLimited) return; // doctor can't switch to someone else
              setSelectedDoctorId(Number(e.target.value));
            }}
            disabled={isDoctorLimited}
          >
            <option value="">Select doctor</option>
            {doctorOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Credential Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
        </label>

        <label>
          Effective Date
          <input
            type="date"
            name="effectiveDate"
            value={form.effectiveDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Expiration Date
          <input
            type="date"
            name="expirationDate"
            value={form.expirationDate}
            onChange={handleChange}
          />
        </label>

        <Button
          type="submit"
          disabled={
            !isAdmin &&
            !(isDoctorLimited && editableDoctorId === Number(selectedDoctorId))
          }
        >
          Add Credential
        </Button>
      </form>

      {mode === "byDoctor" && selectedDoctor && (
        <>
          <h3>
            Credentials for {selectedDoctor.lastName},{" "}
            {selectedDoctor.firstName}
          </h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Credential</th>
                <th>Status</th>
                <th>Effective</th>
                <th>Expires</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(selectedDoctor.credentials || []).length === 0 && (
                <tr>
                  <td colSpan="5">No credentials recorded.</td>
                </tr>
              )}
              {(selectedDoctor.credentials || []).map((cred) => {
                const canDeleteThis =
                  isAdmin ||
                  (editableDoctorId != null &&
                    editableDoctorId === selectedDoctor.id);

                return (
                  <tr key={cred.id}>
                    <td>{cred.name}</td>
                    <td>{cred.status}</td>
                    <td>{cred.effectiveDate || "—"}</td>
                    <td>{cred.expirationDate || "—"}</td>
                    <td>
                      <Button
                        variant="danger"
                        disabled={!canDeleteThis}
                        onClick={() =>
                          canDeleteThis &&
                          onDeleteCredential(selectedDoctor.id, cred.id)
                        }
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      {mode === "all" && (
        <>
          <h3>All Credentials (All Doctors)</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Credential</th>
                <th>Status</th>
                <th>Effective</th>
                <th>Expires</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flattenedCredentials.length === 0 && (
                <tr>
                  <td colSpan="6">No credentials recorded.</td>
                </tr>
              )}
              {flattenedCredentials.map((row) => {
                const canDeleteThis =
                  isAdmin ||
                  (editableDoctorId != null &&
                    editableDoctorId === row.doctorId);

                return (
                  <tr key={row.id}>
                    <td>{row.doctorName}</td>
                    <td>{row.name}</td>
                    <td>{row.status}</td>
                    <td>{row.effectiveDate || "—"}</td>
                    <td>{row.expirationDate || "—"}</td>
                    <td>
                      <Button
                        variant="danger"
                        disabled={!canDeleteThis}
                        onClick={() =>
                          canDeleteThis &&
                          onDeleteCredential(row.doctorId, row.id)
                        }
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

export default Credentials;
