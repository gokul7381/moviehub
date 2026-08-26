import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import movies from "../data/movies";
import featuredMovies from "../data/featuredMovies";
import { getMovies } from "../services/movieService";
import "./Movies.css";

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const [apiMovies, setApiMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH MOVIES FROM API
  // =========================

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const data = await getMovies();

        // movieService already formats
        // title, poster, rating, genre, duration, language
        setApiMovies(data);

      } catch (error) {
        console.log("API movies unavailable:", error);

        // API fail aana local movies continue aagum
        setApiMovies([]);

      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);


  // =========================
  // LOCAL + API MOVIES
  // =========================

  const allMovies = [
    ...featuredMovies,
    ...movies,
    ...apiMovies,
  ];


  // =========================
  // SEARCH
  // =========================

  const filteredMovies = allMovies.filter((movie) =>
    movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );


  const handleSearch = (event) => {
    const value = event.target.value;

    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };


  // =========================
  // PAGE
  // =========================

  return (
    <main className="movies-page">

      {/* =========================
          MOVIES HEADER
      ========================= */}

      <section className="movies-header">

        <p>EXPLORE OUR COLLECTION</p>

        <h1>All Movies</h1>

        <span>
          Discover the latest movies and book your tickets.
        </span>


        {/* SEARCH */}

        <div className="movie-search">

          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearch}
          />

        </div>

      </section>


      {/* =========================
          ALL MOVIES
      ========================= */}

      <section className="movies-list">

        {filteredMovies.length > 0 ? (

          <div className="movie-grid">

            {filteredMovies.map((movie) => (

              <MovieCard
                key={movie.id}
                movie={movie}
              />

            ))}

          </div>

        ) : (

          <div className="no-movies">

            <h2>No Movies Found</h2>

            <p>
              We couldn't find any movie matching
              "{searchQuery}".
            </p>

          </div>

        )}

      </section>


      {/* =========================
          API LOADING
      ========================= */}

      {loading && (
        <p className="api-message">
          Loading latest movies...
        </p>
      )}

    </main>
  );
}

export default Movies;