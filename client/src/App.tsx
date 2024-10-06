import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./components/layout";

const App = () => (
  <Router>
    <Layout>
      <Routes></Routes>
    </Layout>
  </Router>
);

export default App;
