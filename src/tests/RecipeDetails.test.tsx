import { screen, waitFor } from '@testing-library/dom';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import DataProvider from '../context/DataProvider';
import doneRecipes from '../utils/DoneRecipesMock';

describe('Testes do componente RecipeDetails', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });
  afterEach(() => {
    renderWithRouter(<App />);
  });

  it('teste se o componenente é renderizado corretamente', async () => {
    renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
      { route: '/meals/52771' },
    );
    expect(JSON.parse(localStorage.getItem('doneRecipes') || '[]')).toEqual(doneRecipes);

    const recipeImg = await waitFor(() => screen.getByAltText(/Imagem ilustrativa da receita/i));
    const recipeTitle = await waitFor(() => screen.getByText(/Spicy Arrabiata Penne/i));
    const recipeCategory = await waitFor(() => screen.getByText(/Vegetarian/i));
    const startBtn = await waitFor(() => screen.queryByText(/Start Recipe/i));

    expect(recipeImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(startBtn).toBeNull();
  });

  it('teste se o componenente é renderizado corretamente', async () => {
    renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
      { route: '/drinks/17256' },
    );

    const recipeImg = await waitFor(() => screen.getByAltText(/Imagem ilustrativa da receita/i));
    const recipeTitle = await waitFor(() => screen.getByText(/Martinez 2/i));
    const isAlcoholic = await waitFor(() => screen.getByText(/Alcoholic/i));
    const startBtn = await waitFor(() => screen.getByRole('button', { name: /Start Recipe/i }));

    expect(recipeImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(isAlcoholic).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
  });
});
