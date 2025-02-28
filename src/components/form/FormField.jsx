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
    <div>
      <label className="flex items-center gap-2">
        {icon && <Icon />}
        {label}
      </label>
      <input
        type={type}
        className={`w-full bg-[#2d2d2d] rounded p-2 mt-1 ${
          error ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        required={required}
        onInvalid={onInvalid}
      />
      <AnimatePresence>
        {error && (
          <motion.span
            className="text-red-500 text-sm mt-1 block"
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
