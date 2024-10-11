import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { defaultPageSize } from "../../constants";

export const PostsLoading = () => (
  <div className="grid gap-4 grid-cols-1 p-4">
    <Skeleton style={{ width: "20%" }} height={40} />
    <Skeleton style={{ width: "100%", height: "28vh" }} />
    <Skeleton style={{ width: "5%", marginBottom: "10px" }} height={30} />
    {Array(defaultPageSize)
      .fill(0)
      .map((_, i) => (
        <Skeleton
          key={`post-skl-${i}`}
          style={{ width: "100%" }}
          height={150}
        />
      ))}
  </div>
);
