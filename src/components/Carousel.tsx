import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useSearchAPIMeals from '../hooks/useSearchApi';

export default function Carousel() {
  const { pathname } = useLocation();
  const url = pathname.includes('meals')
    ? 'thecocktaildb' : 'themealdb';
  const api = useSearchAPIMeals();

  useEffect(() => {
    api.getApiFetch('search.php?s', '', url);
  }, []);

  // console.log(api.result.slice(0, 6));
  return (
    <p>carrosel aqui</p>
  );
}
