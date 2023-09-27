import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { MealTypes } from '../types';
import CategoryFilter from './CategoryFilter';

export default function Meals() {
  const [meals, setMeals] = useState<MealTypes[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  const clearFilters = () => {
    setSelectedCategory('');
    setIsFilterActive(false);
  };
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    const fetchMeals = async () => {
      try {
        let endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        if (selectedCategory) {
          endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        } else if (isFilterActive) {
          endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        }
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.meals && data.meals.length === 0) {
          setMeals(data);
        } else {
          setMeals(data.meals);
        }
        // setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar receitas de comidas:', error);
        // setIsLoading(false);
      }
    };
    fetchMeals();
  }, [selectedCategory, isFilterActive]);
  // console.log(meals);
  return (
    <div>
      <Header title="Meals" showProfileIcon showSearchIcon />
      <CategoryFilter
        isCategory
        selectedCategory={ selectedCategory }
        setSelectedCategory={ setSelectedCategory }
        clearFilters={ clearFilters }

      />
      <div>
        <h1>Meal Recipes</h1>
        {meals.slice(0, 12).map((meal, index) => {
          return (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <Link to={ `/meals/${meal.idMeal}` }>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>

  );
}
