import { describe, it, expect } from "vitest";
import { validateMedicineForm } from "../utils/formValidation";

describe("validateMedicineForm", () => {
  it("should return isValid: true when all fields are valid", () => {
    const result = validateMedicineForm(
      "Paracetamol", // medicine
      "8", // interval (hours)
      "7", // duration (days)
      "2023-12-01T08:00", // startTime
      [], // existingMedicines
      false // reachedMedicineLimit
    );

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("should validate that medicine name is required", () => {
    const result = validateMedicineForm(
      "", // medicine - empty
      "8", // interval
      "7", // duration
      "2023-12-01T08:00", // startTime
      [], // existingMedicines
      false // reachedMedicineLimit
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.medicine).toBe("Medicine name is required");
  });

  it("should validate that name doesn't contain special characters", () => {
    const result = validateMedicineForm(
      "Paracetamol@", // medicine - with special character
      "8", // interval
      "7", // duration
      "2023-12-01T08:00", // startTime
      [], // existingMedicines
      false // reachedMedicineLimit
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.medicine).toBe(
      "Medicine name must not contain special characters"
    );
  });

  it("should validate compatibility between 48-hour interval and duration", () => {
    const result = validateMedicineForm(
      "Medication", // medicine
      "48", // interval - 48 hours
      "3", // duration - not a multiple of 2
      "2023-12-01T08:00", // startTime
      [], // existingMedicines
      false // reachedMedicineLimit
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.duration).toBe(
      "When interval is 48 hours, duration must be a multiple of 2 days"
    );
  });

  it("should validate compatibility between 72-hour interval and duration", () => {
    const result = validateMedicineForm(
      "Medication", // medicine
      "72", // interval - 72 hours
      "4", // duration - not a multiple of 3
      "2023-12-01T08:00", // startTime
      [], // existingMedicines
      false // reachedMedicineLimit
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.duration).toBe(
      "When interval is 72 hours, duration must be a multiple of 3 days"
    );
  });

  it("should validate that interval is not greater than total duration in hours", () => {
    const result = validateMedicineForm(
      "Medication", // medicine
      "30", // interval - 30 hours
      "1", // duration - 1 day (24 hours)
      "2023-12-01T08:00", // startTime
      [], // existingMedicines
      false // reachedMedicineLimit
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.interval).toBe(
      "Interval cannot be greater than total duration in hours"
    );
  });

  it("should validate that no more than 10 medications can be added", () => {
    const result = validateMedicineForm(
      "New Medication", // medicine
      "8", // interval
      "7", // duration
      "2023-12-01T08:00", // startTime
      [], // existingMedicines
      true // reachedMedicineLimit - true
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.limit).toBe("Cannot add more than 10 medications");
  });

  it("should validate that medicine names cannot be duplicated", () => {
    const existingMedicines = [{ name: "Paracetamol" }];

    const result = validateMedicineForm(
      "Paracetamol", // medicine - already exists
      "8", // interval
      "7", // duration
      "2023-12-01T08:00", // startTime
      existingMedicines, // existingMedicines
      false // reachedMedicineLimit
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.medicine).toBe("This medicine already exists");
  });
});
