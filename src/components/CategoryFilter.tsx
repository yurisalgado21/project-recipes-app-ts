import { useState, useEffect } from 'react';

type CategoryFilterProps = {
  isCategory: boolean;
};

function CategoryFilter({ isCategory } : CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const endpoint = isCategory ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
          : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

        const response = await fetch(endpoint);
        const data = await response.json();
        const firstFiveCategories = data.fiveCategories.slice(0, 5)
          .map((category: any) => category.strCategory);
        setCategories(firstFiveCategories);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategories();
  }, [isCategory]);
  return (
    <div>
      {categories.map((categoryName, index) => (
        <button
          key={ index }
          data-testid={ `${categoryName}-category-filter` }
        >
          {categoryName}
        </button>
      ))}
    </div>
  );
}
export default CategoryFilter;
