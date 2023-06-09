import axios from "axios";

const URL = "https://mpma.herokuapp.com/api/";

export const getPendingBookings = async (token) => {
  try {
    const response = await axios.get(URL + "admin-get-pending-quotations", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const bookings = [];
    const extractedData = response.data.data;

    extractedData.forEach((booking, index) => {
      bookings.push({
        id: booking.id,
        user_id: booking.user_id,
        service_id: booking.service_id,
        address: booking.address,
        price: booking.price,
        date: booking.date,
        session: booking.session,
        notes: booking.notes,
        status: booking.status,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
      });
    });

    return bookings;
  } catch (error) {
    throw error;
  }
};

export const getOnGoingBookings = async (token) => {
  try {
    const response = await axios.get(URL + "admin-get-active-bookings", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const bookings = [];
    const extractedData = response.data.data;

    extractedData.forEach((booking, index) => {
      bookings.push({
        id: booking.id,
        user_id: booking.user_id,
        service_id: booking.service_id,
        address: booking.address,
        price: booking.price,
        date: booking.date,
        session: booking.session,
        notes: booking.notes,
        status: booking.status,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
      });
    });

    return bookings;
  } catch (error) {
    throw error;
  }
};

export const getCompletedBookings = async (token) => {
  try {
    const response = await axios.get(URL + "admin-get-completed-bookings", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const bookings = [];
    const extractedData = response.data.data;

    extractedData.forEach((booking, index) => {
      bookings.push({
        id: booking.id,
        user_id: booking.user_id,
        service_id: booking.service_id,
        address: booking.address,
        price: booking.price,
        date: booking.date,
        session: booking.session,
        notes: booking.notes,
        status: booking.status,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
      });
    });

    return bookings;
  } catch (error) {
    throw error;
  }
};

export const updateBookingPrice = async (token, bookingData) => {
  try {
    const response = await axios.post(
      URL + "admin-update-booking-price",
      bookingData,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectBooking = async (token, bookingData) => {
  try {
    const response = await axios.post(
      URL + "admin-reject-booking",
      bookingData,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookingDetail = async (token, booking_id) => {
  try {
    const response = await axios.post(
      URL + "admin-get-booking-details",
      booking_id,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCompletedBooking = async (token, bookingData) => {
  try {
    const response = await axios.post(
      URL + "admin-update-completion-status",
      bookingData,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentCompletedBookings = async (token) => {
  try {
    const response = await axios.post(
      URL + "admin-get-earnings-by-month",
      {},
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    const bookings = [];
    const extractedData = response.data.data;

    extractedData.forEach((booking, index) => {
      bookings.push({
        id: booking.id,
        user_id: booking.user_id,
        service_id: booking.service_id,
        address: booking.address,
        price: booking.price,
        date: booking.date,
        session: booking.session,
        notes: booking.notes,
        status: booking.status,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
      });
    });

    return bookings;
  } catch (error) {
    throw error;
  }
};
