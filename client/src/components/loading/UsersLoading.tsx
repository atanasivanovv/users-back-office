import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { defaultPageSize } from "../../constants";

export const UsersLoading = () => (
  <div className="grid gap-4 grid-cols-1">
    {Array(defaultPageSize)
      .fill(0)
      .map((_, i) => (
        <Skeleton key={i} style={{ width: "100%" }} height={60} />
      ))}
  </div>
);
