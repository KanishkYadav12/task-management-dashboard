import { useState, useEffect } from "react";
import { useTasks } from "../../hooks/useTasks";
import { Plus } from "lucide-react";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { addTask, loading } = useTasks();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      title: title.trim(),
      status: "pending",
    });
    setTitle("");
  };

  const inputStyle = {
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    backgroundColor: isDark
      ? isFocused
        ? "#1e293b"
        : "#0f172a"
      : isFocused
      ? "#ffffff"
      : "#f8fafc",
    borderColor: isFocused ? "#6366f1" : isDark ? "#475569" : "#e2e8f0",
    borderWidth: "3px",
    color: isDark ? "#f1f5f9" : "#0f172a",
  };

  const buttonStyle = {
    paddingLeft: "2rem",
    paddingRight: "2rem",
    backgroundColor:
      loading || !title.trim() ? (isDark ? "#334155" : "#cbd5e1") : "#6366f1",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label
        style={{ color: isDark ? "#cbd5e1" : "#334155" }}
        className="text-sm font-semibold"
      >
        Create a new task
      </label>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What needs to be done?"
            style={inputStyle}
            className="w-full h-[56px] rounded-2xl text-base transition-all duration-200 focus:shadow-lg focus:shadow-indigo-500/10"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !title.trim()}
          style={buttonStyle}
          className="sm:flex-shrink-0 h-[56px] inline-flex items-center justify-center gap-2 rounded-2xl text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
