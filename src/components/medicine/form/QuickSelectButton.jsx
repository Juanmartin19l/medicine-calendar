import { motion } from "framer-motion";

/**
 * @typedef {Object} QuickSelectButtonProps
 * @property {string} label - Button text
 * @property {Function} onClick - Click event handler
 * @property {boolean} isActive - Whether button is in active state
 * @property {string} color - Color theme for the button (blue, purple, green)
 */

/**
 * Animated button component for quick selection options
 * @param {QuickSelectButtonProps} props - Component props
 * @returns {JSX.Element} - Rendered button component
 */
export function QuickSelectButton({ label, onClick, isActive, color }) {
  const bgColors = {
    blue: isActive
      ? "bg-blue-500/30 border-blue-500/50"
      : "bg-[#3a3a3a] border-transparent hover:bg-[#424242]",
    purple: isActive
      ? "bg-purple-500/30 border-purple-500/50"
      : "bg-[#3a3a3a] border-transparent hover:bg-[#424242]",
    green: isActive
      ? "bg-green-500/30 border-green-500/50"
      : "bg-[#3a3a3a] border-transparent hover:bg-[#424242]",
  };

  const textColors = {
    blue: isActive ? "text-blue-300" : "text-gray-300",
    purple: isActive ? "text-purple-300" : "text-gray-300",
    green: isActive ? "text-green-300" : "text-gray-300",
  };

  return (
    <motion.button
      type="button"
      className={`text-xs ${bgColors[color]} ${textColors[color]} py-1.5 px-3 rounded-md border transition-colors duration-200`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
}
