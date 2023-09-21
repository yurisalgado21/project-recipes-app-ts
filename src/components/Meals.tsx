import React, { useEffect, useState } from 'react';
import Header from './Header';

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
        const data = await response.json();
        setMeals(data.meals);
        console.log(data);
      } catch (error) {
        console.error('Erro ao buscar receitas de comidas:', error);
      }
    };
    fetchMeals();
  }, []);
  return (
    <div>
      <Header title="Meals" showProfileIcon showSearchIcon />
      <div>
        <h1>Receitas de comidas</h1>
        {meals.slice(0, 12).map((meal, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          </div>
        ))}
      </div>
    </div>

  );
}
