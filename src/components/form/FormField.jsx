import { motion, AnimatePresence } from "framer-motion";

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
}) {
  const Icon = icon;

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
        {label}
      </label>

      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
          {icon && (
            <Icon
              className={`${
                error ? "text-red-400" : "text-gray-400"
              } transition-colors duration-200`}
            />
          )}
        </span>

        <input
          type={type}
          className={`w-full pl-10 pr-3 py-2 rounded-md bg-[#333] border ${
            error ? "border-red-500 ring-1 ring-red-500" : "border-gray-600"
          } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          required={required}
          onInvalid={onInvalid}
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
