import { motion } from "framer-motion";
import { FeatureDetail } from "./FeatureDetail";
import { FaCheckCircle } from "react-icons/fa";

/**
 * Component showcasing the key benefits of using Medicine Calendar
 */
export function WhyChooseUs() {
  // Feature data for the section
  const features = [
    {
      icon: <FaCheckCircle className="text-blue-400" />,
      title: "Built for Ease of Use",
      description:
        "Designed with simplicity in mind. No complicated setup or steep learning curve.",
      delay: 0.1,
    },
    {
      icon: <FaCheckCircle className="text-purple-400" />,
      title: "Privacy First",
      description:
        "Your health data stays on your device. We don't store or track your medication information.",
      delay: 0.2,
    },
    {
      icon: <FaCheckCircle className="text-green-400" />,
      title: "Calendar Integration",
      description:
        "Seamlessly export your medication schedule to popular calendar apps like Google Calendar, Apple Calendar, and Outlook.",
      delay: 0.3,
    },
    {
      icon: <FaCheckCircle className="text-blue-400" />,
      title: "Free to Use",
      description:
        "Medicine Calendar is completely free, with no hidden costs or premium features.",
      delay: 0.4,
    },
    {
      icon: <FaCheckCircle className="text-purple-400" />,
      title: "Works Everywhere",
      description:
        "Accessible on any device with a web browser. No app downloads required.",
      delay: 0.5,
    },
    {
      icon: <FaCheckCircle className="text-green-400" />,
      title: "Customizable Scheduling",
      description:
        "Set complex medication schedules with flexible frequency options and specific timing.",
      delay: 0.6,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto py-16 px-4 bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-lg shadow-xl border border-gray-800/40"
    >
      <h2 className="text-3xl font-bold mb-12 text-center">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Why Choose Medicine Calendar
        </span>
      </h2>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
        {features.map((feature, index) => (
          <FeatureDetail
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={feature.delay}
          />
        ))}
      </div>
    </motion.section>
  );
}
