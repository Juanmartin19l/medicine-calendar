import { motion } from "framer-motion";
import { BenefitItem } from "./BenefitItem";
import { FaCalendarCheck, FaPills } from "react-icons/fa";

/**
 * Section component highlighting benefits of the application
 */
export function BenefitsSection() {
  // Benefits data
  const benefits = [
    {
      title: "Privacy First",
      description:
        "Your health data stays on your device - we don't store it on our servers.",
    },
    {
      title: "Works Offline",
      description:
        "Once loaded, no internet connection required to manage your medications.",
    },
    {
      title: "Simple & Intuitive",
      description:
        "Designed to be easy for everyone to use, regardless of technical skill.",
    },
    {
      title: "Free to Use",
      description:
        "No hidden fees or premium features - everything is available to everyone.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto py-16 px-4"
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Why Choose Medicine Calendar
        </span>
      </h2>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] p-6 rounded-lg border border-gray-800/50 shadow-lg"
        >
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <div className="bg-[#2a2a2a] rounded-lg p-6 m-4 w-full max-w-md border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-500/20 p-2 rounded-full mr-2">
                    <FaPills className="text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium">Medication Tracker</h3>
                </div>
                <FaCalendarCheck className="text-green-500" />
              </div>

              <div className="space-y-3">
                <div className="bg-[#333] p-3 rounded border border-gray-700 flex justify-between">
                  <span>Antibiotic</span>
                  <span className="text-blue-400">Every 8 hours</span>
                </div>
                <div className="bg-[#333] p-3 rounded border border-gray-700 flex justify-between">
                  <span>Painkiller</span>
                  <span className="text-purple-400">Every 12 hours</span>
                </div>
                <div className="bg-[#333] p-3 rounded border border-gray-700 flex justify-between">
                  <span>Vitamin D</span>
                  <span className="text-green-400">Once daily</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
