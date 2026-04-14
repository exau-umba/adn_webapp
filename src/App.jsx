import { useEffect, useState } from "react";
import { AppRouter } from "./app/router";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("adn-admin-theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDarkMode);
    localStorage.setItem("adn-admin-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <AppRouter
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
      isDarkMode={isDarkMode}
      onToggleDarkMode={() => setIsDarkMode((v) => !v)}
    />
  );
}

export default App;
