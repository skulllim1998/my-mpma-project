import { createContext, useReducer } from "react";

import { BOOKINGS } from "../data/dummy-data";

export const BookingContext = createContext({
  bookings: [],
  onGoingBookings: [],
  completedBookings: [],
  setBooking: (services) => {},
  setOnGoingBooking: (services) => {},
  setCompletedBooking: (services) => {},
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
  const [onGoingBookingsState, onGoingDispatch] = useReducer(
    bookingsReducer,
    BOOKINGS
  );
  const [completedBookingsState, completedDispatch] = useReducer(
    bookingsReducer,
    BOOKINGS
  );

  const setBooking = (bookings) => {
    dispatch({ type: "SET", payload: bookings });
  };

  const setOnGoingBooking = (bookings) => {
    onGoingDispatch({ type: "SET", payload: bookings });
  };

  const setCompletedBooking = (bookings) => {
    completedDispatch({ type: "SET", payload: bookings });
  };

  const updateBooking = (id, bookingData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: bookingData } });
  };

  const value = {
    bookings: bookingsState,
    onGoingBookings: onGoingBookingsState,
    completedBookings: completedBookingsState,
    setBooking: setBooking,
    setOnGoingBooking: setOnGoingBooking,
    setCompletedBooking: setCompletedBooking,
    updateBooking: updateBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingsContextProvider;
