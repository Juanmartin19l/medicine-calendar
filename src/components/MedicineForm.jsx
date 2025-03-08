import { useState, useRef, useEffect } from "react";
import { FaPills, FaClock, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FormField } from "./form/FormField";
import { LimitWarning } from "./form/LimitWarning";
import { SubmitButton } from "./form/SubmitButton";
import { validateMedicineForm } from "../utils/formValidation";

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
  const [showIntervalTooltip, setShowIntervalTooltip] = useState(false);
  const formRef = useRef(null);
  const intervalRef = useRef(null);

  const reachedMedicineLimit = existingMedicines?.length >= 10;

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (intervalRef.current && !intervalRef.current.contains(event.target)) {
        setShowIntervalTooltip(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [intervalRef]);

  // Common intervals for quick selection
  const commonIntervals = [
    { label: "Every 4 hours", value: 4 },
    { label: "Every 6 hours", value: 6 },
    { label: "Every 8 hours", value: 8 },
    { label: "Every 12 hours", value: 12 },
    { label: "Once daily", value: 24 },
    { label: "Every 2 days", value: 48 },
  ];

  // Common durations for quick selection
  const commonDurations = [
    { label: "1 day", value: 1 },
    { label: "2 days", value: 2 },
    { label: "3 days", value: 3 },
    { label: "5 days", value: 5 },
    { label: "1 week", value: 7 },
    { label: "2 weeks", value: 14 },
  ];

  function handleSubmit(e) {
    e.preventDefault();

    // Use the external validation function
    const { isValid, errors } = validateMedicineForm(
      medicine,
      interval,
      duration,
      startTime,
      existingMedicines,
      reachedMedicineLimit
    );

    setErrors(errors);

    if (isValid) {
      const newMedicine = {
        name: medicine,
        interval: parseInt(interval),
        duration: parseInt(duration),
        startTime: new Date(startTime).toISOString(),
      };
      onSubmit(newMedicine);

      // Reset form
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

      // Only scroll to top of form, notification is handled by parent
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <div className="space-y-4 relative">
      {reachedMedicineLimit && <LimitWarning />}

      {errors.limit && (
        <motion.div
          className="bg-gradient-to-r from-red-900/40 to-red-800/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-md mb-4 flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-red-500/20 p-1.5 rounded-full">
            <FaInfoCircle className="text-red-400" />
          </div>
          <span>{errors.limit}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
        {/* Medication Name Field */}
        <FormField
          label="Medication Name"
          icon={FaPills}
          type="text"
          placeholder="Enter medication name"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          error={errors.medicine}
        />

        {/* Interval Field with Presets */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label
              htmlFor="interval"
              className="block text-sm font-medium text-gray-300"
            >
              Dosage Interval (hours)
            </label>
            <div className="relative" ref={intervalRef}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInfoCircle
                  className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-200"
                  onClick={() => setShowIntervalTooltip(!showIntervalTooltip)}
                />
              </motion.div>

              <AnimatePresence>
                {showIntervalTooltip && (
                  <motion.div
                    className="absolute z-10 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-md shadow-lg text-xs w-64 right-0 mt-2 border border-gray-700"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h5 className="font-medium text-blue-400 mb-2">
                      Common intervals:
                    </h5>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        <span className="font-medium">4 hours:</span> For
                        medications needed frequently
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        <span className="font-medium">6-8 hours:</span> Common
                        for antibiotics
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        <span className="font-medium">12-24 hours:</span> For
                        daily medications
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        <span className="font-medium">48-72 hours:</span> For
                        less frequent treatments
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaClock
                    className={`${
                      errors.interval ? "text-red-400" : "text-gray-400"
                    } transition-colors duration-200`}
                  />
                </span>
                <input
                  type="number"
                  id="interval"
                  placeholder="Enter interval in hours"
                  className={`w-full pl-10 pr-3 py-2 rounded-md bg-[#333] border ${
                    errors.interval
                      ? "border-red-500 ring-1 ring-red-500/50"
                      : "border-gray-600"
                  } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200`}
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  min="1"
                  max="72"
                />
              </div>
              <AnimatePresence>
                {errors.interval && (
                  <motion.p
                    className="mt-1 text-sm text-red-500 flex items-center gap-1.5"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
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
                    {errors.interval}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick selection buttons for common intervals */}
          <div className="flex flex-wrap gap-2 mt-3">
            {commonIntervals.map((item) => (
              <QuickSelectButton
                key={item.value}
                label={item.label}
                onClick={() => setInterval(item.value.toString())}
                isActive={interval === item.value.toString()}
                color="blue"
              />
            ))}
          </div>
        </div>

        {/* Duration Field with Presets */}
        <div className="space-y-2">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-300"
          >
            Duration (days)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaCalendarAlt
                className={`${
                  errors.duration ? "text-red-400" : "text-gray-400"
                } transition-colors duration-200`}
              />
            </span>
            <input
              type="number"
              id="duration"
              placeholder="Enter duration in days"
              className={`w-full pl-10 pr-3 py-2 rounded-md bg-[#333] border ${
                errors.duration
                  ? "border-red-500 ring-1 ring-red-500/50"
                  : "border-gray-600"
              } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200`}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
              max="31"
            />
          </div>
          <AnimatePresence>
            {errors.duration && (
              <motion.p
                className="text-sm text-red-500 flex items-center gap-1.5"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
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
                {errors.duration}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Quick selection buttons for common durations */}
          <div className="flex flex-wrap gap-2 mt-3">
            {commonDurations.map((item) => (
              <QuickSelectButton
                key={item.value}
                label={item.label}
                onClick={() => setDuration(item.value.toString())}
                isActive={duration === item.value.toString()}
                color="purple"
              />
            ))}
          </div>
        </div>

        {/* Start Time Field */}
        <FormField
          label="Start Date and Time"
          icon={FaClock}
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          error={errors.startTime}
          min={new Date(
            new Date().getTime() -
              new Date().getTimezoneOffset() * 60000 -
              86400000
          )
            .toISOString()
            .slice(0, 16)}
          max={new Date(
            new Date(new Date().setMonth(new Date().getMonth() + 1)).getTime() -
              new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, 16)}
          required
          onInvalid={(e) => e.preventDefault()}
        />

        {/* Submit Button */}
        <div className="mt-8">
          <SubmitButton disabled={reachedMedicineLimit} />
        </div>
      </form>
    </div>
  );
}

// Component for quick selection buttons
function QuickSelectButton({ label, onClick, isActive, color }) {
  const bgColors = {
    blue: isActive
      ? "bg-blue-500/30 border-blue-500/50"
      : "bg-[#444] border-transparent hover:bg-[#555]",
    purple: isActive
      ? "bg-purple-500/30 border-purple-500/50"
      : "bg-[#444] border-transparent hover:bg-[#555]",
    green: isActive
      ? "bg-green-500/30 border-green-500/50"
      : "bg-[#444] border-transparent hover:bg-[#555]",
  };

  const textColors = {
    blue: isActive ? "text-blue-300" : "text-gray-300",
    purple: isActive ? "text-purple-300" : "text-gray-300",
    green: isActive ? "text-green-300" : "text-gray-300",
  };

  return (
    <motion.button
      type="button"
      className={`text-xs ${bgColors[color]} ${textColors[color]} py-1.5 px-3 rounded border transition-colors duration-200`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
}
