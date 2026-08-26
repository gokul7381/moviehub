import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <BookingContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}