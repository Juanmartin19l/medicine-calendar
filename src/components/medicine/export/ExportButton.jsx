import { motion } from "framer-motion";

/**
 * Reusable export button component
 * @param {JSX.Element} icon - Icon to display in the button
 * @param {string} title - Button title text
 * @param {string} description - Button description text
 * @param {function} onClick - Click event handler
 * @param {boolean} isLoading - Whether the button is in loading state
 * @param {boolean} isDisabled - Whether the button is disabled
 * @param {string} colorClass - CSS classes for button color styling
 * @param {string} iconBgClass - CSS classes for icon background styling
 */
export function ExportButton({
  icon,
  title,
  description,
  onClick,
  isLoading,
  isDisabled,
  colorClass,
  iconBgClass,
}) {
  return (
    <motion.button
      className={`flex items-center px-6 py-4 rounded-lg border transition-all ${
        isDisabled
          ? "bg-gray-800/30 border-gray-700/30 cursor-not-allowed text-gray-500"
          : `bg-gradient-to-br ${colorClass} shadow-lg text-white cursor-pointer`
      }`}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
    >
      <div
        className={`${
          isDisabled ? "" : `${iconBgClass} p-2 rounded-full`
        } mr-4`}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <div className="text-2xl">{icon}</div>
        )}
      </div>

      <div className="text-left">
        <div className="font-medium">{title}</div>
        <div className="text-xs opacity-80">{description}</div>
      </div>
    </motion.button>
  );
}
