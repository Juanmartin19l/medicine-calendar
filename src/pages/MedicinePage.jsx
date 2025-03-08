import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { MedicineForm } from "../components/MedicineForm";
import { MedicineList } from "../components/MedicineList";
import { Footer } from "../components/Footer";
import { Export } from "../components/CalendarExport";
import { Header } from "../components/Header";
import { clearFileCache } from "../utils/calendarExporter";
import { FaPills, FaListAlt, FaCalendarAlt } from "react-icons/fa";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1e1e24] to-[#222222] text-white">
      {/* SEO Optimization */}
      <Helmet>
        <title>Medicine Calendar - Track Your Medications</title>
        <meta
          name="description"
          content="Add your prescriptions, set frequencies, and export your calendar to stay on top of your health regimen."
        />
        <meta
          property="og:title"
          content="Medicine Calendar - Track Your Medications"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Never miss a dose again with our medication tracking calendar."
        />
        <link rel="canonical" href="https://yourdomain.com/medicines" />
      </Helmet>

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
              className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-lg p-6 shadow-xl border border-blue-500/10"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                  <FaPills className="text-blue-400 text-xl" />
                </div>
                <h2 className="text-2xl font-semibold text-center">
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
              className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-lg p-6 shadow-xl border border-purple-500/10"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                  <FaListAlt className="text-purple-400 text-xl" />
                </div>
                <h2 className="text-2xl font-semibold text-center">
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
            className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-lg p-6 shadow-xl border border-blue-500/10"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                <FaCalendarAlt className="text-blue-400 text-xl" />
              </div>
              <h2 className="text-2xl font-semibold text-center">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Export Your Calendar
                </span>
              </h2>
            </div>
            <Export medicines={medicines} />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
