import React from "react";
import { FaPlus } from "react-icons/fa";

export default function TabBar({ tabs, activeTabId, setActiveTabId, addNewTab, closeTab }) {
  return (
    <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}>

      {tabs.map((t) => (
        <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>

        
          <button
            onClick={() => setActiveTabId(t.id)}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              backgroundColor: activeTabId === t.id ? "#0b5ed7" : "#e9ecef",
              color: activeTabId === t.id ? "white" : "black",
              border: "1px solid #cfcfcf",
              cursor: "pointer",
            }}
          >
            {t.title}
          </button>

         
          {t.id !== "tab-1" && (
            <button
              onClick={() => closeTab(t.id)}
              style={{
                padding: "4px 8px",
                borderRadius: 6,
                backgroundColor: "#f8d7da",
                color: "#842029",
                border: "1px solid #f5c2c7",
                cursor: "pointer",
              }}
              title="Close tab"
            >
              ×
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addNewTab}
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginLeft: 8,
        }}
      >
        <FaPlus size={16} />
      </button>

    </div>
  );
}
