import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { RequestStateWithUpdate } from "./utils";

export const handleFetchCases = <T>(
  builder: ActionReducerMapBuilder<RequestStateWithUpdate<T>>,
  thunk: any,
  dataKey: keyof RequestStateWithUpdate<T> = "data",
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.status = "loading";
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state[dataKey] = action.payload;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
};

export const handleUpdateCases = <T extends { id: number }>(
  builder: ActionReducerMapBuilder<RequestStateWithUpdate<T>>,
  asyncThunk: any,
) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.update.status = "loading";
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.update.status = "succeeded";
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      state.update.error = null;
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.update.status = "failed";
      state.update.error = action.error.message || "Failed to update item";
    });
};

export const handleDeleteCases = <T extends { id: number }>(
  builder: ActionReducerMapBuilder<RequestStateWithUpdate<T>>,
  asyncThunk: any,
) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.update.status = "loading";
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.update.status = "succeeded";
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.update.error = null;
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.update.status = "failed";
      state.update.error = action.error.message || "Failed to delete item";
    });
};
