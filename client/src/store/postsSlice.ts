import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "../types";
import api from "../api";

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  updateError: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
  updateStatus: "idle",
  updateError: null,
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
          state.posts = action.payload;
        },
      )
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(updatePost.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.updateStatus = "succeeded";
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        state.updateError = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.error.message || "Failed to update post";
      })
      .addCase(deletePost.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.updateStatus = "succeeded";
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        state.updateError = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.error.message || "Failed to delete post";
      });
  },
});

export default postsSlice.reducer;
