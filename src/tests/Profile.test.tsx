import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../utils/renderWithRouter';

const emailTest = 'joaozin@gmail.com';
const testIdEmail = 'profile-email';

describe('Testes do componente Profile', () => {
  it('testando direto no Profile', () => {
    renderWithRouter(<App />, { route: '/profile' });
    expect(screen.getByTestId(testIdEmail)).toBeInTheDocument();
  });
  it('verificando se está renderizando todos os elementos', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const inputPassword = screen.getByLabelText(/senha:/i);
    const button = screen.getByText(/enter/i);
    await userEvent.type(inputEmail, emailTest);
    await userEvent.type(inputPassword, '1234567');
    await userEvent.click(button);

    const btnProfile = screen.getByRole('img', {
      name: /perfil/i,
    });
    await userEvent.click(btnProfile);

    const email = screen.getByTestId(testIdEmail);
    const btnDoneRecipes = screen.getByRole('button', {
      name: /done recipes/i,
    });
    const btnFavorite = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    const btnLogout = screen.getByRole('button', {
      name: /logout/i,
    });

    expect(email).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      name: /joaozin@gmail\.com/i,
    })).toBeInTheDocument();
    expect(btnDoneRecipes).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  });

  it('verificando se volta para tela de Login', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const inputPassword = screen.getByLabelText(/senha:/i);
    const button = screen.getByText(/enter/i);
    await userEvent.type(inputEmail, emailTest);
    await userEvent.type(inputPassword, '1234567');
    await userEvent.click(button);

    const btnProfile = screen.getByRole('img', {
      name: /perfil/i,
    });
    await userEvent.click(btnProfile);

    const email = screen.getByTestId(testIdEmail);
    const btnLogout = screen.getByRole('button', {
      name: /logout/i,
    });
    expect(email).toBeInTheDocument();
    await userEvent.click(btnLogout);

    const newInputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    expect(newInputEmail).toBeInTheDocument();
  });

  it('testando o botão de Done', async () => {
    renderWithRouter(<App />, { route: '/profile' });
    const btnDone = screen.getByRole('button', {
      name: /done recipes/i,
    });
    await userEvent.click(btnDone);
    expect(screen.getByRole('heading', {
      name: /done recipes/i,
    })).toBeInTheDocument();
  });

  it('testando o botão de Favorite', async () => {
    renderWithRouter(<App />, { route: '/profile' });
    const btnFavorite = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    await userEvent.click(btnFavorite);
    expect(screen.getByRole('heading', {
      name: /favorite recipes/i,
    })).toBeInTheDocument();
  });
});
