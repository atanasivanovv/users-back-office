import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api";
import axios from "axios";
import { User } from "../types";

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  editingUser: User | null;
  error: string | null;
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  updateError: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  editingUser: null,
  error: null,
  updateStatus: "idle",
  updateError: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(api.users);
  return response.data;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: User) => {
    const response = await axios.put(`${api.users}/${user.id}`, user);
    return response.data;
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    revertUserChanges: (state, action: PayloadAction<number>) => {
      const originalUser = state.users.find(
        (user) => user.id === action.payload,
      );
      if (originalUser) {
        state.editingUser = originalUser;
      }
    },
    setEditingUser: (state, action: PayloadAction<User>) => {
      state.editingUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.updateStatus = "succeeded";
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.error.message || "Failed to update user";
      });
  },
});

export const { setEditingUser, revertUserChanges } = usersSlice.actions;
export default usersSlice.reducer;
