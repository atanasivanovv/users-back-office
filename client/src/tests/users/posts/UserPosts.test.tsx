import { fireEvent, screen } from "@testing-library/react";
import { UserPosts } from "../../../components/users/posts";
import { renderComponent } from "../../render";
import { store } from "../../../store/slices";
import { waitForSkeletonsToHide } from "../../assertions";

jest.spyOn(store, "dispatch");

describe("UserPosts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show an empty page", async () => {
    renderComponent(<UserPosts />);

    await waitForSkeletonsToHide();

    expect(
      screen.getByText(/Oops! It seems there are no user posts found./),
    ).toBeInTheDocument();
  });

  it("should fetch and display posts", async () => {
    renderComponent(<UserPosts />);

    await waitForSkeletonsToHide();

    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(await screen.findByText("Post 1")).toBeInTheDocument();
    expect(await screen.findByText("Post 2")).toBeInTheDocument();
  });

  it("should allow editing a post", async () => {
    const mockUpdatePost = jest.fn();
    store.dispatch = mockUpdatePost;

    renderComponent(<UserPosts />);

    await waitForSkeletonsToHide();

    fireEvent.click(screen.getByText("Edit")); // First post

    fireEvent.input(screen.getByPlaceholderText("Title"), {
      target: { value: "Updated Title" },
    });
    fireEvent.input(screen.getByPlaceholderText("Body"), {
      target: { value: "Updated Body" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(mockUpdatePost).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        title: "Updated Title",
        body: "Updated Body",
      }),
    );
  });

  it("should delete a post", async () => {
    const mockDeletePost = jest.fn();
    store.dispatch = mockDeletePost;

    renderComponent(<UserPosts />);

    await waitForSkeletonsToHide();

    fireEvent.click(screen.getByText("Delete"));

    fireEvent.click(screen.getByText("OK"));

    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(mockDeletePost).toHaveBeenCalledWith(1);
  });
});
