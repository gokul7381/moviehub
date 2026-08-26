import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import movies from "../data/movies";
import featuredMovies from "../data/featuredMovies";
import { getMovieById } from "../services/movieService";

import "./MovieDetails.css";

import { useBooking } from "../context/BookingContext";

function MovieDetails() {
  const { id } = useParams();

  const { setSelectedMovie } = useBooking();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD MOVIE
  // =========================

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);

        // =========================
        // API MOVIE
        // =========================

        if (id.startsWith("api-")) {
          const apiId = id.replace("api-", "");

          const apiMovie = await getMovieById(apiId);

          if (apiMovie) {
            setMovie(apiMovie);
            setSelectedMovie(apiMovie);
          }

        } else {

          // =========================
          // LOCAL MOVIE
          // =========================

          const allMovies = [
            ...featuredMovies,
            ...movies,
          ];

          const localMovie = allMovies.find(
            (item) => String(item.id) === String(id)
          );

          if (localMovie) {
            setMovie(localMovie);
            setSelectedMovie(localMovie);
          }
        }

      } catch (error) {
        console.error("Movie loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id, setSelectedMovie]);


  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="movie-not-found">
        <h2>Loading Movie...</h2>
      </div>
    );
  }


  // =========================
  // NOT FOUND
  // =========================

  if (!movie) {
    return (
      <div className="movie-not-found">

        <h2>Movie Not Found</h2>

        <Link to="/movies">
          Back to Movies
        </Link>

      </div>
    );
  }


  // =========================
  // DETAILS PAGE
  // =========================

  return (
    <main className="movie-details-page">

      <div className="movie-details-card">

        {/* =========================
            POSTER
        ========================= */}

        <div className="movie-details-poster">

          <img
            src={movie.image}
            alt={movie.title}
          />

        </div>


        {/* =========================
            MOVIE CONTENT
        ========================= */}

        <div className="movie-details-content">

          <p className="details-label">
            MOVIE DETAILS
          </p>

          <h1>
            {movie.title}
          </h1>

          <div className="details-rating">
            ⭐ {movie.rating}
          </div>

          <p className="details-genre">
            {movie.genre}
          </p>

          <div className="details-meta">

            <span>
              ⏱ {movie.duration}
            </span>

            <span>
              🌐 {movie.language}
            </span>

          </div>

          <p className="details-description">

            Enjoy an unforgettable cinematic experience with{" "}

            <strong>
              {movie.title}
            </strong>

            . Choose your preferred show,
            select your seats and book your tickets easily.

          </p>

          <div className="details-actions">

            <Link
              to="/bookings"
              className="book-button"
            >
              Book Ticket
            </Link>

            <Link
              to="/movies"
              className="back-button"
            >
              Back to Movies
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default MovieDetails;