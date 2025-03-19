import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * @typedef {Object} FormFieldProps
 * @property {string} label - Label text for the form field
 * @property {Function} icon - Icon component to display
 * @property {string} type - HTML input type
 * @property {string} placeholder - Placeholder text
 * @property {string|number} value - Current input value
 * @property {Function} onChange - Change event handler
 * @property {string} [error] - Error message to display
 * @property {string|number} [min] - Minimum value (for number/date inputs)
 * @property {string|number} [max] - Maximum value (for number/date inputs)
 * @property {boolean} [required] - Whether the field is required
 * @property {Function} [onInvalid] - Invalid event handler
 * @property {string} [id] - Custom ID for the input element
 * @property {string} [name] - Name attribute for the input element
 */

/**
 * Reusable form field component with animated error handling
 * @param {FormFieldProps} props - Component props
 * @returns {JSX.Element} - Rendered form field component
 */
export function FormField({
  label,
  icon,
  type,
  placeholder,
  value,
  onChange,
  error,
  min,
  max,
  required,
  onInvalid,
  id,
  name,
}) {
  const Icon = icon;
  const [isIOS, setIsIOS] = useState(false);

  // Generate unique ID if not provided
  const fieldId =
    id ||
    `field-${label?.replace(/\s+/g, "-").toLowerCase()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

  // Detect iOS devices for specific styling
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
  }, []);

  // Generate specific classes for datetime-local inputs
  const getInputClasses = () => {
    const baseClasses = `w-full pl-10 pr-3 py-2 rounded-md bg-[#333] border ${
      error ? "border-red-500 ring-1 ring-red-500" : "border-gray-600"
    } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200`;

    // Add specific classes for datetime-local inputs
    if (type === "datetime-local") {
      return `${baseClasses} ${
        isIOS ? "appearance-none ios-datetime-fix pl-3" : ""
      }`;
    }

    return baseClasses;
  };

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-300 items-center gap-2"
      >
        {label}
      </label>

      <div className="relative">
        {/* Remove icon for datetime-local on iOS */}
        {!isIOS || type !== "datetime-local" ? (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
            {icon && (
              <Icon
                className={`${
                  error ? "text-red-400" : "text-gray-400"
                } transition-colors duration-200`}
              />
            )}
          </div>
        ) : null}

        <input
          id={fieldId}
          name={name || fieldId}
          type={type}
          className={getInputClasses()}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          required={required}
          onInvalid={onInvalid}
          aria-invalid={error ? "true" : "false"}
          style={
            type === "datetime-local" && isIOS ? { paddingLeft: "1rem" } : {}
          }
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            className="text-red-500 text-sm flex items-center gap-1.5"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
