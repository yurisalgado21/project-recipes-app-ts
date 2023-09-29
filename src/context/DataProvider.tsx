import DataContext from './DataContext';
import useSearchAPIMeals from '../hooks/useSearchApi';
import { useSearchAPIDrinks } from '../hooks/useSearchApiDrinks';
import { DrinkApiTypes, MealsApiType } from '../types';
import RecipeCard from '../components/RecipeCard';

type DataProviderProps = {
  children: React.ReactNode;
};

type InputFormType = {
  inputText: string;
  searchType: string;
};

type GetApiFetchType = (searchType: string, param: string, url: string) => Promise<void>;
type GetApiFetchDrinksType = (searchType: string,
  param: string, url: string) => Promise<void>;

function DataProvider({ children }: DataProviderProps) {
  const { result, getApiFetch } = useSearchAPIMeals();
  const { resultDrinks, getApiFetchDrinks } = useSearchAPIDrinks();

  function handleMealNavigation(resultMeals: MealsApiType[], navigate: any) {
    if (resultMeals?.length === 1) {
      navigate(`/meals/${resultMeals[0].idMeal}`);
    }
  }

  function handleMealError(isMeals: boolean, resultMeals: MealsApiType[]) {
    if (isMeals && !resultMeals) {
      window.alert("Sorry, we haven't found any recipes for these filters.");
    }
  }

  function handleDrinkNavigation(resultsDrinks: DrinkApiTypes[], navigate: any) {
    if (resultsDrinks?.length === 1) {
      navigate(`/drinks/${resultsDrinks[0].idDrink}`);
    }
  }

  function handleDrinkError(isdrink: boolean, resultsDrinks: DrinkApiTypes[]) {
    if (isdrink && resultsDrinks === null) {
      window.alert("Sorry, we haven't found any recipes for these filters.");
    }
  }

  function renderMealRecipes(resultMeal: MealsApiType[]) {
    return resultMeal?.slice(0, 12).map((recipe: MealsApiType, index) => {
      return (
        <RecipeCard
          key={ index }
          image={ recipe.strMealThumb }
          name={ recipe.strMeal }
          index={ index }
        />
      );
    });
  }

  function renderDrinkRecipes(resultDrink: DrinkApiTypes[]) {
    return resultDrink?.slice(0, 12).map((recipe: DrinkApiTypes, index) => {
      return (
        <RecipeCard
          key={ index }
          image={ recipe.strDrinkThumb }
          name={ recipe.strDrink }
          index={ index }
        />
      );
    });
  }

  function handleMealSearch(
    isMealsPage: boolean,
    inputForm: InputFormType,
    inputRadio: string,
    getApiFetchMeal: GetApiFetchType,
  ) {
    if (isMealsPage && inputRadio === 'ingredient') {
      getApiFetchMeal(
        'filter.php?i',
        inputForm.inputText.replaceAll(' ', ''),

        'themealdb',
      );
    }
    if (isMealsPage && inputRadio === 'name') {
      getApiFetchMeal(
        'search.php?s',
        inputForm.inputText.replaceAll(' ', ''),

        'themealdb',
      );
    }
    if (inputForm.inputText.length === 1 && isMealsPage && inputRadio === 'firstLetter') {
      getApiFetchMeal(
        'search.php?f',
        inputForm.inputText.replaceAll(' ', ''),

        'themealdb',
      );
    }
    window.alert('Your search must have only 1 (one) character');
  }

  function handleDrinkSearch(
    inputForm: InputFormType,
    inputRadio: string,
    getApiFetchDrink: GetApiFetchDrinksType,
  ) {
    if (inputRadio === 'ingredient') {
      getApiFetchDrink(
        'filter.php?i',
        inputForm.inputText.replaceAll(' ', ''),

        'thecocktaildb',
      );
    }
    if (inputRadio === 'name') {
      getApiFetchDrink(
        'search.php?s',
        inputForm.inputText.replaceAll(' ', ''),

        'thecocktaildb',
      );
    }
    if (inputRadio === 'firstLetter') {
      if (inputForm.inputText.length === 1) {
        getApiFetchDrink(
          'search.php?f',
          inputForm.inputText.replaceAll(' ', ''),

          'thecocktaildb',
        );
      }
      window.alert('Your search must have only 1 (one) character');
    }
  }

  const context = {
    result,
    getApiFetch,
    resultDrinks,
    getApiFetchDrinks,
    handleMealNavigation,
    handleMealError,
    handleDrinkNavigation,
    handleDrinkError,
    renderMealRecipes,
    renderDrinkRecipes,
    handleMealSearch,
    handleDrinkSearch,
  };
  return (
    <DataContext.Provider value={ context }>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
