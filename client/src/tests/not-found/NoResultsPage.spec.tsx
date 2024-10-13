import { screen } from "@testing-library/react";
import { renderComponent } from "../render";
import { NoResultsPage } from "../../components/not-found/NoResultsPage";

describe("NoResultsPage", () => {
  it("should render component successfully", () => {
    renderComponent(<NoResultsPage emoji="🤔" resultsName="users" />);

    expect(screen.getByText("🤔")).toBeInTheDocument();
    expect(
      screen.getByText("Oops! It seems there are no users found."),
    ).toBeInTheDocument();
  });
});
