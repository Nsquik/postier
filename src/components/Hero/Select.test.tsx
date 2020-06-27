import React from "react";

import { render, fireEvent, waitForElement } from "../../test_utils";
import "@testing-library/jest-dom/extend-expect";
import Select from "./Select";

test("renders select component", async () => {
  const { getByText } = render(<Select />);
  expect(getByText("Select user")).toBeInTheDocument();
});

test("User not found after typing random value", async () => {
  const { getByText, getByRole } = render(<Select />);
  const input = getByRole("combobox");

  fireEvent.change(input, { target: { value: "hdajkhda!8328713@@@@030103190909312dsadajdasd" } });

  const textNode = await waitForElement(() => getByText("User not found..."));

  expect(textNode).toBeInTheDocument();
});

test("Input value is changed", async () => {
  const { getByRole } = render(<Select />);
  const input = getByRole("combobox");

  fireEvent.change(input, { target: { value: "Testing if this text changes" } });

  const inputNode = await waitForElement(() => getByRole("combobox"));

  expect(inputNode).toHaveValue("Testing if this text changes");
  expect(inputNode).not.toHaveValue("definitely not this value");
  expect(inputNode).not.toHaveValue("");
});
