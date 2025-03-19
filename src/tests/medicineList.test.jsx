import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MedicineList } from "../components/medicine/MedicineList";
import "@testing-library/jest-dom";

// Mock dependency components
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children, mode }) => (
    <div data-testid={`animate-presence-${mode || "default"}`}>{children}</div>
  ),
}));

vi.mock("../components/medicine/list/MedicineCard", () => ({
  MedicineCard: ({ medicine, onDelete, index }) => (
    <div data-testid={`medicine-card-${index}`} className="medicine-card">
      <h3>{medicine.name}</h3>
      <button
        onClick={() => onDelete(index)}
        data-testid={`delete-button-${index}`}
      >
        Delete
      </button>
    </div>
  ),
}));

vi.mock("../components/medicine/list/EmptyState", () => ({
  EmptyState: () => <div data-testid="empty-state">No medicines yet</div>,
}));

vi.mock("../components/medicine/list/MedicineCounter", () => ({
  MedicineCounter: ({ count }) =>
    count > 0 ? <div data-testid="medicine-counter">Total: {count}</div> : null,
}));

describe("MedicineList Component", () => {
  const onDeleteMock = vi.fn();

  it("renders empty state when no medicines are provided", () => {
    render(<MedicineList medicines={[]} onDelete={onDeleteMock} />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.queryByTestId("medicine-counter")).not.toBeInTheDocument();
  });

  it("renders medicine cards for each medicine", () => {
    const medicines = [
      {
        name: "Aspirin",
        interval: 8,
        duration: 7,
        startTime: "2023-01-01T08:00:00.000Z",
      },
      {
        name: "Paracetamol",
        interval: 12,
        duration: 5,
        startTime: "2023-01-01T10:00:00.000Z",
      },
    ];

    render(<MedicineList medicines={medicines} onDelete={onDeleteMock} />);

    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
    expect(screen.getByTestId("medicine-card-0")).toBeInTheDocument();
    expect(screen.getByTestId("medicine-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("medicine-counter")).toHaveTextContent(
      "Total: 2"
    );
  });

  it("calls onDelete when delete button is clicked", () => {
    const medicines = [
      {
        name: "Aspirin",
        interval: 8,
        duration: 7,
        startTime: "2023-01-01T08:00:00.000Z",
      },
      {
        name: "Paracetamol",
        interval: 12,
        duration: 5,
        startTime: "2023-01-01T10:00:00.000Z",
      },
    ];

    render(<MedicineList medicines={medicines} onDelete={onDeleteMock} />);

    // Click delete button on the first medicine
    fireEvent.click(screen.getByTestId("delete-button-0"));

    expect(onDeleteMock).toHaveBeenCalledWith(0);

    // Click delete button on the second medicine
    fireEvent.click(screen.getByTestId("delete-button-1"));

    expect(onDeleteMock).toHaveBeenCalledWith(1);
  });

  it("displays correct medicine counter based on the number of medicines", () => {
    const medicines = [
      {
        name: "Aspirin",
        interval: 8,
        duration: 7,
        startTime: "2023-01-01T08:00:00.000Z",
      },
    ];

    render(<MedicineList medicines={medicines} onDelete={onDeleteMock} />);

    expect(screen.getByTestId("medicine-counter")).toHaveTextContent(
      "Total: 1"
    );
  });

  it("uses wait mode for AnimatePresence", () => {
    render(<MedicineList medicines={[]} onDelete={onDeleteMock} />);

    expect(screen.getByTestId("animate-presence-wait")).toBeInTheDocument();
  });

  it("applies custom scrollbar styles to the list container", () => {
    const medicines = [
      {
        name: "Aspirin",
        interval: 8,
        duration: 7,
        startTime: "2023-01-01T08:00:00.000Z",
      },
    ];

    render(<MedicineList medicines={medicines} onDelete={onDeleteMock} />);

    const listContainer = screen.getByTestId("motion-div");
    expect(listContainer).toHaveClass("custom-scrollbar");

    // Check for inline style properties
    expect(listContainer).toHaveStyle({
      scrollbarWidth: "thin",
      scrollbarColor: "#4a5568 #2d3748",
    });
  });
});
