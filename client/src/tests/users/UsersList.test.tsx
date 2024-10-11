import { fireEvent, screen } from "@testing-library/react";
import { UsersList } from "../../components/users";
import { waitForSkeletonsToHide } from "../assertions";
import { testIds } from "../../components/users/UserCard";
import { testIds as formTestIds } from "../../components/users/UserForm";
import { renderComponent } from "../render";

describe("UsersList", () => {
  it("should render users", async () => {
    renderComponent(<UsersList />);

    await waitForSkeletonsToHide();

    expect(screen.getAllByTestId(testIds.userCard)).toHaveLength(10);
  });

  it("should open details when expanded", async () => {
    renderComponent(<UsersList />);

    await waitForSkeletonsToHide();

    const [expandBtn] = screen.getAllByTestId(testIds.expandCard);
    fireEvent.click(expandBtn);

    expect(screen.getByTestId(testIds.editBtn)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.seePostsBtn)).toBeInTheDocument();
  });

  it("should open user edit form successfully", async () => {
    renderComponent(<UsersList />);

    await waitForSkeletonsToHide();

    const [expandBtn] = screen.getAllByTestId(testIds.expandCard);
    fireEvent.click(expandBtn);

    fireEvent.click(screen.getByTestId(testIds.editBtn));

    const revertBtn = await screen.findByTestId(formTestIds.revertBtn);
    const saveBtn = await screen.findByTestId(formTestIds.saveBtn);

    expect(revertBtn).toBeDisabled();
    expect(saveBtn).toBeDisabled();
  });
});
