import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const UsersLoading = () => (
  <div className="grid gap-4 grid-cols-1">
    {Array(10)
      .fill(0)
      .map(() => (
        <Skeleton style={{ width: "100%" }} height={60} />
      ))}
  </div>
);
