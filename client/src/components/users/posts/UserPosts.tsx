import { FC, ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  fetchUsers,
  fetchUserPosts,
  updatePost,
  deletePost,
} from "../../../store/slices";
import { Button, Card, Input, Modal } from "antd";
import UserForm from "../UserForm";
import { NoResultsPage } from "../../not-found/NoResultsPage";
import { PostsLoading } from "../../loading";
import { ErrorPage } from "../../error";

const { TextArea } = Input;

const UserPosts: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    posts: { data: posts, status: postsStatus, error: postsError, update },
    users: { data: users },
  } = useSelector((state: RootState) => state);

  const [editingState, setEditingState] = useState<{
    postId: number | null;
    title: string;
    body: string;
  }>({ postId: null, title: "", body: "" });

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPosts(parseInt(userId)));
      dispatch(fetchUsers());
    }
  }, [dispatch, userId]);

  const user = users.find((u) => u.id === parseInt(userId || ""));
  const isUpdating = update.status === "loading";

  const handleEdit = (postId: number, title: string, body: string) => {
    setEditingState((prev) => ({ ...prev, title, body, postId }));
  };

  const handleEditTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingState((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleEditBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditingState((prev) => ({ ...prev, body: e.target.value }));
  };

  const handleCancel = () => {
    setEditingState((prev) => ({ ...prev, postId: null }));
  };

  const handleSave = async () => {
    if (editingState.postId) {
      await dispatch(
        updatePost({
          id: editingState.postId,
          userId: parseInt(userId || ""),
          title: editingState.title,
          body: editingState.body,
        }),
      );
      setEditingState((prev) => ({ ...prev, postId: null }));
    }
  };

  const handleDelete = (postId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this post?",
      onOk: async () => {
        await dispatch(deletePost(postId));
      },
    });
  };

  if (postsStatus === "loading") {
    return <PostsLoading />;
  }

  if (postsStatus === "failed" && postsError) {
    return <ErrorPage error={postsError} />;
  }

  if (!user) {
    return <NoResultsPage emoji="🤔" resultsName="user" />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{user.name}</h1>
      <UserForm user={user} withBackground />
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        {posts.map((post) => (
          <Card key={post.id} className="mb-4 bg-white shadow-md rounded-lg">
            {editingState.postId === post.id ? (
              <>
                <Input
                  value={editingState.title}
                  onChange={handleEditTitle}
                  className="mb-2"
                />
                <TextArea
                  value={editingState.body}
                  onChange={handleEditBody}
                  className="mb-2"
                  rows={4}
                />
                <Button onClick={handleCancel} className="mr-2">
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  type="primary"
                  loading={isUpdating}
                  disabled={isUpdating}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="mb-4">{post.body}</p>
                <Button
                  onClick={() => handleEdit(post.id, post.title, post.body)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(post.id)} danger>
                  Delete
                </Button>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
