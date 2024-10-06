import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Layout } from "./components/layout";
import { UsersList } from "./components/users";

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UsersList />} />
        </Routes>
      </Layout>
    </Router>
  </Provider>
);

export default App;
