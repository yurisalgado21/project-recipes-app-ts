import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import { DrinkApiTypes, MealsApiType } from '../types';

export default function SearchBar() {
  const isMeals = window.location.pathname.includes('/meals');
  const isdrink = window.location.pathname.includes('/drinks');
  const [inputForm, setInputForm] = useState({
    inputText: '',
    searchType: '',
  });
  const { result, getApiFetch,
    resultDrinks, getApiFetchDrinks,
    handleMealNavigation, handleDrinkError,
    handleDrinkNavigation, handleMealError,
    renderDrinkRecipes, renderMealRecipes,
    handleDrinkSearch, handleMealSearch } = useContext(DataContext);
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
    handleMealNavigation(result as MealsApiType[], navigate);
    handleMealError(isMeals, result as MealsApiType[]);
    handleDrinkNavigation(resultDrinks as DrinkApiTypes[], navigate);
    handleDrinkError(isdrink, resultDrinks as DrinkApiTypes[]);
  }, [result, resultDrinks, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isMealsPage = window.location.pathname.includes('/meals');

    if (isMealsPage) {
      handleMealSearch(isMealsPage, inputForm, inputRadio, getApiFetch);
    }

    handleDrinkSearch(inputForm, inputRadio, getApiFetchDrinks);
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
          <ul>{renderMealRecipes(result as MealsApiType[])}</ul>
        </div>
      ) : (
        resultDrinks?.length !== 0 && (
          <div>
            <ul>{renderDrinkRecipes(resultDrinks as DrinkApiTypes[])}</ul>
          </div>
        )
      )}
    </>
  );
}
