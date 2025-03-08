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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
        {label}
      </label>

      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {icon && <Icon className="text-gray-400" />}
        </span>

        <input
          type={type}
          className={`w-full pl-10 pr-3 py-2 rounded-md bg-[#333] border ${
            error ? "border-red-500" : "border-gray-600"
          } focus:outline-none focus:border-blue-500`}
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
          <motion.span
            className="text-red-500 text-sm block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
