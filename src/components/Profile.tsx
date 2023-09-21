import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Profile() {
  const [email, setEmail] = useState(() => {
    const data = JSON.parse(localStorage.getItem('user') || '[]');
    return data.email;
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('user', JSON.stringify({ email: null }));
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    navigate('/');
  };

  return (
    <div>
      <Header title="Profile" showProfileIcon showSearchIcon={ false } />
      <section>
        <h4 data-testid="profile-email">{email}</h4>
        <div>
          <button
            data-testid="profile-done-btn"
            onClick={ () => navigate('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => navigate('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}

export default Profile;
