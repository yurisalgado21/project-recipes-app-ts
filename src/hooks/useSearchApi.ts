import { useState } from 'react';
import { ApiResultType } from '../types';

const useSearchAPIMeals = () => {
  const [result, setResult] = useState<ApiResultType[]>([]);
  // Andrew:
  // troquei a tipagem pois essa possibilita usar todas as chaves

  const getApiFetch = async (searchType: string, param: string, url:string) => {
    const response = await fetch(`https://www.${url}.com/api/json/v1/1/${searchType}=${param}`);
    const data = await response.json();
    //   console.log(searchName, searchType);
    setResult(data.meals || data.drinks);
  };
  // Andrew:
  // fiz essa alteração na função pra que ao invés de returnar o meals desestruturado,
  // ela retorna tanto o meals quanto o drinks, assim funciona para os dois endpoints

  return { result, getApiFetch };
};
export default useSearchAPIMeals;

// export const searchAPIDrinks = () => {

// };
