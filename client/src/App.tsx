import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Layout } from "./components/layout";
import { UsersList } from "./components/users";
import { TasksList } from "./components/tasks";
import { UserPosts } from "./components/users/posts";

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/tasks" element={<TasksList />} />
          <Route path="/user/:userId/posts" element={<UserPosts />} />
        </Routes>
      </Layout>
    </Router>
  </Provider>
);

export default App;
