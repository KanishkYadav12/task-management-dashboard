import { useState, useEffect } from "react";
import { useTasks } from "../../hooks/useTasks";
import { Trash2, Pencil, Check, X } from "lucide-react";

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isDark, setIsDark] = useState(false);
  const { updateTask, deleteTask } = useTasks();

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

  const isCompleted = task.status === "completed";

  const handleToggle = () => {
    updateTask(task.id, {
      status: isCompleted ? "pending" : "completed",
    });
  };

  const handleSave = () => {
    if (!editTitle.trim()) return;
    updateTask(task.id, { title: editTitle.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const containerStyle = {
    padding: "1.25rem",
    borderWidth: "2px",
    borderRadius: "1rem",
    backgroundColor: isCompleted
      ? isDark
        ? "rgba(16, 185, 129, 0.1)"
        : "#f0fdf4"
      : isDark
      ? "#1e293b"
      : "#ffffff",
    borderColor: isCompleted
      ? isDark
        ? "rgba(16, 185, 129, 0.3)"
        : "#bbf7d0"
      : isDark
      ? "#475569"
      : "#e2e8f0",
  };

  const checkboxStyle = {
    width: "28px",
    height: "28px",
    borderWidth: "3px",
    borderRadius: "10px",
    backgroundColor: isCompleted ? "#10b981" : "transparent",
    borderColor: isCompleted ? "#10b981" : isDark ? "#64748b" : "#cbd5e1",
  };

  const textColor = isCompleted
    ? isDark
      ? "#64748b"
      : "#94a3b8"
    : isDark
    ? "#f1f5f9"
    : "#0f172a";

  return (
    <div
      style={containerStyle}
      className={`group flex items-start gap-4 transition-all duration-200 ${
        !isCompleted && "hover:shadow-xl hover:-translate-y-1"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        style={checkboxStyle}
        className="flex-shrink-0 flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        {isCompleted && (
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            style={{
              padding: "0.75rem 1rem",
              borderWidth: "2px",
              borderColor: "#6366f1",
              borderRadius: "0.75rem",
              backgroundColor: isDark ? "#1e293b" : "#ffffff",
              color: isDark ? "#f1f5f9" : "#0f172a",
            }}
            className="w-full text-base focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
            autoFocus
          />
        ) : (
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              lineHeight: "1.6",
              color: textColor,
            }}
            className={isCompleted ? "line-through" : ""}
          >
            {task.title}
          </p>
        )}
      </div>

      {/* Actions */}
      <div
        className={`flex items-center gap-1 transition-opacity duration-200 ${
          isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              style={{ padding: "0.625rem", borderRadius: "0.5rem" }}
              className="text-emerald-600 hover:bg-emerald-50 transition-colors"
              title="Save"
            >
              <Check className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: "0.625rem",
                borderRadius: "0.5rem",
                color: isDark ? "#94a3b8" : "#64748b",
              }}
              className="hover:bg-slate-200 transition-colors"
              title="Cancel"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "0.625rem",
                borderRadius: "0.5rem",
                color: isDark ? "#94a3b8" : "#94a3b8",
              }}
              className="hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                padding: "0.625rem",
                borderRadius: "0.5rem",
                color: isDark ? "#94a3b8" : "#94a3b8",
              }}
              className="hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
