import { useState, useRef } from "react";
import {
  FaPills,
  FaClock,
  FaCalendarAlt,
  FaPlus,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function MedicineForm({ onSubmit, existingMedicines }) {
  const [medicine, setMedicine] = useState("");
  const [interval, setInterval] = useState("");
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState(() => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now - timezoneOffset)
      .toISOString()
      .slice(0, 16);
    return localISOTime;
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const reachedMedicineLimit = existingMedicines?.length >= 10;

  const validateForm = () => {
    const newErrors = {};

    if (reachedMedicineLimit) {
      newErrors.limit = "Cannot add more than 10 medications";
      return false;
    }

    // Fields validation
    if (!medicine.trim()) {
      newErrors.medicine = "Medicine name is required";
    } else if (/[^a-zA-Z0-9 ]/.test(medicine)) {
      newErrors.medicine = "Medicine name must not contain special characters";
    } else if (medicine.length > 50) {
      newErrors.medicine = "Medicine name must be less than 50 characters";
    }

    if (!interval) {
      newErrors.interval = "Interval is required";
    } else if (!Number.isInteger(Number(interval)) || parseInt(interval) <= 0) {
      newErrors.interval = "Interval must be a positive integer";
    } else {
      const validIntervals = [...Array(24).keys()]
        .map((n) => n + 1)
        .concat([48, 72]);
      if (!validIntervals.includes(parseInt(interval))) {
        newErrors.interval =
          "Interval must be a number between 1-24, 48, or 72 hours";
      }
    }

    if (!duration) {
      newErrors.duration = "Duration is required";
    } else if (!Number.isInteger(Number(duration)) || parseInt(duration) <= 0) {
      newErrors.duration = "Duration must be a positive integer";
    } else if (parseInt(duration) > 31) {
      newErrors.duration = "Duration must be less than 31 days";
    }

    // Duplicate name validation
    if (
      existingMedicines?.some(
        (med) => med.name.toLowerCase() === medicine.toLowerCase()
      )
    ) {
      newErrors.medicine = "This medicine already exists";
    }

    // Interval vs duration validation
    const intervalHours = parseInt(interval);
    const durationDays = parseInt(duration);
    if (intervalHours && durationDays) {
      if (intervalHours > durationDays * 24) {
        newErrors.interval =
          "Interval cannot be greater than total duration in hours";
      }
    }

    // Date and time validation
    if (!startTime) {
      newErrors.startTime = "Start time is required";
    } else if (isNaN(Date.parse(startTime))) {
      newErrors.startTime = "Invalid date and time format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      const newMedicine = {
        name: medicine,
        interval: parseInt(interval),
        duration: parseInt(duration),
        startTime: new Date(startTime).toISOString(),
      };
      onSubmit(newMedicine);
      setMedicine("");
      setInterval("");
      setDuration("");
      const now = new Date();
      const timezoneOffset = now.getTimezoneOffset() * 60000;
      const localISOTime = new Date(now - timezoneOffset)
        .toISOString()
        .slice(0, 16);
      setStartTime(localISOTime);
      setErrors({});
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl mb-4 text-center">Medicine Form</h2>

      {reachedMedicineLimit && (
        <motion.div
          className="bg-yellow-500/20 border border-yellow-500 text-yellow-200 rounded-md p-3 mb-4 flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaExclamationTriangle />
          <span>You've reached the maximum limit of 10 medications.</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
        <div>
          <label className="flex items-center gap-2">
            <FaPills />
            Medication Name:
          </label>
          <input
            type="text"
            className={`w-full bg-[#2d2d2d] rounded p-2 mt-1 ${
              errors.medicine ? "border-red-500" : ""
            }`}
            placeholder="Enter medication name"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
          />
          <AnimatePresence>
            {errors.medicine && (
              <motion.span
                className="text-red-500 text-sm mt-1 block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {errors.medicine}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <FaClock />
            Dosage Interval (hours):
          </label>
          <input
            type="number"
            className={`w-full bg-[#2d2d2d] rounded p-2 mt-1 ${
              errors.interval ? "border-red-500" : ""
            }`}
            placeholder="Enter interval in hours (1-24, 48, 72)"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />
          <AnimatePresence>
            {errors.interval && (
              <motion.span
                className="text-red-500 text-sm mt-1 block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {errors.interval}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <FaCalendarAlt />
            Duration (days):
          </label>
          <input
            type="number"
            className={`w-full bg-[#2d2d2d] rounded p-2 mt-1 ${
              errors.duration ? "border-red-500" : ""
            }`}
            placeholder="Enter duration in days"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <AnimatePresence>
            {errors.duration && (
              <motion.span
                className="text-red-500 text-sm mt-1 block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {errors.duration}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <FaClock />
            Start Date and Time:
          </label>
          <input
            type="datetime-local"
            className={`w-full bg-[#2d2d2d] rounded p-2 mt-1 ${
              errors.startTime ? "border-red-500" : ""
            }`}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            min={new Date(
              new Date().getTime() -
                new Date().getTimezoneOffset() * 60000 -
                86400000
            )
              .toISOString()
              .slice(0, 16)}
            max={new Date(
              new Date(
                new Date().setMonth(new Date().getMonth() + 1)
              ).getTime() -
                new Date().getTimezoneOffset() * 60000
            )
              .toISOString()
              .slice(0, 16)}
            required
            onInvalid={(e) => e.preventDefault()}
          />
          <AnimatePresence>
            {errors.startTime && (
              <motion.span
                className="text-red-500 text-sm mt-1 block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {errors.startTime}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          className={`w-full ${
            reachedMedicineLimit
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          } text-white rounded mt-6 p-2 flex items-center justify-center gap-2 transition-colors duration-300`}
          whileHover={{ scale: reachedMedicineLimit ? 1 : 1.05 }}
          whileTap={{ scale: reachedMedicineLimit ? 1 : 0.95 }}
          disabled={reachedMedicineLimit}
        >
          <FaPlus /> Add Medication
        </motion.button>
      </form>
    </div>
  );
}
