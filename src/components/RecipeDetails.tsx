import { useLocation } from 'react-router-dom';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      <h1>Detalhes da receita</h1>
      <h3>{pathname.includes('meals') ? 'comida' : 'bebida'}</h3>
    </>
  );
}
