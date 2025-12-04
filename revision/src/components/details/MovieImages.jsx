import Section from "../common/Section";
import Grid from "../common/Grid";
import ImageCard from "../common/ImageCard";

const MovieImages = ({ images = [] }) => {
  const posters = images.slice(0, 12);

  if (!posters.length) return null;

  const posterCards = posters.map((poster, idx) => ({
    id: idx,
    image: poster.file_path 
      ? `https://image.tmdb.org/t/p/w342${poster.file_path}`
      : null,
  }));

  return (
    <Section title="Galerie">
      <Grid columns={4} className="movie-images__grid">
        {posterCards.map((card) => (
          <ImageCard key={card.id} {...card} />
        ))}
      </Grid>
    </Section>
  );
};

export default MovieImages;
