import React from "react";
import "../Components/style.css"

export default function ResultsTable({ activeTab, isLoading }) {
  const result = activeTab?.result;

  // 🔵 Loading spinner
  if (isLoading) {
    return (
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <div className="spinner"></div>
        <p style={{ marginTop: 10 }}>Loading results...</p>
      </div>
    );
  }

  // 🔴 SHOW ERROR FIRST (before "no results")
  if (activeTab?.error) {
    return (
      <div
        style={{
          marginTop: 20,
          padding: "15px",
          background: "#ffebee",
          border: "1px solid #ffcdd2",
          borderRadius: "8px",
          color: "#c62828",
          fontSize: "15px",
        }}
      >
        <strong>Error:</strong> {activeTab.error}
      </div>
    );
  }

  // ⚪ No results (only if there's no error & no data)
  if (!result || !result.data || result.data.length === 0) {
    return (
      <div style={{ marginTop: 16 }}>
        <h5>No results yet for {activeTab ? activeTab.title : "the active tab"}.</h5>
      </div>
    );
  }

  // 🟢 Table output
  return (
    <>
      <div className="data-output-container">
        <h5 className="data-output-title">
          Data Output - {activeTab.title}
        </h5>
      </div>

      <div className="table-responsive-wrapper" style={{ marginTop: 10 }}>
        <div
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            overflowX: "auto",
            whiteSpace: "nowrap",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <table
            style={{
              minWidth: "900px",
              borderCollapse: "collapse",
              fontSize: "14px",
              width: "100%",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#0b4f6c",
                  color: "white",
                  textAlign: "left",
                }}
              >
                {Object.keys(result.data[0]).map((c) => (
                  <th
                    key={c}
                    style={{ padding: "10px", borderRight: "1px solid #ddd" }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {result.data.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#eaf2ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      i % 2 === 0 ? "#f9f9f9" : "white")
                  }
                >
                  {Object.values(row).map((val, j) => (
                    <td
                      key={j}
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ marginTop: 10, fontWeight: "bold" }}>
            Time: {result.time}
          </p>
        </div>
      </div>
    </>
  );
}
