import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { TasksFiltering } from "../../components/tasks";
import { setFilter } from "../../store/slices";
import { TaskFilters } from "../../types";
import { renderComponent } from "../render";

const mockStore = configureStore([]);

describe("TasksFiltering component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      users: {
        data: [
          { id: 1, name: "User 1" },
          { id: 2, name: "User 2" },
        ],
      },
    });
    store.dispatch = jest.fn();
  });

  const mockFilters: TaskFilters = {
    title: "",
    status: "all",
    userId: "all",
  };

  it("should render all filter inputs", () => {
    renderComponent(<TasksFiltering filters={mockFilters} />, store); // Pass mocked store

    expect(screen.getByTestId("title-filter")).toBeInTheDocument();
    expect(screen.getByTestId("status-filter")).toBeInTheDocument();
    expect(screen.getByTestId("user-filter")).toBeInTheDocument();
  });

  it("should update title filter on input change", () => {
    renderComponent(<TasksFiltering filters={mockFilters} />, store);

    const titleInput = screen.getByTestId("title-filter");
    fireEvent.change(titleInput, { target: { value: "New Task" } });

    expect(store.dispatch).toHaveBeenCalledWith(
      setFilter({ key: "title", value: "New Task" }),
    );
  });

  it("should apply correct CSS classes to filter inputs", () => {
    renderComponent(<TasksFiltering filters={mockFilters} />, store);

    const titleInput = screen.getByTestId("title-filter");
    const statusSelect = screen.getByTestId("status-filter");
    const userSelect = screen.getByTestId("user-filter");

    expect(titleInput).toHaveClass("w-full mt-2 md:mt-0 md:w-64 mr-2 h-10");
    expect(statusSelect).toHaveClass("w-full mt-2 md:mt-0 md:w-64 mr-2 h-10");
    expect(userSelect).toHaveClass("w-full mt-2 md:mt-0 md:w-64 mr-2 h-10");
  });
});
