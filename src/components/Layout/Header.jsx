import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { CheckSquare } from "lucide-react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const headerStyle = {
    backgroundColor: isDark
      ? "rgba(15, 23, 42, 0.95)"
      : "rgba(255, 255, 255, 0.95)",
    borderBottomColor: isDark ? "#1e293b" : "#e2e8f0",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b shadow-sm"
      style={headerStyle}
    >
      <div
        className="w-full"
        style={{
          paddingLeft: "clamp(1rem, 5vw, 3rem)",
          paddingRight: "clamp(1rem, 5vw, 3rem)",
        }}
      >
        <div
          className="w-full flex items-center justify-between"
          style={{
            height: "80px",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg shadow-indigo-500/30"
              style={{
                width: "44px",
                height: "44px",
              }}
            >
              <CheckSquare className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1
                className="text-xl sm:text-2xl font-bold"
                style={{ color: isDark ? "#ffffff" : "#0f172a" }}
              >
                TaskFlow
              </h1>
              <p
                className="text-xs sm:text-sm"
                style={{ color: isDark ? "#94a3b8" : "#64748b" }}
              >
                Stay productive
              </p>
            </div>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
