import React, { useState } from 'react';

function IngredientList({ recipe }: any) {
  const [checked, setChecked] = useState<boolean[]>([]);

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

  const handleCheckboxChange = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !checked[index];
    setChecked(newChecked);
  };

  const ingredientsList = extractIngredients();
  return (
    <ul>
      {ingredientsList.map((ingredient, index): any => (
        <li key={ index }>
          <label
            data-testid={ `${index}-ingredient-step` }
            style={ { textDecoration: checked[index]
              ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
          >
            <input
              type="checkbox"
              checked={ checked[index] }
              onChange={ () => handleCheckboxChange(index) }
            />
            {ingredient}
          </label>
        </li>
      ))}
    </ul>
  );
}
export default IngredientList;
