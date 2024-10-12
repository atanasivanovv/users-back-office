import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types";
import api from "../../api";
import {
  defaultState,
  defaultUpdateState,
  RequestStateWithUpdate,
} from "../utils";
import {
  handleFetchCases,
  handleUpdateCases,
  handleDeleteCases,
} from "../handlers";
import {
  createUpdateThunk,
  createDeleteThunk,
  createFetchByIdThunk,
} from "../thunks";

type PostsState = RequestStateWithUpdate<Post>;

const initialState: PostsState = {
  ...defaultState,
  update: {
    ...defaultUpdateState,
  },
};

export const fetchUserPosts = createFetchByIdThunk<Post>(
  "posts/fetchUserPosts",
  (userId: number) => `${api.posts}?userId=${userId}`,
);
export const updatePost = createUpdateThunk<Post>(
  "posts/updatePost",
  api.posts,
);
export const deletePost = createDeleteThunk("posts/deletePost", api.posts);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleFetchCases(builder, fetchUserPosts);
    handleUpdateCases(builder, updatePost);
    handleDeleteCases(builder, deletePost);
  },
});

export default postsSlice.reducer;
