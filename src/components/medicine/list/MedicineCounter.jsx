import { motion } from "framer-motion";

/**
 * Component displaying the count of medications in the list
 * @param {Number} count - Number of medications in the list
 */
export function MedicineCounter({ count }) {
  if (count === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="pt-3 border-t border-gray-700/30 mt-3 h-[40px] flex items-center justify-center"
    >
      <div className="text-sm text-gray-400 text-center">
        <p>
          Total: {count} {count === 1 ? "medication" : "medications"}
        </p>
      </div>
    </motion.div>
  );
}
