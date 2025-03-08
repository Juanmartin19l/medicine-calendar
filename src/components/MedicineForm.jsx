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

      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  }

  return (
    <div className="space-y-4">
      {reachedMedicineLimit && <LimitWarning />}

      {errors.limit && (
        <div className="bg-red-900/40 border border-red-500 text-red-200 px-4 py-3 rounded-md mb-4">
          {errors.limit}
        </div>
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

        {/* Interval Field with Presets - Using a custom implementation instead of FormField */}
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
                <div className="absolute z-10 bg-gray-800 p-3 rounded-md shadow-lg text-xs w-56 right-0 mt-2">
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
                  placeholder="Enter interval in hours"
                  className={`w-full pl-10 pr-3 py-2 rounded-md bg-[#333] border ${
                    errors.interval ? "border-red-500" : "border-gray-600"
                  } focus:outline-none focus:border-blue-500`}
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  min="1"
                  max="72"
                />
              </div>
              <AnimatePresence>
                {errors.interval && (
                  <motion.p
                    className="mt-1 text-sm text-red-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {errors.interval}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick selection buttons for common intervals */}
          <div className="flex flex-wrap gap-2 mt-2">
            {commonIntervals.map((item) => (
              <button
                key={item.value}
                type="button"
                className="text-xs bg-[#444] hover:bg-[#555] text-gray-300 py-1 px-2 rounded"
                onClick={() => setInterval(item.value.toString())}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Field with Presets - Using a custom implementation instead of FormField */}
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
              placeholder="Enter duration in days"
              className={`w-full pl-10 pr-3 py-2 rounded-md bg-[#333] border ${
                errors.duration ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:border-blue-500`}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
              max="31"
            />
          </div>
          <AnimatePresence>
            {errors.duration && (
              <motion.p
                className="text-sm text-red-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {errors.duration}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Quick selection buttons for common durations */}
          <div className="flex flex-wrap gap-2 mt-2">
            {commonDurations.map((item) => (
              <button
                key={item.value}
                type="button"
                className="text-xs bg-[#444] hover:bg-[#555] text-gray-300 py-1 px-2 rounded"
                onClick={() => setDuration(item.value.toString())}
              >
                {item.label}
              </button>
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
        <div className="mt-6">
          <SubmitButton disabled={reachedMedicineLimit} />
        </div>
      </form>
    </div>
  );
}
