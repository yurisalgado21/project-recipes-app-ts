export default function StartButton(props: { rcpId: string }) {
  const { rcpId } = props;
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') as string);
  const doneIds = doneRecipes.map((e: any) => e.id);
  // console.log(doneRecipes.map((e: any) => e.id));
  if (!doneIds.includes(rcpId)) {
    return (
      <button
        className="start-btn"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    );
  }
}
