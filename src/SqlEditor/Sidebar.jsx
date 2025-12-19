
import React from "react";

export default function Sidebar({
  activeSidebar,
  setActiveSidebar,
  saveToServer,
  setShowSqlEditor,
  isOpen,
  setIsOpen,
}) {
  const menuItems = ["Dashboard", "SQL Editor", "Save Query", "Settings"];
  return (
    <>
     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

           <aside
        className={`
    fixed top-0 left-0 z-50
    h-screen       /* full height */
    w-64
    bg-[#0b4f6c] text-white
    p-5
    flex flex-col gap-5
    transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:static md:h-auto md:translate-x-0
        `}
      >
        <h3 className="text-lg font-semibold border-b border-white/30 pb-2">
          Menu
        </h3>

        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => {
              setActiveSidebar(item);
              setShowSqlEditor(item === "SQL Editor");
              if (item === "Save Query") saveToServer();
              setIsOpen(false); 
            }}
            className={`
              text-left px-4 py-2 rounded-md
              transition-all duration-200
              ${
                activeSidebar === item
                  ? "bg-[#14607a] text-yellow-400"
                  : "hover:bg-[#14607a]/60"
              }
            `}
          >
            {item}
          </button>
        ))}
      </aside>
    </>
  );
}
