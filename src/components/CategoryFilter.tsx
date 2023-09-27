import { useState, useEffect } from 'react';

type CategoryFilterProps = {
  isCategory: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  clearFilters: () => void;

};

function CategoryFilter({
  isCategory,
  selectedCategory,
  setSelectedCategory,
  clearFilters,
  // toggleFilter,
} : CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);

  const handleCategoryClick = (categoryName: string) => {
    console.log('Cliquei em:', categoryName);
    if (selectedCategory === categoryName) {
      clearFilters();
    } else { setSelectedCategory(categoryName); }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const endpoint = isCategory ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
          : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        const firstFiveCategories = data[isCategory ? 'meals' : 'drinks'].slice(0, 5)
          .map((category: any) => category.strCategory);
        setCategories(firstFiveCategories);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategories();
  }, [isCategory, selectedCategory]);
  return (
    <div>
      <button data-testid="All-category-filter" onClick={ clearFilters }>
        All
      </button>
      {categories.map((categoryName, index) => {
        return (
          <button
            key={ index }
            data-testid={ `${categoryName}-category-filter` }
            onClick={ () => {
              handleCategoryClick(categoryName);
            } }

          >
            {categoryName}
          </button>

        );
      })}
    </div>
  );
}
export default CategoryFilter;
