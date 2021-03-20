import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [theme, setThemeValue] = useState("light");
  const [user, setUser] = useState(null);

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
    <Context.Provider
      value={{
        theme,
        setTheme,
        user,
        setUser,
        url: "http://localhost:4000",
      }}
    >
      {children}
    </Context.Provider>
  );
};
