import { useState } from "react";
import "./App.css";
import Card from "./Card";

function App() {
  let [searchItems, setSearch] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8">
      <h1 className="text-4xl font-extrabold text-white mb-4 text-center">
        Recipe Search
      </h1>
      <label htmlFor="search" className="text-lg text-white mb-2">
        Search Recipe
      </label>
      <input
        id="search"
        type="text"
        value={searchItems}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out"
        placeholder="Enter Recipe name ..."
      />
      <div className="mt-4">
        <button
          onClick={() => setSearch("")}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Clear
        </button>
      </div>
      <Card searchItems={searchItems} />
    </div>
  );
}

export default App;
