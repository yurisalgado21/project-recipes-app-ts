import { createContext } from 'react';
import { MealsApiType, GlobalTypeContext } from '../types';

const DataContext = createContext({} as GlobalTypeContext);

export default DataContext;
