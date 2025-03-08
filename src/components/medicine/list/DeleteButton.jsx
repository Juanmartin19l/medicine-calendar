import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";

/**
 * Delete button component for medication cards
 * @param {Function} onDelete - Function to handle deletion
 * @param {String} medicineName - Name of the medication to delete
 */
export function DeleteButton({ onDelete, medicineName }) {
  return (
    <motion.button
      onClick={onDelete}
      className="bg-red-500/10 hover:bg-red-500/80 text-red-400 hover:text-white p-2 rounded-full transition-colors duration-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Delete ${medicineName}`}
      title={`Delete ${medicineName}`}
    >
      <FaTrashAlt />
    </motion.button>
  );
}
