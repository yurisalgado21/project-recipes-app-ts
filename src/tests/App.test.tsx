import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../utils/renderWithRouter';
import DataProvider from '../context/DataProvider';
// import Header from '../components/Header';
// import Meals from '../components/Meals';

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
  test('Testando o input button click na rota /meals', async () => {
    renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
      { route: '/meals' },
    );
    expect(screen.getByRole('heading', {
      name: /meals/i,
    })).toBeInTheDocument();
    const button = screen.getByTestId('search-top-btn');
    console.log(button);
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(screen.getByTestId('search-input')).toBeVisible();
    await userEvent.click(button);
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    await userEvent.click(button);
    const inputText = screen.getByPlaceholderText(/Pesquisar/i);
    const inputRadioIngredient = screen.getByText(/ingredient/i);
    const inputRadioName = screen.getByText(/name/i);
    const inputRadioFirstLetter = screen.getByText(/first letter/i);
    const buttonSearch = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.type(inputText, 'chicken');
    await userEvent.click(inputRadioIngredient);
    await userEvent.click(buttonSearch);
  });
  test('Testando o input button click na rota /drinks', async () => {
    renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
      { route: '/drinks' },
    );
    expect(screen.getByRole('heading', {
      name: /drinks/i,
    })).toBeInTheDocument();
    const button = screen.getByTestId('search-top-btn');
    await userEvent.click(button);
    const inputText = screen.getByPlaceholderText(/Pesquisar/i);
    const inputRadioIngredient = screen.getByText(/ingredient/i);
    const inputRadioName = screen.getByText(/name/i);
    const inputRadioFirstLetter = screen.getByText(/first letter/i);
    const buttonSearch = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.type(inputText, 'gin');
    await userEvent.click(inputRadioIngredient);
    await userEvent.click(inputRadioFirstLetter);
    await userEvent.click(inputRadioName);
    await userEvent.click(buttonSearch);
  });
});
