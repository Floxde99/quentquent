import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCompleteMovieData } from "../utils/api";
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
  const language = (import.meta.env.VITE_TMDB_LANGUAGE || "fr-FR").trim();

  const [data, setData] = useState({ movie: null, cast: [], images: [], videos: [] });
  const [status, setStatus] = useState(id ? "loading" : "error");
  const [error, setError] = useState(id ? "" : "ID invalide");

  useEffect(() => {
    if (!id) return;

    const loadMovieDetails = async () => {
      try {
        const result = await fetchCompleteMovieData(id, language);
        setData(result);
        setStatus("success");
      } catch (err) {
        console.error("Erreur détails film:", err);
        setStatus("error");
        setError(err.message || "Erreur lors du chargement du film");
      }
    };
    loadMovieDetails();
  }, [id, language]);

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