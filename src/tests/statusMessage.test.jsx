import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusMessage } from "../components/medicine/export/StatusMessage";
import "@testing-library/jest-dom";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }) => (
      <div data-testid="motion-div" className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock react-icons
vi.mock("react-icons/fa", () => ({
  FaCheck: () => <span data-testid="check-icon">✓</span>,
  FaInfoCircle: () => <span data-testid="info-icon">ℹ</span>,
}));

describe("StatusMessage Component", () => {
  it("renders nothing when no status is provided", () => {
    const { container } = render(
      <StatusMessage
        exportStatus={{
          loading: false,
          success: false,
          error: null,
          type: null,
        }}
        isDisabled={false}
      />
    );

    // Should only contain the fragment wrapper
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it("displays error message when error is provided", () => {
    render(
      <StatusMessage
        exportStatus={{
          loading: false,
          success: false,
          error: "Something went wrong",
          type: null,
        }}
        isDisabled={false}
      />
    );

    const errorElement = screen.getByText("Something went wrong");
    expect(errorElement).toBeInTheDocument();

    // Check for red styling
    const errorContainer = screen.getByTestId("motion-div");
    expect(errorContainer.className).toContain("from-red-900");
  });

  it("displays subscribe success message", () => {
    render(
      <StatusMessage
        exportStatus={{
          loading: false,
          success: true,
          error: null,
          type: "subscribe",
        }}
        isDisabled={false}
      />
    );

    expect(
      screen.getByText("Successfully subscribed to calendar!")
    ).toBeInTheDocument();
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();

    // Check for green styling
    const successContainer = screen.getByTestId("motion-div");
    expect(successContainer.className).toContain("from-green-900");
  });

  it("displays download success message", () => {
    render(
      <StatusMessage
        exportStatus={{
          loading: false,
          success: true,
          error: null,
          type: "download",
        }}
        isDisabled={false}
      />
    );

    expect(
      screen.getByText("Calendar file downloaded successfully!")
    ).toBeInTheDocument();
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });

  it("displays disabled message when no medications", () => {
    render(
      <StatusMessage
        exportStatus={{
          loading: false,
          success: false,
          error: null,
          type: null,
        }}
        isDisabled={true}
      />
    );

    expect(
      screen.getByText("Add medications to enable calendar export")
    ).toBeInTheDocument();
    expect(screen.getByTestId("info-icon")).toBeInTheDocument();

    // Check for amber/yellow styling
    const disabledContainer = screen.getByTestId("motion-div");
    expect(disabledContainer.className).toContain("from-amber-900");
  });

  it("prioritizes error over success message", () => {
    render(
      <StatusMessage
        exportStatus={{
          loading: false,
          success: true,
          error: "Error occurred",
          type: "download",
        }}
        isDisabled={false}
      />
    );

    // Error should be shown
    expect(screen.getByText("Error occurred")).toBeInTheDocument();

    // Success should not be shown
    expect(
      screen.queryByText("Calendar file downloaded successfully!")
    ).not.toBeInTheDocument();
  });
});
