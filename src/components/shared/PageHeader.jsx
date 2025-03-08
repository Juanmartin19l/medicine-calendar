import { motion } from "framer-motion";

/**
 * Reusable page header component with animated title and subtitle
 * @param {string} title - Main title text
 * @param {string} subtitle - Subtitle or description text
 */
export function PageHeader({ title, subtitle }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto py-12 md:py-16"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          {subtitle}
        </p>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
      />
    </motion.section>
  );
}
