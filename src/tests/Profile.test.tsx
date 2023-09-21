import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from '../utils/renderWithRouter';
import * as math from '../components/Profile';

describe('Testes do componente Profile', () => {
  const emailTest = 'joaozin@gmail.com';
  it('verificando se está renderizando todos os elementos', async () => {
    const mockEmail = vi.spyOn(math, 'default');
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

    const email = screen.getByTestId('profile-email');
    const btnDoneRecipes = screen.getByRole('button', {
      name: /done recipes/i,
    });
    const btnFavorite = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    const btnLogout = screen.getByRole('button', {
      name: /logout/i,
    });
    expect(mockEmail).toHaveBeenCalled();
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

    const email = screen.getByTestId('profile-email');
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
});
