import Section from "../common/Section";
import Grid from "../common/Grid";
import ImageCard from "../common/ImageCard";

const MovieCast = ({ cast = [] }) => {
  const topCast = cast.slice(0, 6);

  if (!topCast.length) return null;

  const castCards = topCast.map((actor) => ({
    id: actor.id,
    image: actor.profile_path 
      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
      : null,
    title: actor.name,
    subtitle: actor.character || "Rôle inconnu",
  }));

  return (
    <Section title="Distribution">
      <div className="movie-cast__container">
        <Grid columns={"auto-fit"} minWidth={"140px"} gap={"1rem"} className="movie-cast__grid">
          {castCards.map((card) => (
            <ImageCard key={card.id} {...card} />
          ))}
        </Grid>
      </div>
    </Section>
  );
};

export default MovieCast;
