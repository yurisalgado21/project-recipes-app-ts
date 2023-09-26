import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import useRequestId from '../hooks/useRequestId';
import Carousel from './Carousel';
import shareIcon from '../images/shareIcon.svg'

export default function RecipeDetails() {
  const [isLinkCopied, setLinkCopied] = useState(false);
  const { pathname } = useLocation();
  const isMeal = pathname.includes('meals');
  const recipeId = pathname.split('/')[2];
  const { value, loading } = useRequestId(isMeal, recipeId);
  const ingredients = Object.keys(value)
    .filter((key) => key.includes('strIngredient'))
    .map((k) => value[k])
    .filter((v) => v !== null && v !== '');
  const measurements = Object.keys(value)
    .filter((key) => key.includes('strMeasure'))
    .map((k) => value[k])
    .filter((v) => v !== null && v !== '');

  if (loading) {
    return (
      <h2>Carregando...</h2>
    );
  }  

  const copyToClipboard = () => {
    const recipeLink = window.location.href; // Obtém o link da receita atual
    navigator.clipboard.writeText(recipeLink).then(() => {
      setLinkCopied(true); // Define o estado para indicar que o link foi copiado
    });
  };
  return (
    <>
      <img
        src={ value.strMealThumb || value.strDrinkThumb }
        alt="Foto da receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{value.strMeal || value.strDrink}</h1>      
      <h3 data-testid="recipe-category">
        {isMeal
          ? value.strCategory
          : value.strAlcoholic}
      </h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient} - ${measurements[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{value.strInstructions}</p>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/Ds1Jb8H5Sg8?si=Ck_njNoHIgrxtt_3"
        title="YouTube video player"
        allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;"
        allowFullScreen
      />      
      <Carousel />
      <div>
      <button
          data-testid="share-btn"
          onClick={copyToClipboard}
        >
          <img src={ shareIcon } alt="icon-share" />
        </button>
        {isLinkCopied && (
          <p data-testid="link-copied-message">Link copied!</p>
        )}
        <button
          data-testid="favorite-btn"
        >
          favoritar
        </button>
      </div>
    </>
  );
}
