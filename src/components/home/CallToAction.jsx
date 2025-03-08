import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Call to action component for the home page
 */
export function CallToAction() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center py-20"
    >
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Ready to take control of your medication schedule?
      </h2>
      <p className="text-gray-300 mb-10 text-lg">
        Join thousands who use Medicine Calendar to maintain their health
        regimen. No registration required - start using it right away.
      </p>
      <Link
        to="/medicines"
        className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 inline-block shadow-lg shadow-purple-500/20 transform hover:scale-105"
      >
        Try It Now - It's Free
      </Link>
    </motion.section>
  );
}
