import { motion } from "framer-motion";
import { FaCheck, FaInfoCircle } from "react-icons/fa";

/**
 * Component for displaying status messages related to calendar export
 * @param {Object} exportStatus - Current export status state
 * @param {boolean} isDisabled - Whether export is disabled (no medications)
 */
export function StatusMessage({ exportStatus, isDisabled }) {
  return (
    <div>
      {/* Error message */}
      {exportStatus.error && (
        <motion.div
          className="mt-6 bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-md text-center text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {exportStatus.error}
        </motion.div>
      )}

      {/* Success message */}
      {exportStatus.success && !exportStatus.error && (
        <motion.div
          className="mt-6 bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/50 text-green-200 px-4 py-3 rounded-md flex items-center justify-center gap-2 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <FaCheck />
          {exportStatus.type === "subscribe"
            ? "Successfully subscribed to calendar!"
            : "Calendar file downloaded successfully!"}
        </motion.div>
      )}

      {/* No medications message */}
      {isDisabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-gradient-to-r from-amber-900/20 to-amber-800/20 border border-amber-500/30 text-amber-200 px-4 py-3 rounded-md text-center text-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <FaInfoCircle />
            <span>Add medications to enable calendar export</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
