import { screen } from '@testing-library/dom';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';

describe('Teste a tela de receita em progresso', () => {
  it('Verifica se o id 52882 leva a receita Three Fish Pie', () => {
    const recipeId = 52882;
    renderWithRouter(<App />, { route: `/meals/${recipeId}/in-progress` });

    const shareBtn = screen.getByRole('button', { name: /compartilhar/i });
    expect(shareBtn).toBeInTheDocument();
  });
});
