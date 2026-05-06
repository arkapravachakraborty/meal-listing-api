import React, { useState } from 'react'

const App = () => {
  const [error, setError] = useState(null);
  const [mealData, setMealData] = useState(null);

  const fetchMealData = async () => {
    try {
      const response = await fetch('https://api.freeapi.app/api/v1/public/meals');
      const res = await response.json();

      // check status code
      if (res.statusCode === 200) {
        const mealData = res.data.data;
        setMealData(mealData);
      }
      else {
        throw new Error(res.message);
      }
    } catch (error) {
      setError(error.message);
    }
  }




  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4 pb-2">
            🍽️ Meal Listing
          </h1>
          <p className="text-gray-600 text-lg mb-6">Discover delicious meals from around the world</p>
          <button
            onClick={fetchMealData}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            🍴 Fetch Meal Data
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto">
            <strong className="font-bold">Error:</strong> {error}
          </div>
        )}

        {mealData && mealData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealData.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-gray-800">{meal.strArea}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{meal.strMeal}</h2>
                  <div className="flex items-center mb-3">
                    <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                      {meal.strCategory}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">ID: {meal.idMeal}</span>
                    <button className="text-orange-500 hover:text-orange-600 font-semibold text-sm" onClick={
                      meal.strSource ? (
                        () => window.open(meal.strSource, '_blank')
                      ) : null
                    }>
                      View Recipe →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-gray-500 text-xl">No meals to display yet.</p>
              <p className="text-gray-400 mt-2">Click the button above to fetch delicious meals!</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default App