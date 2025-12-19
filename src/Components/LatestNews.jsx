import React from "react";
import data from "../sitedata.json"

function LatestNews() {
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Latest News */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>

        <div className="space-y-4">
          {data.news.map((item, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.date}</p>
              <p className="mt-2 text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Important Features */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Important Features</h2>

        <div className="grid grid-cols-1 gap-4">
          {data.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-4 flex items-start space-x-4 border rounded-lg hover:shadow-lg transition duration-300"
            >
              <div className="text-4xl">{feature.icon}</div>

              <div>
                <h3 className="text-lg font-semibold">{feature.name}</h3>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LatestNews;