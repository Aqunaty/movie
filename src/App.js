import './App.css';
import Header from './partial/Header';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Pages/about';
import Home from './Pages/Home';
import Footer from './partial/footer';
import Movie from './Pages/movie';
import Favourites from './Pages/favourites';
import Watch from './Pages/watch';
import SearchBar from './partial/Searchbar';

export default function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar/>
      <div className='main'>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/watch" element={<Watch />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <Footer />
    </div>
  );
}
