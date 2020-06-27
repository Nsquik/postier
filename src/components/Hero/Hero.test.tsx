import React from "react";

import { render } from "../../test_utils";
import "@testing-library/jest-dom/extend-expect";
import Hero from "./Hero";

test("renders hero component", async () => {
  const { getByText } = render(<Hero />);
  expect(getByText("posTier")).toBeInTheDocument();
  expect(getByText("post and comment")).toBeInTheDocument();
});

test("has wave", async () => {
  const { getByTestId } = render(<Hero />);
  expect(getByTestId("wave1")).toBeInTheDocument();
});
