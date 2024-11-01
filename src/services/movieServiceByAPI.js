export const fetchMoviesByAPI = async (id) => {
  try {
    const response = await fetch(`https://672278eb2108960b9cc4917f.mockapi.io/movies/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('There has been a problem with your fetch operation: ' + error.message);
  }
};
