export const validateMovieData = (movie) => {
  const requiredFields = [
    'title',
    'director',
    'producer',
    'musicComposer',
    'stuntChoreographer',
    'imageUrl',
  ];

  for (const field of requiredFields) {
    if (!movie[field] || movie[field].trim() === '') {
      return { isValid: false, missingFields: field };
    }
  }

  return { isValid: true };
};
