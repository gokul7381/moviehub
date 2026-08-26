import { Link, useParams } from "react-router-dom";
import "./TheatreDetails.css";

function TheatreDetails() {
  const { id } = useParams();

  const theatres = [
    {
      id: 1,
      name: "PVR Cinemas",
      location: "Prozone Mall, Coimbatore",
      screens: 8,
      facilities: "IMAX • Dolby Atmos • Recliner",
      description:
        "Experience the latest movies with premium screens, immersive sound and comfortable recliner seating.",
    },
    {
      id: 2,
      name: "INOX Cinemas",
      location: "Brookefields Mall, Coimbatore",
      screens: 6,
      facilities: "Dolby Atmos • Recliner • 4K",
      description:
        "Enjoy a premium movie experience with 4K visuals, Dolby Atmos sound and comfortable seating.",
    },
    {
      id: 3,
      name: "KG Cinemas",
      location: "Race Course, Coimbatore",
      screens: 5,
      facilities: "4K • Dolby Atmos • Premium Seats",
      description:
        "A popular cinema experience featuring premium screens, powerful sound and comfortable seating.",
    },
    {
      id: 4,
      name: "Fun Republic",
      location: "Peelamedu, Coimbatore",
      screens: 4,
      facilities: "Dolby • Premium Seats • Food Court",
      description:
        "Enjoy movies with premium seating, quality sound and convenient food options.",
    },
  ];

  const theatre = theatres.find(
    (item) => String(item.id) === String(id)
  );

  if (!theatre) {
    return (
      <main className="theatre-details-page">

        <div className="theatre-not-found">

          <h2>Theatre Not Found</h2>

          <Link to="/theatres">
            Back to Theatres
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="theatre-details-page">

      <div className="theatre-details-card">

        {/* ICON */}

        <div className="theatre-details-icon">
          🎬
        </div>


        {/* CONTENT */}

        <div className="theatre-details-content">

          <p className="theatre-details-label">
            MOVIE THEATRE
          </p>

          <h1>
            {theatre.name}
          </h1>

          <p className="theatre-details-location">
            📍 {theatre.location}
          </p>

          <p className="theatre-details-description">
            {theatre.description}
          </p>


          {/* DETAILS */}

          <div className="theatre-details-grid">

            <div>
              <span>SCREENS</span>
              <strong>
                🎞 {theatre.screens}
              </strong>
            </div>

            <div>
              <span>FACILITIES</span>
              <strong>
                {theatre.facilities}
              </strong>
            </div>

          </div>


          {/* ACTIONS */}

          <div className="theatre-details-actions">

            <Link
              to="/movies"
              className="theatre-book-button"
            >
              Browse Movies
            </Link>

            <Link
              to="/theatres"
              className="theatre-back-button"
            >
              Back to Theatres
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default TheatreDetails;