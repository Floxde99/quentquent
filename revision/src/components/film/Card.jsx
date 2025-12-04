import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ movie, clickable = false }) => {
  const title = movie?.title || movie?.name || "Sans titre";
  const year = movie?.release_date ? new Date(movie.release_date).getFullYear() : null;
  const rating = typeof movie?.vote_average === "number" ? movie.vote_average.toFixed(1) : null;
  const imageUrl = movie?.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : null;

  const card = (
    <article className={`film-card ${clickable ? "film-card--clickable" : ""}`}>
      {imageUrl ? (
        <img
          className="film-card__poster"
          src={imageUrl}
          alt={title}
          loading="lazy"
        />
      ) : (
        <div className="film-card__placeholder">Aucun visuel</div>
      )}

      <div className="film-card__body">
        <h3 className="film-card__title">{title}</h3>
        <p className="film-card__meta">
          <span>{year ?? "Date inconnue"}</span>
          {rating && <span>{rating}/10</span>}
        </p>
        {movie?.overview ? (
          <p className="film-card__overview">{movie.overview}</p>
        ) : (
          <p className="film-card__overview film-card__overview--muted">Synopsis indisponible.</p>
        )}
      </div>
    </article>
  );

  if (clickable && movie?.id) {
    return <Link to={`/film/${movie.id}`} className="film-card__link">{card}</Link>;
  }

  return card;
};

export default Card;