import React from "react";
import MoviesCard from "../components/MoviesCard";  
import { useState, useEffect} from "react";
import { searchMovies, getPopularMovies } from "../services/api"; 
import "../css/Home.css"

function Home(){
  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const loadingPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err){
        console.log(err);
        setError("Failed to load movies");
      }
      finally {
        setloading(false);
      }
    }
    loadingPopularMovies();
  },[])
   
  const handleSearch = async(e) => {
    e.preventDefault()
    if (!searchQuery) return
    if(loading) return
    setloading(true)
   try {
    const searchResults = await searchMovies(searchQuery)
    setMovies(searchResults)
    setError(null)
   } catch (err) {
    console.log(err)
    setError("Failed to load movies...")
  } finally {
    setloading (false)
  }
  }; 
    return <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input 
        type="text" 
        placeholder="Search for movies..." 
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {loading ? (
      <div className="loading"> Loading...</div>
    ) : (
      <div className="movies-grid">
        {movies.map((movie) => (
        <MoviesCard movie={movie} key ={movie.id} />
      ))}
      </div>
    )}
      
      

    </div>
}
export default Home;