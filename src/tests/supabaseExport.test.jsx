import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Export } from "../components/medicine/CalendarExport";
import "@testing-library/jest-dom";

// Mock supabaseClient - asegúrate de que este mock es consistente
vi.mock("../supabase/supabaseClient", () => ({
  supabase: {
    storage: {
      from: vi.fn().mockReturnThis(),
      upload: vi.fn().mockResolvedValue({ data: { path: "test/path.ics" } }),
      getPublicUrl: vi.fn().mockReturnValue({
        data: {
          publicUrl:
            "https://test-bucket.supabase.co/storage/v1/object/test/path.ics",
        },
      }),
    },
  },
}));

// Mock utilities
vi.mock("../utils/calendarGenerator", () => ({
  generateCalendarEvents: vi.fn(() => [
    { title: "Take Medicine", start: "2023-01-01" },
  ]),
  createICSFile: vi.fn(() =>
    Promise.resolve(new Blob(["test"], { type: "text/calendar" }))
  ),
  generateFileName: vi.fn(() => "medications_20230101.ics"),
  getMedicinesHash: vi.fn(() => "test-hash-123"),
  downloadICSFile: vi.fn(), // Asegúrate de incluir este mock
}));

// Mock supabaseStorage para que sea consistente a lo largo de todos los tests
vi.mock("../utils/supabaseStorage", () => ({
  uploadFile: vi.fn().mockResolvedValue({ path: "calendars/test.ics" }),
  getFileUrl: vi
    .fn()
    .mockResolvedValue(
      "webcal://test-bucket.supabase.co/storage/v1/object/test/path.ics"
    ),
  downloadFile: vi.fn().mockImplementation((url) => {
    window.location.href = url;
    return Promise.resolve();
  }),
}));

// Mock calendarExporter
vi.mock("../utils/calendarExporter", () => ({
  exportToCalendar: vi.fn().mockImplementation(async () => {
    const url =
      "webcal://test-bucket.supabase.co/storage/v1/object/test/path.ics";
    window.location.href = url;
    return url;
  }),
  exportToLocalCalendar: vi.fn().mockResolvedValue(undefined),
  clearFileCache: vi.fn(),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => {
      // Eliminar props específicas de Framer Motion
      const {
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        variants,
        layout,
        layoutId,
        transition,
        ...domProps
      } = props;
      return (
        <div data-testid="motion-div" {...domProps}>
          {children}
        </div>
      );
    },
    section: ({ children, ...props }) => {
      // Eliminar props específicas de Framer Motion
      const {
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        variants,
        layout,
        layoutId,
        transition,
        ...domProps
      } = props;
      return (
        <section data-testid="motion-section" {...domProps}>
          {children}
        </section>
      );
    },
  },
  AnimatePresence: ({ children }) => (
    <div data-testid="animate-presence">{children}</div>
  ),
}));

// Mock subcomponents
vi.mock("../components/medicine/export/ExportButton", () => ({
  ExportButton: ({ title, onClick, isLoading, isDisabled }) => (
    <button
      data-testid={`export-button-${title}`}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {title}
      {isLoading && " (Loading)"}
    </button>
  ),
}));

vi.mock("../components/medicine/export/StatusMessage", () => ({
  StatusMessage: ({ exportStatus, isDisabled }) => (
    <div data-testid="status-message">
      {exportStatus.error && (
        <div data-testid="error-message">{exportStatus.error}</div>
      )}
      {exportStatus.success && (
        <div data-testid="success-message">Successfully exported!</div>
      )}
      {isDisabled && <div data-testid="disabled-message">No medicines</div>}
    </div>
  ),
}));

// Mock all other required components
vi.mock("../components/medicine/export/DeviceRecommendations", () => ({
  DeviceRecommendations: () => <div data-testid="device-recommendations"></div>,
}));

vi.mock("../components/medicine/export/InfoTooltip", () => ({
  InfoTooltip: () => <div data-testid="info-tooltip"></div>,
}));

vi.mock("../components/medicine/export/FeaturesList", () => ({
  FeaturesList: () => <div data-testid="features-list"></div>,
}));

// Mock window.location
delete window.location;
window.location = { href: "" };

describe("Supabase Export Integration", () => {
  const testMedicines = [
    {
      name: "Paracetamol",
      interval: 8,
      duration: 7,
      startTime: "2023-01-01T08:00:00.000Z",
    },
  ];

  // Reset all mocks and window.location.href before each test
  beforeEach(() => {
    vi.resetAllMocks();
    window.location.href = "";
    console.log("Starting test with clean mocks");
  });

  // Log test completion
  afterEach(() => {
    console.log("Test completed");
  });

  it("successfully exports to Supabase and updates status", async () => {
    console.log("Running test: successfully exports to Supabase");

    // Import and configure mock
    const { exportToCalendar } = await import("../utils/calendarExporter");
    const webcalUrl =
      "webcal://test-bucket.supabase.co/storage/v1/object/test/path.ics";

    // Ensure the mock returns the expected value and sets window.location
    exportToCalendar.mockImplementation(async () => {
      console.log("Mock exportToCalendar called");
      window.location.href = webcalUrl;
      return webcalUrl;
    });

    // Render component
    render(<Export medicines={testMedicines} />);
    console.log("Component rendered");

    // Verify button is present
    const subscribeButton = screen.getByTestId(
      "export-button-Subscribe to Calendar"
    );
    expect(subscribeButton).toBeInTheDocument();
    console.log("Subscribe button found");

    // Click button
    fireEvent.click(subscribeButton);
    console.log("Subscribe button clicked");

    // Verify exportToCalendar was called
    expect(exportToCalendar).toHaveBeenCalledWith(testMedicines);
    console.log("exportToCalendar called with correct parameters");

    // Wait for success message
    await waitFor(() => {
      const successMessage = screen.getByTestId("success-message");
      console.log("Success message:", successMessage.textContent);
      expect(successMessage).toBeInTheDocument();
    });

    // Verify window.location.href was set
    console.log("window.location.href:", window.location.href);
    expect(window.location.href).toBe(webcalUrl);
  });

  it("handles Supabase errors gracefully", async () => {
    // Import calendarExporter to access the mock
    const { exportToCalendar } = await import("../utils/calendarExporter");
    exportToCalendar.mockRejectedValue(new Error("Supabase storage error"));

    render(<Export medicines={testMedicines} />);

    // Click on the subscribe button
    const subscribeButton = screen.getByTestId(
      "export-button-Subscribe to Calendar"
    );
    fireEvent.click(subscribeButton);

    // Should show error message
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
  });

  it("disables export when no medicines are available", () => {
    render(<Export medicines={[]} />);

    const subscribeButton = screen.getByTestId(
      "export-button-Subscribe to Calendar"
    );
    const downloadButton = screen.getByTestId(
      "export-button-Download Calendar"
    );

    expect(subscribeButton).toBeDisabled();
    expect(downloadButton).toBeDisabled();
    expect(screen.getByTestId("disabled-message")).toBeInTheDocument();
  });
});
