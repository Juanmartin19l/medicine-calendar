import { useState } from "react";

export function MedicineForm() {
  const [medicine, setMedicine] = useState("");
  const [interval, setInterval] = useState("");
  const [duration, setDuration] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(medicine, interval, duration);
  }

  return (
    <form onSubmit={handleSubmit}>
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
          min={0}
          max={72}
          onChange={(e) => setInterval(e.target.value)}
        />
      </div>
      <div>
        <label>Duration (days): </label>
        <input
          type="number"
          value={duration}
          min={0}
          max={365}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}
