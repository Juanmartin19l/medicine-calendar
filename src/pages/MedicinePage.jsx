import { useEffect, useState } from "react";
import { MedicineForm } from "../components/MedicineForm";
import { MedicineList } from "../components/MedicineList";
import { exportToCalendar } from "../utils/CalendarExporter";

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
      console.log("Datos guardados:", medicines);
    } catch (error) {
      console.error("Error al guardar:", error);
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
      <MedicineForm onSubmit={handleAddMedicine} />
      <MedicineList medicines={medicines} onDelete={handleDeleteMedicine} />
      <button onClick={() => exportToCalendar(medicines)}>
        Exportar a Calendario
      </button>
    </div>
  );
}
