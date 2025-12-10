import { Link } from "react-router-dom";

const SuzonNavbar = ({ categories = [], loading, error, selectedCategory, onSelectCategory }) => (
  <div className="suzon-content">
    {loading ? (
      <p className="suzon-loading">Chargement…</p>
    ) : error ? (
      <p className="suzon-error">Erreur: {error}</p>
    ) : categories.length ? (
      <div className="suzon-grid">
        {categories.map((category) => (
          <Link
            key={category.idCategory}
            className={`suzon-card ${selectedCategory === category.strCategory ? "is-active" : ""}`}
            to="#"
            onClick={() => onSelectCategory?.(category.strCategory)}
          >
            <span className="suzon-card-text">{category.strCategory}</span>
          </Link>
        ))}
      </div>
    ) : (
      <p className="suzon-empty">Aucune catégorie trouvée</p>
    )}
  </div>
);

export default SuzonNavbar;
