import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { User } from "../../types";
import UserForm from "./UserForm";

interface UserCardProps {
  user: User;
  isSubmitting: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, isSubmitting }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
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
        <div className="grid grid-cols-3 gap-1">
          <p className="mb-1">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="mb-1">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-1">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="mb-1">
            <strong>Website:</strong> {user.website}
          </p>
          <p className="mb-1">
            <strong>Company:</strong> {user.company.name}
          </p>
          <p className="mb-1">
            <strong>Catch Phrase:</strong> {user.company.catchPhrase}
          </p>
          <p className="mb-1">
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
    [
      user.address.city,
      user.address.street,
      user.address.suite,
      user.email,
      user.id,
      user.username,
    ],
  );

  if (isEditing) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        {headerContent}
        <UserForm
          user={user}
          onCancel={() => setIsEditing(false)}
          isSubmitting={isSubmitting}
        />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-gray-800">
      {headerContent}
      {expanded && detailsContent}
    </div>
  );
};

export default UserCard;
