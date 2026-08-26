import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import featuredMovies from "../data/featuredMovies";
import "./Home.css";

function Home() {
  return (
    <main>

      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-tag">
            WELCOME TO MOVIEHUB
          </p>

          <h1>
            Your Movie.
            <br />
            Your Seat.
            <br />
            <span>Your Experience.</span>
          </h1>

          <p className="hero-description">
            Discover the latest movies, choose your favourite
            seats and book your tickets easily.
          </p>

          <Link
            to="/movies"
            className="hero-btn"
          >
            Explore Movies 🎬
          </Link>

        </div>

      </section>


      {/* Now Showing */}

      <section className="movies-section">

        <div className="section-title">

          <div>
            <p>EXPLORE</p>

            <h2>
              Now Showing
            </h2>
          </div>

          <Link to="/movies">
            View All →
          </Link>

        </div>


        <div className="movie-grid">

          {featuredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}

        </div>

      </section>

    </main>
  );
}

export default Home;