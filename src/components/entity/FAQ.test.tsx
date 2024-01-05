/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FAQ from "./FAQ.tsx";

test("faq component", async () => {
  render(<FAQ question="What to test" answer="FAQ" />);

  expect(screen.getByText("What to test")).toBeInTheDocument();
  expect(screen.getByText("FAQ")).toBeInTheDocument();
  expect(screen.getByRole("button")).not.toBeDisabled();
});
