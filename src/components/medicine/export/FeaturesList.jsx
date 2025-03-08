import { FaCalendarAlt, FaFileExport, FaBell } from "react-icons/fa";
import { FeatureCard } from "./FeatureCard";

/**
 * Component displaying a list of calendar export features
 */
export function FeaturesList() {
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <FeatureCard
        icon={<FaCalendarAlt />}
        title="Calendar Integration"
        description="Works with Google Calendar, Apple Calendar, and Outlook"
        color="blue"
      />
      <FeatureCard
        icon={<FaFileExport />}
        title="Universal Format"
        description="Standard .ics files compatible with all major calendar apps"
        color="purple"
      />
      <FeatureCard
        icon={<FaBell />}
        title="Stay on Schedule"
        description="Receive reminders for every medication dose"
        color="gradient"
      />
    </div>
  );
}