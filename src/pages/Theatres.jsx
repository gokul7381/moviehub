import { Link } from "react-router-dom";
import "./Theatres.css";

function Theatres() {
  const theatres = [
    {
      id: 1,
      name: "PVR Cinemas",
      location: "Prozone Mall, Coimbatore",
      screens: 8,
      facilities: "IMAX • Dolby Atmos • Recliner",
    },
    {
      id: 2,
      name: "INOX Cinemas",
      location: "Brookefields Mall, Coimbatore",
      screens: 6,
      facilities: "Dolby Atmos • Recliner • 4K",
    },
    {
      id: 3,
      name: "KG Cinemas",
      location: "Race Course, Coimbatore",
      screens: 5,
      facilities: "4K • Dolby Atmos • Premium Seats",
    },
    {
      id: 4,
      name: "Fun Republic",
      location: "Peelamedu, Coimbatore",
      screens: 4,
      facilities: "Dolby • Premium Seats • Food Court",
    },
  ];

  return (
    <main className="theatres-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="theatres-header">

        <p>FIND YOUR CINEMA</p>

        <h1>Our Theatres</h1>

        <span>
          Discover comfortable theatres and enjoy your favourite movies.
        </span>

      </section>


      {/* =========================
          THEATRES LIST
      ========================= */}

      <section className="theatres-container">

        <div className="theatre-grid">

          {theatres.map((theatre) => (

            <div
              className="theatre-card"
              key={theatre.id}
            >

              <div className="theatre-icon">
                🎬
              </div>


              <div className="theatre-content">

                <p className="theatre-label">
                  MOVIE THEATRE
                </p>

                <h2>
                  {theatre.name}
                </h2>

                <p className="theatre-location">
                  📍 {theatre.location}
                </p>


                <div className="theatre-meta">

                  <span>
                    🎞 {theatre.screens} Screens
                  </span>

                </div>


                <p className="theatre-facilities">
                  {theatre.facilities}
                </p>


                {/* VIEW THEATRE */}

                <Link
                  to={`/theatres/${theatre.id}`}
                  className="theatre-button"
                >
                  View Theatre
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}

export default Theatres;