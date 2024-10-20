import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [mode, setmode] = useState("light");
  const modeToggle = () => {
    setmode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    document.body.className = mode;
  }, [mode]);
  return (
    <ThemeContext.Provider value={{ mode, modeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
