export interface GlobalTypeContext {
  result: MealsApiType[] | undefined;
  getApiFetch: (searchType: string, param: string, url: string) => Promise<void>;
}

export interface MealsApiType {
  idMeal: string;
  strMeal: string;
  strCategory: string;
}
