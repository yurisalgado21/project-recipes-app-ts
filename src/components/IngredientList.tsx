import React from 'react';

function IngredientList({ recipe }: any) {
  const extractIngredients = () => {
    const ingredients = [];
    for (let index = 1; index <= 20; index += 1) {
      const ingredient = recipe[`strIngredient${index}`];
      const measure = recipe[`strMeasure${index}`];

      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`);
      }
    }
    return ingredients;
  };
  const ingredientsList = extractIngredients();
  return (
    <ul>
      {ingredientsList.map((ingredient, index): any => (
        <li key={ index }>
          <label data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" />
            {ingredient}
          </label>
        </li>
      ))}
    </ul>
  );
}
export default IngredientList;
