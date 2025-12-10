import { useEffect, useState } from "react";
import Recipes from "../components/Recipes";
import SuzonHero from "../components/SuzonHero";
import SuzonNavbar from "../components/SuzonNavbar";
import SuzonRecipeModal from "../components/SuzonRecipeModal";
import {
  fetchMealCategories,
  fetchMealsByCategory,
  searchMealsByName,
  fetchMealDetails,
} from "../utils/api";
import "./Suzon.css";

const Suzon = () => {
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [meals, setMeals] = useState([]);
  const [mealsLoading, setMealsLoading] = useState(false);
  const [mealsError, setMealsError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchMealCategories();
        setDatas(categories);
        if (categories.length) setSelectedCategory(categories[0].strCategory);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadMeals = async () => {
      if (!selectedCategory && !searchTerm.trim()) return;
      setMealsLoading(true);
      setMealsError(null);
      try {
        const query = searchTerm.trim();
        const data = query
          ? await searchMealsByName(query)
          : await fetchMealsByCategory(selectedCategory);
        setMeals(data);
      } catch (err) {
        setMealsError(err.message || "Impossible de charger les recettes");
      } finally {
        setMealsLoading(false);
      }
    };
    loadMeals();
  }, [selectedCategory, searchTerm]);

  const handleCategoryClick = (category) => {
    setSearchTerm("");
    setSelectedCategory(category);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleOpenMeal = async (mealId) => {
    setDetailLoading(true);
    setDetailError(null);
    setSelectedMeal(null);
    try {
      const details = await fetchMealDetails(mealId);
      setSelectedMeal(details);
    } catch (err) {
      setDetailError(err.message || "Impossible de charger la recette");
    } finally {
      setDetailLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setDetailError(null);
    setDetailLoading(false);
  };
  return (
    <div className="suzon-page">
      <SuzonHero />
      <SuzonNavbar
        categories={datas}
        loading={loading}
        error={error}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryClick}
      />
      <Recipes
        meals={meals}
        loading={mealsLoading}
        error={mealsError}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSelectMeal={handleOpenMeal}
      />
      <SuzonRecipeModal
        meal={selectedMeal}
        loading={detailLoading}
        error={detailError}
        onClose={closeModal}
      />
    </div>
  );
};
export default Suzon;