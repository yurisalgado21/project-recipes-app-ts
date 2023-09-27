import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';

export default function SearchBar() {
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
    if (result === null) {
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (resultDrinks?.length === 1) {
      navigate(`/drinks/${resultDrinks[0].idDrink}`);
    }
    if (resultDrinks === null) {
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
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
  );
}
