import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { DrinkTypes } from '../types';
import CategoryFilter from './CategoryFilter';
import DataContext from '../context/DataContext';

export default function Drinks() {
  const { resultDrinks } = useContext(DataContext);
  const isDrinks = window.location.pathname.includes('/drinks');
  const [drinks, setDrinks] = useState<DrinkTypes[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  const clearFilters = () => {
    setSelectedCategory('');
    setIsFilterActive(false);
  };

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        let endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        if (selectedCategory) {
          endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        } else if (isFilterActive) {
          endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        }
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.drinks && data.drinks.length === 0) {
          setDrinks(data);
        } else {
          setDrinks(data.drinks);
        }
      } catch (error) {
        console.error('Erro ao buscar receitas de bebidas:', error);
      }
    };
    fetchDrinks();
  }, [selectedCategory, isFilterActive]);

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
        {isDrinks && resultDrinks?.length === 0
         && drinks.slice(0, 12).map((drink, index) => {
           return (
             <div key={ index } data-testid={ `${index}-recipe-card` }>
               <Link to={ `/drinks/${drink.idDrink}` }>
                 <img
                   src={ drink.strDrinkThumb }
                   alt={ drink.strDrink }
                   data-testid={ `${index}-card-img` }
                 />
                 <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
               </Link>
             </div>
           );
         })}
      </div>
    </div>
  );
}
