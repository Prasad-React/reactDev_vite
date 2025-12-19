import React from "react";
import data from "../sitedata.json";

export default function QueryButtons({ activeTab, addNewTab, runQuery, stopQuery }) {
  return (
    <div className="container mt-3">
      <div className="row g-3 text-center">
        {data.sqlEditor.map((item, index) => (
          <div className="col-md" key={index}>
            <div className="card-body">
              {!item.isButton && (
                <h5 className="card-title text-center mb-3">{item.title}</h5>
              )}

              {item.isButton && (
                <button
                  className="text-center bg-[#146e08ff] text-white border border-gray-500 px-4 py-2 rounded shadow-md hover:bg-blue-700"
                  style={{ boxShadow: "1px 1px 2px rgba(0,0,0,0.6)" }}
                  onClick={() => {
                    const action = (item.title || "").toUpperCase();

                    switch (action) {
                      case "VIEW":
                        addNewTab(activeTab?.content);
                        break;

                      case "RUN":
                        runQuery();
                        break;

                      // case "STOP":
                      //   stopQuery();
                      //   break;

                      default:
                        console.warn("Unknown action:", action);
                        break;
                    }
                  }}
                >
                  {item.title}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
