import { createContext, useReducer } from "react";

import { BOOKINGS } from "../data/dummy-data";

export const BookingContext = createContext({
  bookings: [],
  onGoingBookings: [],
  completedBookings: [],
  addCompletedBooking: () => {},
  setBooking: (services) => {},
  setOnGoingBooking: (services) => {},
  setCompletedBooking: (services) => {},
  updateBooking: () => {},
  updateOnGoingBooking: () => {},
  updateCompletedBooking: () => {},
  deleteOnGoingBooking: () => {},
});

const bookingsReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random.toString();
      return [...state, { ...action.payload, id: id }];
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
    case "DELETE":
      return state.filter((booking) => booking.id !== action.payload);
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

  const addCompletedBooking = (bookingData) => {
    completedDispatch({ type: "ADD", payload: bookingData });
  };

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

  const updateOnGoingBooking = (id, bookingData) => {
    onGoingDispatch({ type: "UPDATE", payload: { id: id, data: bookingData } });
  };

  const updateCompletedBooking = (id, bookingData) => {
    completedDispatch({
      type: "UPDATE",
      payload: { id: id, data: bookingData },
    });
  };

  const deleteOnGoingBooking = (id) => {
    onGoingDispatch({ type: "DELETE", payload: id });
  };

  const value = {
    bookings: bookingsState,
    onGoingBookings: onGoingBookingsState,
    completedBookings: completedBookingsState,
    addCompletedBooking: addCompletedBooking,
    setBooking: setBooking,
    setOnGoingBooking: setOnGoingBooking,
    setCompletedBooking: setCompletedBooking,
    updateBooking: updateBooking,
    updateOnGoingBooking: updateOnGoingBooking,
    updateCompletedBooking: updateCompletedBooking,
    deleteOnGoingBooking: deleteOnGoingBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingsContextProvider;
