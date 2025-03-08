import { motion } from "framer-motion";

/**
 * Component for displaying user case studies
 * @param {JSX.Element} icon - Icon component to display
 * @param {string} color - Color theme (blue, purple, green)
 * @param {string} title - Case study title
 * @param {string} description - Case study description
 * @param {number} delay - Animation delay
 */
export function UserCase({ icon, color, title, description, delay }) {
  const bgColor = {
    blue: "from-blue-500/10 to-blue-600/5",
    purple: "from-purple-500/10 to-purple-600/5",
    green: "from-green-500/10 to-green-600/5",
  };

  const borderColor = {
    blue: "border-blue-500/20",
    purple: "border-purple-500/20",
    green: "border-green-500/20",
  };

  const textColor = {
    blue: "text-blue-400",
    purple: "text-purple-400",
    green: "text-green-400",
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-gradient-to-br from-[#2d2d2d] to-[#252525] rounded-lg p-6 border border-gray-800/40 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`p-3 rounded-full bg-gradient-to-br ${bgColor[color]} ${borderColor[color]} border`}
        >
          <div className={`text-xl ${textColor[color]}`}>{icon}</div>
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-300 pl-14">{description}</p>
    </motion.div>
  );
}
