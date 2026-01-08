import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksAsync,
  addTaskAsync,
  updateTaskAsync,
  deleteTaskAsync,
  setFilter,
  setSearchQuery,
} from "../store/slices/tasksSlice";

/**
 * [2] Custom Hook - Business Logic Layer
 * Abstracts Redux logic from components
 * [9] Processes state before returning to component
 */
export const useTasks = () => {
  const dispatch = useDispatch();

  // Get state from Redux store
  const { tasks, loading, error, filter, searchQuery } = useSelector(
    (state) => state.tasks
  );

  /**
   * [9] Process State - Apply filters and search
   * This is where we transform raw state into usable data
   */
  const filteredTasks = tasks
    .filter((task) => {
      // Apply status filter
      if (filter === "completed") return task.status === "completed";
      if (filter === "pending") return task.status === "pending";
      return true; // 'all'
    })
    .filter((task) => {
      // Apply search filter
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first

  // Calculate statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  /**
   * [9] Return processed data and actions
   * Components receive clean, ready-to-use data
   */
  return {
    // State
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    error,
    filter,
    searchQuery,
    stats,

    // Actions - [3] These dispatch Redux thunks
    fetchTasks: () => dispatch(fetchTasksAsync()),
    addTask: (task) => dispatch(addTaskAsync(task)),
    updateTask: (id, updates) => dispatch(updateTaskAsync({ id, updates })),
    deleteTask: (id) => dispatch(deleteTaskAsync(id)),
    setFilter: (filter) => dispatch(setFilter(filter)),
    setSearchQuery: (query) => dispatch(setSearchQuery(query)),
  };
};
