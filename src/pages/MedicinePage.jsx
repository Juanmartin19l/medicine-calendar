import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MedicineForm } from "../components/MedicineForm";
import { MedicineList } from "../components/MedicineList";
import { Footer } from "../components/Footer";
import { Export } from "../components/CalendarExport";
import { clearFileCache } from "../utils/calendarExporter";

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
      // Clear file cache whenever medicines change
      clearFileCache();
      console.log("Data saved:", medicines);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, [medicines]);

  const handleAddMedicine = (newMedicine) => {
    setMedicines((prev) => [newMedicine, ...prev]);
  };

  const handleDeleteMedicine = (index) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#222222] text-white">
      <div className="flex-grow">
        <h1 className="text-5xl font-light text-center mb-12 pt-8">
          Medicine Calendar
        </h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MedicineForm
              onSubmit={handleAddMedicine}
              existingMedicines={medicines}
            />
          </motion.div>
          <div className="border-t border-gray-600 my-4 md:hidden"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MedicineList
              medicines={medicines}
              onDelete={handleDeleteMedicine}
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Export medicines={medicines} />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
