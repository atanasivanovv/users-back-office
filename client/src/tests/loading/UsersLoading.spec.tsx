import { renderComponent } from "../render";
import { UsersLoading } from "../../components/loading";
import { getAllSkeletons } from "../assertions";

describe("UsersLoading", () => {
  it("should render component successfully", () => {
    renderComponent(<UsersLoading />);

    const skeletonElements = getAllSkeletons();
    expect(skeletonElements).toHaveLength(10);
  });
});
