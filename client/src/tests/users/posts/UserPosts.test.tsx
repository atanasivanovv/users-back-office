import { screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { UserPosts } from "../../../components/users/posts";
import { waitForSkeletonsToHide } from "../../assertions";
import { renderComponent } from "../../render";

const mockStore = configureStore();

describe("UserPosts", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      posts: {
        data: [
          { id: 1, title: "Post 1", body: "Body of post 1", userId: 1 },
          { id: 2, title: "Post 2", body: "Body of post 2", userId: 1 },
        ],
        status: "succeeded",
        error: null,
        update: {},
      },
      users: {
        data: [{ id: 1, name: "John Doe" }],
      },
    });

    store.dispatch = jest.fn();
  });

  it("should show an empty page when no posts are found", async () => {
    store = mockStore({
      posts: {
        data: [],
        status: "succeeded",
        error: null,
        update: {},
      },
      users: {
        data: [{ id: 1, name: "John Doe" }],
      },
    });

    renderComponent(<UserPosts />, store);

    await waitForSkeletonsToHide();

    expect(
      screen.getByText(/Oops! It seems there are no user posts found./),
    ).toBeInTheDocument();
  });
});
