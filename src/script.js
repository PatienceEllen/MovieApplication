class MovieApp {
    constructor() {
      this.movieInput = document.getElementById('movieInput');
      this.searchButton = document.getElementById('searchButton');
      this.movieTitle = document.getElementById('movieTitle');
      this.movieYear = document.getElementById('movieYear');
      this.movieGenre = document.getElementById('movieGenre');
      this.moviePlot = document.getElementById('moviePlot');
      this.moviePoster = document.getElementById('moviePoster');
      this.resultContainer = document.getElementById('resultContainer');
      
      this.searchButton.addEventListener('click', this.searchMovie.bind(this));
    }
    
    async fetchMovieData(movieTitle) {
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
    
    displayMovieInformation(movie) {
      if (movie && movie.Response === 'True') {
        this.movieTitle.textContent = movie.Title;
        this.movieYear.textContent = 'Year: ' + movie.Year;
        this.movieGenre.textContent = 'Genre: ' + movie.Genre;
        this.moviePlot.textContent = 'Plot: ' + movie.Plot;
        this.moviePoster.src = movie.Poster;
        this.resultContainer.style.display = 'block';
      } else {
        this.movieTitle.textContent = 'Movie not found.';
        this.movieYear.textContent = '';
        this.movieGenre.textContent = '';
        this.moviePlot.textContent = '';
        this.moviePoster.src = '';
        this.resultContainer.style.display = 'none';
      }
    }
    
    async searchMovie() {
      const title = this.movieInput.value.trim();
      if (title !== '') {
        const movieData = await this.fetchMovieData(title);
        this.displayMovieInformation(movieData);
      }
    }
  }
  
  const app = new MovieApp();
  