import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  fetchUsers,
  fetchTasks,
  updateTaskStatus,
  setCurrentPage,
  applyFilters,
} from "../../store";
import { Table, Select, Pagination } from "antd";
import { Task } from "../../types";
import { TasksFiltering } from "./TasksFiltering";

const { Option } = Select;

const TasksList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredTasks, status, filters, currentPage } = useSelector(
    (state: RootState) => state.tasks,
  );
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch, filters]);

  const handleStatusChange = async (taskId: number, completed: boolean) => {
    await dispatch(updateTaskStatus({ id: taskId, completed }));
    dispatch(applyFilters());
  };

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
        loading={status === "loading"}
      />
      <Pagination
        current={currentPage}
        onChange={(page) => dispatch(setCurrentPage(page))}
        total={filteredTasks.length}
        pageSize={10}
        style={{ marginTop: 16, justifyContent: "end" }}
      />
    </div>
  );
};

export default TasksList;
