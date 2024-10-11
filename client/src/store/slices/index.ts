import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import tasksReducer from "./tasks";
import postsReducer from "./posts";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./users";
export * from "./tasks";
export * from "./posts";
