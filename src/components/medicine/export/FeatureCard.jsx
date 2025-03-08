import { motion } from "framer-motion";

/**
 * Feature card component displaying a benefit of calendar export
 * @param {JSX.Element} icon - Icon to display
 * @param {string} title - Feature title
 * @param {string} description - Feature description
 * @param {string} color - Color theme (blue, purple, green)
 */
export function FeatureCard({ icon, title, description, color }) {
  const getBgColor = () => {
    switch (color) {
      case "blue":
        return "border-blue-500/10";
      case "purple":
        return "border-purple-500/10";
      case "green":
        return "border-green-500/10";
      default:
        return "border-gray-700";
    }
  };

  const getIconBgColor = () => {
    switch (color) {
      case "blue":
        return "bg-blue-500/20";
      case "purple":
        return "bg-purple-500/20";
      case "green":
        return "bg-green-500/20";
      default:
        return "bg-gray-700";
    }
  };

  const getTitleColor = () => {
    switch (color) {
      case "blue":
        return "text-blue-300";
      case "purple":
        return "text-purple-300";
      case "green":
        return "text-green-300";
      default:
        return "text-white";
    }
  };

  const getIconColor = () => {
    switch (color) {
      case "blue":
        return "text-blue-400";
      case "purple":
        return "text-purple-400";
      case "green":
        return "text-green-400";
      default:
        return "text-white";
    }
  };

  return (
    <motion.div
      className={`bg-[#1d1d1d]/60 p-5 rounded-lg border ${getBgColor()} flex flex-col items-center text-center`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`${getIconBgColor()} p-3 rounded-full mb-3`}>
        <div className={`text-xl ${getIconColor()}`}>{icon}</div>
      </div>
      <h3 className={`text-sm font-medium mb-2 ${getTitleColor()}`}>{title}</h3>
      <p className="text-xs text-gray-400">{description}</p>
    </motion.div>
  );
}
