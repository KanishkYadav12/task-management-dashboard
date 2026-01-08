import { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isThemeDark, setIsThemeDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsThemeDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const buttonStyle = {
    backgroundColor: isThemeDark ? "#1e293b" : "#f1f5f9",
    color: isThemeDark ? "#94a3b8" : "#475569",
  };

  const hoverStyle = {
    transition: "all 0.2s ease",
  };

  return (
    <button
      onClick={toggleTheme}
      style={{ ...buttonStyle, ...hoverStyle }}
      className="flex items-center justify-center w-10 h-10 rounded-xl hover:scale-110 active:scale-95"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isThemeDark
          ? "#334155"
          : "#e2e8f0";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isThemeDark
          ? "#1e293b"
          : "#f1f5f9";
      }}
    >
      {isDark ? (
        <Sun className="w-5 h-5" strokeWidth={2} />
      ) : (
        <Moon className="w-5 h-5" strokeWidth={2} />
      )}
    </button>
  );
};

export default ThemeToggle;
