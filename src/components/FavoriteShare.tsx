import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRequestId from '../hooks/useRequestId';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteShare() {
  const [isLinkCopied, setLinkCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { pathname } = useLocation();
  const isMeal = pathname.includes('meals');
  const recipeId = pathname.split('/')[2];
  const { value } = useRequestId(isMeal, recipeId);

  useEffect(() => {
    // Verifique se a receita já foi favoritada no localStorage
    const favoriteRecipesString = localStorage.getItem('favoriteRecipes');
    const existingFavoriteRecipes = favoriteRecipesString ? JSON
      .parse(favoriteRecipesString) : [];
    const isRecipeFavorited = existingFavoriteRecipes
      .some((recipe: any) => recipe.id === recipeId);
    setIsFavorited(isRecipeFavorited);
    setLinkCopied(false);
  }, [recipeId]);

  const copyToClipboard = () => {
    const recipeLink = window.location.href;
    navigator.clipboard.writeText(recipeLink.replace('/in-progress', '')).then(() => {
      setLinkCopied(true);
    });
  };

  const favoriteRecipe = {
    id: value.idMeal || value.idDrink,
    name: value.strMeal || value.strDrink,
    type: isMeal ? 'meal' : 'drink',
    nationality: value.strArea || '',
    category: value.strCategory || '',
    alcoholicOrNot: isMeal ? '' : value.strAlcoholic,
    image: value.strMealThumb || value.strDrinkThumb,
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);

    const favoriteRecipesString = localStorage.getItem('favoriteRecipes');
    const existingFavoriteRecipes = favoriteRecipesString ? JSON
      .parse(favoriteRecipesString) : [];

    if (isFavorited) {
      const updatedFavoriteRecipes = existingFavoriteRecipes
        .filter((recipe: any) => recipe.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    } else {
      const updatedFavoriteRecipes = [...existingFavoriteRecipes, favoriteRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    }
  };
  return (
    <div>
      <button
        data-testid="share-btn"
        onClick={ copyToClipboard }
      >
        <img
          src={ shareIcon }
          alt="icon-share"
        />
      </button>
      {isLinkCopied && (
        <p data-testid="link-copied-message">Link copied!</p>
      )}
      <button
        onClick={ toggleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
          alt="icon-heart"
        />
      </button>
    </div>
  );
}

export default FavoriteShare;
