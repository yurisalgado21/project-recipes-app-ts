import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';

export default function SearchBar() {
  const [inputForm, setInputForm] = useState({
    inputText: '',
    searchType: '',
  });
  const { result, getApiFetch } = useContext(DataContext);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRadio === 'ingredient') {
      getApiFetch('filter.php?i', inputForm.inputText
        .replaceAll(' ', '').toLowerCase(), 'themealdb');
    }
    if (inputRadio === 'name') {
      getApiFetch('search.php?s', inputForm.inputText
        .replaceAll(' ', '').toLowerCase(), 'themealdb');
    }
    if (inputRadio === 'firstLetter' && inputForm.inputText.length > 1
     && result !== null) {
      window.alert('Your search must have only 1 (one) character');
    } else {
      getApiFetch('search.php?f', inputForm.inputText
        .replaceAll(' ', '').toLowerCase(), 'themealdb');
    }

    if (result?.length === 1) {
      navigate(`/meals/${result[0].idMeal}`);
    }
    if (result === null) {
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  return (
    <>
      <div>SearchBar</div>
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
    </>
  );
}
