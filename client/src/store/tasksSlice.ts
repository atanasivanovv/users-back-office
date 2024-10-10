import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Task, TaskFilters } from "../types";
import { defaultPage } from "../constants";

interface TasksState {
  tasks: Task[];
  filteredTasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: TaskFilters;
  currentPage: number;
}

const initialState: TasksState = {
  tasks: [],
  filteredTasks: [],
  status: "idle",
  error: null,
  filters: {
    status: "all",
    title: "",
    userId: "all",
  },
  currentPage: 1,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos",
  );
  return response.data;
});

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, completed }: { id: number; completed: boolean }) => {
    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { completed },
    );
    return response.data;
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ key: string; value: string }>,
    ) => {
      state.filters = {
        ...state.filters,
        [action.payload.key]: action.payload.value,
      };
      state.currentPage = defaultPage;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    applyFilters: (state) => {
      state.filteredTasks = state.tasks.filter((task) => {
        const statusMatch =
          state.filters.status === "all" ||
          (state.filters.status === "completed"
            ? task.completed
            : !task.completed);
        const titleMatch = task.title
          .toLowerCase()
          .includes(state.filters.title.toLowerCase());
        const userMatch =
          state.filters.userId === "all" ||
          task.userId.toString() === state.filters.userId;
        return statusMatch && titleMatch && userMatch;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded";
        state.tasks = action.payload;
        state.filteredTasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(
        updateTaskStatus.fulfilled,
        (state, action: PayloadAction<Task>) => {
          const index = state.tasks.findIndex(
            (task) => task.id === action.payload.id,
          );
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
          const filteredIndex = state.filteredTasks.findIndex(
            (task) => task.id === action.payload.id,
          );
          if (filteredIndex !== -1) {
            state.filteredTasks[filteredIndex] = action.payload;
          }
        },
      );
  },
});

export const { setFilter, setCurrentPage, applyFilters } = tasksSlice.actions;
export default tasksSlice.reducer;
