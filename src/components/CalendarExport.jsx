import { FaCalendarAlt, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  exportToCalendar,
  exportToLocalCalendar,
} from "../utils/calendarExporter";

export function Export({ medicines }) {
  const isDisabled = medicines.length === 0;

  const handleSubscribe = async () => {
    if (isDisabled) return;

    try {
      await exportToCalendar(medicines);
    } catch (error) {
      console.error("Error during subscribe process:", error);
    }
  };

  const handleDownload = async () => {
    if (isDisabled) return;

    try {
      await exportToLocalCalendar(medicines);
    } catch (error) {
      console.error("Error during download process:", error);
    }
  };

  return (
    <div className="mt-12 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
      <motion.button
        className={`px-6 py-2 rounded flex items-center gap-2 ${
          isDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 cursor-pointer"
        }`}
        onClick={handleSubscribe}
        disabled={isDisabled}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaCalendarAlt /> Subscribe to Calendar
      </motion.button>

      <div className="flex items-center mx-2">
        <span className="text-gray-400 px-3 hidden sm:block">or</span>
      </div>

      <motion.button
        className={`px-6 py-2 rounded flex items-center gap-2 ${
          isDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        }`}
        onClick={handleDownload}
        disabled={isDisabled}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaDownload /> Download Calendar
      </motion.button>

      <span className="text-sm mt-4 sm:mt-0 sm:ml-4">.ics format</span>
    </div>
  );
}
