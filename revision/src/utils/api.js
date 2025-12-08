

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_V4_BASE_URL = "https://api.themoviedb.org/4";
const MEAL_DB_BASE_URL = "https://www.themealdb.com/api/json/v1/1";


const getTMDBToken = () => (import.meta.env.VITE_TMDB_BEARER_TOKEN || "").trim();


export const fetchMovieDetails = async (movieId, language = "fr-FR") => {
  try {
    const token = getTMDBToken();
    if (!token) throw new Error("TMDB token not configured");

    const url = `${TMDB_BASE_URL}/movie/${movieId}?language=${encodeURIComponent(language)}`;
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};


export const fetchMovieCredits = async (movieId, language = "fr-FR") => {
  try {
    const token = getTMDBToken();
    if (!token) throw new Error("TMDB token not configured");

    const url = `${TMDB_BASE_URL}/movie/${movieId}/credits?language=${encodeURIComponent(language)}`;
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const fetchMovieImages = async (movieId) => {
  try {
    const token = getTMDBToken();
    if (!token) throw new Error("TMDB token not configured");

    const url = `${TMDB_BASE_URL}/movie/${movieId}/images`;
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching movie images:", error);
    throw error;
  }
};


export const fetchMovieVideos = async (movieId, language = "fr-FR") => {
  try {
    const token = getTMDBToken();
    if (!token) throw new Error("TMDB token not configured");

    const url = `${TMDB_BASE_URL}/movie/${movieId}/videos?language=${encodeURIComponent(language)}`;
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};


export const fetchAccountRecommendations = async (
  accountId,
  page = 1,
  language = "fr-FR"
) => {
  try {
    const token = getTMDBToken();
    if (!token) throw new Error("TMDB token not configured");

    const url = `${TMDB_V4_BASE_URL}/account/${accountId}/movie/recommendations?page=${page}&language=${encodeURIComponent(language)}`;
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching account recommendations:", error);
    throw error;
  }
};


export const fetchAccountInfo = async () => {
  try {
    const token = getTMDBToken();
    if (!token) throw new Error("TMDB token not configured");

    const url = `${TMDB_V4_BASE_URL}/account`;
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching account info:", error);
    throw error;
  }
};


export const fetchMealCategories = async () => {
  try {
    const url = `${MEAL_DB_BASE_URL}/categories.php`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching meal categories:", error);
    throw error;
  }
};


export const fetchMealsByCategory = async (category) => {
  try {
    const url = `${MEAL_DB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Error fetching meals for category ${category}:`, error);
    throw error;
  }
};


export const fetchMealDetails = async (mealId) => {
  try {
    const url = `${MEAL_DB_BASE_URL}/lookup.php?i=${encodeURIComponent(mealId)}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error(`Error fetching meal details for ID ${mealId}:`, error);
    throw error;
  }
};


export const searchMealsByName = async (name) => {
  try {
    const url = `${MEAL_DB_BASE_URL}/search.php?s=${encodeURIComponent(name)}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Error searching meals for "${name}":`, error);
    throw error;
  }
};


export const fetchCompleteMovieData = async (movieId, language = "fr-FR") => {
  try {
    const [details, credits, images, videos] = await Promise.all([
      fetchMovieDetails(movieId, language),
      fetchMovieCredits(movieId, language),
      fetchMovieImages(movieId),
      fetchMovieVideos(movieId, language),
    ]);

    return {
      movie: details,
      cast: credits?.cast || [],
      images: images?.posters || [],
      videos: videos?.results || [],
    };
  } catch (error) {
    console.error("Error fetching complete movie data:", error);
    throw error;
  }
};
