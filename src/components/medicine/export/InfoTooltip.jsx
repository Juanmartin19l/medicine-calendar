import { motion, AnimatePresence } from "framer-motion";
import { FaInfoCircle, FaApple, FaAndroid } from "react-icons/fa";
import { useState } from "react";

/**
 * Component displaying information tooltip for calendar export methods
 */
export function InfoTooltip() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        className="text-sm text-blue-400 flex items-center justify-center cursor-pointer hover:text-blue-300 transition-colors duration-200"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <FaInfoCircle className="mr-1" /> How does this work?
      </span>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute z-10 bg-gradient-to-b from-[#2a2a2a] to-[#252525] p-4 rounded-md shadow-lg w-72 sm:w-80 text-left mt-2 left-1/2 transform -translate-x-1/2 border border-gray-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-xs mb-2">
              <strong className="text-blue-400">Subscribe:</strong> Adds events
              to your online calendar (Google Calendar, Apple Calendar, etc.)
            </p>
            <p className="text-xs mb-3">
              <strong className="text-purple-400">Download:</strong> Saves an
              ICS file that you can import into any calendar app.
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
  );
}
