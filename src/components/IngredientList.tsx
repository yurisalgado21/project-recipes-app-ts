import React, { useState, useEffect } from 'react';

function IngredientList({ recipe, inProgressRecipes, recipeId }: any) {
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

    const inProgressRecipeData = { ...inProgressRecipes };
    inProgressRecipeData[recipeId] = newChecked;

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipeData));
  };

  const ingredientsList = extractIngredients();

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    const initialCheckedState = savedProgress[recipeId] || [];
    setChecked(initialCheckedState);
  }, [recipeId]);

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
