import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { taskAPI } from "../../services/api";

/**
 * [3] Redux Async Thunks - Dispatch API calls
 * These handle the async operations and dispatch actions
 */

// Fetch all tasks
export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      return await taskAPI.fetchTasks(); // [4] Call API
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add new task
export const addTaskAsync = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    try {
      return await taskAPI.addTask(task); // [4] Call API
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update task
export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      return await taskAPI.updateTask(id, updates); // [4] Call API
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete task
export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await taskAPI.deleteTask(id); // [4] Call API
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * [8] Tasks Slice - State & Reducers
 * Manages all task-related state
 */
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    filter: "all", // 'all' | 'completed' | 'pending'
    searchQuery: "",
  },
  reducers: {
    // Synchronous actions
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload; // [8] Update state
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Task
      .addCase(addTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); // [8] Update state
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Task
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload; // [8] Update state
        }
      })

      // Delete Task
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload); // [8] Update state
      });
  },
});

export const { setFilter, setSearchQuery, clearError } = tasksSlice.actions;
export default tasksSlice.reducer;
