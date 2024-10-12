type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type UpdateStatus = {
  status: RequestStatus;
  error: string | null;
};

export type RequestState<T> = {
  data: T[];
  status: RequestStatus;
  error: string | null;
  update: UpdateStatus;
};

export const defaultState: RequestState<any> = {
  data: [],
  status: "idle",
  error: null,
  update: {
    status: "idle",
    error: null,
  },
};
