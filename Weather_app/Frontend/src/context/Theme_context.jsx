import React, { useState } from 'react';
import ThemeContextValue from './Theme_contextValue.jsx';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContextValue.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContextValue.Provider>
  );
};

export default ThemeProvider;
