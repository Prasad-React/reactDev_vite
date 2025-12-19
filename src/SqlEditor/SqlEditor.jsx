import React, { useState, useEffect, useRef } from "react";
import data from "../sitedata.json";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import Editor from "./Editor";
import QueryButtons from "./QueryButtons";
import ResultsTable from "./ResultsTable";
import SaveQueryUI from "../Components/SaveQueryUI";
import DownloadCSVButton from "./DownloadCSVButton";

const BASE_URL = data.BASE_URL;

export default function SqlEditor({ isOpen, setIsOpen }) {
  const [tabs, setTabs] = useState([{ id: "tab-1", title: "Query 1", content: "select * from ", result: null }]);
  const [activeTabId, setActiveTabId] = useState("tab-1");
  const [activeSidebar, setActiveSidebar] = useState("");
  const [showSqlEditor, setShowSqlEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tabEditorRefs = useRef({});


useEffect(() => {
  if (location.pathname === "/sidebar" && window.innerWidth < 768) {
    setIsOpen(true);
  }
}, [location.pathname]);
 
  useEffect(() => {
    tabs.forEach((t) => {
      if (!tabEditorRefs.current[t.id]) tabEditorRefs.current[t.id] = React.createRef();
    });
    Object.keys(tabEditorRefs.current).forEach((key) => {
      if (!tabs.find((t) => t.id === key)) delete tabEditorRefs.current[key];
    });
  }, [tabs]);

  const activeTab = tabs.find((t) => t.id === activeTabId);

const addNewTab = () => {
  const newId = `tab-${Date.now()}`;

  const newTab = {
    id: newId,
    title: `Query ${tabs.length + 1}`,
    content: "select * from ",
    result: null
  };

  setTabs(prev => [...prev, newTab]);
  setActiveTabId(newId); 
};

const closeTab = (id) => {
  if (id === "tab-1") return; 

  setTabs((prevTabs) => {
    const filtered = prevTabs.filter((t) => t.id !== id);

    
    if (id === activeTabId) {
      const lastTab = filtered[filtered.length - 1];
      if (lastTab) setActiveTabId(lastTab.id);
    }

    return filtered;
  });

 
  if (tabEditorRefs.current[id]) delete tabEditorRefs.current[id];
};

const updateTabContent = (id, value) => {
  if (typeof value !== "string") value = String(value);
  
  setTabs((prev) => prev.map((t) => 
    (t.id === id ? { ...t, content: value } : t)
  ));
};

// const runQuery = async () => {
//   setIsLoading(true);

//   const tab = tabs.find((t) => t.id === activeTabId);
//   if (!tab) return;

//   try {
//     const res = await fetch(`${BASE_URL}/execute`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query: tab.content }),
//     });

//     const data = await res.json();

//     // 🔥 Backend error (wrong query, wrong table)
//     if (data.status === "error") {
//       setTabs((prev) =>
//         prev.map((t) =>
//           t.id === activeTabId
//             ? { ...t, error: data.message, result: null }
//             : t
//         )
//       );
//       setIsLoading(false);
//       return;
//     }

//     // Success
//     setTabs((prev) =>
//       prev.map((t) =>
//         t.id === activeTabId ? { ...t, result: data, error: null } : t
//       )
//     );
//   } catch (err) {
//     setTabs((prev) =>
//       prev.map((t) =>
//         t.id === activeTabId
//           ? { ...t, error: "Server connection failed.", result: null }
//           : t
//       )
//     );
//   }

//   setIsLoading(false);
// };
const runQuery = async () => {
  const tab = tabs.find((t) => t.id === activeTabId);
  if (!tab) return;

  const queryId = Math.random().toString(36).substring(2, 12); 

  setIsLoading(true); 

  try {
    const res = await fetch(`${BASE_URL}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryId, query: tab.content }),
    });

    const data = await res.json();

    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? {
              ...t,
              result: data,
              error: data.status === "error" ? data.message : null,
            }
          : t
      )
    );
  } catch (err) {
    console.error(err);
    alert("Query failed!");
  } finally {
    setIsLoading(false); 
  }
};


// const stopQuery = async () => {
//   try {
//     await fetch(`${BASE_URL}/stop?queryId=${activeTabId}`, {
//       method: "POST",
//     });

//     setTabs(prev =>
//       prev.map(t =>
//         t.id === activeTabId
//           ? { ...t, error: "Query stopped by user." }
//           : t
//       )
//     );
//   } catch (err) {
//     console.error("Stop failed", err);
//   }
// };



  const downloadCSV = () => {
    const tab = tabs.find((t) => t.id === activeTabId);
    const result = tab?.result;
  

    if (!result || !result.data || result.data.length === 0) {
      alert("No data!");
      return;
    }

    const rows = result.data;
    const headers = [ ...Object.keys(rows[0])].join(",");
    const csvRows = rows.map((row) => {
      return [ ...Object.values(row).map((v) => `"${String(v).replace(/"/g, '""')}"`)
      ].join(",");
    });

    const csvContent = [headers, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "query_result.csv";
    a.click();
  };

 const saveToServer = async () => {
    const tab = tabs.find((t) => t.id === activeTabId);
    const result = tab?.result;
    const usedQuery = tab?.content ?? "";

    if (!result || !result.data) {
     
      return;
    }

    const rows = result.data;   
    const headers = [...Object.keys(rows[0])];

    let fullCSV = [];
    const headerMap = {};
    headers.forEach((h, i) => (headerMap["col" + i] = h));
    fullCSV.push(headerMap);

    rows.forEach((row) => {
      const rowMap = {};
      const values = [tab?.lastUpdated ?? "", usedQuery.replace(/\n/g, " "), ...Object.values(row)];
      values.forEach((v, i) => (rowMap["col" + i] = v));
      fullCSV.push(rowMap);
    });

    try {
      const res = await fetch(``, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullCSV })
      });
      const data = await res.json();
      alert("Saved at: " + data.filePath);
    } catch (err) {
      console.error("Save failed", err);
      alert("Save failed. See console.");
    }
  };


  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar
        activeSidebar={activeSidebar}
        setActiveSidebar={setActiveSidebar}
        saveToServer={saveToServer}
        setShowSqlEditor={setShowSqlEditor}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="container-fluid" style={{ padding: 20,width:"90%" }}>
        {activeSidebar === "Dashboard" &&  <div>
              <h2>Dashboard</h2>
              <p>Welcome to the Dashboard page. Under Development</p>
              <img
                src="./images/DashBoard.jpg"
                alt="Dashboard"
                style={{
                  width: "100%",
                  maxHeight: "600px",
                  marginTop: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                }}
              />
            </div>}

        {activeSidebar === "SQL Editor" && showSqlEditor && (
          <>
            <QueryButtons 
             activeTab={activeTab}
             addNewTab={addNewTab} 
             runQuery={runQuery}   
               />
<TabBar
  tabs={tabs}
  activeTabId={activeTabId}
  setActiveTabId={setActiveTabId}
  addNewTab={addNewTab}
  closeTab={closeTab}
  
/>
<Editor
  activeTab={activeTab}
  updateTabContent={updateTabContent}
  tabEditorRef={tabEditorRefs.current[activeTabId]}
/>

{activeTab?.result?.data?.length > 0 && (
  <DownloadCSVButton downloadCSV={downloadCSV} />
)}


<ResultsTable activeTab={activeTab} isLoading={isLoading} />

          </>
        )}

        {activeSidebar === "Save Query" && <SaveQueryUI />}
        {activeSidebar === "Settings" &&  <div>
              <h2>Settings</h2>
              <p> Under Development</p>
            </div>}
      </div>
    </div>
  );
}
