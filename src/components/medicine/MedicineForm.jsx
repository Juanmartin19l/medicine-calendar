import { useState, useRef, useEffect } from "react";
import { FaPills, FaClock } from "react-icons/fa";
import { FormField } from "./form/FormField";
import { LimitWarning } from "./form/LimitWarning";
import { SubmitButton } from "./form/SubmitButton";
import { IntervalField } from "./form/IntervalField";
import { DurationField } from "./form/DurationField";
import { validateMedicineForm } from "../../utils/formValidation";

/**
 * @typedef {Object} Medicine
 * @property {string} name - Medication name
 * @property {number} interval - Dosage interval in hours
 * @property {number} duration - Treatment duration in days
 * @property {string} startTime - ISO timestamp of first dose
 */

/**
 * @typedef {Object} MedicineFormProps
 * @property {Function} onSubmit - Function to handle form submission
 * @property {Array<Medicine>} existingMedicines - Array of existing medications
 */

/**
 * Form component for adding new medications to the schedule
 * @param {MedicineFormProps} props - Component props
 * @returns {JSX.Element} - Rendered form component
 */
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
  const [activeInterval, setActiveInterval] = useState(null);
  const [activeDuration, setActiveDuration] = useState(null);
  const formRef = useRef(null);
  const intervalRef = useRef(null);

  const reachedMedicineLimit = existingMedicines?.length >= 10;

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (intervalRef.current && !intervalRef.current.contains(event.target)) {
        intervalRef.current.closeTooltip?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [intervalRef]);

  /**
   * Handle form submission
   * @param {Event} e - Form submission event
   */
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
      resetStartTime();
      setErrors({});
      setActiveInterval(null);
      setActiveDuration(null);
    }
  }

  /**
   * Format date-time for more consistent cross-browser display
   * @param {Date} date - Date object to format
   * @returns {string} - Formatted date-time string
   */
  function formatDateTimeForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  /**
   * Reset start time to current time
   */
  function resetStartTime() {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localTime = new Date(now - timezoneOffset);
    setStartTime(formatDateTimeForInput(localTime));
  }

  // Animation variants for error messages
  const errorAnimationVariants = {
    initial: { opacity: 0, y: -5, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="space-y-4">
      {reachedMedicineLimit && <LimitWarning />}

      {errors.limit && (
        <div className="bg-red-900/40 border border-red-500 text-red-200 px-4 py-3 rounded-md mb-4">
          {errors.limit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3" ref={formRef}>
        {/* Medication Name Field */}
        <FormField
          label="Medication Name"
          icon={FaPills}
          type="text"
          placeholder="Enter medication name"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          error={errors.medicine}
          id="medication-name"
          name="medicine"
        />

        {/* Interval Field Component */}
        <IntervalField
          value={interval}
          onChange={setInterval}
          error={errors.interval}
          activeInterval={activeInterval}
          setActiveInterval={setActiveInterval}
          errorAnimationVariants={errorAnimationVariants}
        />

        {/* Duration Field Component */}
        <DurationField
          value={duration}
          onChange={setDuration}
          error={errors.duration}
          activeDuration={activeDuration}
          setActiveDuration={setActiveDuration}
          errorAnimationVariants={errorAnimationVariants}
        />

        {/* Start Time Field */}
        <FormField
          label="Start Date and Time"
          icon={FaClock}
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          error={errors.startTime}
          min={formatDateTimeForInput(
            new Date(Date.now() - 86400000) // 24 hours ago
          )}
          max={formatDateTimeForInput(
            new Date(new Date().setMonth(new Date().getMonth() + 1))
          )}
          required
          onInvalid={(e) => e.preventDefault()}
          id="start-time"
          name="startTime"
        />

        {/* Submit Button */}
        <div className="mt-6">
          <SubmitButton disabled={reachedMedicineLimit} />
        </div>
      </form>
    </div>
  );
}
