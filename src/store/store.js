import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    // NO theme reducer here!
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Sync Redux state with localStorage on every change
store.subscribe(() => {
  const state = store.getState();
  // Save tasks array to localStorage whenever it changes
  localStorage.setItem(
    "tasks_data",
    JSON.stringify(state.tasks.tasks)
  );
});
