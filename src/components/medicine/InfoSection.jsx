import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";

/**
 * Information section explaining how to use Medicine Calendar
 */
export function InfoSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-800/20"
    >
      <div className="flex items-center mb-4">
        <div className="bg-blue-500/20 p-2 rounded-full mr-3">
          <FaInfoCircle className="text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">How It Works</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StepCard
          number={1}
          color="blue"
          title="Add Your Medications"
          description="Enter the name of your medication, the dosage, frequency, and period. You can add notes for specific instructions."
        />

        <StepCard
          number={2}
          color="purple"
          title="Review Your Medications"
          description="Check your list of medications. You can delete any entry that's no longer needed or add more medications to your schedule."
        />

        <StepCard
          number={3}
          color="green"
          title="Export to Calendar"
          description="Export your medication schedule to your preferred calendar app (iCal, Google, etc.) to receive reminders and keep track of your regimen."
        />
      </div>

      <p className="text-gray-400 text-sm mt-6 text-center">
        Your medication data is stored locally on your device. We don't have
        access to your health information.
      </p>
    </motion.div>
  );
}

/**
 * Card displaying a single step in the process
 * @param {number} number - Step number
 * @param {string} color - Color theme (blue, purple, green)
 * @param {string} title - Step title
 * @param {string} description - Step description
 */
function StepCard({ number, color, title, description }) {
  const textColors = {
    blue: "text-blue-300",
    purple: "text-purple-300",
    green: "text-green-300",
  };

  return (
    <div className="bg-[#1d1d1d]/60 p-4 rounded-lg border border-gray-800/30">
      <h4 className={`font-medium ${textColors[color]} mb-2`}>
        Step {number}: {title}
      </h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
