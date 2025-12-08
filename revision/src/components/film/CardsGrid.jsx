import Card from "./Card";

const CardsGrid = ({ movies }) => (
  <div className="cards-grid">
    {movies.map((movie) => (
      <Card key={movie.id} movie={movie} clickable={true} />
    ))}
  </div>
);

export default CardsGrid;