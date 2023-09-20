import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('Farewell, front-end', () => {
  it('teste referentes a renderização dos elementos da tela Login', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const inputPassword = screen.getByLabelText(/senha:/i);
    const button = screen.getByText(/enter/i);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('testes de verificação de preenchimento de dados e redirecionamento de página.', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const inputPassword = screen.getByLabelText(/senha:/i);
    const button = screen.getByText(/enter/i);
    expect(button).toBeDisabled();
    await userEvent.type(inputEmail, 'joaozin@gmail.com');
    await userEvent.type(inputPassword, '1234567');
    expect(button).toBeEnabled();
    await userEvent.click(button);
    expect(inputEmail).not.toBeInTheDocument();
  });
  it('testes de verificação de preenchimento de dados de forma incorreta.', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const inputPassword = screen.getByLabelText(/senha:/i);
    const button = screen.getByText(/enter/i);
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, 'joaozin@gmail');
    userEvent.type(inputPassword, '123456');
    expect(button).toBeDisabled();
    userEvent.click(button);
  });
});
