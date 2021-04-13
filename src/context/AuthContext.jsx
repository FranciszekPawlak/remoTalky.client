import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const ENDPOINT = "http://localhost:4001";

  const [theme, setThemeValue] = useState("light");
  const [user, setUser] = useState(null);
  const socket = io(ENDPOINT);
  const setTheme = (value) => {
    localStorage.setItem("theme", value);
    setThemeValue(value);
  };

  useEffect(() => {
    const initialTheme = localStorage.getItem("theme");
    if (initialTheme) {
      setThemeValue(initialTheme);
    }
  }, [,]);

  return (
    <AuthContext.Provider
      value={{
        theme,
        setTheme,
        user,
        setUser,
        socket,
        url: "http://localhost:4000",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
