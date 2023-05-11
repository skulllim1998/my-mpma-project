import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  role: "",
  authenticate: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [authRole, setAuthRole] = useState();

  const authenticate = (token, role) => {
    setAuthToken(token);
    setAuthRole(role);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("role", role);
  };

  const logout = () => {
    setAuthToken(null);
    setAuthRole(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("role");
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    role: authRole,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
