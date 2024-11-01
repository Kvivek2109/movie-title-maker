import React, { useRef } from 'react';
import './PreviewPane.css';
import { toPng } from 'html-to-image';

const PreviewPane = ({ movie }) => {
  const posterRef = useRef(null);

  if (!movie) {
    return null;
  }

  const exportAsImage = () => {
    if (posterRef.current) {
      toPng(posterRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${movie.title}-poster.png`;
          link.click();
        })
        .catch((error) => {
          console.error('Failed to export as image', error);
        });
    }
  };

  return (
    <div>
      <div
        ref={posterRef}
        className="movie-poster"
        style={{
          backgroundImage: `url(${movie.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="overlay">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-detail"><strong>Director:</strong> {movie.director}</p>
          <p className="movie-detail"><strong>Producer:</strong> {movie.producer}</p>
          <p className="movie-detail"><strong>Music Composer:</strong> {movie.musicComposer}</p>
          <p className="movie-detail"><strong>Stunt Choreographer:</strong> {movie.stuntChoreographer}</p>
        </div>
      </div>
      <button onClick={exportAsImage}>Download as Image</button>
    </div>
  );
}

export default PreviewPane;
