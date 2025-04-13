import "../css/Favorites.css";
import MoviesCard from "../components/MoviesCard";
import { MovieProvider, useMovieContext } from "../contexts/MovieContext";

const style ={
  color: "white",
  fontSize: "2rem",
  textAlign: "center",
  marginBottom: "2rem",
}
function Favorites(){
  const {favorites} = useMovieContext();
  

  return ( 
    <div className="favorites-movie">
    <h2 style={style}>Your Favorites</h2>
    {favorites && favorites.length > 0 ? (
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MoviesCard movie={movie} key={movie.id} />
        ))}
      </div>
    ) : (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here!</p>
      </div>
    )}
  </div>
  );
}
export default Favorites