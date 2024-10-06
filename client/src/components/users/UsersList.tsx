import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../store/usersSlice";
import { RootState, AppDispatch } from "../../store";
import UserCard from "./UserCard";

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading")
    return <div className="text-center py-4">Loading...</div>;
  if (status === "failed")
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  if (users.length === 0)
    return <div className="text-center py-4">No users found.</div>;

  return (
    <div className="grid gap-4 grid-cols-1">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
