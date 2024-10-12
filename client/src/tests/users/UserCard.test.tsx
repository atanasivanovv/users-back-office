import { fireEvent, screen } from "@testing-library/react";
import UserCard, { testIds } from "../../components/users/UserCard";
import { renderComponent } from "../render";
import { mockedUser } from "../mocks";

describe("UserCard", () => {
  it("should render user details", () => {
    renderComponent(<UserCard user={mockedUser} />);

    const expandButton = screen.getByTestId(testIds.expandCard);
    fireEvent.click(expandButton);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    expect(
      screen.getByText("Main St, Apt. 1, Metropolis, 12345"),
    ).toBeInTheDocument();
  });

  it("should expand and collapse when toggling the card", () => {
    renderComponent(<UserCard user={mockedUser} />);

    const expandButton = screen.getByTestId(testIds.expandCard);
    fireEvent.click(expandButton);

    expect(screen.getByText("See posts")).toBeInTheDocument();

    fireEvent.click(expandButton);
    expect(screen.queryByText("See posts")).not.toBeInTheDocument();
  });

  it("should show edit and posts buttons when expanded", () => {
    renderComponent(<UserCard user={mockedUser} />);

    fireEvent.click(screen.getByTestId(testIds.expandCard));

    expect(screen.getByTestId(testIds.editBtn)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.seePostsBtn)).toBeInTheDocument();
  });
});
