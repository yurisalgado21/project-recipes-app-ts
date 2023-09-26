import DataContext from './DataContext';
import useSearchAPIMeals from '../hooks/useSearchApi';
import { useSearchAPIDrinks } from '../hooks/useSearchApiDrinks';

type DataProviderProps = {
  children: React.ReactNode;
};

function DataProvider({ children }: DataProviderProps) {
  const { result, getApiFetch } = useSearchAPIMeals();
  const { resultDrinks, getApiFetchDrinks } = useSearchAPIDrinks();
  const context = {
    result,
    getApiFetch,
    resultDrinks,
    getApiFetchDrinks,
  };
  return (
    <DataContext.Provider value={ context }>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
