export default function StartButton(props: { rcpId: string }) {
  const { rcpId } = props;
  const doneRecipes = localStorage.doneRecipes
    ? JSON.parse(localStorage.getItem('doneRecipes') as string)
    : [];

  const doneIds = doneRecipes.length > 0
    ? doneRecipes.map((e: any) => e.id)
    : [];
  // console.log(doneIds);
  const inProgress = localStorage.inProgressRecipes
    ? JSON.parse(localStorage.getItem('inProgressRecipes') as string)
    : { drinks: {}, meals: {} };

  // começar a desenvolver a lógica de como fazer o botão de continuar a receita
  // os ids das receitas em progresso são as chaves dos objetos no localStorage
  // um object.keys deve resolver com um includes() e acho que isso é tudo com o que tenho que me preocupar
  // gostaria de popular o localStorage para testar isso manualmente e ter c

  // console.log(inProgress);
  // if (Object.keys(inProgress.meals).includes(rcpId)) console.log('🍌');

  if (!doneIds.includes(rcpId)
        && !Object.keys(inProgress.meals || inProgress.drinks).includes(rcpId)) {
    console.log('a');
    return (
      <button
        className="start-btn"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    );
  } if (Object.keys(inProgress.meals || inProgress.drinks).includes(rcpId)) {
    console.log('b');
    return (
      <button
        className="start-btn"
        data-testid="start-recipe-btn"
      >
        Continue Recipe
      </button>
    );
  }
}
