import React, { useState, useEffect } from "react";

export default function WriteQuery() {
  const [form, setForm] = useState({
    query: "",
    description: "",
    preparedBy: ""
  });

  const [queries, setQueries] = useState([]);

  // Load CSV data on mount
  useEffect(() => {
    fetch("http://localhost:8080/api/queries")
      .then(res => res.json())
      .then(data => setQueries(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const res = await fetch("http://localhost:8080/api/queries/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const updated = await res.json();
    setQueries(updated);
  };

  const runQuery = async (sql) => {
    const res = await fetch("http://localhost:8080/api/queries/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: sql })
    });

    const result = await res.json();
    alert(JSON.stringify(result, null, 2));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Save SQL Query</h2>

      <textarea
        name="query"
        placeholder="Enter SQL query"
        value={form.query}
        onChange={handleChange}
        style={{ width: "100%", height: "120px" }}
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <input
        name="preparedBy"
        placeholder="Prepared By"
        value={form.preparedBy}
        onChange={handleChange}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <button onClick={handleSave} style={{ marginTop: "10px" }}>
        Save to CSV
      </button>

      <h2 style={{ marginTop: "20px" }}>Saved Queries</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Query</th>
            <th>Description</th>
            <th>Prepared By</th>
            <th>Run</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((q, i) => (
            <tr key={i}>
              <td>{q.query}</td>
              <td>{q.description}</td>
              <td>{q.preparedBy}</td>
              <td>
                <button onClick={() => runQuery(q.query)}>Execute</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
