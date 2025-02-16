import { useEffect, useState } from "react";
import { MedicineForm } from "../components/MedicineForm";
import { MedicineList } from "../components/MedicineList";
import { exportToCalendar } from "../utils/CalendarExporter";

export function MedicinePage() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const savedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
    setMedicines(savedMedicines);
  }, []);

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }, [medicines]);

  const handleAddMedicine = (newMedicine) => {
    setMedicines([...medicines, newMedicine]);
  };

  const handleDeleteMedicine = (index) => {
    const updateMedicine = medicines.filter((_, i) => i !== index);
    setMedicines(updateMedicine);
  };

  return (
    <div className="medicine-page">
      <h1>Medicine Calendar</h1>
      <p>
        Medicine Calendar allows you to add medications with reminders and link
        them to the calendar for their application.
      </p>
      <MedicineForm onSubmit={handleAddMedicine} />
      <MedicineList medicines={medicines} onDelete={handleDeleteMedicine} />
      <button onClick={() => exportToCalendar(medicines)}>
        Exportar a Calendario
      </button>
    </div>
  );
}
