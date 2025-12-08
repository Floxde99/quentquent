import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMealCategories } from "../utils/api";
import "./Suzon.css";

const Suzon = () => {
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchMealCategories();
        setDatas(categories);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);
  return (
    <div className="suzon-page">
      <div className="suzon-header">
        <h1 className="yolo">Suzon</h1>
      </div>
      <div className="suzon-content">
        {loading ? (
          <p className="suzon-loading">Chargement…</p>
        ) : error ? (
          <p className="suzon-error">Erreur: {error}</p>
        ) : datas.length ? (
          <div className="suzon-grid">
            {datas.map((category) => (
              <Link key={category.idCategory} className="suzon-card" to="#">
                <span className="suzon-card-text">{category.strCategory}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="suzon-empty">Aucune catégorie trouvée</p>
        )}
      </div>
      <meal></meal>
    </div>
  );
};
export default Suzon;