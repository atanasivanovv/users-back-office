import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/slices";
import { Layout } from "./components/layout";
import { UsersList } from "./components/users";
import { TasksList } from "./components/tasks";
import { UserPosts } from "./components/users/posts";

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/users" element={<UsersList />} />
          <Route path="/tasks" element={<TasksList />} />
          <Route path="/users/:userId/posts" element={<UserPosts />} />

          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </Layout>
    </Router>
  </Provider>
);

export default App;
