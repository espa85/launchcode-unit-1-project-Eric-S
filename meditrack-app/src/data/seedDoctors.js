// src/data/seedDoctors.js

export const seedDoctors = [
  {
    id: 1,
    firstName: "Emily",
    lastName: "Hawthorne",
    specialty: "Radiologist",
    email: "emily.hawthorne@meditrack.local",
    password: "emily123", // DEMO ONLY
    credentials: [
      {
        id: 101,
        name: "ARRT Radiography (R.T.(R))",
        status: "Active",
        effectiveDate: "2024-06-12",
        expirationDate: "2027-06-12",
      },
      {
        id: 102,
        name: "ARRT CT (R.T.(CT))",
        status: "Expiring Soon",
        effectiveDate: "2022-03-01",
        expirationDate: "2025-03-01",
      },
      {
        id: 103,
        name: "BLS - Basic Life Support",
        status: "Expired",
        effectiveDate: "2021-01-15",
        expirationDate: "2023-01-15",
      },
    ],
  },
  {
    id: 2,
    firstName: "Jacob",
    lastName: "Nguyen",
    specialty: "General Practitioner",
    email: "jacob.nguyen@meditrack.local",
    password: "jacob123", // DEMO ONLY
    credentials: [
      {
        id: 201,
        name: "State Medical License (MD)",
        status: "Active",
        effectiveDate: "2023-09-01",
        expirationDate: "2026-09-01",
      },
      {
        id: 202,
        name: "DEA Registration",
        status: "Expiring Soon",
        effectiveDate: "2022-12-10",
        expirationDate: "2025-12-10",
      },
      {
        id: 203,
        name: "BLS - Basic Life Support",
        status: "Active",
        effectiveDate: "2024-02-14",
        expirationDate: "2026-02-14",
      },
    ],
  },
  {
    id: 3,
    firstName: "Sophia",
    lastName: "Martinez",
    specialty: "Emergency Medicine Physician",
    email: "sophia.martinez@meditrack.local",
    password: "sophia123", // DEMO ONLY
    credentials: [
      {
        id: 301,
        name: "ACLS - Advanced Cardiac Life Support",
        status: "Active",
        effectiveDate: "2023-07-20",
        expirationDate: "2025-07-20",
      },
      {
        id: 302,
        name: "PALS - Pediatric Advanced Life Support",
        status: "Expired",
        effectiveDate: "2021-08-01",
        expirationDate: "2023-08-01",
      },
      {
        id: 303,
        name: "State Medical License (MD)",
        status: "Expiring Soon",
        effectiveDate: "2021-11-05",
        expirationDate: "2024-11-05",
      },
    ],
  },
  {
    id: 4,
    firstName: "Marcus",
    lastName: "Bennett",
    specialty: "Anesthesiologist",
    email: "marcus.bennett@meditrack.local",
    password: "marcus123", // DEMO ONLY
    credentials: [
      {
        id: 401,
        name: "Board Certification – Anesthesiology",
        status: "Active",
        effectiveDate: "2024-04-01",
        expirationDate: "2034-04-01",
      },
      {
        id: 402,
        name: "DEA Registration",
        status: "Expired",
        effectiveDate: "2020-10-15",
        expirationDate: "2023-10-15",
      },
      {
        id: 403,
        name: "ACLS - Advanced Cardiac Life Support",
        status: "Active",
        effectiveDate: "2023-03-03",
        expirationDate: "2025-03-03",
      },
    ],
  },
  {
    id: 5,
    firstName: "Hannah",
    lastName: "Patel",
    specialty: "General Surgeon",
    email: "hannah.patel@meditrack.local",
    password: "hannah123", // DEMO ONLY
    credentials: [
      {
        id: 501,
        name: "American Board of Surgery Certification",
        status: "Active",
        effectiveDate: "2022-10-01",
        expirationDate: "2032-10-01",
      },
      {
        id: 502,
        name: "BLS - Basic Life Support",
        status: "Expiring Soon",
        effectiveDate: "2023-01-20",
        expirationDate: "2025-01-20",
      },
      {
        id: 503,
        name: "ACLS - Advanced Cardiac Life Support",
        status: "Active",
        effectiveDate: "2024-05-11",
        expirationDate: "2026-05-11",
      },
    ],
  },
];
