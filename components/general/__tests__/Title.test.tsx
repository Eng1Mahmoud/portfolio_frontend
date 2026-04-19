import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { Title } from "../Title";

describe("Title Component", () => {
  test("renders the given title text correctly", () => {
    render(<Title title="Hello World" />);
    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toBeDefined();
    expect(titleElement.textContent).toBe("Hello World");
  });
});
