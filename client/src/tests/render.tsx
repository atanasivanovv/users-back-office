import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/slices";
import { BrowserRouter as Router } from "react-router-dom";

export const renderComponent = (component: ReactNode) => {
  return render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>,
  );
};
