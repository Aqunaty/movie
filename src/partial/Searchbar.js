import React, { useState } from 'react';
import axios from 'axios';
import SearchImg from '../images/search.df99a3b0.svg';
import '../css/searchbar.css';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
function Searchbar() {
    

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearchChange = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: API_KEY,
                    query: query,
                    language: 'en-US',
                    page: 1,
                },
            });
            setSearchResults(response.data.results);
            setError(null); // Скидаємо помилку, якщо запит успішний
        } catch (error) {
            console.error('Error searching movies:', error);
            setError('Error searching movies. Please try again later.');
            setSearchResults([]); // Очищаємо результати пошуку
        }
    };
    const formatDate = (dateString) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(dateString);
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day < 10 ? '0' + day : day}, ${year}`;
      };

    return (
        <div className="section-search">
            <div className="searchBar">
                    <span className="search-icon">
                        <img src={SearchImg} alt="search-icon" />
                    </span>
                    <form>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            className="searchbox"
                            placeholder="Search for a movie by title..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </form>
                </div>
                {error && <p>{error}</p>}
                <div className="search-results">
                    {searchResults.map(movie => (
                        <div>
                            <a href={`/movie/${movie.id}`}className="movie-search-text">
                                <div key={movie.id} className="movies-seaerch">
                                    <div className='search-image'>
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                                            alt={movie.title}
                                                            className="movie-poster"
                                                        />
                                            </div>
                                    <div className='title'>
                                        <h1>{movie.title}</h1>
                                    </div>
                                    <div>
                                        <p>{(Math.round(movie.vote_average * 100)/10).toFixed(2)}%</p>
                                        <p className="release-date">{formatDate(movie.release_date)}</p>  
                                        
                                    </div>
                                </div>
                            </a>
                            
                        </div>
                    ))}
                </div>
            
        </div>
    );
}

export default Searchbar;
