import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  exportToLocalCalendar,
  exportToCalendar,
  clearFileCache,
} from "../utils/calendarExporter";

// Mock dependencies
vi.mock("../utils/calendarGenerator", () => ({
  generateCalendarEvents: vi.fn((medicines) => medicines.map(() => ({}))),
  createICSFile: vi.fn(() =>
    Promise.resolve(new Blob(["test"], { type: "text/calendar" }))
  ),
  generateFileName: vi.fn(() => "test_calendar.ics"),
  getMedicinesHash: vi.fn(() => "test-hash-123"),
  downloadICSFile: vi.fn(), // Añadir el mock para downloadICSFile
}));

vi.mock("../utils/supabaseStorage", () => ({
  uploadFile: vi.fn(() =>
    Promise.resolve({ path: "calendars/test_calendar.ics" })
  ),
  getFileUrl: vi.fn(() =>
    Promise.resolve("https://test-url.com/test_calendar.ics")
  ),
  downloadFile: vi.fn(() => Promise.resolve()),
}));

describe("Calendar Exporter Functions", () => {
  // Test data
  const testMedicines = [
    {
      name: "Test Medicine",
      interval: 8,
      duration: 7,
      startTime: "2023-01-01T08:00:00.000Z",
    },
  ];

  // Mock DOM APIs
  global.URL.createObjectURL = vi.fn(() => "blob:test-url");
  global.URL.revokeObjectURL = vi.fn();

  // Mock document elements for downloads
  const mockAnchor = {
    href: "",
    download: "",
    click: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();

    // Setup document mock
    document.createElement = vi.fn((tag) => {
      if (tag === "a") return mockAnchor;
      return {};
    });

    document.body.appendChild = vi.fn();
    document.body.removeChild = vi.fn();

    // Reset mock anchor
    mockAnchor.href = "";
    mockAnchor.download = "";
    mockAnchor.click.mockReset();

    // Reset URL mocks
    URL.createObjectURL.mockReturnValue("blob:test-url");

    // Mock console
    console.log = vi.fn();
    console.error = vi.fn();

    // Clear any existing file cache
    clearFileCache();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("exportToLocalCalendar creates and triggers download of ICS file", async () => {
    await exportToLocalCalendar(testMedicines);

    // Verify dependencies were called
    const {
      generateCalendarEvents,
      createICSFile,
      generateFileName,
      downloadICSFile,
    } = await import("../utils/calendarGenerator");
    expect(generateCalendarEvents).toHaveBeenCalledWith(testMedicines);
    expect(createICSFile).toHaveBeenCalled();
    expect(generateFileName).toHaveBeenCalled();
    expect(downloadICSFile).toHaveBeenCalledWith(
      expect.any(Blob),
      "test_calendar.ics"
    );
  });

  it("exportToCalendar uploads to Supabase and triggers download", async () => {
    await exportToCalendar(testMedicines);

    // Verify dependencies were called
    const { generateCalendarEvents, createICSFile, getMedicinesHash } =
      await import("../utils/calendarGenerator");
    const { uploadFile, getFileUrl, downloadFile } = await import(
      "../utils/supabaseStorage"
    );

    expect(generateCalendarEvents).toHaveBeenCalledWith(testMedicines);
    expect(createICSFile).toHaveBeenCalled();
    expect(getMedicinesHash).toHaveBeenCalledWith(testMedicines);

    // Verify Supabase operations
    expect(uploadFile).toHaveBeenCalledWith(
      expect.any(File),
      "medicine-calendar",
      "calendars/test_calendar.ics"
    );

    expect(getFileUrl).toHaveBeenCalledWith(
      "medicine-calendar",
      "calendars/test_calendar.ics"
    );

    expect(downloadFile).toHaveBeenCalledWith(
      "https://test-url.com/test_calendar.ics"
    );
  });

  it("uses cached URL when medicines haven't changed", async () => {
    const { getMedicinesHash } = await import("../utils/calendarGenerator");
    const { downloadFile } = await import("../utils/supabaseStorage");

    // First export - should upload and cache
    await exportToCalendar(testMedicines);

    // Reset mocks
    vi.clearAllMocks();

    // Second export with same hash - should use cache
    await exportToCalendar(testMedicines);

    // Verify we checked the hash but didn't regenerate files
    expect(getMedicinesHash).toHaveBeenCalledWith(testMedicines);
    expect(downloadFile).toHaveBeenCalled();

    // These should NOT have been called since we're using cached version
    const { createICSFile } = await import("../utils/calendarGenerator");
    const { uploadFile } = await import("../utils/supabaseStorage");
    expect(createICSFile).not.toHaveBeenCalled();
    expect(uploadFile).not.toHaveBeenCalled();
  });

  it("clearFileCache resets the cached file info", async () => {
    const { getMedicinesHash } = await import("../utils/calendarGenerator");
    const { createICSFile } = await import("../utils/calendarGenerator");
    const { uploadFile } = await import("../utils/supabaseStorage");

    // First export to populate cache
    await exportToCalendar(testMedicines);

    // Reset mocks
    vi.clearAllMocks();

    // Clear cache
    clearFileCache();

    // Export again with same medicines
    await exportToCalendar(testMedicines);

    // Should regenerate everything since cache was cleared
    expect(getMedicinesHash).toHaveBeenCalledWith(testMedicines);
    expect(createICSFile).toHaveBeenCalled();
    expect(uploadFile).toHaveBeenCalled();
  });

  it("throws error when no medicines are provided", async () => {
    await expect(exportToLocalCalendar([])).rejects.toThrow(
      "No medicines provided"
    );
    await expect(exportToCalendar([])).rejects.toThrow("No medicines provided");
  });

  it("handles errors during export processes", async () => {
    const { createICSFile } = await import("../utils/calendarGenerator");

    // Mock an error in createICSFile
    createICSFile.mockRejectedValueOnce(new Error("Test error"));

    await expect(exportToLocalCalendar(testMedicines)).rejects.toThrow(
      "Test error"
    );
    expect(console.error).toHaveBeenCalled();
  });
});
