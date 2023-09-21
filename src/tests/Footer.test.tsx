import { screen } from '@testing-library/dom';
import Footer from '../components/Footer';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('testa o componente Footer', () => {
  it('teste se o componenente é renderizado corretamente', () => {
    renderWithRouter(<Footer />, { route: '/meals' });

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');

    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });
});
