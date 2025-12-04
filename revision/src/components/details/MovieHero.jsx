const MovieHero = ({ movie }) => {
  const backdropUrl = movie?.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;
  
  const title = movie?.title || movie?.name || "Sans titre";
  const tagline = movie?.tagline || "";

  return (
    <div className="movie-hero">
      {backdropUrl ? (
        <img 
          src={backdropUrl} 
          alt={title} 
          className="movie-hero__backdrop"
        />
      ) : (
        <div className="movie-hero__placeholder" />
      )}
      <div className="movie-hero__overlay" />
      <div className="movie-hero__content">
        <h1 className="movie-hero__title">{title}</h1>
        {tagline && <p className="movie-hero__tagline">{tagline}</p>}
      </div>
    </div>
  );
};

export default MovieHero;
