import React, { useState } from "react";

const Card = ({ searchItems }) => {
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchItems}&app_id=e7aa16ab&app_key=80b1f986821e3e55e6d51582373697ac`;

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  function Fetchdata() {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network Error Found");
        return response.json();
      })
      .then((data) => {
        const fetchedRecipes = data.hits.map((hit) => ({
          label: hit.recipe.label,
          image: hit.recipe.image,
          source: hit.recipe.source,
          url: hit.recipe.url,
          ingredients: hit.recipe.ingredientLines,
          calories: hit.recipe.calories,
          totalTime: hit.recipe.totalTime,
        }));
        setRecipes(fetchedRecipes);
        setError(""); // Clear error if fetch is successful
      })
      .catch((error) => {
        console.error(error);
        setError("Something went wrong. Please try again.");
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <button
            onClick={Fetchdata}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-green-600 transition duration-300"
          >
            Search Recipes
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-6">{error}</p>
        )}

        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold mb-2">{recipe.label}</h2>
                <img
                  src={recipe.image}
                  alt={recipe.label}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-700 mb-2">
                  <strong>Source:</strong> {recipe.source}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Calories:</strong> {Math.round(recipe.calories)}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Total Time:</strong> {recipe.totalTime || "N/A"} mins
                </p>
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-300"
                >
                  View Recipe
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Card;
