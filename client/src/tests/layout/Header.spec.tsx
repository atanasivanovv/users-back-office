import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "../../components/layout";
import { renderComponent } from "../render";

describe("Header", () => {
  it("should render component successfully", () => {
    renderComponent(<Header />);

    expect(screen.getByText("Users Back Office")).toBeInTheDocument();
  });

  it("should render navigation links for Users and Tasks", async () => {
    renderComponent(<Header />);

    const usersLink = await screen.findByRole("link", { name: /users/i });
    const tasksLink = await screen.findByRole("link", { name: /tasks/i });

    expect(usersLink).toHaveAttribute("href", "/users");
    expect(tasksLink).toHaveAttribute("href", "/tasks");
  });

  it("should apply correct classes to active and inactive links", () => {
    renderComponent(<Header />);

    const usersLink = screen.getByRole("link", { name: /users/i });
    const tasksLink = screen.getByRole("link", { name: /tasks/i });

    expect(usersLink).toHaveClass("text-gray-800 hover:text-black");
    expect(tasksLink).toHaveClass("text-gray-800 hover:text-black");

    userEvent.hover(usersLink);
    expect(usersLink).toHaveClass("text-gray-800 hover:text-black");

    userEvent.hover(tasksLink);
    expect(tasksLink).toHaveClass("text-gray-800 hover:text-black");
  });
});
