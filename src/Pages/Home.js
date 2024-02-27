import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/home.css'

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortMethod, setSortMethod] = useState("popular");
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${sortMethod}`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                        page: 1,
                    },
                });
                setMovies(response.data.results);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchData();
        
    }, [sortMethod]);
    const handleSortChange = (event) => {
        setSortMethod(event.target.value); 
    };
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
        <>
         <div className="showMe">
                <div className="charts">
                    <form>
                        <label htmlFor="selectchart">Show me</label>
                        <select name="selectchart" id="selectchart" className="selection" onChange={handleSortChange}>
                            <option value="popular">Popular</option>
                            <option value="top_rated">Top Rated</option>
                            <option value="now_playing">Now Playing</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </form>
                </div>
            </div>
            <div className="container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="movie-list">
                        {movies && movies.map(movie => (
                            
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
        </>
    );
}
