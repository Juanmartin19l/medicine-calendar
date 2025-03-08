import { FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { QuickSelectButton } from "./QuickSelectButton";

/**
 * @typedef {Object} DurationFieldProps
 * @property {string} value - Current duration value
 * @property {Function} onChange - Change handler for duration value
 * @property {string} [error] - Error message
 * @property {number|null} activeDuration - Currently selected duration preset
 * @property {Function} setActiveDuration - Handler to update active duration
 * @property {Object} errorAnimationVariants - Animation variants for error messages
 */

/**
 * Form field for medication duration with quick selection options
 * @param {DurationFieldProps} props - Component props
 * @returns {JSX.Element} - Rendered duration field component
 */
export function DurationField({
  value,
  onChange,
  error,
  activeDuration,
  setActiveDuration,
  errorAnimationVariants,
}) {
  // Common durations for quick selection
  const commonDurations = [
    { label: "1 day", value: 1 },
    { label: "2 days", value: 2 },
    { label: "3 days", value: 3 },
    { label: "5 days", value: 5 },
    { label: "1 week", value: 7 },
    { label: "2 weeks", value: 14 },
  ];

  /**
   * Handle selection from duration preset buttons
   * @param {number} value - The duration value in days
   */
  const handleDurationSelect = (value) => {
    onChange(value.toString());
    setActiveDuration(value);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="duration"
        className="block text-sm font-medium text-gray-300"
      >
        Duration (days)
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaCalendarAlt className="text-gray-400" />
        </span>
        <input
          type="number"
          id="duration"
          name="duration"
          placeholder="Enter duration in days"
          className={`w-full pl-10 pr-3 py-2 rounded-md bg-[#333] border ${
            error ? "border-red-500" : "border-gray-600"
          } focus:outline-none focus:border-blue-500`}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setActiveDuration(parseInt(e.target.value) || null);
          }}
          min="1"
          max="31"
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-sm text-red-500"
            variants={errorAnimationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Quick selection buttons for common durations */}
      <div className="flex flex-wrap gap-2 mt-2">
        {commonDurations.map((item) => (
          <QuickSelectButton
            key={item.value}
            label={item.label}
            onClick={() => handleDurationSelect(item.value)}
            isActive={activeDuration === item.value}
            color="purple"
          />
        ))}
      </div>
    </div>
  );
}
