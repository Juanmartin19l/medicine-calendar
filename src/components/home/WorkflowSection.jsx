import { motion } from "framer-motion";
import { WorkflowStep } from "./WorkflowStep";
import { FaPills, FaCalendarAlt, FaFileExport } from "react-icons/fa";

/**
 * Section component explaining how the application works
 */
export function WorkflowSection() {
  // Workflow steps data
  const steps = [
    {
      icon: <FaPills className="text-blue-400" />,
      title: "Add Medications",
      description:
        "Enter your medication details including name, dose, and frequency.",
      delay: 0.1,
    },
    {
      icon: <FaCalendarAlt className="text-purple-400" />,
      title: "Set Schedule",
      description:
        "Choose when to start and how long you need to take your medication.",
      delay: 0.3,
    },
    {
      icon: <FaFileExport className="text-green-400" />,
      title: "Export Calendar",
      description:
        "Download your personalized calendar or export it directly to your device.",
      delay: 0.5,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto py-16 px-4 bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-lg shadow-xl border border-gray-800/50 overflow-hidden"
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          How It Works
        </span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <WorkflowStep
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            delay={step.delay}
          />
        ))}
      </div>
    </motion.section>
  );
}
