import { useState, useEffect } from "react";
import { useTasks } from "../../hooks/useTasks";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useTasks();
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

  const inputStyle = {
    paddingLeft: "1.5rem",
    paddingRight: "4rem",
    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    borderColor: isDark ? "#475569" : "#e2e8f0",
    borderWidth: "3px",
    color: isDark ? "#f1f5f9" : "#0f172a",
  };

  return (
    <div className="space-y-3">
      <label
        style={{ color: isDark ? "#cbd5e1" : "#334155" }}
        className="text-sm font-semibold"
      >
        Search tasks
      </label>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title..."
          style={inputStyle}
          className="w-full h-[56px] rounded-2xl text-base transition-all duration-200 focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/10 focus:outline-none"
        />
        <div className="absolute inset-y-0 right-5 flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{ color: isDark ? "#94a3b8" : "#64748b" }}
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <Search
            className="w-5 h-5"
            style={{ color: isDark ? "#64748b" : "#94a3b8" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
