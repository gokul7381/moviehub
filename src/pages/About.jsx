import "./About.css";

function About() {
  return (
    <main className="about-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="about-header">

        <p>ABOUT OUR PLATFORM</p>

        <h1>
          Your Movie Experience,
          <br />
          Made Simple.
        </h1>

        <span>
          Discover movies, explore theatres and book your
          favourite seats with ease.
        </span>

      </section>


      {/* =========================
          ABOUT CONTENT
      ========================= */}

      <section className="about-container">

        <div className="about-card">

          <div className="about-icon">
            🎬
          </div>

          <div className="about-content">

            <p className="about-label">
              WHO WE ARE
            </p>

            <h2>
              Everything You Need
              For A Great Movie Night
            </h2>

            <p>
              Our movie booking platform makes it easy to
              discover the latest movies, explore nearby
              theatres and book tickets from one place.
            </p>

            <p>
              Whether you are planning a movie night with
              friends, family or simply enjoying a film by
              yourself, we make the booking experience
              simple and convenient.
            </p>

          </div>

        </div>


        {/* =========================
            FEATURES
        ========================= */}

        <div className="about-features">

          <div className="about-feature">

            <div className="feature-icon">
              🎥
            </div>

            <h3>
              Latest Movies
            </h3>

            <p>
              Explore movies from our collection and
              discover the latest releases.
            </p>

          </div>


          <div className="about-feature">

            <div className="feature-icon">
              🏢
            </div>

            <h3>
              Great Theatres
            </h3>

            <p>
              Find comfortable theatres with premium
              screens and modern facilities.
            </p>

          </div>


          <div className="about-feature">

            <div className="feature-icon">
              🎟️
            </div>

            <h3>
              Easy Booking
            </h3>

            <p>
              Select your movie, showtime and seats
              and complete your booking easily.
            </p>

          </div>

        </div>


        {/* =========================
            MISSION
        ========================= */}

        <div className="about-mission">

          <p>
            OUR MISSION
          </p>

          <h2>
            Making Every Movie
            <br />
            Night Memorable.
          </h2>

          <span>
            We aim to provide a simple, smooth and enjoyable
            movie booking experience for everyone.
          </span>

        </div>

      </section>

    </main>
  );
}

export default About;