import { motion } from "framer-motion";
import { FaApple, FaAndroid } from "react-icons/fa";

/**
 * Component displaying device-specific calendar export recommendations
 */
export function DeviceRecommendations() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap justify-center gap-4 mb-6"
    >
      <div className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-900/20 to-blue-800/20 rounded-full border border-blue-500/20">
        <FaApple className="text-blue-400 mr-2" />
        <span className="text-sm text-blue-300">iPhone: Subscribe</span>
      </div>
      <div className="flex items-center px-3 py-2 bg-gradient-to-r from-purple-900/20 to-purple-800/20 rounded-full border border-purple-500/20">
        <FaAndroid className="text-purple-400 mr-2" />
        <span className="text-sm text-purple-300">Android: Download</span>
      </div>
    </motion.div>
  );
}