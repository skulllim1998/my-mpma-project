import axios from "axios";

const URL = "https://mpma.herokuapp.com/api/";

export const createProvider = async (providerData) => {
  try {
    const response = await axios.post(URL + "new-admin", providerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginProvider = async (providerData) => {
  try {
    const response = await axios.post(URL + "admin-login", providerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (token) => {
  try {
    const response = await axios.get(URL + "get-profile", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (token, providerData) => {
  try {
    const response = await axios.post(
      URL + "update-admin-profile",
      providerData,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    throw error;
  }
};
