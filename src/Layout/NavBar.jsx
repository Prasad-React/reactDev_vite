import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import data from "../sitedata.json";

function NavBar({ setIsOpen }) {
  const { pathname } = useLocation();
  const navigate = useNavigate(); 

  const handleMenuClick = (link) => {
    navigate(link);

   
    if (window.innerWidth < 768) {
      setIsOpen(true);
    }
  };

  const leftMenu = data.Navmenu.slice(0, 2);
  const rightMenu = data.Navmenu.slice(2);

  return (
    <header className="bg-[#0b4f6c] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

       
        <div className="flex items-center gap-4">

      
     <button
  className="md:hidden text-2xl"
  onClick={() => {
    navigate("/sidebar");  
    setIsOpen(true);       
  }}
>
  ☰
</button>

       
          <nav className="flex gap-6">
            {leftMenu.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                onClick={(e) => {
                  e.preventDefault(); 
                  handleMenuClick(item.link);
                }}
                className={
                  pathname === item.link
                    ? "text-red-500 font-bold"
                    : "text-white hover:text-red-400"
                }
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

      
        <nav className="flex gap-6">
          {rightMenu.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              onClick={(e) => {
                e.preventDefault(); 
                handleMenuClick(item.link);
              }}
              className={
                pathname === item.link
                  ? "text-red-500 font-bold text-lg"
                  : "text-white hover:text-red-400"
              }
            >
              {item.name}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}

export default NavBar;
