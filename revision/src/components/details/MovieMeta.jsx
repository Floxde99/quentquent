import MetaGrid from "../common/MetaGrid";

const MovieMeta = ({ movie }) => {
  const allMeta = [
    {
      label: "Note",
      value: movie?.vote_average ? `${movie.vote_average.toFixed(1)}/10` : null,
    },
    {
      label: "Votes",
      value: movie?.vote_count?.toLocaleString("fr-FR") || null,
    },
    {
      label: "Durée",
      value: movie?.runtime ? `${movie.runtime} min` : null,
    },
    { label: "Date de sortie", value: movie?.release_date ? new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(movie.release_date)) : null },
    {
      label: "Langue",
      value: movie?.original_language?.toUpperCase() || null,
    },
    { label: "Budget", value: movie?.budget > 0 ? `$${(movie.budget / 1000000).toFixed(1)}M` : null },
    { label: "Revenus", value: movie?.revenue > 0 ? `$${(movie.revenue / 1000000).toFixed(1)}M` : null },
    { label: "Genres", value: movie?.genres?.length ? movie.genres.map((g) => g.name).join(", ") : null },
  ];

  const meta = allMeta.filter(item => item.value !== null);

  return (
    <div className="movie-meta">
      <MetaGrid items={meta} />
    </div>
  );
};

export default MovieMeta;
