import { FaTrashAlt, FaPills, FaClock, FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function MedicineList({ medicines, onDelete }) {
  return (
    <div>
      <h2 className="text-2xl mb-4 text-center">Medicine List</h2>
      <AnimatePresence mode="wait">
        {medicines.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex items-center justify-center md:h-80 text-center text-gray-500"
          >
            No medications added yet. Please add some medications to see them
            listed here.
          </motion.div>
        ) : (
          <motion.div
            key="list"
            className={`grid gap-4 ${
              medicines.length > 3 ? "max-h-96 overflow-y-auto" : ""
            }`}
            style={{ scrollbarGutter: "stable" }}
          >
            <AnimatePresence>
              {medicines.map((med, index) => (
                <motion.div
                  key={index}
                  className="bg-[#444444] p-4 rounded"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <FaPills />
                        <span className="font-semibold">Name: {med.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <FaClock />
                        <span>Interval: {med.interval} hours</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <FaCalendarAlt />
                        <span>Duration: {med.duration} days</span>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => onDelete(index)}
                      className="bg-red-500 hover:bg-red-600 p-2 rounded cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrashAlt />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
