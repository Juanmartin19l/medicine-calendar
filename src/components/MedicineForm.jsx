import { useState } from "react";

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
        <label>Medication Name: </label>
        <input
          type="text"
          value={medicine}
          maxLength={50}
          onChange={(e) => setMedicine(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Dosage Interval (hours): </label>
        <input
          type="number"
          value={interval}
          min={1}
          max={72}
          onChange={(e) => setInterval(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Duration (days): </label>
        <input
          type="number"
          value={duration}
          min={1}
          max={365}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Start Time: </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>

      <button type="submit">Add</button>
    </form>
  );
}
