import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const FavoritesPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        // Retrieve favorite movie IDs from local storage
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        // Fetch details for each favorite movie
        const requests = favorites.map(id =>
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
              api_key: API_KEY,
            },
          })
        );
        
        const responses = await Promise.all(requests);
        const favoriteMoviesData = responses.map(response => response.data);
        
        // Set state with fetched favorite movies
        setFavoriteMovies(favoriteMoviesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
        setError('Error fetching favorite movies. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, []);
  const formatDate = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day < 10 ? '0' + day : day}, ${year}`;
  };
  function truncateText(text) {
    const words = text.split(' ');
    if (words.length <= 12) {
        return text;
    }
    return words.slice(0, 12).join(' ') + '...';
}

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : favoriteMovies.length === 0 ? (
        <p>No favorite movies added yet. <Link to="/">Browse Movies</Link></p>
      ) : (
        <div className="movie-list">
                        {favoriteMovies && favoriteMovies.map(movie => (
                            
                                <div className="movie-item">
                                    
                                        <div className='image'>
                                                <a href={`/movie/${movie.id}`}>
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                                        alt={movie.title}
                                                        className="movie-poster"
                                                    />
                                                </a>
                                        </div>
                                        
                                    
                                    <div className="movie-details">
                                        <a href={`/movie/${movie.id}`}>                                           
                                            <div>
                                                
                                                <h2 className="movie-title">{movie.title}</h2>
                                                
                                            </div>
                                        </a>
                                        <p className="movie-rating">Rating: {(Math.round(movie.vote_average * 100)/10).toFixed(2)}%</p>
                                        <p className="movie-release-date">Release Date: {formatDate(movie.release_date)}</p>                                       
                                        {movie.genres && (
                                            <p className="movie-genres">
                                                Genres: {movie.genres.map(genre => genre.name).join(', ')}
                                            </p>
                                        )}
                                        <p className="movie-overview">{truncateText(movie.overview)}</p>
                                        <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-link">
                                            <button>More...</button>
                                        </Link>
                                    </div>
                                </div>
                            
                        ))}
                    </div>
      )}
    </div>
  );
};

export default FavoritesPage;