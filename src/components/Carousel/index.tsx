import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useSearchAPIMeals from '../../hooks/useSearchApi';
import './style.css';

export default function Carousel() {
  const { pathname } = useLocation();
  const url = pathname.includes('meals')
    ? 'thecocktaildb' : 'themealdb';
  const api = useSearchAPIMeals();

  useEffect(() => {
    api.getApiFetch('search.php?s', '', url);
  }, []);

  return (
    <div>
      <div className="carousel-container">
        {api.result.slice(0, 6)
          .map((element, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              className="carousel-item"
              key={ index }
            >
              <img
                src={ element.strMealThumb || element.strDrinkThumb }
                alt="Imagem ilustrativa da receita"
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {element.strMeal || element.strDrink}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
