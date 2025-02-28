import { useState, useRef } from "react";
import { FaPills, FaClock, FaCalendarAlt } from "react-icons/fa";
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
  const formRef = useRef(null);

  const reachedMedicineLimit = existingMedicines?.length >= 10;

  function handleSubmit(e) {
    e.preventDefault();

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
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl mb-4 text-center">Medicine Form</h2>

      {reachedMedicineLimit && <LimitWarning />}

      <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
        <FormField
          label="Medication Name:"
          icon={FaPills}
          type="text"
          placeholder="Enter medication name"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          error={errors.medicine}
        />

        <FormField
          label="Dosage Interval (hours):"
          icon={FaClock}
          type="number"
          placeholder="Enter interval in hours (1-24, 48, 72)"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          error={errors.interval}
        />

        <FormField
          label="Duration (days):"
          icon={FaCalendarAlt}
          type="number"
          placeholder="Enter duration in days"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          error={errors.duration}
        />

        <FormField
          label="Start Date and Time:"
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

        <SubmitButton disabled={reachedMedicineLimit} />
      </form>
    </div>
  );
}
