import { useState } from "react";
import {
  FaCalendarAlt,
  FaDownload,
  FaFileExport,
  FaCloudDownloadAlt,
  FaInfoCircle,
  FaCheck,
  FaAndroid,
  FaApple,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  exportToCalendar,
  exportToLocalCalendar,
} from "../utils/calendarExporter";

export function Export({ medicines }) {
  const [exportStatus, setExportStatus] = useState({
    loading: false,
    success: false,
    type: null,
    error: null,
  });
  const [showTooltip, setShowTooltip] = useState(false);

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
      {/* Export Options */}
      <div className="flex flex-col items-center space-y-6">
        {/* Info text */}
        <div className="text-center max-w-lg mx-auto mb-4">
          <p className="text-gray-300 mb-2">
            Export your medication schedule to your preferred calendar app to
            receive reminders.
          </p>

          <div className="relative inline-block">
            <span
              className="text-sm text-blue-400 flex items-center cursor-pointer hover:text-blue-300"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <FaInfoCircle className="mr-1" /> How does this work?
            </span>

            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  className="absolute z-10 bg-[#2a2a2a] p-4 rounded-md shadow-lg w-80 text-left mt-2 left-1/2 transform -translate-x-1/2 border border-gray-700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="text-xs mb-2">
                    <strong className="text-blue-400">Subscribe:</strong> Adds
                    events to your online calendar (Google Calendar, Apple
                    Calendar, etc.)
                  </p>
                  <p className="text-xs mb-3">
                    <strong className="text-purple-400">Download:</strong> Saves
                    an ICS file that you can import into any calendar app.
                  </p>
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs font-medium mb-1 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      Recommended by device:
                    </p>
                    <div className="flex items-center mb-1">
                      <FaApple className="text-blue-400 mr-2" />
                      <p className="text-xs">
                        <strong>iPhone/iOS:</strong> Subscription works best
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaAndroid className="text-purple-400 mr-2" />
                      <p className="text-xs">
                        <strong>Android:</strong> Download is recommended
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Device recommendation banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-lg p-3 mb-2"
        >
          <div className="flex items-center justify-center gap-3 text-sm">
            <div className="flex items-center">
              <FaApple className="text-blue-400 mr-1" />
              <span className="text-blue-300">iPhone: Subscribe</span>
            </div>
            <span className="text-gray-500">|</span>
            <div className="flex items-center">
              <FaAndroid className="text-purple-400 mr-1" />
              <span className="text-purple-300">Android: Download</span>
            </div>
          </div>
        </motion.div>

        {/* Export buttons */}
        <div className="grid sm:grid-cols-2 gap-6 w-full max-w-xl">
          <motion.button
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 h-28 transition-all ${
              isDisabled
                ? "bg-gray-700/30 cursor-not-allowed text-gray-500"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white cursor-pointer"
            }`}
            onClick={handleSubscribe}
            disabled={isDisabled || exportStatus.loading}
            whileHover={!isDisabled ? { scale: 1.02 } : {}}
            whileTap={!isDisabled ? { scale: 0.98 } : {}}
          >
            {exportStatus.loading && exportStatus.type === "subscribe" ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaCloudDownloadAlt className="text-2xl" />
            )}
            <span className="font-medium">Subscribe to Calendar</span>
            <span className="text-xs opacity-80">
              Connect to your online calendar
            </span>
          </motion.button>

          <motion.button
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 h-28 transition-all ${
              isDisabled
                ? "bg-gray-700/30 cursor-not-allowed text-gray-500"
                : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white cursor-pointer"
            }`}
            onClick={handleDownload}
            disabled={isDisabled || exportStatus.loading}
            whileHover={!isDisabled ? { scale: 1.02 } : {}}
            whileTap={!isDisabled ? { scale: 0.98 } : {}}
          >
            {exportStatus.loading && exportStatus.type === "download" ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaDownload className="text-2xl" />
            )}
            <span className="font-medium">Download Calendar</span>
            <span className="text-xs opacity-80">Save as .ics file</span>
          </motion.button>
        </div>
      </div>

      {/* Status messages */}
      <AnimatePresence>
        {exportStatus.error && (
          <motion.div
            className="mt-6 bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-md text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {exportStatus.error}
          </motion.div>
        )}

        {exportStatus.success && (
          <motion.div
            className="mt-6 bg-green-900/30 border border-green-500/50 text-green-200 px-4 py-3 rounded-md flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <FaCheck />
            {exportStatus.type === "subscribe"
              ? "Successfully subscribed to calendar!"
              : "Calendar file downloaded successfully!"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No medications message */}
      {isDisabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-amber-900/20 border border-amber-500/30 text-amber-200 px-4 py-3 rounded-md text-center"
        >
          <p>Add medications to enable calendar export</p>
        </motion.div>
      )}

      {/* Feature explanation */}
      <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
        <div className="p-4">
          <div className="flex justify-center mb-2">
            <div className="bg-blue-500/20 p-2 rounded-full">
              <FaCalendarAlt className="text-lg text-blue-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium mb-1 text-blue-300">
            Calendar Integration
          </h3>
          <p className="text-xs text-gray-400">
            Works with Google Calendar, Apple Calendar, and Outlook
          </p>
        </div>

        <div className="p-4">
          <div className="flex justify-center mb-2">
            <div className="bg-purple-500/20 p-2 rounded-full">
              <FaFileExport className="text-lg text-purple-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium mb-1 text-purple-300">
            Universal Format
          </h3>
          <p className="text-xs text-gray-400">
            Standard .ics files compatible with all major calendar apps
          </p>
        </div>

        <div className="p-4">
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-2 rounded-full">
              <FaCheck className="text-lg text-green-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium mb-1 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Stay on Schedule
          </h3>
          <p className="text-xs text-gray-400">
            Receive reminders for every medication dose
          </p>
        </div>
      </div>
    </div>
  );
}
