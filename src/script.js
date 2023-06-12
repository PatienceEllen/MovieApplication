// Get references to the HTML elements
const movieInput = document.getElementById('movieInput');
const searchButton = document.getElementById('searchButton');
const movieTitle = document.getElementById('movieTitle');
const movieYear = document.getElementById('movieYear');
const movieGenre = document.getElementById('movieGenre');
const moviePlot = document.getElementById('moviePlot');
const resultContainer = document.getElementById('resultContainer');

// Function to fetch movie data from an API
async function fetchMovieData(movieTitle) {
  const apiKey = '173a1549';
  const url = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apiKey=${apiKey}`;
    
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return null;
  }
}

function displayMovieInformation(movie) {
    console.log(movie); // Log the movie object for debugging purposes
  
    if (movie && movie.Response === "True") {
      movieTitle.textContent = movie.Title;
      movieYear.textContent = 'Year: ' + movie.Year;
      movieGenre.textContent = 'Genre: ' + movie.Genre;
      moviePlot.textContent = 'Plot: ' + movie.Plot;
  
      // Set the movie poster
      const moviePoster = document.getElementById('moviePoster');
      moviePoster.src = movie.Poster;
  
      resultContainer.style.display = 'block';
    } else {
      movieTitle.textContent = 'Movie not found.';
      movieYear.textContent = '';
      movieGenre.textContent = '';
      moviePlot.textContent = '';
  
      // Reset the movie poster
      const moviePoster = document.getElementById('moviePoster');
      moviePoster.src = '';
  
      resultContainer.style.display = 'none';
    }
  }
  
// Event listener for the search button
searchButton.addEventListener('click', async () => {
  const title = movieInput.value.trim();
  if (title !== '') {
    const movieData = await fetchMovieData(title);
    displayMovieInformation(movieData);
  }
});
