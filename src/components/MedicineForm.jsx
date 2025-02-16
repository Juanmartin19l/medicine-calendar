import { useState } from "react";

export function MedicineForm({ onSubmit }) {
  const [medicine, setMedicine] = useState("");
  const [interval, setInterval] = useState("");
  const [duration, setDuration] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newMedicine = {
      name: medicine,
      interval: interval,
      duration: duration,
    };
    onSubmit(newMedicine); // Pasamos el nuevo medicamento al componente padre
    setMedicine(""); // Limpia el formulario
    setInterval("");
    setDuration("");
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
