/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FAQs from "./FAQs";
import type { FAQProfile } from "../../types/entities";

test("faqs component", async () => {
  const exampleFaqs: FAQProfile[] = [
    {
      question: "question 1",
      answer: "answer 1",
    },
    {
      question: "question 2",
      answer: "answer 2",
    },
  ];

  render(<FAQs title="FAQ list" faqs={exampleFaqs} />);

  expect(screen.getByText("FAQ list")).toBeInTheDocument();
  expect(screen.getAllByRole("button")).toHaveLength(2);
  expect(screen.getByText("question 1")).toBeInTheDocument();
  expect(screen.getByText("question 2")).toBeInTheDocument();
  expect(screen.getByText("answer 1")).toBeInTheDocument();
  expect(screen.getByText("answer 2")).toBeInTheDocument();
});
