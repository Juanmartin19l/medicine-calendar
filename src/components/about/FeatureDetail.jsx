import { motion } from "framer-motion";

/**
 * Component for displaying features with icon and description
 * @param {JSX.Element} icon - Icon component to display
 * @param {string} title - Feature title
 * @param {string} description - Feature description
 * @param {number} delay - Animation delay
 */
export function FeatureDetail({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-start gap-3 hover:bg-white/5 p-3 rounded-lg transition-colors"
    >
      <div className="shrink-0 text-xl mt-1">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}
