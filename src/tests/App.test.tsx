import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../utils/renderWithRouter';
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
  // test('Testando o input button click na rota /meals', () => {
  //   const { user } = renderWithRouter(<App />, { route: '/meals' });
  //   expect(screen.getByRole('heading', {
  //     name: /meals/i,
  //   })).toBeInTheDocument();
  //   const button = screen.getByRole('button', {
  //     name: /pesquisar/i,
  //   });
  //   expect(button).toBeInTheDocument();
  //   user.click(button);
  //   expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  //   user.click(button);
  // });

  // test('toggle search input in Header when clicking the search button', () => {
  //   render(<Meals />);
  //   const searchButton = screen.getByTestId('search-top-btn');
  //   const searchInput = screen.getByTestId('search-input');

  //   // Verifique se o input de busca não é exibido inicialmente
  //   expect(searchInput).not.toBeVisible();

  //   // Clique no botão de busca usando userEvent
  //   userEvent.click(searchButton);

  //   // Verifique se o input de busca agora é visível
  //   expect(searchInput).toBeVisible();

  //   // Clique novamente no botão de busca usando userEvent
  //   userEvent.click(searchButton);

  //   // Verifique se o input de busca foi ocultado novamente
  //   expect(searchInput).not.toBeVisible();
  // });
});
