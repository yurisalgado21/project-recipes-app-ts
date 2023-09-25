import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import '../utils/localStorage';
import doneRecipes from '../utils/DoneRecipesMock';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('testes da página DoneRecipes', () => {
  const DoneRecipes = 'done-recipes';

  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });
  afterEach(() => {
    renderWithRouter(<App />);
  });

  it('vereficando se está renderizando os elementos', () => {
    renderWithRouter(<App />, { route: DoneRecipes });
    expect(JSON.parse(localStorage.getItem('doneRecipes') || '[]')).toEqual(doneRecipes);
    const imageSpicy = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const nameSpicy = screen.getByRole('heading', {
      name: /spicy arrabiata penne/i,
    });
    const imageAquamarine = screen.getByRole('img', {
      name: /aquamarine/i,
    });
    expect(imageSpicy).toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
    expect(nameSpicy).toBeInTheDocument();
  });
  it('testando rotas', async () => {
    renderWithRouter(<App />, { route: DoneRecipes });
    expect(JSON.parse(localStorage.getItem('doneRecipes') || '[]')).toEqual(doneRecipes);
    const imageSpicy = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    expect(imageSpicy).toBeInTheDocument();
    await userEvent.click(imageSpicy);
    expect(imageSpicy).not.toBeInTheDocument();
  });

  it('testando filter Meals', async () => {
    renderWithRouter(<App />, { route: DoneRecipes });
    expect(JSON.parse(localStorage.getItem('doneRecipes') || '[]')).toEqual(doneRecipes);

    const imageSpicy = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const imageAquamarine = screen.getByRole('img', {
      name: /aquamarine/i,
    });
    const btnMeals = screen.getByRole('button', {
      name: /meals/i,
    });
    expect(imageSpicy).toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
    await userEvent.click(btnMeals);
    expect(imageAquamarine).not.toBeInTheDocument();
    expect(imageSpicy).toBeInTheDocument();
  });

  it('testando filter Drinks', async () => {
    renderWithRouter(<App />, { route: DoneRecipes });
    expect(JSON.parse(localStorage.getItem('doneRecipes') || '[]')).toEqual(doneRecipes);

    const imageSpicy = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const imageAquamarine = screen.getByRole('img', {
      name: /aquamarine/i,
    });
    const btnDrinks = screen.getByRole('button', {
      name: /drinks/i,
    });

    expect(imageSpicy).toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
    await userEvent.click(btnDrinks);
    expect(imageSpicy).not.toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
  });

  it('testando botão de copiar', async () => {
    renderWithRouter(<App />, { route: DoneRecipes });
    expect(JSON.parse(localStorage.getItem('doneRecipes') || '[]')).toEqual(doneRecipes);
    const btnCopy = screen.getByTestId('btn-Copy0');
    await userEvent.click(btnCopy);
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
  });

  it('testando filter All', async () => {
    renderWithRouter(<App />, { route: DoneRecipes });
    expect(JSON.parse(localStorage.getItem('doneRecipes') || '[]')).toEqual(doneRecipes);

    const imageSpicy = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const imageAquamarine = screen.getByRole('img', {
      name: /aquamarine/i,
    });
    const btnDrinks = screen.getByRole('button', {
      name: /drinks/i,
    });

    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(imageSpicy).toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
    await userEvent.click(btnDrinks);
    expect(imageSpicy).not.toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();

    await userEvent.click(btnAll);

    expect(screen.queryByRole('heading', {
      name: /spicy arrabiata penne/i,
    })).toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      name: /aquamarine/i,
    })).toBeInTheDocument();
  });
});
