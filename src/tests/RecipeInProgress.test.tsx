import { screen } from '@testing-library/dom';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';

describe('Teste a tela de receita em progresso', () => {
  it('Verifica se é renderizado corretamente RecipeInProgress', () => {
    const recipeId = 52882;
    renderWithRouter(<App />, { route: `/meals/${recipeId}/in-progress` });

    const shareBtn = screen.getByRole('button', {
      name: /icon\-share/i
    });
    const favoriteBtn = screen.getByRole('button', {
      name: /icon\-heart/i
    })
    const finishBtn = screen.getByRole('button', {
      name: /finalizar/i
    })
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(finishBtn).toBeInTheDocument();
  });
  it('Deve carregar uma receita corretamente', async () => {
    renderWithRouter(<App />, { route: '/meals/52771' });

    expect(await screen.findByRole('heading', {
      name: /spicy arrabiata penne/i
    })).toBeInTheDocument();
  });
  it('Deve carregar um Drink corretamente', async () => {
    renderWithRouter(<App />, { route: '/drinks/178319' });

    expect(await screen.findByRole('heading', {
      name: /aquamarine/i
    })).toBeInTheDocument();
  });
});
