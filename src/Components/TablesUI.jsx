import React, { useEffect, useState } from "react";
import data from "../sitedata.json";

const BASE_URL = data.BASE_URL.replace(/\/+$/, "");

export default function TablesUI() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(""); 
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("name");
  const [asc, setAsc] = useState(true);

  const thStyle = {
    textAlign: "left",
    padding: "12px 10px",
    borderBottom: "1px solid #ccc",
    fontWeight: 600,
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
  };

  useEffect(() => {
    async function fetchList() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set("type", typeFilter);
        params.set("category", categoryFilter);

        const res = await fetch(`${BASE_URL}/objects?${params.toString()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setItems(data);
      } catch (e) {
        setError(e.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    }
    fetchList();
  }, [typeFilter, categoryFilter]);

  const filtered = items
    .filter(it => {
      if (!filter) return true;
      const s = filter.toLowerCase();
      return (it.name || "").toLowerCase().includes(s)
        || (it.schema || "").toLowerCase().includes(s)
        || (it.type || "").toLowerCase().includes(s);
    })
    .sort((a,b) => {
      const A = (a[sortBy] || "").toLowerCase();
      const B = (b[sortBy] || "").toLowerCase();
      if (A < B) return asc ? -1 : 1;
      if (A > B) return asc ? 1 : -1;
      return 0;
    });

  return (
    <div className="container" style={{ padding: 16 }}>
      <h3>Database Objects</h3>

    
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          padding: "12px 16px",
          background: "#f8f9fa",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          marginBottom: 16,
        }}
      >
     
        <label style={{ display: "flex", flexDirection: "column", fontWeight: 500, minWidth: 120 }}>
          Type:
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ marginTop: 4, padding: 6, borderRadius: 6, border: "1px solid #ccc" }}
          >
            <option value="ALL">All</option>
            <option value="TABLE">Tables</option>
            <option value="VIEW">Views</option>
            <option value="FUNCTION">Functions</option>
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", fontWeight: 500, minWidth: 150 }}>
          Category:
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ marginTop: 4, padding: 6, borderRadius: 6, border: "1px solid #ccc" }}
          >
            <option value="ALL">All</option>
            <option value="MASTER">Master Tables</option>
            <option value="TRANSACTION">Transaction Tables</option>
          </select>
        </label>

      
        <label style={{ display: "flex", flexDirection: "column", flexGrow: 1, fontWeight: 500, minWidth: 150 }}>
          Search:
          <input
            placeholder="Name, schema or type"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ marginTop: 4, padding: 6, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </label>

    
        <label style={{ display: "flex", flexDirection: "column", fontWeight: 500, minWidth: 120 }}>
          Sort by:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ marginTop: 4, padding: 6, borderRadius: 6, border: "1px solid #ccc" }}
          >
            <option value="name">Name</option>
            <option value="schema">Schema</option>
            <option value="type">Type</option>
          </select>
        </label>

        <button
          onClick={() => setAsc(!asc)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #0b4f6c",
            background: "#0b4f6c",
            color: "white",
            cursor: "pointer",
            alignSelf: "flex-end",
          }}
        >
          {asc ? "Asc" : "Desc"}
        </button>
      </div>

      {loading && <div>Loading…</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {/* Table */}
      {!loading && !error && (
        <div
          className="table-responsive-wrapper"
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            overflowX: "auto",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead style={{ background: "#e9ecef" }}>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Schema</th>
                <th style={thStyle}>Type</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((it, idx) => (
                <tr
                  key={idx}
                  style={{
                    background: idx % 2 === 0 ? "#fff" : "#f7f7f7",
                    transition: "0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#dff4ff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#f7f7f7")
                  }
                >
                  <td style={tdStyle}>{it.name}</td>
                  <td style={tdStyle}>{it.schema}</td>
                  <td style={tdStyle}>{it.type}</td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ padding: 16, textAlign: "center", color: "#777" }}>
                    No objects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
