import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Theatres from "./pages/Theatres";
import Bookings from "./pages/Bookings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import BookingHistory from "./pages/BookingHistory";
import TheatreDetails from "./pages/TheatreDetails";

function App() {
  return (
    <BrowserRouter>
      
      <Navbar />
      
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/movies/:id" element={<MovieDetails />} />

        <Route path="/theatres" element={<Theatres />} />
        <Route path="/theatres/:id" element={<TheatreDetails />} />
        
        <Route path="/bookings" element={<Bookings />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/booking-history" element={<BookingHistory />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;