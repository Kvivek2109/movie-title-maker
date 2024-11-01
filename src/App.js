import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieFetcher from './components/MovieFetcher';
import FileUpload from './components/FileUpload';
import PreviewPane from './components/PreviewPane';
import MovieDetails from './components/MovieDetails';
import './App.css';

function App() {
  const [movie, setMovie] = useState({});

  const handleFileUpload = (parsedData) => {
    setMovie(parsedData);
  };

  const handleMovieFetch = (fetchedMovie) => {
    setMovie(fetchedMovie);
  };

  return (
    <Router>
      <div className="App">
        <h1>Movie Title Maker</h1>
        <Routes>
          <Route path="/" element={
            <>
              <MovieFetcher onMovieFetch={handleMovieFetch} />
              <FileUpload onFileUpload={handleFileUpload} />
              <MovieDetails movie={movie} onUpdateMovie={setMovie} />
            </>
          } />
          <Route path="/preview-pane" element={<PreviewPane movie={movie} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
