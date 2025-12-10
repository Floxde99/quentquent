const SuzonRecipeModal = ({ meal, loading, error, onClose }) => {
  if (!meal && !loading && !error) return null;
  return (
    <div className="recipe-modal-wrapper">
      <div className="recipe-modal">
        <button onClick={onClose} className="recipe-modal-close" aria-label="Fermer">✕</button>
        {loading ? (
          <p className="recipes-loading">Chargement…</p>
        ) : error ? (
          <p className="recipes-error">Erreur: {error}</p>
        ) : meal ? (
          <>
            <h3 className="recipe-modal-title">{meal.strMeal}</h3>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-modal-image" />
            <p className="recipe-modal-text">{meal.strInstructions}</p>
          </>
        ) : null}
      </div>
      <div className="recipe-modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default SuzonRecipeModal;
