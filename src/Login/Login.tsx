import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const INITITIAL_STATE_FORM = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const [form, setForm] = useState(INITITIAL_STATE_FORM);

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: form.email }));
    navigate('/meals');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  const { email, password } = form;
  return (
    <form
      onSubmit={ (e) => handleForm(e) }
    >
      <label htmlFor="email">
        Email:
      </label>
      <input
        type="email"
        id="email"
        data-testid="email-input"
        onChange={ (e) => handleChange(e) }
      />
      <label htmlFor="password">
        Senha:
      </label>
      <input
        type="password"
        id="password"
        data-testid="password-input"
        onChange={ (e) => handleChange(e) }
      />
      <button
        data-testid="login-submit-btn"
        disabled={
          !email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
          || password.length <= 6
        }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
