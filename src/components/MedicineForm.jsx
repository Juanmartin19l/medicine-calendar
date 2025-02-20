import { useState } from "react";
import { FaPills, FaClock, FaCalendarAlt, FaPlus } from "react-icons/fa";

export function MedicineForm({ onSubmit, existingMedicines }) {
  const [medicine, setMedicine] = useState("");
  const [interval, setInterval] = useState("");
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Empty fields validation
    if (!medicine.trim()) {
      newErrors.medicine = "Medicine name is required";
    }
    if (!interval) {
      newErrors.interval = "Interval is required";
    } else if (parseInt(interval) <= 0) {
      newErrors.interval = "Interval must be a positive number";
    }
    if (!duration) {
      newErrors.duration = "Duration is required";
    } else if (parseInt(duration) <= 0) {
      newErrors.duration = "Duration must be a positive number";
    }

    // Duplicate name validation
    if (
      existingMedicines?.some(
        (med) => med.name.toLowerCase() === medicine.toLowerCase()
      )
    ) {
      newErrors.medicine = "This medicine already exists";
    }

    // Interval vs duration validation
    const intervalHours = parseInt(interval);
    const durationDays = parseInt(duration);
    if (intervalHours && durationDays) {
      if (intervalHours > durationDays * 24) {
        newErrors.interval =
          "Interval cannot be greater than total duration in hours";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      const newMedicine = {
        name: medicine,
        interval: parseInt(interval),
        duration: parseInt(duration),
        startTime: startTime,
      };
      onSubmit(newMedicine);
      setMedicine("");
      setInterval("");
      setDuration("");
      setStartTime("08:00");
      setErrors({});
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl mb-4 text-center">Medicine Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center gap-2">
            <FaPills />
            Medication Name:
          </label>
          <input
            type="text"
            className={`w-full bg-[#2d2d2d] rounded p-2 mt-1 ${
              errors.medicine ? "error-input" : ""
            }`}
            placeholder="Enter medication name"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
          />
          {errors.medicine && (
            <span className="error-message">{errors.medicine}</span>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2">
            <FaClock />
            Dosage Interval (hours):
          </label>
          <input
            type="number"
            className={`w-full bg-[#2d2d2d] rounded p-2 mt-1 ${
              errors.interval ? "error-input" : ""
            }`}
            placeholder="Enter interval in hours"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            min="1"
          />
          {errors.interval && (
            <span className="error-message">{errors.interval}</span>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2">
            <FaCalendarAlt />
            Duration (days):
          </label>
          <input
            type="number"
            className={`w-full bg-[#2d2d2d] rounded p-2 mt-1 ${
              errors.duration ? "error-input" : ""
            }`}
            placeholder="Enter duration in days"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
          />
          {errors.duration && (
            <span className="error-message">{errors.duration}</span>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2">
            <FaClock />
            Start Time:
          </label>
          <input
            type="time"
            className="w-full bg-[#2d2d2d] rounded p-2 mt-1"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded p-2 flex items-center justify-center gap-2"
        >
          <FaPlus /> Add Medication
        </button>
      </form>
    </div>
  );
}
