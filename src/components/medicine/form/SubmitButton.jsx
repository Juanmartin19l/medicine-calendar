import { motion } from "framer-motion";

/**
 * @typedef {Object} SubmitButtonProps
 * @property {boolean} [disabled] - Whether the button is disabled
 */

/**
 * Animated submit button for the medicine form
 * @param {SubmitButtonProps} props - Component props
 * @returns {JSX.Element} - Rendered button component
 */
export function SubmitButton({ disabled }) {
  return (
    <motion.button
      type="submit"
      className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-300 ${
        disabled
          ? "bg-gray-600 cursor-not-allowed opacity-50"
          : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
      }`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
    >
      Add Medication
    </motion.button>
  );
}
