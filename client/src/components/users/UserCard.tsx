import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { User } from "../../types";
import UserForm from "./UserForm";

interface UserCardProps {
  user: User;
}

export const testIds = {
  userCard: "user-card",
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const headerContent = useMemo(
    () => (
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">
          <i className="fa-solid fa-user mx-2" /> {user.name}
        </h2>
        <button className="mr-2" onClick={toggleExpanded}>
          <i
            className={`fa-solid fa-chevron-down transition-transform duration-300 ${
              expanded ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    ),
    [expanded, user.name],
  );

  const detailsContent = useMemo(
    () => (
      <div className="p-4 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          <p className="mb-1 min-h-8">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="mb-1 min-h-8">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-1 min-h-8">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="mb-1 min-h-8">
            <strong>Website:</strong> {user.website}
          </p>
          <p className="mb-1 min-h-8">
            <strong>Company:</strong> {user.company.name}
          </p>
          <p className="mb-1 min-h-8">
            <strong>Catch Phrase:</strong> {user.company.catchPhrase}
          </p>
          <p className="mb-1 min-h-8">
            <strong>BS:</strong> {user.company.bs}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {user.address.street},{" "}
            {user.address.suite}, {user.address.city}, {user.address.zipcode}
          </p>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={() => setIsEditing(true)} size="large">
            Edit
          </Button>
          <Link
            to={`/user/${user.id}/posts`}
            className="bg-primary-500 text-white px-4 py-2 rounded-[8px] hover:bg-primary-300 transition"
          >
            See posts
          </Link>
        </div>
      </div>
    ),
    [user],
  );

  if (isEditing && expanded) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        {headerContent}
        <UserForm user={user} onCancel={handleCancel} />
      </div>
    );
  }

  return (
    <div
      data-testid={testIds.userCard}
      className="bg-white shadow-md rounded-lg p-4 text-gray-800"
    >
      {headerContent}
      {expanded && detailsContent}
    </div>
  );
};

export default UserCard;
