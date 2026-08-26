import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import "./BookingHistory.css";

function BookingHistory() {
  const [bookings, setBookings] = useLocalStorage(
    "moviehubBookings",
    []
  );

  // =========================
  // DELETE BOOKING
  // =========================

  const handleDelete = (bookingId) => {
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== bookingId
    );

    setBookings(updatedBookings);
  };

  // =========================
  // CLEAR ALL BOOKINGS
  // =========================

  const handleClearAll = () => {
    setBookings([]);
  };

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="booking-history-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="booking-history-header">

        <p>YOUR BOOKINGS</p>

        <h1>Booking History</h1>

        <span>
          View and manage your previous MovieHub bookings.
        </span>

      </section>


      {/* =========================
          NO BOOKINGS
      ========================= */}

      {bookings.length === 0 ? (

        <section className="no-bookings">

          <div className="no-bookings-icon">
            🎬
          </div>

          <h2>
            No Bookings Yet
          </h2>

          <p>
            You haven't booked any movie tickets yet.
          </p>

          <Link
            to="/movies"
            className="browse-movies-button"
          >
            Browse Movies
          </Link>

        </section>

      ) : (

        <section className="booking-history-container">

          {/* =========================
              TOP BAR
          ========================= */}

          <div className="booking-history-top">

            <div>

              <p>
                TOTAL BOOKINGS
              </p>

              <h2>
                {bookings.length}
              </h2>

            </div>

            <button
              type="button"
              className="clear-all-button"
              onClick={handleClearAll}
            >
              Clear All
            </button>

          </div>


          {/* =========================
              BOOKINGS LIST
          ========================= */}

          <div className="booking-history-list">

            {bookings
              .slice()
              .reverse()
              .map((booking) => (

                <article
                  className="booking-history-card"
                  key={booking.id}
                >

                  {/* MOVIE POSTER */}

                  <div className="history-poster">

                    <img
                      src={booking.movie?.image}
                      alt={
                        booking.movie?.title ||
                        "Movie"
                      }
                    />

                  </div>


                  {/* BOOKING CONTENT */}

                  <div className="history-content">

                    <div className="history-title-row">

                      <div>

                        <p className="history-label">
                          MOVIE
                        </p>

                        <h2>
                          {booking.movie?.title ||
                            "Movie"}
                        </h2>

                      </div>

                      <span className="booking-status">
                        {booking.status ||
                          "Confirmed"}
                      </span>

                    </div>


                    {/* DETAILS */}

                    <div className="history-details">

                      <div className="history-detail">

                        <span>
                          Theatre
                        </span>

                        <strong>
                          {booking.theatre}
                        </strong>

                      </div>


                      <div className="history-detail">

                        <span>
                          Date
                        </span>

                        <strong>
                          {formatDate(
                            booking.date
                          )}
                        </strong>

                      </div>


                      <div className="history-detail">

                        <span>
                          Showtime
                        </span>

                        <strong>
                          {booking.showtime}
                        </strong>

                      </div>


                      <div className="history-detail">

                        <span>
                          Seats
                        </span>

                        <strong>
                          {booking.seats?.join(
                            ", "
                          )}
                        </strong>

                      </div>


                      <div className="history-detail">

                        <span>
                          Customer
                        </span>

                        <strong>
                          {booking.customer?.name}
                        </strong>

                      </div>


                      <div className="history-detail">

                        <span>
                          Total
                        </span>

                        <strong className="history-price">
                          ₹{booking.totalPrice}
                        </strong>

                      </div>

                    </div>


                    {/* FOOTER */}

                    <div className="history-footer">

                      <div>

                        <span>
                          Booking ID
                        </span>

                        <strong>
                          {booking.id}
                        </strong>

                      </div>

                      <button
                        type="button"
                        className="delete-booking"
                        onClick={() =>
                          handleDelete(
                            booking.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </article>

              ))}

          </div>

        </section>

      )}

    </main>
  );
}

export default BookingHistory;