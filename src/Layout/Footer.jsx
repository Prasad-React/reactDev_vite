import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-0 animate-slide-up">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm tracking-wide flex items-center justify-center gap-2">
  <img
    src="./images/nic.jpeg"
    alt="NIC Logo"
    className="h-5 w-auto"
  />
  Designed & Developed by
  <span className="text-blue-400 font-semibold">
    <a href="https://ap.nic.in/" target="_blank" rel="noopener noreferrer">
      NIC
    </a>
  </span>
</p>

      </div>
    </footer>
  );
}

export default Footer;
