import { useLocation, useNavigate } from 'react-router-dom';
import { ApiResultType } from '../../types';

export default function StartButton(props: { rcpId: string }) {
  const { rcpId } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toRedirect = `${pathname}/in-progress`;

  const doneRecipes = localStorage.doneRecipes
    ? JSON.parse(localStorage.getItem('doneRecipes') as string)
    : [];

  const doneIds = doneRecipes.length > 0
    ? doneRecipes.map((e: ApiResultType) => e.id)
    : [];

  const inProgress = localStorage.inProgressRecipes
    ? JSON.parse(localStorage.getItem('inProgressRecipes') as string)
    : { drinks: { }, meals: { } };

  const handleClick = () => {
    navigate(toRedirect);
  };

  if (Object.keys(inProgress.drinks || inProgress.meals).includes(rcpId)) {
    return (
      <button
        className="start-btn"
        onClick={ handleClick }
        data-testid="start-recipe-btn"
      >
        Continue Recipe
      </button>
    );
  } if (!doneIds.includes(rcpId)) {
    return (
      <button
        className="start-btn"
        onClick={ handleClick }
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    );
  }
}
