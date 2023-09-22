import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';
import CategoryFilter from './CategoryFilter';

function Recipes() {
  const location = useLocation();
  const isMealsRoute = location.pathname === '/meals';
  const [selectedCategory, setSelectedCategory] = useState('')
  
  return (
    <div>
      <h1>{isMealsRoute ? 'Meals' : 'Drinks'}</h1>
      <CategoryFilter
        isCategory={ isMealsRoute } 
        selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      />
      {isMealsRoute ? <Meals /> : <Drinks />}
     
    </div>
  );
}

export default Recipes;
