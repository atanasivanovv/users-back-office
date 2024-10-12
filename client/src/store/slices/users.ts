import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import api from "../../api";
import {
  defaultState,
  defaultUpdateState,
  RequestStateWithUpdate,
} from "../utils";
import { handleFetchCases, handleUpdateCases } from "../handlers";
import { createFetchAllThunk, createUpdateThunk } from "../thunks";

interface UsersState extends RequestStateWithUpdate<User> {
  editingUser: User | null;
}

const initialState: UsersState = {
  ...defaultState,
  editingUser: null,
  update: {
    ...defaultUpdateState,
  },
};

export const fetchUsers = createFetchAllThunk<User>(
  "users/fetchUsers",
  api.users,
);

export const updateUser = createUpdateThunk<User>(
  "users/updateUser",
  api.users,
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    revertUserChanges: (state, action) => {
      const originalUser = state.data.find(
        (user) => user.id === action.payload,
      );
      if (originalUser) {
        state.editingUser = originalUser;
      }
    },
    setEditingUser: (state, action) => {
      state.editingUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    handleFetchCases(builder, fetchUsers);
    handleUpdateCases(builder, updateUser);
  },
});

export const { setEditingUser, revertUserChanges } = usersSlice.actions;
export default usersSlice.reducer;
