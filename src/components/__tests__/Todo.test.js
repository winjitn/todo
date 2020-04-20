import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "../Todo";

afterEach(() => {
  localStorage.clear();
});

let getByTestId, getByPlaceholderText, getByText, debug;

beforeEach(() => {
  ({ getByTestId, getByPlaceholderText, getByText, debug } = render(<Todo />));

  fireEvent.click(getByTestId("create"));
  fireEvent.change(getByPlaceholderText("title"), {
    target: { value: "testtitle" },
  });
  fireEvent.change(getByPlaceholderText("description"), {
    target: { value: "testdescription" },
  });
  fireEvent.click(getByTestId("submit"));
});

test("Field validation", () => {
  fireEvent.click(getByTestId("create"));
  fireEvent.click(getByTestId("submit"));

  expect(
    getByText(/Title and description cannot be empty/i)
  ).toBeInTheDocument();
});

test("Create form", () => {
  expect(getByText("testtitle")).toBeInTheDocument();
});

test("Edit form", () => {
  fireEvent.click(getByText("testtitle"));
  fireEvent.change(getByPlaceholderText("title"), {
    target: { value: "testtitle2" },
  });
  fireEvent.change(getByPlaceholderText("description"), {
    target: { value: "testdescription2" },
  });
  fireEvent.click(getByText(/edit/i));

  expect(getByText("testtitle2")).toBeInTheDocument();
});

test("Delete item", () => {
  fireEvent.click(getByText("✕"));
  fireEvent.click(getByText(/confirm/i));
  expect(getByTestId("todos")).toBeEmpty();
});
