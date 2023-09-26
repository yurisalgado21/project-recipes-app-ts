import { useState } from 'react';
import { DrinkApiTypes } from '../types';

export const useSearchAPIDrinks = () => {
  const [resultDrinks, setResultDrinks] = useState<DrinkApiTypes[]>([]);

  const getApiFetchDrinks = async (searchType: string, param: string, url:string) => {
    try {
      const response = await fetch(`https://www.${url}.com/api/json/v1/1/${searchType}=${param}`);
      const { drinks } = await response.json();
      setResultDrinks(drinks);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return { resultDrinks, getApiFetchDrinks };
};

export default useSearchAPIDrinks;
