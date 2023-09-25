import { useEffect, useState } from 'react';
import { ApiResultType } from '../types';

export default function useRequestId(isMeal: boolean, id: string) {
  const url = isMeal
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [value, setValue] = useState<ApiResultType>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setValue(isMeal ? data.meals[0] : data.drinks[0]);
        setLoading(false);
      });
  }, [url]);

  return { value, loading };
}
