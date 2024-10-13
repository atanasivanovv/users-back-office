import { renderComponent } from "../render";
import { PostsLoading } from "../../components/loading";
import { getAllSkeletons } from "../assertions";

describe("PostsLoading", () => {
  it("should render component successfully", () => {
    renderComponent(<PostsLoading />);

    const skeletonElements = getAllSkeletons();
    expect(skeletonElements).toHaveLength(13);
  });
});
