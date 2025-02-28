import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

export function LimitWarning() {
  return (
    <motion.div
      className="bg-yellow-500/20 border border-yellow-500 text-yellow-200 rounded-md p-3 mb-4 flex items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <FaExclamationTriangle />
      <span>You've reached the maximum limit of 10 medications.</span>
    </motion.div>
  );
}
