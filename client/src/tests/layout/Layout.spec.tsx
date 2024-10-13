import { screen } from "@testing-library/react";
import { Layout } from "../../components/layout";
import { renderComponent } from "../render";

describe("Layout", () => {
  it("should render component successfully", () => {
    renderComponent(
      <Layout>
        <p>Some child element</p>
      </Layout>,
    );

    expect(screen.getByText("Users Back Office")).toBeInTheDocument();
    expect(screen.getByText("Some child element")).toBeInTheDocument();
  });
});
