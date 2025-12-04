import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import MovieVideos from "../components/details/MovieVideos";
import MovieOverview from "../components/details/MovieOverview";
import MovieMeta from "../components/details/MovieMeta";
import MovieCast from "../components/details/MovieCast";
import MovieImages from "../components/details/MovieImages";
import "./MoovieDetails.css";

const MoovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = (import.meta.env.VITE_TMDB_BEARER_TOKEN || "").trim();
  const language = (import.meta.env.VITE_TMDB_LANGUAGE || "fr-FR").trim();

  const hasConfig = !!(token && id);
  const [data, setData] = useState({ movie: null, cast: [], images: [], videos: [] });
  const [status, setStatus] = useState(hasConfig ? "loading" : "error");
  const [error, setError] = useState(hasConfig ? "" : "Configuration manquante ou ID invalide");

  useEffect(() => {
    if (!hasConfig) return;

    const controller = new AbortController();
    const fetchDetails = async () => {
      try {
        const headers = { accept: "application/json", Authorization: `Bearer ${token}` };
        const params = { language };
        const [movieRes, creditsRes, imagesRes, videosRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, { headers, params, signal: controller.signal }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, { headers, params, signal: controller.signal }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, { headers, signal: controller.signal }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, { headers, params, signal: controller.signal }),
        ]);
        setData({ movie: movieRes.data, cast: creditsRes.data?.cast || [], images: imagesRes.data?.posters || [], videos: videosRes.data?.results || [] });
        setStatus("success");
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Erreur détails film:", err);
          setStatus("error");
          setError(err.message || "Erreur lors du chargement du film");
        }
      }
    };
    fetchDetails();
    return () => controller.abort();
  }, [hasConfig, id, token, language]);

  if (status === "loading") return <LoadingState message="Chargement du film…" />;
  if (status === "error") return <ErrorState message={error} action={() => navigate(-1)} actionLabel="← Retour" />;

  return (
    <div className="movie-details">
      <button onClick={() => navigate(-1)} className="movie-details__btn-back">← Retour</button>
      {data.movie && <MovieVideos movie={data.movie} videos={data.videos} />}
      {data.movie && <MovieOverview movie={data.movie} />}
      {data.movie && <MovieMeta movie={data.movie} />}
      <MovieCast cast={data.cast} />
      <MovieImages images={data.images} />
    </div>
  );
};

export default MoovieDetails;