import { render, screen } from "@testing-library/react";
import App from "./App";
import { waitForSkeletonsToHide } from "./tests/assertions";
import { testIds } from "./components/users/UserCard";

const renderComponent = () => render(<App />);

describe("App", () => {
  it("should render home page successfully", async () => {
    renderComponent();

    await screen.findByText(/Users Back Office/);
    await screen.findByText(/HOME/);
    await screen.findByText(/TASKS/);

    await waitForSkeletonsToHide();

    expect(screen.getAllByTestId(testIds.userCard)).toHaveLength(10);
  });
});
