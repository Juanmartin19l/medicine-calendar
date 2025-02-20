import { useEffect, useState } from "react";
import { MedicineForm } from "../components/MedicineForm";
import { MedicineList } from "../components/MedicineList";
import { exportToCalendar } from "../utils/CalendarExporter";
import { Footer } from "../components/Footer";
import { Export } from "../components/Export";

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
    <div className="min-h-screen bg-[#222222] text-white p-8page">
      <h1 className="text-5xl font-light text-center mb-12">
        Medicine Calendar
      </h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <MedicineForm
          onSubmit={handleAddMedicine}
          existingMedicines={medicines}
        />
        <MedicineList medicines={medicines} onDelete={handleDeleteMedicine} />
      </div>
      <Export medicines={medicines} exportToCalendar={exportToCalendar} />

      <Footer />
    </div>
  );
}
