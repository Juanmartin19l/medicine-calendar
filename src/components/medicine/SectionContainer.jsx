import { motion } from "framer-motion";

/**
 * Container component for medicine page sections with consistent styling
 * @param {string} id - HTML ID for the section
 * @param {JSX.Element} icon - Icon component to display in the header
 * @param {string} title - Section title
 * @param {string} color - Color theme (blue, purple, green)
 * @param {React.ReactNode} children - Content of the section
 * @param {number} delay - Animation delay
 */
export function SectionContainer({
  id,
  icon,
  title,
  color,
  children,
  delay = 0,
}) {
  const bgColors = {
    blue: "bg-blue-500/20 border-blue-500/10",
    purple: "bg-purple-500/20 border-purple-500/10",
    green: "bg-green-500/20 border-green-500/10",
  };

  const textColors = {
    blue: "from-blue-400 to-blue-300",
    purple: "from-purple-400 to-purple-300",
    green: "from-green-400 to-green-300",
  };

  const iconColors = {
    blue: "text-blue-400",
    purple: "text-purple-400",
    green: "text-green-400",
  };

  const blurColors = {
    blue: "bg-blue-500/5",
    purple: "bg-purple-500/5",
    green: "bg-green-500/5",
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-lg p-6 shadow-xl overflow-hidden relative"
    >
      <div
        className={`absolute -top-16 -right-16 w-32 h-32 ${blurColors[color]} rounded-full blur-xl`}
      ></div>
      <div
        className={`absolute -bottom-16 -left-16 w-32 h-32 ${blurColors[color]} rounded-full blur-xl`}
      ></div>

      <div className="flex items-center mb-6 relative z-10">
        <div className={`${bgColors[color]} p-3 rounded-full mr-4`}>
          <div className={`${iconColors[color]} text-xl`}>{icon}</div>
        </div>
        <h2 className="text-2xl font-semibold">
          <span className={`${iconColors[color]}`}>{title}</span>
        </h2>
      </div>

      {children}
    </motion.div>
  );
}
