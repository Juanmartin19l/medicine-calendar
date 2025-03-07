import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MedicineForm } from "../components/MedicineForm";
import { MedicineList } from "../components/MedicineList";
import { Footer } from "../components/Footer";
import { Export } from "../components/CalendarExport";
import { Header } from "../components/Header";
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
      <Header />
      <div className="flex-grow pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 px-4"
        >
          <h1 className="text-4xl font-light mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Medicine Calendar
            </span>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Track your medication schedule seamlessly. Add your prescriptions,
            set frequencies, and export your calendar to stay on top of your
            health regimen. Never miss a dose again.
          </p>
        </motion.div>
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
          className="max-w-6xl mx-auto px-8 pb-12"
        >
          <Export medicines={medicines} />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
