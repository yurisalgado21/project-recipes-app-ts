import { useState } from 'react';
import { MealsApiType } from '../types';

const useSearchAPIMeals = () => {
  const [result, setResult] = useState<MealsApiType[]>([]);

  const getApiFetch = async (searchType: string, param: string, url:string) => {
    const response = await fetch(`https://www.${url}.com/api/json/v1/1/${searchType}=${param}`);
    const { meals } = await response.json();
    //   console.log(searchName, searchType);
    setResult(meals);
  };

  return { result, getApiFetch };
};
export default useSearchAPIMeals;

// export const searchAPIDrinks = () => {

// };
