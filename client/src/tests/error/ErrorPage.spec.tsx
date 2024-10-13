import { screen } from "@testing-library/react";
import { renderComponent } from "../render";
import { ErrorPage } from "../../components/error";

describe("ErrorPage", () => {
  it("should render component successfully", () => {
    renderComponent(<ErrorPage error="Some random error" />);

    expect(screen.getByText("❌")).toBeInTheDocument();
    expect(screen.getByText("Some random error")).toBeInTheDocument();
  });
});
