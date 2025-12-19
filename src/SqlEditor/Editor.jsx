import React from "react";
import CodeMirror from "@uiw/react-codemirror";

export default function Editor({ activeTab, updateTabContent, tabEditorRef }) {
  return (
    <div
      style={{
        border: "1px solid #8b8d8bff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        marginTop: 12,
      }}
    >
      {activeTab ? (
        <CodeMirror
          value={activeTab.content}
          onChange={(value) => updateTabContent(activeTab.id, value)}
          height="300px"
          ref={tabEditorRef}
        />
      ) : (
        <CodeMirror value={"select * from "} onChange={() => {}} height="300px" />
      )}
    </div>
  );
}
