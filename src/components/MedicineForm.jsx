import { useState } from "react";
import { FaPills, FaClock, FaCalendarAlt, FaPlus } from "react-icons/fa";
import "./MedicineForm.css"; // Importar el archivo CSS

export function MedicineForm({ onSubmit }) {
  const [medicine, setMedicine] = useState("");
  const [interval, setInterval] = useState("");
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState("08:00");

  function handleSubmit(e) {
    e.preventDefault();

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
          required
          placeholder="Enter medication name"
        />
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
          required
          placeholder="Enter interval in hours"
        />
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
          required
          placeholder="Enter duration in days"
        />
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
