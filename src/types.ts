export interface GlobalTypeContext {
  result: MealsApiType[] | undefined;
  getApiFetch: (searchType: string, param: string, url: string) => Promise<void>;
  resultDrinks: DrinkApiTypes[] | undefined;
  getApiFetchDrinks: (searchType: string, param: string, url: string) => Promise<void>;
  handleMealNavigation: (resultMeals: MealsApiType[], navigate: any) => void;
  handleMealError: (isMeals: boolean, resultMeals: MealsApiType[]) => void;
  handleDrinkNavigation: (resultsDrinks: DrinkApiTypes[], navigate: any) => void;
  handleDrinkError: (isDrinks: boolean, resultsDrinks: DrinkApiTypes[]) => void;
  renderMealRecipes: (resultMeal: MealsApiType[]) => JSX.Element[];
  renderDrinkRecipes: (resultDrink: DrinkApiTypes[]) => JSX.Element[];
  handleMealSearch: (isMealsPage: boolean,
    inputForm: InputFormType, inputRadio: string,
    getApiFetchMeal: GetApiFetchType) => void;
  handleDrinkSearch: (inputForm: InputFormType,
    inputRadio: string, getApiFetchDrink: GetApiFetchDrinksType) => void;
}

type InputFormType = {
  inputText: string;
  searchType: string;
};

type GetApiFetchType = (searchType: string, param: string, url: string) => Promise<void>;
type GetApiFetchDrinksType = (searchType: string,
  param: string, url: string) => Promise<void>;

export interface MealsApiType {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

export type DrinkApiTypes = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strDrinkThumb: string;
};

export type MealTypes = {
  idMeal:string;
  strMeal: string;
  strDrinkAlternate: string;
  strCategory:string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10:string;
  strMeasure11:string;
  strMeasure12:string;
  strMeasure13:string;
  strMeasure14:string;
  strMeasure15:string;
  strMeasure16:string;
  strMeasure17:string;
  strMeasure18:string;
  strMeasure19:string;
  strMeasure20:string;
  strSource: string;
  strImageSource: null;
  strCreativeCommonsConfirmed: null,
  dateModified: null;
};

export type DrinkTypes = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: null;
  strTags: null;
  strVideo: null;
  strCategory: string;
  strIBA: null,
  strAlcoholic:string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string;
  strInstructionsDE: string;
  strInstructionsFR: string;
  strInstructionsIT: string;
  'strInstructionsZH-HANS': string | null;
  'strInstructionsZH-HANT': string | null;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2:string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: null;
  strIngredient8: null;
  strIngredient9: null;
  strIngredient10: null;
  strIngredient11: null;
  strIngredient12: null;
  strIngredient13: null;
  strIngredient14: null;
  strIngredient15: null;
  strMeasure1: string;
  strMeasure2: null;
  strMeasure3: null;
  strMeasure4: null;
  strMeasure5: null;
  strMeasure6: null;
  strMeasure7: null;
  strMeasure8: null;
  strMeasure9: null;
  strMeasure10: null;
  strMeasure11: null;
  strMeasure12: null;
  strMeasure13: null;
  strMeasure14: null;
  strMeasure15: null;
  strImageSource: null;
  strImageAttribution: null;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
};

export type ApiResultType = {
  [key: string]: string
};
// esse type pode provavelmente substituir os outros dois acima, pode ser usado para refatoração
