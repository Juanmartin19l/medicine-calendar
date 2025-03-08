import { motion } from "framer-motion";
import { Feature } from "./Feature";
import { FaPills, FaBell, FaMobileAlt } from "react-icons/fa";

/**
 * Section component displaying key features of the application
 */
export function FeaturesSection() {
  // Feature data
  const features = [
    {
      icon: <FaPills className="text-blue-400" />,
      title: "Easy Tracking",
      description:
        "Add your medications with just a few clicks. Set frequencies, doses, and start/end dates.",
      delay: 0.1,
    },
    {
      icon: <FaBell className="text-purple-400" />,
      title: "Reminder System",
      description:
        "Export your schedule to your calendar and never forget to take your medication again.",
      delay: 0.3,
    },
    {
      icon: <FaMobileAlt className="text-blue-400" />,
      title: "Cross-Platform",
      description:
        "Works on any device with a browser. Access your medication schedule anywhere.",
      delay: 0.5,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto py-16 px-4 overflow-hidden"
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Key Features
        </span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Feature
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
