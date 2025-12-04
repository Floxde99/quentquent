import React, { useState } from "react";
import MovieHero from "./MovieHero";
import VideoModal from "./VideoModal";

const MovieVideos = ({ movie, videos }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const trailerVideo = videos?.find(v => v.site === "YouTube" && v.type === "Trailer") || videos?.[0];

  return (
    <>
      <div className="movie-videos-wrapper">
        <MovieHero movie={movie} />
        {trailerVideo && (
          <button className="movie-videos__play-btn" onClick={() => setIsVideoOpen(true)} aria-label="Regarder la vidéo">
            ▶ Regarder
          </button>
        )}
      </div>
      <VideoModal video={trailerVideo} isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  );
};

export default MovieVideos;
