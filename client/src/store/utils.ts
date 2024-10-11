type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type UpdateStatus = {
  status: RequestStatus;
  error: string | null;
};

export type RequestState<T> = {
  data: T[];
  status: RequestStatus;
  error: string | null;
};

export type RequestStateWithUpdate<T> = RequestState<T> & {
  update: UpdateStatus;
};

export const defaultUpdateState: UpdateStatus = {
  status: "idle",
  error: null,
};

export const defaultState = {
  data: [],
  ...defaultUpdateState,
};
