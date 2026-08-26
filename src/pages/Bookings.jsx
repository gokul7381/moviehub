import { useReducer, useState, useRef } from "react";
import { useBooking } from "../context/BookingContext";
import "./Bookings.css";

const initialState = {
  selectedSeats: [],
};

function seatReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SEAT":
      if (state.selectedSeats.includes(action.seat)) {
        return {
          ...state,
          selectedSeats: state.selectedSeats.filter(
            (seat) => seat !== action.seat
          ),
        };
      }

      return {
        ...state,
        selectedSeats: [...state.selectedSeats, action.seat],
      };

    case "CLEAR_SEATS":
      return {
        ...state,
        selectedSeats: [],
      };

    default:
      return state;
  }
}

function Bookings() {
  const { selectedMovie } = useBooking();

  const [theatre, setTheatre] = useState("");
  const [date, setDate] = useState("");
  const [showtime, setShowtime] = useState("");

  const [state, dispatch] = useReducer(
    seatReducer,
    initialState
  );

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // =========================
  // useRef
  // =========================

  const customerNameRef = useRef(null);

  const theatres = [
    "PVR Cinemas",
    "INOX",
    "KG Cinemas",
    "SPI Cinemas",
  ];

  const showtimes = [
    "10:00 AM",
    "01:30 PM",
    "04:30 PM",
    "07:30 PM",
    "10:30 PM",
  ];

  const seats = [
    "A1", "A2", "A3", "A4", "A5", "A6",
    "B1", "B2", "B3", "B4", "B5", "B6",
    "C1", "C2", "C3", "C4", "C5", "C6",
    "D1", "D2", "D3", "D4", "D5", "D6",
    "E1", "E2", "E3", "E4", "E5", "E6",
  ];

  const seatPrice = 180;

  const totalPrice =
    state.selectedSeats.length * seatPrice;

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!customer.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(customer.phone)) {
      newErrors.phone = "Enter a valid 10-digit number";
    }

    if (!theatre) {
      newErrors.theatre = "Select a theatre";
    }

    if (!date) {
      newErrors.date = "Select a date";
    }

    if (!showtime) {
      newErrors.showtime = "Select a showtime";
    }

    if (state.selectedSeats.length === 0) {
      newErrors.seats = "Select at least one seat";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = () => {
    if (!validateForm()) {
      return;
    }

    const generatedId =
      "MH-" +
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    const newBooking = {
      id: generatedId,
      movie: selectedMovie,
      theatre,
      date,
      showtime,
      seats: [...state.selectedSeats],
      customer: {
        ...customer,
      },
      totalPrice,
      bookingDate: new Date().toISOString(),
      status: "Confirmed",
    };

    const existingBookings =
      JSON.parse(
        localStorage.getItem("moviehubBookings")
      ) || [];

    localStorage.setItem(
      "moviehubBookings",
      JSON.stringify([
        ...existingBookings,
        newBooking,
      ])
    );

    setBookingId(generatedId);
    setBookingConfirmed(true);

    // =========================
    // useRef ACTION
    // =========================

    customerNameRef.current?.focus();
  };

  const formattedDate = date
    ? new Date(
        `${date}T00:00:00`
      ).toLocaleDateString("en-CA")
    : "Not selected";

  return (
    <main className="booking-page">

      <section className="booking-header">

        <p>BOOK YOUR TICKETS</p>

        <h1>Movie Booking</h1>

        <span>
          Select your theatre, date, showtime and seats.
        </span>

      </section>


      {selectedMovie && (
        <div className="selected-movie">

          <div className="selected-movie-poster">

            <img
              src={selectedMovie.image}
              alt={selectedMovie.title}
            />

          </div>

          <div className="selected-movie-info">

            <p>SELECTED MOVIE</p>

            <h2>
              {selectedMovie.title}
            </h2>

            <span>
              {selectedMovie.genre}
              {" • "}
              {selectedMovie.language}
            </span>

            <small>
              ⭐ {selectedMovie.rating}
              {" • "}
              ⏱ {selectedMovie.duration}
            </small>

          </div>

        </div>
      )}


      <section className="booking-container">

        <div className="booking-form">

          <div className="form-group">

            <label>
              Select Theatre
            </label>

            <select
              value={theatre}
              onChange={(event) => {
                setTheatre(event.target.value);

                setErrors((previous) => ({
                  ...previous,
                  theatre: "",
                }));

                setBookingConfirmed(false);
              }}
            >

              <option value="">
                Choose a theatre
              </option>

              {theatres.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

            {errors.theatre && (
              <small className="error">
                {errors.theatre}
              </small>
            )}

          </div>


          <div className="form-group">

            <label>
              Select Date
            </label>

            <input
              type="date"
              value={date}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(event) => {
                setDate(event.target.value);

                setErrors((previous) => ({
                  ...previous,
                  date: "",
                }));

                setBookingConfirmed(false);
              }}
            />

            {errors.date && (
              <small className="error">
                {errors.date}
              </small>
            )}

          </div>


          <div className="form-group">

            <label>
              Select Showtime
            </label>

            <div className="showtime-grid">

              {showtimes.map((time) => (

                <button
                  type="button"
                  key={time}
                  className={
                    showtime === time
                      ? "showtime active"
                      : "showtime"
                  }
                  onClick={() => {
                    setShowtime(time);

                    setErrors((previous) => ({
                      ...previous,
                      showtime: "",
                    }));

                    setBookingConfirmed(false);
                  }}
                >
                  {time}
                </button>

              ))}

            </div>

            {errors.showtime && (
              <small className="error">
                {errors.showtime}
              </small>
            )}

          </div>


          <div className="seat-section">

            <label>
              Select Seats
            </label>

            <div className="screen">
              SCREEN
            </div>

            <div className="seat-grid">

              {seats.map((seat) => (

                <button
                  type="button"
                  key={seat}
                  className={
                    state.selectedSeats.includes(seat)
                      ? "seat selected"
                      : "seat"
                  }
                  onClick={() => {

                    dispatch({
                      type: "TOGGLE_SEAT",
                      seat,
                    });

                    setErrors((previous) => ({
                      ...previous,
                      seats: "",
                    }));

                    setBookingConfirmed(false);
                  }}
                >
                  {seat}
                </button>

              ))}

            </div>

            {errors.seats && (
              <small className="error seat-error">
                {errors.seats}
              </small>
            )}

            <div className="seat-legend">

              <span>
                <i className="available-seat"></i>
                Available
              </span>

              <span>
                <i className="selected-seat"></i>
                Selected
              </span>

            </div>

          </div>


          <div className="customer-section">

            <label>
              Customer Details
            </label>

            <input
              ref={customerNameRef}
              type="text"
              name="name"
              placeholder="Full Name"
              value={customer.name}
              onChange={handleCustomerChange}
            />

            {errors.name && (
              <small className="error">
                {errors.name}
              </small>
            )}


            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={customer.email}
              onChange={handleCustomerChange}
            />

            {errors.email && (
              <small className="error">
                {errors.email}
              </small>
            )}


            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleCustomerChange}
            />

            {errors.phone && (
              <small className="error">
                {errors.phone}
              </small>
            )}


            <button
              type="button"
              className="confirm-booking"
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </button>

          </div>

        </div>


        <div className="booking-summary">

          <p>
            YOUR SELECTION
          </p>

          <h2>
            Booking Summary
          </h2>


          {selectedMovie && (
            <div className="confirmation-movie">

              <img
                src={selectedMovie.image}
                alt={selectedMovie.title}
              />

              <div>

                <span>
                  Movie
                </span>

                <strong>
                  {selectedMovie.title}
                </strong>

              </div>

            </div>
          )}


          <div className="summary-item">

            <span>
              Theatre
            </span>

            <strong>
              {theatre || "Not selected"}
            </strong>

          </div>


          <div className="summary-item">

            <span>
              Date
            </span>

            <strong>
              {formattedDate}
            </strong>

          </div>


          <div className="summary-item">

            <span>
              Showtime
            </span>

            <strong>
              {showtime || "Not selected"}
            </strong>

          </div>


          <div className="summary-item">

            <span>
              Seats
            </span>

            <strong>
              {state.selectedSeats.length > 0
                ? state.selectedSeats.join(", ")
                : "Not selected"}
            </strong>

          </div>


          <div className="summary-item">

            <span>
              Ticket Price
            </span>

            <strong>
              ₹{seatPrice} ×{" "}
              {state.selectedSeats.length}
            </strong>

          </div>


          {customer.name && (
            <div className="summary-item">

              <span>
                Customer
              </span>

              <strong>
                {customer.name}
              </strong>

            </div>
          )}


          <div className="total-price">

            <span>
              Total
            </span>

            <strong>
              ₹{totalPrice}
            </strong>

          </div>


          {state.selectedSeats.length > 0 &&
            !bookingConfirmed && (

              <button
                type="button"
                className="clear-seats"
                onClick={() =>
                  dispatch({
                    type: "CLEAR_SEATS",
                  })
                }
              >
                Clear Seats
              </button>

            )}


          {bookingConfirmed && (

            <div className="booking-success">

              <div className="success-icon">
                ✓
              </div>

              <h3>
                Booking Confirmed!
              </h3>

              <p>
                Your tickets have been
                successfully booked.
              </p>


              {selectedMovie && (

                <div className="confirmation-movie">

                  <img
                    src={selectedMovie.image}
                    alt={selectedMovie.title}
                  />

                  <div>

                    <span>
                      Movie
                    </span>

                    <strong>
                      {selectedMovie.title}
                    </strong>

                  </div>

                </div>

              )}


              <div className="confirmation-item">

                <span>
                  Theatre
                </span>

                <strong>
                  {theatre}
                </strong>

              </div>


              <div className="confirmation-item">

                <span>
                  Date
                </span>

                <strong>
                  {formattedDate}
                </strong>

              </div>


              <div className="confirmation-item">

                <span>
                  Showtime
                </span>

                <strong>
                  {showtime}
                </strong>

              </div>


              <div className="confirmation-item">

                <span>
                  Seats
                </span>

                <strong>
                  {state.selectedSeats.join(", ")}
                </strong>

              </div>


              <div className="confirmation-item">

                <span>
                  Customer
                </span>

                <strong>
                  {customer.name}
                </strong>

              </div>


              <div className="confirmation-item">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{totalPrice}
                </strong>

              </div>


              <div className="booking-id">

                <span>
                  Booking ID
                </span>

                <strong>
                  {bookingId}
                </strong>

              </div>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Bookings;