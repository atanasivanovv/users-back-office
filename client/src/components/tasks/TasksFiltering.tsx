import { Input, Select } from "antd";
import React from "react";
import { AppDispatch, RootState, setFilter } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { TaskFilters } from "../../types";

const { Option } = Select;

export const TasksFiltering = ({ filters }: { filters: TaskFilters }) => {
  const { data: users } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilter({ key, value }));
  };

  return (
    <div className="mb-4">
      <Input
        placeholder="Filter by title"
        value={filters.title}
        onChange={(e) => handleFilterChange("title", e.target.value)}
        className="w-full mt-2 md:mt-0  md:w-64 mr-2 h-10"
      />
      <Select
        value={filters.status}
        onChange={(value) => handleFilterChange("status", value)}
        className="w-full mt-2 md:mt-0 md:w-64 mr-2 h-10"
      >
        <Option value="all">All</Option>
        <Option value="completed">Completed</Option>
        <Option value="incomplete">Incomplete</Option>
      </Select>
      <Select
        value={filters.userId}
        onChange={(value) => handleFilterChange("userId", value)}
        className="w-full mt-2 md:mt-0 md:w-64 mr-2 h-10"
      >
        <Option value="all">All Users</Option>
        {users.map((user) => (
          <Option key={user.id} value={user.id.toString()}>
            {user.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};
