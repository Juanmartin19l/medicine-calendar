import { motion } from "framer-motion";

/**
 * Feature component for displaying key features with icon
 * @param {JSX.Element} icon - Icon component to display
 * @param {string} title - Feature title
 * @param {string} description - Feature description
 * @param {number} delay - Animation delay
 */
export function Feature({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] p-6 rounded-lg shadow-md border border-gray-800/40"
    >
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 w-16 h-16 flex items-center justify-center rounded-full mb-4 border border-gray-700/30">
        <div className="text-4xl">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-blue-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
