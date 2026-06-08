import React, { createContext, useContext, useEffect, useState } from 'react';
 
const ThemeContext = createContext();
 
export const ThemeProvider = ({ children }) => {
  // Khóa theme ở chế độ light (sáng) cố định
  const theme = 'light';
 
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    localStorage.setItem('theme', 'light');
  }, []);
 
  const toggleTheme = () => {
    // Không làm gì vì đã khóa ở light mode
  };
 
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
 
export const useTheme = () => useContext(ThemeContext);
