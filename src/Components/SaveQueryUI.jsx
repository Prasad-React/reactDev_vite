import { Search, SlidersHorizontal, Filter } from "lucide-react";
import data from "../sitedata.json";

export default function SaveQueryUI() {
  return (
    <div className="w-full min-h-screen bg-[#1E1F22] text-white p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">Save Query</h2>

     
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      
        <div className="flex items-center bg-black/80 rounded-3xl px-4 py-2 w-full sm:w-[400px]">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-lg w-full text-white"
          />
          <Search size={22} className="text-white opacity-80" />
        </div>

    
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-3 bg-[#2E2F33] rounded-full cursor-pointer hover:opacity-80">
            <SlidersHorizontal size={20} />
          </div>
          <div className="p-2 sm:p-3 bg-[#2E2F33] rounded-full cursor-pointer hover:opacity-80">
            <Filter size={20} />
          </div>
        </div>
      </div>

     
      <div className="flex flex-wrap gap-3 mb-4 overflow-x-auto">
        {data.saveQuery.map((info) => (
          <button
            key={info.title}
            className="px-4 py-2 rounded-full border border-green-500 text-green-400
                       hover:bg-green-500 hover:text-black transition flex-shrink-0"
          >
            {info.title}
          </button>
        ))}
      </div>

    
      <div className="overflow-x-auto rounded-lg border border-gray-500 mb-6">
        <table className="w-full border-collapse text-left min-w-[600px]">
          <thead className="bg-[#1F2023] text-white">
            <tr>
              {data.saveQuery1.map((info) => (
                <th
                  key={info.title}
                  className="border border-gray-700 px-4 py-3"
                >
                  {info.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 2 }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {data.saveQuery1.map((info) => (
                  <td
                    key={info.title}
                    className="border border-gray-700 px-4 py-4"
                  >
                    {info.para || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
