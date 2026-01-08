/**
 * [4] API Layer - localStorage Mock Service
 * Uses localStorage for persistence + static mock data
 * Perfect for frontend-only deployment without backend
 */

// Static mock data
const MOCK_TASKS = [
  { id: 1, title: "Learn React Hooks", status: "Completed", createdAt: new Date().toISOString() },
  { id: 2, title: "Master Redux Toolkit", status: "Completed", createdAt: new Date().toISOString() },
  { id: 3, title: "Build Task Dashboard", status: "Completed", createdAt: new Date().toISOString() },
  { id: 4, title: "Deploy to Vercel", status: "Completed", createdAt: new Date().toISOString() },
  { id: 5, title: "Write Documentation", status: "Pending", createdAt: new Date().toISOString() },
];

// Storage key
const STORAGE_KEY = "tasks_data";

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_TASKS));
  }
};

// Get all tasks from localStorage
const getTasks = () => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data || JSON.stringify(MOCK_TASKS));
};

// Save tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

/**
 * Task API Methods
 * [4] These use localStorage for persistence
 * Simulates backend delays for realistic UX
 */
export const taskAPI = {
  /**
   * Fetch all tasks from localStorage
   * @returns {Promise<Array>} Array of tasks
   */
  fetchTasks: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("[API] Fetching tasks from localStorage");
    return getTasks();
  },

  /**
   * Add new task
   * @param {Object} task - Task object {title, status}
   * @returns {Promise<Object>} Created task with id
   */
  addTask: async (task) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const tasks = getTasks();
    const newTask = {
      id: Date.now(), // Use timestamp as unique ID
      ...task,
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log("[API] Task added:", newTask);
    return newTask;
  },

  /**
   * Update existing task
   * @param {string} id - Task ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated task
   */
  updateTask: async (id, updates) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const tasks = getTasks();
    const taskIndex = tasks.findIndex((t) => t.id === id);
    
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    saveTasks(tasks);
    console.log("[API] Task updated:", tasks[taskIndex]);
    return tasks[taskIndex];
  },

  /**
   * Delete task
   * @param {string} id - Task ID
   * @returns {Promise<string>} Deleted task ID
   */
  deleteTask: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const tasks = getTasks();
    const filteredTasks = tasks.filter((t) => t.id !== id);
    saveTasks(filteredTasks);
    console.log("[API] Task deleted with id:", id);
    return id;
  },
};
