import Recipe from "./Recipe";

const Recipes = ({ meals = [], loading, error, searchTerm = "", onSearchChange, onSelectMeal }) => (
  <section className="recipes-section">
    <div className="recipes-bar">
      <input
        value={searchTerm}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder="Rechercher une recette"
        className="recipes-search"
        aria-label="Rechercher une recette"
      />
    </div>
    {loading ? (
      <p className="recipes-loading">Chargement…</p>
    ) : error ? (
      <p className="recipes-error">Erreur: {error}</p>
    ) : meals.length ? (
      <div className="recipes-grid">
        {meals.map((meal) => (
          <Recipe key={meal.idMeal} meal={meal} onSelect={onSelectMeal} />
        ))}
      </div>
    ) : (
      <p className="recipes-empty">Aucun résultat</p>
    )}
  </section>
);

export default Recipes;
