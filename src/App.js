import './App.css';
import Header from './partial/Header';
import React from 'react';
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Pages/about';
import Home from './Pages/Home';
import Footer from './partial/footer';
import Movie from './Pages/movie';
import Favourites from './Pages/favourites';
import Watch from './Pages/watch';
import SearchBar from './partial/Searchbar';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar/>
      <div className='main'>
        <div>
        <BrowserRouter basename="/movie">
            <Routes>
              <Route path="/movie" element={<Home />} />
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
export default App;
