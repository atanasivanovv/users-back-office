import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "../types";
import api from "../api";
import {
  defaultState,
  defaultUpdateState,
  RequestStateWithUpdate,
} from "./utils";

type PostsState = RequestStateWithUpdate<Post>;

const initialState: PostsState = {
  ...defaultState,
  update: {
    ...defaultUpdateState,
  },
};

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (userId: number) => {
    const response = await axios.get(`${api.posts}?userId=${userId}`);
    return response.data;
  },
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: Post) => {
    const response = await axios.put(`${api.posts}/${post.id}`, post);
    return response.data;
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: number) => {
    await axios.delete(`${api.posts}/${postId}`);
    return postId;
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.status = "succeeded";
          state.data = action.payload;
        },
      )
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(updatePost.pending, (state) => {
        state.update.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.update.status = "succeeded";
        const index = state.data.findIndex(
          (post) => post.id === action.payload.id,
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.update.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.update.status = "failed";
        state.update.error = action.error.message || "Failed to update post";
      })
      .addCase(deletePost.pending, (state) => {
        state.update.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.update.status = "succeeded";
        state.data = state.data.filter((post) => post.id !== action.payload);
        state.update.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.update.status = "failed";
        state.update.error = action.error.message || "Failed to delete post";
      });
  },
});

export default postsSlice.reducer;
