import React from "react";

export default function DownloadCSVButton({ downloadCSV }) {
  return (
    <div className="row" style={{ marginTop: 15 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <button
          onClick={downloadCSV}
          className="btn btn-primary"
          style={{
            padding: "8px 18px",
            borderRadius: "8px",
            fontWeight: 600,
            width: "200px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            backgroundColor: "#0b4f6c",
          }}
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}
