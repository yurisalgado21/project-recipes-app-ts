import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import shareIncon from '../images/shareIcon.svg';

function DoneRecipes() {
  type ListType = {
    id: string,
    type: string,
    nationality: string,
    category: string,
    alcoholicOrNot: string,
    name: string,
    image: string,
    doneDate: string,
    tags: string,
  };

  const [listDone, setListDone] = useState<ListType[]>([]);
  const [globlalListDone, setGlobalListDone] = useState<ListType[]>([]);
  const [copy, setCopy] = useState('');
  const [clicked, setClicked] = useState<number>();

  const handleDrinksFilter = () => {
    setListDone(globlalListDone.filter((list) => list.type !== 'meal'));
  };

  const handleMealsFilter = () => {
    setListDone(globlalListDone.filter((list) => list.type === 'meal'));
  };

  const handleCopy = (id: string, index: number, type: string) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`)
      .then(() => setCopy('Link copied!'))
      .catch(() => console.log('erro'));
    setClicked(index);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setListDone(data);
    setGlobalListDone(data);
  }, []);
  return (
    <div>
      <Header title="Done Recipes" showSearchIcon={ false } showProfileIcon />
      <section>
        <button
          onClick={ () => setListDone(globlalListDone) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ handleMealsFilter }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ handleDrinksFilter }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <section>
        {listDone.length > 0 ? (
          <>
            {listDone.map((list, index) => (
              <div key={ list.id }>
                <Link
                  to={ list.type === 'meal'
                    ? `/meals/${list.id}` : `/drinks/${list.id}` }
                >
                  <img
                    style={ { width: '200px', alignItems: 'center' } }
                    data-testid={ `${index}-horizontal-image` }
                    src={ list.image }
                    alt={ list.name }
                  />
                </Link>
                <h6 data-testid={ `${index}-horizontal-top-text` }>
                  { list.type === 'meal' ? (
                    <>
                      {list.nationality}
                      {' - '}
                      {list.category}
                    </>)
                    : <div>{list.alcoholicOrNot}</div>}
                </h6>
                <Link
                  to={ list.type === 'meal'
                    ? `/meals/${list.id}` : `/drinks/${list.id}` }
                >
                  <h5 data-testid={ `${index}-horizontal-name` }>
                    {list.name}
                  </h5>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {list.doneDate}
                </p>
                <button
                  data-testid={ `btn-Copy${index}` }
                  style={ { width: '150px' } }
                  onClick={ () => handleCopy(list.id, index, list.type) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIncon }
                    alt=""
                  />
                </button>
                { clicked === index && <span>{copy}</span> }
                <div>
                  <span data-testid={ `${index}-${list.tags[0]}-horizontal-tag` }>
                    {list.tags[0]}
                  </span>
                  {' '}
                  <span data-testid={ `${index}-${list.tags[1]}-horizontal-tag` }>
                    {list.tags[1]}
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : 'Nenhuma receita feita.'}
      </section>
    </div>
  );
}

export default DoneRecipes;
