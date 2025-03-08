import { motion } from "framer-motion";

/**
 * Component for section titles with a vertical accent bar
 * @param {string} title - Title text
 * @param {boolean} useGradient - Whether to apply gradient styling to title
 */
export function SectionTitle({ title, useGradient = false }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="h-10 w-2 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
      <h2
        className={`text-3xl font-bold ${
          useGradient
            ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            : ""
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
