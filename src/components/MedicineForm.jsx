import { useState } from "react";
import { FaPills, FaClock, FaCalendarAlt, FaPlus } from "react-icons/fa";
import "./MedicineForm.css";

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
    }
    if (!duration) {
      newErrors.duration = "Duration is required";
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
    <form onSubmit={handleSubmit} className="medicine-form">
      <div>
        <label htmlFor="medicine-name">
          <FaPills /> Medication Name:
        </label>
        <input
          type="text"
          id="medicine-name"
          value={medicine}
          maxLength={50}
          onChange={(e) => setMedicine(e.target.value)}
          placeholder="Enter medication name"
          className={errors.medicine ? "error-input" : ""}
        />
        {errors.medicine && (
          <span className="error-message">{errors.medicine}</span>
        )}
      </div>

      <div>
        <label htmlFor="dosage-interval">
          <FaClock /> Dosage Interval (hours):
        </label>
        <input
          type="number"
          id="dosage-interval"
          value={interval}
          min={1}
          max={72}
          onChange={(e) => setInterval(e.target.value)}
          placeholder="Enter interval in hours"
          className={errors.interval ? "error-input" : ""}
        />
        {errors.interval && (
          <span className="error-message">{errors.interval}</span>
        )}
      </div>

      <div>
        <label htmlFor="duration">
          <FaCalendarAlt /> Duration (days):
        </label>
        <input
          type="number"
          id="duration"
          value={duration}
          min={1}
          max={365}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration in days"
          className={errors.duration ? "error-input" : ""}
        />
        {errors.duration && (
          <span className="error-message">{errors.duration}</span>
        )}
      </div>

      <div>
        <label htmlFor="start-time">
          <FaClock /> Start Time:
        </label>
        <input
          type="time"
          id="start-time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>

      <button type="submit">
        <FaPlus /> Add Medication
      </button>
    </form>
  );
}
