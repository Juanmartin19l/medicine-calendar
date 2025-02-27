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
            : "bg-[#4caf50] hover:bg-[#45a049] cursor-pointer"
        }`}
        onClick={handleSubscribe}
        disabled={isDisabled}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaCalendarAlt /> Suscribirse al calendario
      </motion.button>

      <motion.button
        className={`px-6 py-2 rounded flex items-center gap-2 ${
          isDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#2196f3] hover:bg-[#0b7dda] cursor-pointer"
        }`}
        onClick={handleDownload}
        disabled={isDisabled}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaDownload /> Descargar calendario
      </motion.button>

      <span className="text-sm mt-4 sm:mt-0 sm:ml-4">.ics file</span>
    </div>
  );
}
