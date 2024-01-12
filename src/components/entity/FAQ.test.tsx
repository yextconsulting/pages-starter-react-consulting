/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FAQ from "./FAQ";

test("faq component", async () => {
  render(<FAQ question="What to test" answer="FAQ" />);

  //click button to expand faq and check that it is no longer invisible
  expect(screen.getByTestId("answer-container")).toHaveClass("invisible");
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByText("What to test")).toBeInTheDocument();
  expect(screen.getByText("FAQ")).toBeInTheDocument();
  expect(screen.getByRole("button")).not.toBeDisabled();
  expect(screen.getByTestId("answer-container")).not.toHaveClass("invisible");
});
