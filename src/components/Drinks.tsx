import React, { useState, useEffect } from 'react';
import Header from './Header';

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setDrinks(data.drinks);
      } catch (error) {
        console.error('Erro ao buscar receitas de comidas:', error);
      }
    };
    fetchDrinks();
  }, []);
  return (
    <div>
      <Header title="Drinks" showProfileIcon showSearchIcon />
      <div>
        <h1>Receitas de bebidas</h1>
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
