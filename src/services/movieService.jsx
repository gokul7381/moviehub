const API_URL = "https://www.apirequest.in/api/movie";

// =========================
// API POSTER MAP
// =========================

const posterMap = {
  Inception: "/movies/inception.jpg",
  RRR: "/movies/rrr.jpg",
};


// =========================
// FORMAT API MOVIE
// =========================

const formatMovie = (movie) => ({
  id: `api-${movie.id}`,

  title: movie.title,

  // Local poster first
  image:
    posterMap[movie.title] ||
    movie.image ||
    `https://placehold.co/600x900/171820/ffffff?text=${encodeURIComponent(
      movie.title
    )}`,

  rating: movie.rating,

  genre: Array.isArray(movie.genre)
    ? movie.genre.join(" • ")
    : movie.genre || "Movie",

  duration: movie.duration_minutes
    ? `${movie.duration_minutes} min`
    : "N/A",

  language: movie.language || "Unknown",
});


// =========================
// GET ALL MOVIES
// =========================

export const getMovies = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  return data.map(formatMovie);
};


// =========================
// GET SINGLE MOVIE
// =========================

export const getMovieById = async (id) => {
  const movies = await getMovies();

  return movies.find(
    (movie) => movie.id === `api-${id}`
  );
};