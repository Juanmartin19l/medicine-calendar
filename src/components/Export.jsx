import { FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export function Export({ medicines, exportToCalendar }) {
  const isDisabled = medicines.length === 0;

  return (
    <div className="mt-12 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center">
      <motion.button
        className={`px-6 py-2 rounded flex items-center gap-2 ${
          isDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#4caf50] hover:bg-[#45a049] cursor-pointer"
        }`}
        onClick={() => !isDisabled && exportToCalendar(medicines)}
        disabled={isDisabled}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaCalendarAlt /> Export to Calendar
      </motion.button>
      <span className="text-sm mt-4 sm:mt-0 sm:ml-4">.ics file</span>
    </div>
  );
}
