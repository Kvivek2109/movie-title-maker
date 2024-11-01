import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateMovieData } from '../services/dataValidationService';
import './MovieDetails.css';

const MovieDetails = ({ movie, onUpdateMovie }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState(movie);
  const navigate = useNavigate();

  useEffect(() => {
    setEditedMovie(movie);
  }, [movie]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdateMovie(editedMovie);
    setIsEditing(false);
  };

  const handlePreview = () => {
    const validation = validateMovieData(editedMovie);
    if (validation.isValid) {
      navigate('/preview-pane');
    } else {
      alert(`Missing required field: ${validation.missingFields}`);
    }
  };

  const fields = [
    { label: 'Movie Title', name: 'title' },
    { label: 'Director', name: 'director' },
    { label: 'Producer', name: 'producer' },
    { label: 'Music Composer', name: 'musicComposer' },
    { label: 'Stunt Choreographer', name: 'stuntChoreographer' },
  ];

  return (
    <div className="movie-details">
      {fields.map(({ label, name }) => (
        <div className="input-field" key={name}>
          <label>{label}:</label>
          {isEditing ? (
            <input
              type="text"
              name={name}
              value={editedMovie[name] || ''}
              onChange={handleChange}
              placeholder={label}
            />
          ) : (
            <input
              type="text"
              value={editedMovie[name] || ''}
              readOnly
            />
          )}
        </div>
      ))}
      <div className="button-group">
        <button onClick={handleEditToggle}>{isEditing ? 'Cancel' : 'Edit'}</button>
        {isEditing && <button onClick={handleSave}>Save</button>}
        <button onClick={handlePreview}>Preview</button>
      </div>
    </div>
  );
};

export default MovieDetails;
