import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/4";

// Instance Axios centralisée pour TMDB
const axiosClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000,
  headers: {
    accept: "application/json",
  },
});

// Intercepteur de requête pour ajouter le token dynamiquement
axiosClient.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VITE_TMDB_BEARER_TOKEN?.trim();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de réponse pour logger les erreurs
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error?.response?.status, error?.response?.data);
    return Promise.reject(error);
  }
);

export default axiosClient;
