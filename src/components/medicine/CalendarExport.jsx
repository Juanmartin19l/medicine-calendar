import { useState } from "react";
import { FaCloudDownloadAlt, FaDownload } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import {
  exportToCalendar,
  exportToLocalCalendar,
} from "../../utils/calendarExporter";

// Import subcomponents
import { ExportButton } from "./export/ExportButton";
import { DeviceRecommendations } from "./export/DeviceRecommendations";
import { InfoTooltip } from "./export/InfoTooltip";
import { StatusMessage } from "./export/StatusMessage";
import { FeaturesList } from "./export/FeaturesList";

/**
 * Calendar export component allowing users to subscribe to or download medication schedules
 * @param {Array} medicines - Array of medication objects to be exported
 */
export function Export({ medicines }) {
  const [exportStatus, setExportStatus] = useState({
    loading: false,
    success: false,
    type: null,
    error: null,
  });

  const isDisabled = medicines.length === 0;

  const handleSubscribe = async () => {
    if (isDisabled) return;

    setExportStatus({
      loading: true,
      success: false,
      type: "subscribe",
      error: null,
    });

    try {
      await exportToCalendar(medicines);
      setExportStatus({
        loading: false,
        success: true,
        type: "subscribe",
        error: null,
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setExportStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      console.error("Error during subscribe process:", error);
      setExportStatus({
        loading: false,
        success: false,
        type: "subscribe",
        error: "Could not subscribe to calendar. Please try again.",
      });

      // Reset error message after 5 seconds
      setTimeout(() => {
        setExportStatus((prev) => ({ ...prev, error: null }));
      }, 5000);
    }
  };

  const handleDownload = async () => {
    if (isDisabled) return;

    setExportStatus({
      loading: true,
      success: false,
      type: "download",
      error: null,
    });

    try {
      await exportToLocalCalendar(medicines);
      setExportStatus({
        loading: false,
        success: true,
        type: "download",
        error: null,
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setExportStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      console.error("Error during download process:", error);
      setExportStatus({
        loading: false,
        success: false,
        type: "download",
        error: "Could not download calendar. Please try again.",
      });

      // Reset error message after 5 seconds
      setTimeout(() => {
        setExportStatus((prev) => ({ ...prev, error: null }));
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Export Description */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="text-gray-300 mb-3">
          Export your medication schedule to your preferred calendar app to
          receive reminders and never miss a dose.
        </p>

        {/* Info tooltip */}
        <InfoTooltip />
      </div>

      {/* Export Options */}
      <div className="max-w-3xl mx-auto w-full">
        {/* Device recommendations banner */}
        <DeviceRecommendations />

        {/* Export buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Subscribe Button */}
          <ExportButton
            icon={<FaCloudDownloadAlt />}
            title="Subscribe to Calendar"
            description="Connect to your online calendar"
            onClick={handleSubscribe}
            isLoading={
              exportStatus.loading && exportStatus.type === "subscribe"
            }
            isDisabled={isDisabled}
            colorClass="from-blue-600/90 to-blue-700/90 hover:from-blue-500 hover:to-blue-600 border-blue-500/30"
            iconBgClass="bg-blue-500/30"
          />

          {/* Download Button */}
          <ExportButton
            icon={<FaDownload />}
            title="Download Calendar"
            description="Save as .ics file"
            onClick={handleDownload}
            isLoading={exportStatus.loading && exportStatus.type === "download"}
            isDisabled={isDisabled}
            colorClass="from-purple-600/90 to-purple-700/90 hover:from-purple-500 hover:to-purple-600 border-purple-500/30"
            iconBgClass="bg-purple-500/30"
          />
        </div>
      </div>

      {/* Status messages */}
      <AnimatePresence>
        <StatusMessage exportStatus={exportStatus} isDisabled={isDisabled} />
      </AnimatePresence>

      {/* Feature cards */}
      <FeaturesList />
    </div>
  );
}
