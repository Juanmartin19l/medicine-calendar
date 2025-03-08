import { useState, useRef } from "react";
import { FaClock, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { QuickSelectButton } from "./QuickSelectButton";

/**
 * @typedef {Object} IntervalFieldProps
 * @property {string} value - Current interval value
 * @property {Function} onChange - Change handler for interval value
 * @property {string} [error] - Error message
 * @property {number|null} activeInterval - Currently selected interval preset
 * @property {Function} setActiveInterval - Handler to update active interval
 * @property {Object} errorAnimationVariants - Animation variants for error messages
 */

/**
 * Form field for medication dosage interval with quick selection options
 * @param {IntervalFieldProps} props - Component props
 * @returns {JSX.Element} - Rendered interval field component
 */
export function IntervalField({
  value,
  onChange,
  error,
  activeInterval,
  setActiveInterval,
  errorAnimationVariants,
}) {
  const [showIntervalTooltip, setShowIntervalTooltip] = useState(false);
  const intervalRef = useRef(null);

  // Common intervals for quick selection
  const commonIntervals = [
    { label: "4 hours", value: 4 },
    { label: "6 hours", value: 6 },
    { label: "8 hours", value: 8 },
    { label: "12 hours", value: 12 },
    { label: "Daily", value: 24 },
    { label: "2 days", value: 48 },
  ];

  /**
   * Handle selection from interval preset buttons
   * @param {number} value - The interval value in hours
   */
  const handleIntervalSelect = (value) => {
    onChange(value.toString());
    setActiveInterval(value);
  };

  // Add method to close tooltip for external access
  intervalRef.current = {
    closeTooltip: () => setShowIntervalTooltip(false),
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label
          htmlFor="interval"
          className="block text-sm font-medium text-gray-300"
        >
          Dosage Interval (hours)
        </label>
        <div className="relative" ref={intervalRef}>
          <FaInfoCircle
            className="text-gray-400 hover:text-blue-400 cursor-pointer"
            onClick={() => setShowIntervalTooltip(!showIntervalTooltip)}
          />
          {showIntervalTooltip && (
            <div className="absolute z-10 bg-gray-800 p-3 rounded-md shadow-lg text-xs w-56 -right-15 mt-2">
              <p>Common intervals:</p>
              <ul className="list-disc pl-4 mt-1">
                <li>4 hours: For medications needed frequently</li>
                <li>6-8 hours: Common for antibiotics</li>
                <li>12-24 hours: For daily medications</li>
                <li>48-72 hours: For less frequent treatments</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex-1">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaClock className="text-gray-400" />
            </span>
            <input
              type="number"
              id="interval"
              name="interval"
              placeholder="Enter interval in hours"
              className={`w-full pl-10 pr-3 py-2 rounded-md bg-[#333] border ${
                error ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:border-blue-500`}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setActiveInterval(parseInt(e.target.value) || null);
              }}
              min="1"
              max="72"
            />
          </div>
          <AnimatePresence>
            {error && (
              <motion.p
                className="mt-1 text-sm text-red-500"
                variants={errorAnimationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Quick selection buttons for common intervals */}
      <div className="flex flex-wrap gap-2 mt-2">
        {commonIntervals.map((item) => (
          <QuickSelectButton
            key={item.value}
            label={item.label}
            onClick={() => handleIntervalSelect(item.value)}
            isActive={activeInterval === item.value}
            color="blue"
          />
        ))}
      </div>
    </div>
  );
}
