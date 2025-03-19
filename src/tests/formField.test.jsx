import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormField } from "../components/medicine/form/FormField";
import { FaUser } from "react-icons/fa";
import "@testing-library/jest-dom";

// Mock framer-motion to avoid issues with animations in tests
vi.mock("framer-motion", () => ({
  motion: {
    p: ({
      children,
      variants,
      animate,
      initial,
      exit,
      transition,
      ...props
    }) => (
      <p data-testid="motion-p" {...props}>
        {children}
      </p>
    ),
    div: ({
      children,
      variants,
      animate,
      initial,
      exit,
      transition,
      ...props
    }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children, ...props }) => (
    <div data-testid="animate-presence" {...props}>
      {children}
    </div>
  ),
}));

describe("FormField Component", () => {
  it("should render correctly with label and placeholder", () => {
    render(
      <FormField
        label="Test Field"
        icon={FaUser}
        type="text"
        placeholder="Enter value"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Test Field")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  it("should display the provided value", () => {
    render(
      <FormField
        label="Test Field"
        icon={FaUser}
        type="text"
        placeholder="Enter value"
        value="Test Value"
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText("Enter value");
    expect(input.value).toBe("Test Value");
  });

  it("should display error message when provided", () => {
    render(
      <FormField
        label="Test Field"
        icon={FaUser}
        type="text"
        placeholder="Enter value"
        value=""
        onChange={() => {}}
        error="This field has an error"
      />
    );

    expect(screen.getByText("This field has an error")).toBeInTheDocument();
  });

  it("should apply error styling to input when error is provided", () => {
    render(
      <FormField
        label="Test Field"
        icon={FaUser}
        type="text"
        placeholder="Enter value"
        value=""
        onChange={() => {}}
        error="This field has an error"
      />
    );

    const input = screen.getByPlaceholderText("Enter value");
    expect(input.className).toContain("border-red-500");
  });

  it("should apply min and max attributes when provided", () => {
    render(
      <FormField
        label="Number Field"
        icon={FaUser}
        type="number"
        placeholder="Enter number"
        value="5"
        onChange={() => {}}
        min="1"
        max="10"
      />
    );

    const input = screen.getByPlaceholderText("Enter number");
    expect(input).toHaveAttribute("min", "1");
    expect(input).toHaveAttribute("max", "10");
  });

  it("should mark field as required when specified", () => {
    render(
      <FormField
        label="Required Field"
        icon={FaUser}
        type="text"
        placeholder="Enter value"
        value=""
        onChange={() => {}}
        required
      />
    );

    const input = screen.getByPlaceholderText("Enter value");
    expect(input).toHaveAttribute("required");
  });
});
