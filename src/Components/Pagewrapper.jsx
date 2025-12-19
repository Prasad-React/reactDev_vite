import React, { useEffect, useState } from "react";
import data from "../sitedata.json";

function PageWrapper({ children }) {
  const [current, setCurrent] = useState(0);
  const [captcha, setCaptcha] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const newCaptcha = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCaptcha(newCaptcha);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 px-4 md:px-6">
      {/* MAIN SECTION WITH CAROUSEL + LOGIN */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* SLIDER SECTION - 60% on desktop, full width on mobile */}
        <div className="md:w-3/5 w-full h-[500px] overflow-hidden rounded-xl shadow-lg relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {data.slides.map((slide, i) => (
              <img
                key={i}
                src={slide.image}
                alt={slide.title}
                className="w-full h-[500px] object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* SLIDE TEXT OVERLAY */}
          <div className="absolute bottom-8 left-6 bg-black bg-opacity-40 text-white p-3 rounded-lg">
            <h2 className="text-lg font-bold">{data.slides[current].title}</h2>
            <p className="text-sm">{data.slides[current].description}</p>
          </div>

          {/* DOTS */}
          <div className="absolute bottom-3 w-full flex justify-center space-x-2">
            {data.slides.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === current ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* LOGIN PANEL - 40% on desktop, full width on mobile */}
        <div className="md:w-2/5 w-full bg-[#89ad0f] shadow-xl rounded-xl p-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          <form className="space-y-4 w-full max-w-[350px]">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            {/* CAPTCHA */}
            <div>
              <label className="block text-sm font-medium">Captcha</label>
              <div className="flex items-center space-x-3 mt-1">
                <div className="px-4 py-2 bg-gray-200 rounded-lg text-lg font-mono select-none">
                  {captcha}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter Captcha"
                className="w-full border rounded-lg p-2 mt-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="animate-slide-down mt-8">{children}</div>
    </div>
  );
}

export default PageWrapper;
