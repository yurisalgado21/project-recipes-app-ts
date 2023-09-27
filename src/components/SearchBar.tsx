import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import { DrinkApiTypes, MealsApiType } from '../types';
import RecipeCard from './RecipeCard';

export default function SearchBar() {
  const isMeals = window.location.pathname.includes('/meals');
  const isdrink = window.location.pathname.includes('/drinks');
  const [inputForm, setInputForm] = useState({
    inputText: '',
    searchType: '',
  });
  const { result, getApiFetch,
    resultDrinks, getApiFetchDrinks } = useContext(DataContext);
  const navigate = useNavigate();
  // const location = useLocation();
  const [inputRadio, setInputRadio] = useState('ingredient');

  const handleChangeInput = (event:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputRadio(target.value);
  };

  useEffect(() => {
    if (result?.length === 1) {
      navigate(`/meals/${result[0].idMeal}`);
    }
    if (isMeals && !result) {
      console.log(result, 'ele ta aqui');
      window.alert("Sorry, we haven't found any recipes for these filters.");
    }
    if (resultDrinks?.length === 1) {
      navigate(`/drinks/${resultDrinks[0].idDrink}`);
    }
    if (isdrink && resultDrinks === null) {
      console.log(resultDrinks, 'ou ele ta aqui');
      window.alert("Sorry, we haven't found any recipes for these filters.");
    }
  }, [result, resultDrinks, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isMealsPage = window.location.pathname.includes('/meals');
    // console.log(isMealsPage);
    if (inputRadio === 'ingredient') {
      if (isMealsPage) {
        getApiFetch('filter.php?i', inputForm.inputText
          .replaceAll(' ', ''), 'themealdb');
      }
      getApiFetchDrinks('filter.php?i', inputForm.inputText
        .replaceAll(' ', ''), 'thecocktaildb');
    }
    if (inputRadio === 'name') {
      if (isMealsPage) {
        getApiFetch('search.php?s', inputForm.inputText
          .replaceAll(' ', ''), 'themealdb');
      }
      getApiFetchDrinks('search.php?s', inputForm.inputText
        .replaceAll(' ', ''), 'thecocktaildb');
    }
    if (inputRadio === 'firstLetter') {
      if (inputForm.inputText.length === 1) {
        if (isMealsPage) {
          getApiFetch('search.php?f', inputForm.inputText
            .replaceAll(' ', ''), 'themealdb');
        } else {
          getApiFetchDrinks('search.php?f', inputForm.inputText
            .replaceAll(' ', ''), 'thecocktaildb');
        }
      }
      window.alert('Your search must have only 1 (one) character');
    }
  };

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="inputText"
          placeholder="Pesquisar"
          data-testid="search-input"
          value={ inputForm.inputText }
          onChange={ handleChangeInput }
        />
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            value="ingredient"
            required
            name="searchType"
            onChange={ handleChange }
            checked={ inputRadio === 'ingredient' }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            value="name"
            required
            name="searchType"
            onChange={ handleChange }
            checked={ inputRadio === 'name' }
          />
        </label>
        <label htmlFor="firstLetter">
          First Letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            required
            name="searchType"
            onChange={ handleChange }
            checked={ inputRadio === 'firstLetter' }
          />
        </label>
        <button data-testid="exec-search-btn">search</button>
      </form>
      {result?.length !== 0 ? (
        <div>
          <ul>
            {result?.slice(0, 12).map((recipe: MealsApiType, index) => {
              return (
                console.log(recipe, 'oi eu aqui! o meals'),
                  <RecipeCard
                    key={ index }
                    image={ recipe.strMealThumb }
                    name={ recipe.strMeal }
                    index={ index }
                  />
              );
            })}
          </ul>
        </div>
      ) : (
        resultDrinks?.length !== 0 && (
          <div>
            <ul>
              {resultDrinks?.slice(0, 12).map((recipe: DrinkApiTypes, index) => {
                return (
                  console.log(recipe, 'oi eu aqui o drinks!'),
                    <RecipeCard
                      key={ index }
                      image={ recipe.strDrinkThumb }
                      name={ recipe.strDrink }
                      index={ index }
                    />
                );
              })}
            </ul>
          </div>
        )
      )}
    </>
  );
}
