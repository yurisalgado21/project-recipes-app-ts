import React from 'react';
import { useLocation } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';

function Recipes() {
  const location = useLocation();
  const isMealsRoute = location.pathname === '/meals';
  //   const isDrinksRoute = location.pathname === '/drinks';
  return (
    <div>
      <h1>{isMealsRoute ? 'Meals' : 'Drinks'}</h1>
      {isMealsRoute ? <Meals /> : <Drinks />}
      {/*
      <h1>{isDrinksRoute ? 'Drinks' : 'Meals'}</h1>
      {isDrinksRoute ? <Drinks /> : <Meals />} */}
    </div>
  );
}

export default Recipes;
