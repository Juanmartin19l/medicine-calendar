import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Component for call-to-action buttons in the hero section
 */
export function ActionButtons() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="flex flex-wrap justify-center gap-4 mt-4 mb-16"
    >
      <Link
        to="/medicines"
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
      >
        Get Started
      </Link>
      <Link
        to="/about"
        className="px-8 py-3 bg-[#333] rounded-md font-medium hover:bg-[#444] transition-all duration-300 border border-gray-700"
      >
        Learn More
      </Link>
    </motion.div>
  );
}
