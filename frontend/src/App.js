
import React, { useEffect, useState } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  
  const fetchContacts = async () => {
    const res = await axios.get(`${API}/contacts`);
    setContacts(res.data);
  };


  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const addContact = async () => {
  if (!form.name || !form.email || !form.phone) {
    alert("Please fill all fields");
    return;
  }

  await axios.post(`${API}/contacts`, form);
  
  fetchContacts();

  setForm({ name: "", email: "", phone: "" });
};
  const deleteContact = async (id) => {
    await axios.delete(`${API}/contacts${id}`);
    fetchContacts();
  };

return (
  <div style={styles.container}>
    <h2 style={styles.heading}>📇 Contact Manager</h2>

    {/* Form */}
    <div style={styles.form}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        style={styles.input}
      />
      <button onClick={addContact} style={styles.addBtn}>
        Add Contact
      </button>
    </div>

    {/* Table */}
    <table style={styles.table}>
  <thead>
    <tr>
      <th style={styles.th}>Name</th>
      <th style={styles.th}>Email</th>
      <th style={styles.th}>Phone</th>
      <th style={styles.th}>Action</th>
    </tr>
  </thead>

  <tbody>
    {contacts.map((c) => (
      <tr key={c._id}>
        <td style={styles.td}>{c.name}</td>
        <td style={styles.td}>{c.email}</td>
        <td style={styles.td}>{c.phone}</td>
        <td style={styles.td}>
          <button onClick={() => deleteContact(c._id)} style={styles.deleteBtn}>
            delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  </div>
);
}

const styles = {
  container: {
    width: "70%",
    margin: "40px auto",
    fontFamily: "Segoe UI, sans-serif",
  },

  heading: {
    marginBottom: "20px",
    fontWeight: "500",
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    flex: 1,
  },

  addBtn: {
    padding: "8px 12px",
    border: "1px solid #333",
    background: "white",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    borderBottom: "1px solid #ccc",
    padding: "8px",
  },

  td: {
    padding: "8px",
    borderBottom: "1px solid #eee",
  },

  deleteBtn: {
    border: "none",
    background: "transparent",
    color: "red",
    cursor: "pointer",
  },
};

export default App;