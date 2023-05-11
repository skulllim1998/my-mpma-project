import axios from "axios";
import Service from "../models/service";

const URL = "https://mpma.herokuapp.com/api/";

export const serviceItems = [];

export const createService = async (serviceData, token) => {
  try {
    const response = await axios.post(URL + "new-admin-service", serviceData, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getServicesByAdmin = async (token) => {
  try {
    const response = await axios.get(URL + "get-service-provided", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const services = [];
    const extractedData = response.data.data;

    extractedData.forEach((service, index) => {
      services.push(
        new Service(
          service.id,
          service.admin_id,
          service.name,
          service.description,
          service.price_range,
          service.category,
          service.active,
          service.created_at,
          service.updated_at
        )
      );
    });

    return services;
  } catch (error) {
    throw error;
  }
};
