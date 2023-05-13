import { createContext, useReducer } from "react";
import Service from "../models/service";
import { SERVICES } from "../data/dummy-data";

export const ServiceContext = createContext({
  services: [],
  addService: (serviceData) => {},
  setService: (services) => {},
  updateService: () => {},
  deleteService: () => {},
});

const servicesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random.toString();
      return [...state, { ...action.payload, id: id }];
    case "SET":
      return action.payload;
    case "UPDATE":
      //get index of state(array)
      const updatableServiceIndex = state.findIndex(
        (service) => service.id === action.payload.id
      );
      //get item of state(array)
      const updatableService = state[updatableServiceIndex];
      //replace old data with new data
      const updatedItem = { ...updatableService, ...action.payload.data };
      const updatedServices = [...state];
      updatedServices[updatableServiceIndex] = updatedItem;

      return updatedServices;
    case "DELETE":
      return state.filter((service) => service.id !== action.payload);
    default:
      return state;
  }
};

const ServicesContextProvider = ({ children }) => {
  const [servicesState, dispatch] = useReducer(servicesReducer, []);

  const addService = (serviceData) => {
    dispatch({ type: "ADD", payload: serviceData });
  };

  const setService = (services) => {
    dispatch({ type: "SET", payload: services });
  };

  const updateService = (id, serviceData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: serviceData } });
  };

  const deleteService = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const value = {
    services: servicesState,
    addService: addService,
    setService: setService,
    updateService: updateService,
    deleteService: deleteService,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

export default ServicesContextProvider;
