import axios from "axios";

const API_URL = "http://localhost:3001";

/**
 * [4] API Layer - Axios HTTP Client
 * All API calls go through this service
 */

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// Request interceptor (for future auth tokens, etc.)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for error handling)
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} - ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("[API Error]", error.message);
    return Promise.reject(error);
  }
);

/**
 * Task API Methods
 * [4] These make actual HTTP requests to JSON Server
 */
export const taskAPI = {
  /**
   * Fetch all tasks from mock backend
   * @returns {Promise<Array>} Array of tasks
   */
  fetchTasks: async () => {
    const response = await apiClient.get("/tasks");
    return response.data; // [7] Response data returned
  },

  /**
   * Add new task
   * @param {Object} task - Task object {title, status}
   * @returns {Promise<Object>} Created task with id
   */
  addTask: async (task) => {
    const response = await apiClient.post("/tasks", {
      ...task,
      createdAt: new Date().toISOString(),
    });
    return response.data; // [7] Response data returned
  },

  /**
   * Update existing task
   * @param {string} id - Task ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated task
   */
  updateTask: async (id, updates) => {
    const response = await apiClient.patch(`/tasks/${id}`, updates);
    return response.data; // [7] Response data returned
  },

  /**
   * Delete task
   * @param {string} id - Task ID
   * @returns {Promise<string>} Deleted task ID
   */
  deleteTask: async (id) => {
    await apiClient.delete(`/tasks/${id}`);
    return id; // [7] Return ID for state update
  },
};
