import React from "react";

import { render, fireEvent, waitForElement } from "../../test_utils";
import "@testing-library/jest-dom/extend-expect";
import AddCommentForm from "./AddCommentForm";

test("renders addcomment form component", async () => {
  const { getByText } = render(<AddCommentForm postId={111} />);
  expect(getByText("Your name:")).toBeInTheDocument();
  expect(getByText("Email:")).toBeInTheDocument();
  expect(getByText("Comment:")).toBeInTheDocument();
  expect(getByText("Send comment")).toBeInTheDocument();
});

test('clear after click "Send comment"', async () => {
  const { getByTestId } = render(<AddCommentForm postId={123} />);

  let nameNode = getByTestId("comment-name");
  let emailNode = getByTestId("comment-email");
  let bodyNode = getByTestId("comment-body");
  const button = getByTestId("comment-button");

  fireEvent.change(nameNode, { target: { value: "Kacper Kedzierski" } });
  fireEvent.change(emailNode, { target: { value: "kacperkedzierski@gmail.com" } });
  fireEvent.change(bodyNode, { target: { value: "New commentoras" } });

  expect(nameNode).toHaveValue("Kacper Kedzierski");
  expect(emailNode).toHaveValue("kacperkedzierski@gmail.com");
  expect(bodyNode).toHaveValue("New commentoras");

  fireEvent.click(button);

  nameNode = await waitForElement(() => getByTestId("comment-name"));
  emailNode = await waitForElement(() => getByTestId("comment-email"));
  bodyNode = await waitForElement(() => getByTestId("comment-body"));

  expect(nameNode).toHaveValue("");
  expect(emailNode).toHaveValue("");
  expect(bodyNode).toHaveValue("");
});
