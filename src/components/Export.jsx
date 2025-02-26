import { FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { exportToCalendar } from "../utils/CalendarExporter";
import { getLastUploadedFile, downloadFile } from "../utils/fileUploader";
import { useState, useEffect } from "react";

export function Export({ medicines }) {
  const [lastFile, setLastFile] = useState(null);
  const isDisabled = medicines.length === 0;

  useEffect(() => {
    async function fetchLastFile() {
      try {
        const file = await getLastUploadedFile(
          "medicine-calendar",
          "calendars"
        );
        setLastFile(file);
      } catch (error) {
        console.error("Error fetching last uploaded file:", error);
      }
    }

    fetchLastFile();
  }, []);

  const handleSubscribe = async () => {
    if (isDisabled) return;

    try {
      await exportToCalendar(medicines);
    } catch (error) {
      console.error("Error during subscribe process:", error);
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
      <span className="text-sm mt-4 sm:mt-0 sm:ml-4">.ics file</span>
    </div>
  );
}
