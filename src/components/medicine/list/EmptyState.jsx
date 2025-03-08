import { motion } from "framer-motion";
import { FaPills } from "react-icons/fa";

/**
 * Component displayed when no medications are in the list
 */
export function EmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center py-10 text-center rounded-lg h-full"
    >
      <div className="bg-gray-700/30 p-4 rounded-full mb-5">
        <FaPills className="text-4xl text-purple-400/80" />
      </div>
      <h3 className="text-xl font-medium mb-3 text-gray-300">
        No medications added yet
      </h3>
      <p className="text-sm max-w-xs text-gray-400 px-6">
        Add your first medication using the form to start tracking your
        medication schedule.
      </p>

      <motion.div
        className="mt-8 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md px-4 py-2 text-sm"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <FaPills className="hidden sm:block" />
          <span>Get started with your first medication</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
