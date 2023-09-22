import React from 'react';
import { screen } from '@testing-library/dom';
import Recipes from '../components/Recipes';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('Testes do componente "Recipes"', () => {
  it('Testa se a rota "/meals" é renderizada corretamente', () => {
    renderWithRouter(<Recipes />, { route: '/meals' });
    const titleMeals = screen.getByRole('heading', { name: /meal recipes/i });
    expect(titleMeals).toBeInTheDocument();
  });
  it('Testa se a rota "/drinks" é renderizada corretamente', () => {
    renderWithRouter(<Recipes />, { route: '/drinks' });
    const titleDrinks = screen.getByRole('heading', { name: /drink recipes/i });
    expect(titleDrinks).toBeInTheDocument();
  });
});
