import DataContext from './DataContext';
import useSearchAPIMeals from '../hooks/useSearchApi';

type DataProviderProps = {
  children: React.ReactNode;
};

function DataProvider({ children }: DataProviderProps) {
  const { result, getApiFetch } = useSearchAPIMeals();
  const context = {
    result,
    getApiFetch,
  };
  return (
    <DataContext.Provider value={ context }>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
