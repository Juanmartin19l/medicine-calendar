import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

export function LimitWarning() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-amber-900/40 border border-amber-500 text-amber-200 px-4 py-3 rounded-md flex items-start gap-3"
    >
      <FaExclamationTriangle className="text-amber-500 text-xl flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium">Medication limit reached</p>
        <p className="text-sm mt-1">
          You've reached the maximum of 10 medications. Please remove some
          before adding new ones.
        </p>
      </div>
    </motion.div>
  );
}
