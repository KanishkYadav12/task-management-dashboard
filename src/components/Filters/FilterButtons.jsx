import { useState, useEffect } from "react";
import { useTasks } from "../../hooks/useTasks";

const FilterButtons = () => {
  const { filter, setFilter, stats } = useTasks();
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

  const filters = [
    { value: "all", label: "All Tasks", count: stats.total },
    { value: "pending", label: "Pending", count: stats.pending },
    { value: "completed", label: "Completed", count: stats.completed },
  ];

  const getActiveStyle = (value) =>
    ({
      all: {
        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)",
      },
      pending: {
        background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
        boxShadow: "0 8px 20px rgba(245, 158, 11, 0.3)",
      },
      completed: {
        background: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
        boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)",
      },
    }[value]);

  const getInactiveStyle = () => ({
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    borderColor: isDark ? "#475569" : "#e2e8f0",
    borderWidth: "2px",
    color: isDark ? "#cbd5e1" : "#334155",
  });

  const getBadgeStyle = (isActive) => ({
    backgroundColor: isActive
      ? "rgba(255, 255, 255, 0.25)"
      : isDark
      ? "#334155"
      : "#f1f5f9",
    color: isActive ? "#ffffff" : isDark ? "#cbd5e1" : "#475569",
  });

  return (
    <div className="space-y-3">
      <label
        style={{ color: isDark ? "#cbd5e1" : "#334155" }}
        className="text-sm font-semibold"
      >
        Filter by status
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {filters.map(({ value, label, count }) => {
          const isActive = filter === value;
          const buttonStyle = isActive
            ? getActiveStyle(value)
            : getInactiveStyle();

          return (
            <button
              key={value}
              onClick={() => setFilter(value)}
              style={buttonStyle}
              className={`w-full rounded-2xl px-5 py-3.5 font-semibold transition-all duration-200 ${
                isActive ? "text-white scale-105" : "hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-base">{label}</span>
                <span
                  style={getBadgeStyle(isActive)}
                  className="text-xs font-bold px-2.5 py-1 rounded-full min-w-[28px]"
                >
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterButtons;
