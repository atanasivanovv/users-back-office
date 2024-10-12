import { fireEvent, screen } from "@testing-library/react";
import UserForm, { testIds } from "../../components/users/UserForm";
import { renderComponent } from "../render";
import { store } from "../../store/slices";
import { mockedUser } from "../mocks";

jest.spyOn(store, "dispatch");

describe("UserForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form fields with user data", () => {
    renderComponent(<UserForm user={mockedUser} />);

    expect(screen.getByPlaceholderText("Username")).toHaveValue("johndoe");
    expect(screen.getByPlaceholderText("Email")).toHaveValue(
      "john@example.com",
    );
  });

  it("should show validation errors for required fields", async () => {
    renderComponent(<UserForm user={mockedUser} />);

    fireEvent.input(screen.getByPlaceholderText("Username"), {
      target: { value: "" },
    });
    fireEvent.submit(screen.getByTestId(testIds.saveBtn));

    expect(await screen.findByText("Username is required")).toBeInTheDocument();
  });

  it("should submit the form and updates the user", async () => {
    const mockUpdateUser = jest.fn();
    store.dispatch = mockUpdateUser;

    renderComponent(<UserForm user={mockedUser} />);

    fireEvent.input(screen.getByPlaceholderText("Username"), {
      target: { value: "newusername" },
    });
    fireEvent.click(screen.getByTestId(testIds.saveBtn));

    expect(mockUpdateUser).toHaveBeenCalledWith(
      expect.objectContaining({ username: "newusername" }),
    );
  });

  it("should revert user changes", () => {
    const mockRevertUserChanges = jest.fn();
    store.dispatch = mockRevertUserChanges;

    renderComponent(<UserForm user={mockedUser} />);

    fireEvent.click(screen.getByTestId(testIds.revertBtn));

    expect(mockRevertUserChanges).toHaveBeenCalledWith(mockedUser.id);
  });
});
