import { createContext, useReducer } from "react";

import { BOOKINGS } from "../data/dummy-data";

export const BookingContext = createContext({
  bookings: [],
  setBooking: (services) => {},
  updateBooking: () => {},
});

const bookingsReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "UPDATE":
      const updatableBookingIndex = state.findIndex(
        (booking) => booking.id === action.payload.id
      );
      const updatableBooking = state[updatableBookingIndex];
      const updatedItem = { ...updatableBooking, ...action.payload.data };
      const updatedBookings = [...state];
      updatedBookings[updatableBookingIndex] = updatedItem;

      return updatedBookings;
    default:
      return state;
  }
};

const BookingsContextProvider = ({ children }) => {
  const [bookingsState, dispatch] = useReducer(bookingsReducer, BOOKINGS);

  const setBooking = (bookings) => {
    dispatch({ type: "SET", payload: bookings });
  };

  const updateBooking = (id, bookingData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: bookingData } });
  };

  const value = {
    bookings: bookingsState,
    setBooking: setBooking,
    updateBooking: updateBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingsContextProvider;
