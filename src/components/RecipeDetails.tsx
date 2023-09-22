import { useLocation } from 'react-router-dom';
import useRequestId from '../hooks/useRequestId';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const isMeal = pathname.includes('meals');
  const recipeId = pathname.split('/')[2];
  const { value, loading } = useRequestId(isMeal, recipeId);
  console.log(value);

  if (loading) {
    return (
      <h2>Carregando...</h2>
    );
  }

  return (
    <>
      <img
        src={ value.strMealThumb || value.strDrinkThumb }
        alt="Foto da receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{value.strMeal || value.strDrink}</h1>
      <h3 data-testid="recipe-category">{value.strCategory}</h3>
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
    </>
  );
}
