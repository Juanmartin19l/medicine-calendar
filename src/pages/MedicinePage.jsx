import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#2a2a2a] rounded-lg p-6 shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">
                <span className="text-blue-400">Add New Medication</span>
              </h2>
              <MedicineForm
                onSubmit={handleAddMedicine}
                existingMedicines={medicines}
              />
            </motion.div>

            {/* Divider for mobile */}
            <div className="border-t border-gray-600 my-8 md:hidden"></div>

            {/* Medicine List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#2a2a2a] rounded-lg p-6 shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">
                <span className="text-purple-400">Your Medications</span>
                {medicines.length > 0 && (
                  <span className="ml-2 bg-purple-500 text-white text-sm px-2 py-1 rounded-full">
                    {medicines.length}
                  </span>
                )}
              </h2>
              <MedicineList
                medicines={medicines}
                onDelete={handleDeleteMedicine}
              />
            </motion.div>
          </div>

          {/* Export Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#2a2a2a] rounded-lg p-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">
              <span className="text-green-400">Export Your Calendar</span>
            </h2>
            <Export medicines={medicines} />
          </motion.div>
        </div>

        {/* Tips Section */}
        {medicines.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 py-10"
          >
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Tips for Medication Adherence
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#2a2a2a] p-5 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">
                    Set a routine
                  </h3>
                  <p className="text-gray-300">
                    Take your medications at the same time each day to build a
                    consistent habit.
                  </p>
                </div>
                <div className="bg-[#2a2a2a] p-5 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">
                    Use reminders
                  </h3>
                  <p className="text-gray-300">
                    Export your calendar and set up notifications to alert you
                    when it's time for a dose.
                  </p>
                </div>
                <div className="bg-[#2a2a2a] p-5 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">
                    Store properly
                  </h3>
                  <p className="text-gray-300">
                    Keep your medications in a place where you'll see them
                    during your daily routine.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </div>

      <Footer />
    </div>
  );
}
