import { NavLink } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './style.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <NavLink to="/drinks">
        <img src={ drinkIcon } alt="Ícone de bebida" data-testid="drinks-bottom-btn" />
      </NavLink>
      <NavLink to="/meals">
        <img src={ mealIcon } alt="Ícone de bebida" data-testid="meals-bottom-btn" />
      </NavLink>
    </footer>
  );
}
