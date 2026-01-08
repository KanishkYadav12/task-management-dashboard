import { useEffect, useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Layout/Header";
import TaskForm from "./components/TaskForm/TaskForm";
import FilterButtons from "./components/Filters/FilterButtons";
import SearchBar from "./components/Filters/SearchBar";
import TaskList from "./components/TaskList/TaskList";
import { AlertCircle } from "lucide-react";

function App() {
  const { fetchTasks, loading, error } = useTasks();
  const [isDark, setIsDark] = useState(false);
  useTheme();

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const appStyle = {
    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    color: isDark ? "#f1f5f9" : "#0f172a",
  };

  return (
    <div className="min-h-screen" style={appStyle}>
      <Header />

      <main className="app-shell">
        <section className="content-card">
          <div className="section-stack">
            <div>
              <h2
                className="text-3xl font-bold"
                style={{ color: isDark ? "#ffffff" : "#0f172a" }}
              >
                My Tasks
              </h2>
              <p
                className="text-base"
                style={{ color: isDark ? "#94a3b8" : "#64748b" }}
              >
                Organize your work and get things done
              </p>
            </div>

            <TaskForm />

            <div className="stack gap-5">
              <SearchBar />
              <FilterButtons />
            </div>

            {error && (
              <div className="alert">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            <div className="tasklist-section">
              {loading ? (
                <div className="loader">
                  <div className="spinner" />
                  <p>Loading tasks...</p>
                </div>
              ) : (
                <TaskList />
              )}
            </div>
          </div>
        </section>

        <footer className="app-footer">
          Built with React, Redux & Tailwind CSS
        </footer>
      </main>
    </div>
  );
}

export default App;
