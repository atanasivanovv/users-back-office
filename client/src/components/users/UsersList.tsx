import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, fetchUsers } from "../../store/slices";
import UserCard from "./UserCard";
import { UsersLoading } from "../loading/UsersLoading";
import { ErrorPage } from "../error";
import { NoResultsPage } from "../not-found/NoResultsPage";

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: users,
    status,
    error,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <UsersLoading />;
  }

  if (status === "failed" && error) {
    return <ErrorPage error={error} />;
  }

  if (users.length === 0) {
    return <NoResultsPage emoji="🤔" resultsName="users" />;
  }

  return (
    <div className="grid gap-4 grid-cols-1">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
