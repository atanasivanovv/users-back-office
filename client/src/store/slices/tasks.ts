import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskFilters } from "../../types";
import { defaultPage } from "../../constants";
import { defaultState, RequestState } from "../utils";
import api from "../../api";
import { handleFetchCases, handleUpdateCases } from "../handlers";
import { createFetchAllThunk, createUpdateByIdThunk } from "../thunks";

interface TasksState extends RequestState<Task> {
  filters: TaskFilters;
  currentPage: number;
}

const initialState: TasksState = {
  ...defaultState,
  filters: {
    status: "all",
    title: "",
    userId: "all",
  },
  currentPage: 1,
};

export const fetchTasks = createFetchAllThunk<Task>(
  "tasks/fetchTasks",
  api.tasks,
);

export const updateTaskStatus = createUpdateByIdThunk<Task>(
  "tasks/updateTaskStatus",
  (taskId: number) => `${api.tasks}/${taskId}`,
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
  },
  extraReducers: (builder) => {
    handleFetchCases(builder, fetchTasks);
    handleUpdateCases(builder, updateTaskStatus);
  },
});

export const { setFilter, setCurrentPage } = tasksSlice.actions;
export default tasksSlice.reducer;
