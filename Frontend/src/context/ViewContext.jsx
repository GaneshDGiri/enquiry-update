import { createContext, useState, useEffect } from "react";

export const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState("desktop");
  const [theme, setTheme] = useState("dark"); // Defaulting to dark based on your screenshots

  useEffect(() => {
    // This dynamically applies BOTH classes to the body! 
    // Example: "desktop-view dark-mode" or "mobile-view light-mode"
    document.body.className = `${viewMode}-view ${theme}-mode`;
  }, [viewMode, theme]);

  // Specific setter functions for the dropdown menu
  const setDesktop = () => setViewMode("desktop");
  const setMobile = () => setViewMode("mobile");
  const setDark = () => setTheme("dark");
  const setLight = () => setTheme("light");

  return (
    <ViewContext.Provider value={{ viewMode, setDesktop, setMobile, theme, setDark, setLight }}>
      {children}
    </ViewContext.Provider>
  );
};