import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../css/movie.css'

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Movie = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [backdrops, setBackdrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: API_KEY,
            append_to_response: 'videos,credits', // Include additional details like videos and credits
          },
        });
        setMovieDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Error fetching movie details. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchBackdrops = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, {
          params: {
            api_key: API_KEY,
          },
        });
        setBackdrops(response.data.backdrops);
      } catch (error) {
        console.error('Error fetching backdrops:', error);
        setError('Error fetching backdrops. Please try again later.');
      }
    };

    fetchBackdrops();
  }, [id]);

  useEffect(() => {
    // Check if movie is favorited and in watch later list when component mounts
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const watchLater = JSON.parse(localStorage.getItem('watchLater')) || [];
    setIsFavorited(favorites.includes(id));
    setIsWatchLater(watchLater.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorited(false);
    } else {
      const updatedFavorites = [...favorites, id];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorited(true);
    }
  };

  const toggleWatchLater = () => {
    const watchLater = JSON.parse(localStorage.getItem('watchLater')) || [];
    if (watchLater.includes(id)) {
      const updatedWatchLater = watchLater.filter(movieId => movieId !== id);
      localStorage.setItem('watchLater', JSON.stringify(updatedWatchLater));
      setIsWatchLater(false);
    } else {
      const updatedWatchLater = [...watchLater, id];
      localStorage.setItem('watchLater', JSON.stringify(updatedWatchLater));
      setIsWatchLater(true);
    }
  };

  const bgStyle = {
    backgroundImage: backdrops.length > 0 ? `url(https://image.tmdb.org/t/p/original${backdrops[0]?.file_path})` : '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '67vh',
    opacity:`15%`,
  };

  const formatDate = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day < 10 ? '0' + day : day}, ${year}`;
  };

  const originalDate = movieDetails.release_date;
  const formattedDate = formatDate(originalDate);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <div className='individualmovie-container'>
            <div style={bgStyle} className='individualmovie-container-image'></div>
            <div className='individualmovie-container-text'>
              <div className='individualmovie-container-text1'>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                    className="individualmovie-poster"
                  />
                </div>
                <div className='individualmovie-container-text-main'>
                  <div className='span title-fav-watch'>
                    <h1 >{movieDetails.title}</h1>
                    <div class="favbtn">
                      <div>
                        <button className={isFavorited ? 'favMovie' : 'unfavMovie'} onClick={toggleFavorite}>
                          {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                      </div>
                    </div>
                    <div class="watchbtn">
                      <div>
                        <button className={isWatchLater ? 'watchMovie' : 'unwatchMovie'} onClick={toggleWatchLater}>
                          {isWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='span'>
                    <h4>Overview:</h4>
                    <p >{movieDetails.overview}</p>
                  </div>
                  <div>
                    <h4>Released:</h4>
                    <p >{formattedDate}</p>
                  </div>
                  <div>
                    <h4>Rating:</h4>
                    <p >{(Math.round(movieDetails.vote_average * 100)/10).toFixed(2)}%</p>
                  </div>
                  <div className='span'>
                    <h4>Genre:</h4>
                    <p >{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='individualmovie-container-text-main' id='small'>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="individualmovie-poster-small"
              />
            </div>
            <div className='span title-fav-watch'>
              <h1 >{movieDetails.title}</h1>
              <div class="favbtn">
                <div>
                  <button className={isFavorited ? 'favMovie' : 'unfavMovie'} onClick={toggleFavorite}>
                    {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
              <div class="watchbtn">
                <div>
                  <button className={isWatchLater ? 'watchMovie' : 'unwatchMovie'} onClick={toggleWatchLater}>
                    {isWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
                  </button>
                </div>
              </div>
            </div>
            <div className='span'>
              <h4>Overview:</h4>
              <p >{movieDetails.overview}</p>
            </div>
            <div>
              <h4>Released:</h4>
              <p >{formattedDate}</p>
            </div>
            <div>
              <h4>Rating:</h4>
              <p >{(Math.round(movieDetails.vote_average * 100)/10).toFixed(2)}%</p>
            </div>
            <div className='span'>
              <h4>Genre:</h4>
              <p >{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
