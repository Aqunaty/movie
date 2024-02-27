import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/home.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const WatchLaterPage = () => {
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchLaterMovies = async () => {
      try {
        const watchLater = JSON.parse(localStorage.getItem('watchLater')) || [];
        const requests = watchLater.map(id =>
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
              api_key: API_KEY,
            },
          })
        );
        const responses = await Promise.all(requests);
        const watchLaterMoviesData = responses.map(response => response.data);
        setWatchLaterMovies(watchLaterMoviesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching watch later movies:', error);
        setError('Error fetching watch later movies. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchWatchLaterMovies();
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
      ) : watchLaterMovies.length === 0 ? (
        <p>No movies added to Watch Later list yet. <Link to="/">Browse Movies</Link></p>
      ) : (
        <div className="movie-list">
                        {watchLaterMovies && watchLaterMovies.map(movie => (
                            
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

export default WatchLaterPage;