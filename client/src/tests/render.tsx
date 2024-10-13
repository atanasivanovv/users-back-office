import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store as defaultStore } from "../store/slices";
import { BrowserRouter as Router } from "react-router-dom";

export const renderComponent = (component: ReactNode, customStore?: any) => {
  const store = customStore || defaultStore;

  return render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>,
  );
};
