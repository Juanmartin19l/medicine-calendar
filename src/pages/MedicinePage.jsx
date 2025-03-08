import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MedicineForm } from "../components/MedicineForm";
import { MedicineList } from "../components/MedicineList";
import { Footer } from "../components/Footer";
import { Export } from "../components/CalendarExport";
import { Header } from "../components/Header";
import { SEO } from "../components/SEO";
import { clearFileCache } from "../utils/calendarExporter";
import {
  FaPills,
  FaListAlt,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1e1e24] to-[#222222] text-white">
      {/* SEO Optimization */}
      <SEO
        title="Medicine Calendar - Track Your Medications"
        description="Add your prescriptions, set frequencies, and export your calendar to stay on top of your health regimen."
        keywords="medicine tracker, medication schedule, medicine export, health management"
        ogTitle="Medicine Calendar - Track Your Medications"
        ogDescription="Never miss a dose again with our medication tracking calendar."
        canonical="https://yourdomain.com/medicines"
      />

      <Header />

      <div className="flex-grow pt-24">
        {/* Page Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Medicine Calendar
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your medication schedule seamlessly. Add your prescriptions,
            set frequencies, and export your calendar to stay on top of your
            health regimen. Never miss a dose again.
          </p>
        </motion.section>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          {/* Form and List Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Medicine Form */}
            <motion.div
              id="add-medication"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-lg p-6 shadow-xl border border-blue-500/10 overflow-hidden relative"
            >
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>

              <div className="flex items-center mb-6 relative z-10">
                <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                  <FaPills className="text-blue-400 text-xl" />
                </div>
                <h2 className="text-2xl font-semibold">
                  <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    Add New Medication
                  </span>
                </h2>
              </div>

              <MedicineForm
                onSubmit={handleAddMedicine}
                existingMedicines={medicines}
              />
            </motion.div>

            {/* Divider for mobile */}
            <div className="border-t border-gray-700/50 my-8 md:hidden"></div>

            {/* Medicine List */}
            <motion.div
              id="your-medications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-lg p-6 shadow-xl border border-purple-500/10 overflow-hidden relative"
            >
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"></div>

              <div className="flex items-center mb-6 relative z-10">
                <div className="bg-purple-500/20 p-3 rounded-full mr-4">
                  <FaListAlt className="text-purple-400 text-xl" />
                </div>
                <h2 className="text-2xl font-semibold">
                  <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                    Your Medications
                  </span>
                </h2>
              </div>

              <MedicineList
                medicines={medicines}
                onDelete={handleDeleteMedicine}
              />
            </motion.div>
          </div>

          {/* Export Section */}
          <motion.div
            id="export-calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-lg p-6 shadow-xl border border-green-500/10 overflow-hidden relative"
          >
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-green-500/5 rounded-full blur-xl"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-green-500/5 rounded-full blur-xl"></div>

            <div className="flex items-center mb-6 relative z-10">
              <div className="bg-green-500/20 p-3 rounded-full mr-4">
                <FaCalendarAlt className="text-green-400 text-xl" />
              </div>
              <h2 className="text-2xl font-semibold">
                <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  Export Your Calendar
                </span>
              </h2>
            </div>

            <Export medicines={medicines} />
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-800/20"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                <FaInfoCircle className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">How It Works</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#1d1d1d]/60 p-4 rounded-lg border border-gray-800/30">
                <h4 className="font-medium text-blue-300 mb-2">
                  Step 1: Add Your Medications
                </h4>
                <p className="text-gray-400 text-sm">
                  Enter the name of your medication, the dosage, frequency, and
                  period. You can add notes for specific instructions.
                </p>
              </div>
              <div className="bg-[#1d1d1d]/60 p-4 rounded-lg border border-gray-800/30">
                <h4 className="font-medium text-purple-300 mb-2">
                  Step 2: Review Your Medications
                </h4>
                <p className="text-gray-400 text-sm">
                  Check your list of medications. You can delete any entry
                  that's no longer needed or add more medications to your
                  schedule.
                </p>
              </div>
              <div className="bg-[#1d1d1d]/60 p-4 rounded-lg border border-gray-800/30">
                <h4 className="font-medium text-green-300 mb-2">
                  Step 3: Export to Calendar
                </h4>
                <p className="text-gray-400 text-sm">
                  Export your medication schedule to your preferred calendar app
                  (iCal, Google, etc.) to receive reminders and keep track of
                  your regimen.
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mt-6 text-center">
              Your medication data is stored locally on your device. We don't
              have access to your health information.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
