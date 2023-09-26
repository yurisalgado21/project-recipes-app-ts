import { screen, waitForElementToBeRemoved, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import blackHeartIcon from '../images/blackHeartIcon.svg';

describe('RecipeDetails', () => {
  const url = '/meals/52771';
  it('Deve carregar uma receita quando não estiver favoritada', async () => {
    renderWithRouter(<App />, { route: url });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando.../i));
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
  });

  it('Verifica se é renderizado um componente Copyed Link ao clicar no btn compartilhar', async () => {
    renderWithRouter(<App />, { route: url });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando.../i));
    const shareButton = await screen.findByTestId('share-btn');
    await userEvent.click(shareButton);
    const copied = screen.getByText(/link copied!/i);

    expect(copied).toBeInTheDocument();
  });
  it('Deve alternar entre favoritar e desfavoritar', async () => {
    renderWithRouter(<App />, { route: url });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando.../i));
    const favoriteButton = screen.getByRole('button', {
      name: /icon-heart/i,
    });
    await userEvent.click(favoriteButton);

    expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', blackHeartIcon);
  });

  it('Verifica se atualizar o localStorage', async () => {
    localStorage.clear();
    const localstorage = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
    ];
    renderWithRouter(<App />, { route: url });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando.../i));
    const favoriteButton = screen.getByRole('button', {
      name: /icon-heart/i,
    });
    await userEvent.click(favoriteButton);

    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const existingFavoriteRecipes = favoriteRecipes ? JSON
      .parse(favoriteRecipes) : [];

    expect(existingFavoriteRecipes).toEqual(localstorage);

    await act(async () => {
      await userEvent.click(favoriteButton);
      const favoriteRecipesUpdate = localStorage.getItem('favoriteRecipes');
      const updateFavoriteRecipes = favoriteRecipesUpdate ? JSON
        .parse(favoriteRecipesUpdate) : [];
      expect(updateFavoriteRecipes).toEqual([]);
    });
  });
});
