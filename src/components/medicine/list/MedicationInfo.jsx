import { FaClock, FaCalendarAlt, FaCalendarDay } from "react-icons/fa";

/**
 * Component for displaying detailed medication information
 * @param {Object} medicine - Medication data object
 */
export function MedicationInfo({ medicine }) {
  const formatStartTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const calculateEndDate = (startTime, durationDays) => {
    const startDate = new Date(startTime);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(endDate);
  };

  return (
    <div className="grid sm:grid-cols-2 gap-3 text-sm">
      {/* Interval Information */}
      <InfoItem
        icon={<FaClock className="text-purple-400" />}
        bgColor="bg-purple-500/20"
        label="Interval"
        value={
          medicine.interval === 24
            ? "Once daily"
            : medicine.interval === 12
            ? "Twice daily"
            : `Every ${medicine.interval} hours`
        }
      />

      {/* Duration Information */}
      <InfoItem
        icon={<FaCalendarAlt className="text-green-400" />}
        bgColor="bg-green-500/20"
        label="Duration"
        value={`${medicine.duration} ${
          medicine.duration === 1 ? "day" : "days"
        }`}
      />

      {/* Start Date Information */}
      <InfoItem
        icon={<FaCalendarDay className="text-amber-400" />}
        bgColor="bg-amber-500/20"
        label="Start"
        value={formatStartTime(medicine.startTime)}
      />

      {/* End Date Information */}
      <InfoItem
        icon={<FaCalendarDay className="text-red-400" />}
        bgColor="bg-red-500/20"
        label="End"
        value={calculateEndDate(medicine.startTime, medicine.duration)}
      />
    </div>
  );
}

/**
 * Reusable component for displaying a single piece of medication information
 */
function InfoItem({ icon, bgColor, label, value }) {
  return (
    <div className="flex items-center gap-2 text-gray-300">
      <div className={`${bgColor} p-1.5 rounded`}>{icon}</div>
      <div>
        <div className="text-xs text-gray-400">{label}</div>
        <div>{value}</div>
      </div>
    </div>
  );
}
