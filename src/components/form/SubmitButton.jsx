import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

export function SubmitButton({ disabled }) {
  return (
    <motion.button
      type="submit"
      className={`w-full ${
        disabled
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
      } text-white rounded mt-6 p-2 flex items-center justify-center gap-2 transition-colors duration-300`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled}
    >
      <FaPlus /> Add Medication
    </motion.button>
  );
}
