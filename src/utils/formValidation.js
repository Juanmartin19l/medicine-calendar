export function validateMedicineForm(
  medicine,
  interval,
  duration,
  startTime,
  existingMedicines,
  reachedMedicineLimit
) {
  const errors = {};

  if (reachedMedicineLimit) {
    errors.limit = "Cannot add more than 10 medications";
    return { isValid: false, errors };
  }

  // Fields validation
  if (!medicine.trim()) {
    errors.medicine = "Medicine name is required";
  } else if (/[^a-zA-Z0-9 ]/.test(medicine)) {
    errors.medicine = "Medicine name must not contain special characters";
  } else if (medicine.length > 50) {
    errors.medicine = "Medicine name must be less than 50 characters";
  }

  if (!interval) {
    errors.interval = "Interval is required";
  } else if (!Number.isInteger(Number(interval)) || parseInt(interval) <= 0) {
    errors.interval = "Interval must be a positive integer";
  } else {
    const validIntervals = [...Array(24).keys()]
      .map((n) => n + 1)
      .concat([48, 72]);
    if (!validIntervals.includes(parseInt(interval))) {
      errors.interval =
        "Interval must be a number between 1-24, 48, or 72 hours";
    }
  }

  if (!duration) {
    errors.duration = "Duration is required";
  } else if (!Number.isInteger(Number(duration)) || parseInt(duration) <= 0) {
    errors.duration = "Duration must be a positive integer";
  } else if (parseInt(duration) > 31) {
    errors.duration = "Duration must be less than 31 days";
  } else {
    // Check for interval-duration compatibility
    const intervalValue = parseInt(interval);
    const durationValue = parseInt(duration);

    if (intervalValue === 48 && durationValue % 2 !== 0) {
      errors.duration =
        "When interval is 48 hours, duration must be a multiple of 2 days";
    } else if (intervalValue === 72 && durationValue % 3 !== 0) {
      errors.duration =
        "When interval is 72 hours, duration must be a multiple of 3 days";
    }
  }

  // Duplicate name validation
  if (
    existingMedicines?.some(
      (med) => med.name.toLowerCase() === medicine.toLowerCase()
    )
  ) {
    errors.medicine = "This medicine already exists";
  }

  // Interval vs duration validation
  const intervalHours = parseInt(interval);
  const durationDays = parseInt(duration);
  if (intervalHours && durationDays) {
    if (intervalHours > durationDays * 24) {
      errors.interval =
        "Interval cannot be greater than total duration in hours";
    }
  }

  // Date and time validation
  if (!startTime) {
    errors.startTime = "Start time is required";
  } else if (isNaN(Date.parse(startTime))) {
    errors.startTime = "Invalid date and time format";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
