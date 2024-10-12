import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import api from "../../api";
import { defaultState, RequestState } from "../utils";
import { handleFetchCases, handleUpdateCases } from "../handlers";
import { createFetchAllThunk, createInsertThunk } from "../thunks";

interface UsersState extends RequestState<User> {
  editingUser: User | null;
}

const initialState: UsersState = {
  ...defaultState,
  editingUser: null,
};

export const fetchUsers = createFetchAllThunk<User>(
  "users/fetchUsers",
  api.users,
);

export const updateUser = createInsertThunk<User>(
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
