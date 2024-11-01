import React, { useState } from 'react';
import { fetchMoviesByAPI } from '../services/movieServiceByAPI';
import { fetchMovieFromJSON } from '../services/movieServiceByJSON';
import './MovieFetcher.css';

const MovieFetcher = ({ onMovieFetch }) => {
  const [error, setError] = useState('');

  const getRandomId = (limit) => {
    return Math.floor(Math.random() * limit + 1);
  };

  const getMovieById = async () => {
    const randomId = getRandomId(100);
    try {
      const movies = await fetchMoviesByAPI(randomId);
      onMovieFetch(movies);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const getMovieFromJSON = async () => {
    const randomId = getRandomId(10);
    try {
      const movie = await fetchMovieFromJSON(randomId);
      onMovieFetch(movie);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={getMovieById}>Fetch Movie Using API</button>
        <span className="or-label">or</span>
        <button onClick={getMovieFromJSON}>Fetch Movie from JSON</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default MovieFetcher;
