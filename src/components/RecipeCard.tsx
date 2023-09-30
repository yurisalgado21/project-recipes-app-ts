import React from 'react';

type RecipeCardProp = {
  image: string,
  name: string,
  index: number,
};

export default function RecipeCard({ image, name, index }: RecipeCardProp) {
  return (
    <div key={ index } data-testid={ `${index}-recipe-card` }>
      <img
        src={ image }
        data-testid={ `${index}-card-img` }
        alt={ name }
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}
