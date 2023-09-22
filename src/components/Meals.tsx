import React, { useEffect, useState } from 'react';
import Header from './Header';
import { MealTypes } from '../types';
import CategoryFilter from './CategoryFilter';

export default function Meals() {
  const [meals, setMeals] = useState<MealTypes[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setMeals(data.meals);
        console.log(data.meals);
      } catch (error) {
        console.error('Erro ao buscar receitas de comidas:', error);
      }
    };
    fetchMeals();
  }, []);
  console.log(meals);
  return (

    <div>
      <Header title="Meals" showProfileIcon showSearchIcon />
      <CategoryFilter isCategory />
      <div>
        <h1>Meal Recipes</h1>
        {meals.slice(0, 12).map((meal, index) => {
          console.log(meal);
          return (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            </div>
          );
        })}
      </div>
    </div>

  );
}
