import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  fetchUsers,
  fetchTasks,
  updateTaskStatus,
  setCurrentPage,
} from "../../store/slices";
import { Table, Select, Pagination } from "antd";
import { Task } from "../../types";
import { TasksFiltering } from "./TasksFiltering";
import { defaultPageSize } from "../../constants";

const { Option } = Select;

const TasksList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: tasks,
    status,
    filters,
    currentPage,
  } = useSelector((state: RootState) => state.tasks);
  const { data: users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleStatusChange = async (taskId: number, completed: boolean) => {
    await dispatch(updateTaskStatus({ id: taskId, payload: { completed } }));
  };

  // Decided to leave the filtering here for keeping the Redux Slices nice and clean
  // In an ideal case we would have filtering on the backend though, not the client-side,
  // so we will avoid this problem :)
  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const statusMatch =
          filters.status === "all" ||
          (filters.status === "completed" ? task.completed : !task.completed);

        const titleMatch = task.title
          .toLowerCase()
          .includes(filters.title.toLowerCase());

        const userMatch =
          filters.userId === "all" || task.userId.toString() === filters.userId;

        return statusMatch && titleMatch && userMatch;
      }),
    [tasks, filters],
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "status",
      render: (completed: boolean, record: Task) => (
        <Select
          value={completed ? "completed" : "incomplete"}
          onChange={(value) =>
            handleStatusChange(record.id, value === "completed")
          }
        >
          <Option value="completed">Completed</Option>
          <Option value="incomplete">Incomplete</Option>
        </Select>
      ),
    },
    {
      title: "Owner",
      dataIndex: "userId",
      key: "userId",
      render: (userId: number) => {
        const user = users.find((u) => u.id === userId);
        return user ? user.name : "Unknown";
      },
    },
  ];

  const isLoading = useMemo(() => status === "loading", [status]);

  return (
    <div>
      <TasksFiltering filters={filters} />
      <Table
        dataSource={filteredTasks.slice(
          (currentPage - 1) * 10,
          currentPage * 10,
        )}
        columns={columns}
        rowKey="id"
        pagination={false}
        loading={isLoading}
        locale={{ emptyText: "No tasks found." }}
      />
      <Pagination
        className="mt-4 justify-end"
        current={currentPage}
        onChange={(page) => dispatch(setCurrentPage(page))}
        total={filteredTasks.length}
        pageSize={defaultPageSize}
        showSizeChanger={false}
        hideOnSinglePage
      />
    </div>
  );
};

export default TasksList;
