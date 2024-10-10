import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import tasksReducer from "./tasksSlice";
import postsReducer from "./postsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./usersSlice";
export * from "./tasksSlice";
