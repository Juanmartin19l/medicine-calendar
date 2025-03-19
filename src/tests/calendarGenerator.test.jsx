import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createICSFile,
  generateFileName,
  generateCalendarEvents,
  getMedicinesHash,
} from "../utils/calendarGenerator";

// Mock ics library
vi.mock("ics", () => ({
  createEvents: vi.fn((events, callback) => {
    if (!events || events.length === 0) {
      callback(new Error("No events provided"), null);
      return;
    }
    callback(
      null,
      "BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\nEND:VCALENDAR"
    );
  }),
}));

describe("Calendar Generator Functions", () => {
  let mockMedicines;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Setup test data
    mockMedicines = [
      {
        name: "Paracetamol",
        interval: 8,
        duration: 2,
        startTime: "2023-01-01T08:00:00.000Z",
      },
    ];

    // Mock Date to ensure consistent timestamps
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-01-15T10:30:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("creates ICS file blob from medication data", async () => {
    const blob = await createICSFile(mockMedicines);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("text/calendar;charset=utf-8");
  });

  it("generates the correct number of calendar events", () => {
    // For a duration of 2 days with 8-hour intervals (starting at 8am)
    // We should have 3 events per day: 8am, 4pm, 12am
    // Total: 6 events in 2 days
    const events = generateCalendarEvents(mockMedicines);

    expect(events.length).toBe(6);

    // The first event should be at 5am on January 1, 2023
    // (Note: may vary by time zone, UTC time is converted to local)

    expect(events[0].start).toEqual([2023, 1, 1, 5, 0]);
    expect(events[0].title).toBe("💊 Paracetamol - every 8h");

    // Check the fourth event (first event of the second day)
    expect(events[3].start).toEqual([2023, 1, 2, 5, 0]);
  });

  it("generates events with proper alarms 10 minutes before", () => {
    const events = generateCalendarEvents(mockMedicines);

    expect(events[0].alarms).toBeDefined();
    expect(events[0].alarms[0].trigger).toEqual({ minutes: 10, before: true });
    expect(events[0].alarms[0].action).toBe("display");
  });

  it("generates different hashes for different medicine sets", () => {
    const hash1 = getMedicinesHash(mockMedicines);

    const differentMedicines = [
      {
        name: "Ibuprofen",
        interval: 6,
        duration: 3,
        startTime: "2023-01-01T10:00:00.000Z",
      },
    ];

    const hash2 = getMedicinesHash(differentMedicines);

    expect(hash1).not.toBe(hash2);
  });

  it("generates the same hash for identical medicine sets", () => {
    const hash1 = getMedicinesHash(mockMedicines);

    const identicalMedicines = [
      {
        name: "Paracetamol",
        interval: 8,
        duration: 2,
        startTime: "2023-01-01T08:00:00.000Z",
      },
    ];

    const hash2 = getMedicinesHash(identicalMedicines);

    expect(hash1).toBe(hash2);
  });

  it("handles special case for intervals > 24 hours", () => {
    const longIntervalMed = [
      {
        name: "Weekly Medicine",
        interval: 48, // 2 days
        duration: 6, // 6 days
        startTime: "2023-01-01T08:00:00.000Z",
      },
    ];

    const events = generateCalendarEvents(longIntervalMed);

    // Should have events on day 1, day 3, day 5, plus final dose
    expect(events.length).toBe(4);

    // Check final dose
    const finalEvent = events[3];
    expect(finalEvent.title).toBe("💊 Weekly Medicine - Final Dose");
    expect(finalEvent.description).toContain("Final scheduled dose");
  });

  it("rejects with error when no events are provided", async () => {
    await expect(createICSFile([])).rejects.toThrow(
      "No events provided for calendar"
    );
  });

  it("rejects with error when ICS creation fails", async () => {
    const { createEvents } = await import("ics");
    createEvents.mockImplementationOnce((events, callback) => {
      callback(new Error("Failed to generate ICS"), null);
    });

    await expect(createICSFile(mockMedicines)).rejects.toThrow(
      "Failed to generate ICS"
    );
  });
});
