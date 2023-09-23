import React, { useState, useEffect } from 'react';
import Header from './Header';
import { DrinkTypes } from '../types';
import CategoryFilter from './CategoryFilter';

export default function Drinks() {
  const [drinks, setDrinks] = useState<DrinkTypes[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const clearFilters = () => {
    setSelectedCategory('');
  };

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        let endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        if (selectedCategory) {
          endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        }
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data.drinks && data.drinks.length === 1) {
          setDrinks(data.drinks[0]);
        } else {
          setDrinks(data.drinks);
        }
      } catch (error) {
        console.error('Erro ao buscar receitas de comidas:', error);
      }
    };
    fetchDrinks();
  }, [selectedCategory]);
  console.log(drinks);
  return (
    <div>
      <Header title="Drinks" showProfileIcon showSearchIcon />
      <CategoryFilter
        isCategory={ false }
        selectedCategory={ selectedCategory }
        setSelectedCategory={ setSelectedCategory }
        clearFilters={ clearFilters }
      />
      <div>
        <h1>Drink Recipes</h1>
        {drinks.slice(0, 12).map((drink, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
