import { useEffect, useState } from "react";
import { MedicineForm } from "../components/MedicineForm";
import { MedicineList } from "../components/MedicineList";
import { exportToCalendar } from "../utils/CalendarExporter";
import { FaCalendarAlt } from "react-icons/fa";
import "./MedicinePage.css";

export function MedicinePage() {
  const [medicines, setMedicines] = useState(() => {
    try {
      const saved = localStorage.getItem("medicines");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("medicines", JSON.stringify(medicines));
      console.log("Data saved:", medicines);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, [medicines]);

  const handleAddMedicine = (newMedicine) => {
    setMedicines((prev) => [...prev, newMedicine]);
  };

  const handleDeleteMedicine = (index) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="medicine-page">
      <h1>Medicine Calendar</h1>
      <MedicineForm
        onSubmit={handleAddMedicine}
        existingMedicines={medicines}
      />{" "}
      <MedicineList medicines={medicines} onDelete={handleDeleteMedicine} />
      {medicines.length > 0 && (
        <button className="export" onClick={() => exportToCalendar(medicines)}>
          <FaCalendarAlt /> Export to Calendar
        </button>
      )}
    </div>
  );
}
