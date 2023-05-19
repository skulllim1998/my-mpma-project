import axios from "axios";

const GLOBAL = require('../constants/Global');
const URL = GLOBAL.API_URL;

export const registerNewCustomer = async (customerData) => {
  try {
    const response = await axios.post(URL + "new-user", customerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customerLogin = async (customerData) => {
  try {
    const response = await axios.post(URL + "user-login", customerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customerActiveServices = async (token) => {
  try {
    const response = await axios.get(
      URL + "user-active-services",
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

export const getServicesByCategory = async (token, catData) => {
  try {
    const response = await axios.post(
      URL + "get-service-by-category",
      catData,
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

export const getUserBookings = async (token) => {
  try {
    const response = await axios.get(
      URL + "get-user-bookings",
      {        
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
      );
      console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userRejectBooking = async (token, bookingData) => {
  try {
    const response = await axios.post(
      URL + "user-reject-booking",
      bookingData,
      {        
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
      );
      console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userMakePayment = async (token, bookingData) => {
  try {
    const response = await axios.post(
      URL + "user-make-payment",
      bookingData,
      {        
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
      );
      console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userAcceptQuotation = async (token, bookingData) => {
  try {
    const response = await axios.post(
      URL + "user-accept-quotation",
      bookingData,
      {        
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
      );
      console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newBooking = async (token, bookingData) => {
  try {
    const response = await axios.post(
      URL + "new-booking",
      bookingData,
      {        
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
      );
      console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveProfile = async (token, profileData) => {
  try {
    const response = await axios.post(
      URL + "update-user-profile",
      profileData,
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

export const userResetPassword = async (token, data) => {
  try {
    const response = await axios.post(
      URL + "update-password",
      data,
      {        
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
      );
      console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};