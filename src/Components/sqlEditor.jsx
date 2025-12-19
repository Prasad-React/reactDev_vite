import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";

export default function SqlEditor() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const runQuery = async () => {
    const res = await fetch("http://10.72.5.193:8082/api/db/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    setResult(data);
  };

  const downloadCSV = () => {
    if (!result || !result.data || result.data.length === 0) {
      alert("No data!");
      return;
    }

    const rows = result.data;
    const headers = Object.keys(rows[0]).join(",");
    const csvRows = rows.map(
      row => Object.values(row).map(v => `"${v}"`).join(",")
    );

    const csvContent = [headers, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "query_result.csv";
    a.click();
  };

  const saveToServer = async () => {
    if (!result || !result.data) {
      alert("Nothing to save!");
      return;
    }

    const res = await fetch("http://10.72.5.193:8082/api/db/save-csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: result.data })
    });

    const data = await res.json();
    alert("Saved at: " + data.filePath);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>SQL Editor</h2>

      <CodeMirror
        value={query}
        onChange={(value) => setQuery(value)}
        height="200px"
      />

      <button onClick={runQuery}>Run Query</button>
      <button onClick={downloadCSV} style={{ marginLeft: 10 }}>Download CSV</button>
      <button onClick={saveToServer} style={{ marginLeft: 10 }}>Save Query</button>

      {result && result.data && (
        <div style={{ marginTop: 20 }}>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                {Object.keys(result.data[0]).map(c => <th key={c}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {result.data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p>Time: {result.time}</p>
        </div>
      )}
    </div>
  );
}



// import React, { useState, useEffect } from "react";
// import CodeMirror from "@uiw/react-codemirror";

// export default function SqlEditor() {
//   const [query, setQuery] = useState("");
//   const [description, setDescription] = useState("");
//   const [preparedBy, setPreparedBy] = useState("");
//   const [result, setResult] = useState(null);
//   const [savedQueries, setSavedQueries] = useState([]);

//   const API = "http://10.72.5.193:8082/api/db";

//   // --------------------------
//   // RUN SQL QUERY
//   // --------------------------
//   const runQuery = async () => {
//     const res = await fetch(`${API}/execute`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query })
//     });

//     const data = await res.json();
//     setResult(data);
//   };

//   // --------------------------
//   // DOWNLOAD RESULT AS CSV
//   // --------------------------
//   const downloadCSV = () => {
//     if (!result || !result.data?.length) {
//       alert("No data!");
//       return;
//     }

//     const rows = result.data;
//     const headers = Object.keys(rows[0]).join(",");
//     const csvRows = rows.map(
//       row => Object.values(row).map(v => `"${v}"`).join(",")
//     );

//     const csvContent = [headers, ...csvRows].join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "query_result.csv";
//     a.click();
//   };

//   // --------------------------
//   // SAVE QUERY (query + description + preparedBy)
//   // INTO CSV ON SERVER
//   // --------------------------
//   const saveQueryToServer = async () => {
//     if (!query.trim()) {
//       alert("Write a query first!");
//       return;
//     }

//     const payload = {
//       query: query,
//       description: description,
//       preparedBy: preparedBy
//     };

//     const res = await fetch(`${API}/save-query`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });

//     const data = await res.json();
//     alert("Query saved in CSV: " + data.filePath);

//     loadSavedQueries(); // refresh UI
//   };

//   // --------------------------
//   // LOAD QUERIES FROM CSV
//   // --------------------------
//   const loadSavedQueries = async () => {
//     const res = await fetch(`${API}/saved-queries`);
//     const data = await res.json();
//     setSavedQueries(data);
//   };

//   useEffect(() => {
//     loadSavedQueries();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>SQL Editor</h2>

//       {/* SQL Editor */}
//       <CodeMirror
//         value={query}
//         onChange={(value) => setQuery(value)}
//         height="200px"
//       />

//       {/* FORM */}
//       <div style={{ marginTop: 15 }}>
//         <input
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={{ marginRight: 10 }}
//         />

//         <input
//           placeholder="Prepared By"
//           value={preparedBy}
//           onChange={(e) => setPreparedBy(e.target.value)}
//           style={{ marginRight: 10 }}
//         />

//         <button onClick={runQuery}>Run</button>
//         <button onClick={downloadCSV} style={{ marginLeft: 10 }}>
//           Download Results CSV
//         </button>
//         <button onClick={saveQueryToServer} style={{ marginLeft: 10 }}>
//           Save Query
//         </button>
//       </div>

//       {/* RESULT TABLE */}
//       {result && result.data && (
//         <div style={{ marginTop: 20 }}>
//           <table border="1" cellPadding="5">
//             <thead>
//               <tr>
//                 {Object.keys(result.data[0]).map(c => <th key={c}>{c}</th>)}
//               </tr>
//             </thead>
//             <tbody>
//               {result.data.map((row, i) => (
//                 <tr key={i}>
//                   {Object.values(row).map((val, j) => (
//                     <td key={j}>{String(val)}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <p>Time: {result.time}</p>
//         </div>
//       )}

//       {/* SAVED QUERIES */}
//       <h3 style={{ marginTop: 30 }}>Saved Queries (from CSV)</h3>

//       <table border="1" cellPadding="5" width="100%">
//         <thead>
//           <tr>
//             <th>Query</th>
//             <th>Description</th>
//             <th>Prepared By</th>
//             <th>Execute</th>
//           </tr>
//         </thead>
//         <tbody>
//           {savedQueries.map((q, i) => (
//             <tr key={i}>
//               <td>{q.query}</td>
//               <td>{q.description}</td>
//               <td>{q.preparedBy}</td>
//               <td>
//                 <button onClick={() => setQuery(q.query)}>Load & Run</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



