import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import vi from 'vitest';
import App from '../App';
import { renderWithRouter } from '../utils/renderWithRouter';
import Login from '../Login/Login';
// import * as funcs from '../Login/index';

test('Farewell, front-end', () => {
  it('teste referentes a renderização dos elementos da tela Login', () => {
    render(<Login />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const inputPassword = screen.getByRole('textbox', {
      name: /senha:/i,
    });
    const button = screen.getByRole('button', {
      name: /enter:/i,
    });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('testes de verificação de preenchimento de dados e redirecionamento de página.', async () => {
    render(<Login />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const inputPassword = screen.getByRole('textbox', {
      name: /senha:/i,
    });
    const button = screen.getByRole('button', {
      name: /enter:/i,
    });
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, 'joaozin@gmail.com');
    userEvent.type(inputPassword, '1234567');
    expect(button).toBeEnabled();
    userEvent.click(button);
  });
  it('testes de verificação de preenchimento de dados de forma incorreta.', async () => {
    render(<Login />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const inputPassword = screen.getByRole('textbox', {
      name: /senha:/i,
    });
    const button = screen.getByRole('button', {
      name: /enter:/i,
    });
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, 'joaozin@gmail');
    userEvent.type(inputPassword, '1234567');
    expect(button).toBeDisabled();
    userEvent.click(button);
  });
});
