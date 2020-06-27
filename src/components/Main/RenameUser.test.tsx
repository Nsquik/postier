import React from "react";

import { render, fireEvent, waitForElement } from "../../test_utils";
import "@testing-library/jest-dom/extend-expect";
import RenameUser from "./RenameUser";

test("renders rename form component", async () => {
  const { getByText, getByTestId } = render(<RenameUser />);
  expect(getByText("First name:")).toBeInTheDocument();
  expect(getByText("Last name:")).toBeInTheDocument();
  expect(getByTestId("rename-firstname")).toBeInTheDocument();
  expect(getByTestId("rename-lastname")).toBeInTheDocument();
});

test('clear after click "change"', async () => {
  const { getByText, getByTestId } = render(<RenameUser />);

  let firstNameNode = getByTestId("rename-firstname");
  let lastNameNode = getByTestId("rename-lastname");
  const button = getByTestId("rename-button");
  fireEvent.change(firstNameNode, { target: { value: "Kacper" } });
  fireEvent.change(lastNameNode, { target: { value: "Kedzierski" } });

  expect(firstNameNode).toHaveValue("Kacper");
  expect(lastNameNode).toHaveValue("Kedzierski");

  fireEvent.click(button);

  firstNameNode = await waitForElement(() => getByTestId("rename-firstname"));
  lastNameNode = await waitForElement(() => getByTestId("rename-lastname"));

  expect(firstNameNode).toHaveValue("");
  expect(lastNameNode).toHaveValue("");
});
