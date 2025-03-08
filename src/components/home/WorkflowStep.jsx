import { motion } from "framer-motion";

/**
 * Component for displaying workflow steps
 * @param {JSX.Element} icon - Icon component to display
 * @param {string} title - Step title
 * @param {string} description - Step description
 * @param {number} delay - Animation delay
 */
export function WorkflowStep({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 mb-4 border border-blue-500/30">
        <div className="text-3xl">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
