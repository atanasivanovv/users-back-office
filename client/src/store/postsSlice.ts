import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "../types";
import api from "../api";

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
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
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
