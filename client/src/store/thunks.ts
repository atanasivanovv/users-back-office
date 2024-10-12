import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createFetchAllThunk = <T>(type: string, url: string) =>
  createAsyncThunk<T[], void>(type, async () => {
    const response = await axios.get<T[]>(url);
    return response.data;
  });

export const createFetchByIdThunk = <T>(
  type: string,
  getUrl: (id: number) => string,
) =>
  createAsyncThunk<T[], number>(type, async (id: number) => {
    const response = await axios.get<T[]>(getUrl(id));
    return response.data;
  });

export const createInsertThunk = <T extends { id: number }>(
  type: string,
  url: string,
) =>
  createAsyncThunk<T, T>(type, async (item: T) => {
    const response = await axios.put(`${url}/${item.id}`, item);
    return response.data;
  });

export const createUpdateByIdThunk = <T extends { id: number }>(
  type: string,
  getUrl: (id: number) => string,
) =>
  createAsyncThunk<T, { id: number; payload: Partial<T> }>(
    type,
    async ({ id, payload }) => {
      const response = await axios.patch<T>(getUrl(id), payload);
      return response.data;
    },
  );

export const createDeleteThunk = (type: string, url: string) =>
  createAsyncThunk<number, number>(type, async (id: number) => {
    await axios.delete(`${url}/${id}`);
    return id;
  });
