import React from "react";
import Section from "../common/Section";

const MovieOverview = ({ movie }) => {
  if (!movie?.overview) return null;

  return (
    <Section className="movie-overview">
      <div className="overview-content">{movie.overview}</div>
    </Section>
  );
};

export default MovieOverview;
