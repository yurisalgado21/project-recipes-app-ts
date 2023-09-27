import { useState } from 'react';
import { MealsApiType } from '../types';

const useSearchAPIMeals = () => {
  const [result, setResult] = useState<MealsApiType[]>([]);

  const getApiFetch = async (searchType: string, param: string, url:string) => {
    try {
      const response = await fetch(`https://www.${url}.com/api/json/v1/1/${searchType}=${param}`);
      const data = await response.json();
      //   console.log(searchName, searchType);
      setResult(data.meals || data.drinks);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  // fiz essa alteração na função pra que ao invés de returnar o meals desestruturado,
  // ela retorna tanto o meals quanto o drinks, assim funciona para os dois endpoints

  return { result, getApiFetch };
};
export default useSearchAPIMeals;

// export const searchAPIDrinks = () => {

// };
