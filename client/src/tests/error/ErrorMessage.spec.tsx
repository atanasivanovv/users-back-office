import { screen } from "@testing-library/react";
import { renderComponent } from "../render";
import { ErrorMessage } from "../../components/error";

describe("ErrorMessage", () => {
  it("should return null when message is null", () => {
    const { container } = renderComponent(<ErrorMessage message={null} />);

    expect(container).toBeEmptyDOMElement();
  });
  it("should render component with message successfully", () => {
    renderComponent(<ErrorMessage message="Some random error" />);

    expect(screen.getByText("Some random error")).toBeInTheDocument();
  });
});
