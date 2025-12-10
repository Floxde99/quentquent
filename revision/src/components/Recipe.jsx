const Recipe = ({ meal, onSelect }) => (
  <button className="recipe-card" onClick={() => onSelect?.(meal.idMeal)}>
    <div className="recipe-thumb-wrap">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-thumb" />
    </div>
    <div className="recipe-body">
      <h3 className="recipe-title">{meal.strMeal}</h3>
      <span className="recipe-action">Voir la recette →</span>
    </div>
  </button>
);
export default Recipe;
