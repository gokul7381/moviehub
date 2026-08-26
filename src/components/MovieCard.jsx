import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">

      <div className="movie-image">
        <img src={movie.image} alt={movie.title} />

        <span className="rating">
          ⭐ {movie.rating}
        </span>
      </div>

      <div className="movie-content">

        <h3>{movie.title}</h3>

        <p>{movie.genre}</p>

        <div className="movie-meta">
          <span>{movie.duration}</span>
          <span>{movie.language}</span>
        </div>

        <Link to={`/movies/${movie.id}`} className="book-btn">
          View Details
        </Link>

      </div>

    </div>
  );
}

export default MovieCard;