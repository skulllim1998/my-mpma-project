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
