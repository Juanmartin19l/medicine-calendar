import { motion } from "framer-motion";
import { FaPills } from "react-icons/fa";
import { MedicationInfo } from "./MedicationInfo";
import { DeleteButton } from "./DeleteButton";

/**
 * Component for displaying an individual medication card
 * @param {Object} medicine - Medication data object
 * @param {Function} onDelete - Function to handle deletion
 * @param {Number} index - Index of the medication in the list
 */
export function MedicineCard({ medicine, onDelete, index }) {
  return (
    <motion.div
      key={`med-${index}`}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        x: -10,
        transition: { duration: 0.2 },
      }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      className="bg-gradient-to-r from-[#2d2d2d] to-[#323232] p-5 rounded-lg border border-gray-700 shadow-md hover:border-purple-500/30 transition-colors duration-300"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-blue-500/20 p-1.5 rounded">
              <FaPills className="text-blue-400" />
            </div>
            <h3 className="font-semibold text-lg text-white">
              {medicine.name}
            </h3>
          </div>

          <MedicationInfo medicine={medicine} />
        </div>

        <DeleteButton
          onDelete={() => onDelete(index)}
          medicineName={medicine.name}
        />
      </div>
    </motion.div>
  );
}
