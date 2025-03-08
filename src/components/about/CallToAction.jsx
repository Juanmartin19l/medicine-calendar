import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Component for call to action section at the bottom of the page
 */
export function CallToAction() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto text-center pb-20 px-4"
    >
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg shadow-lg p-10 border border-gray-800/30">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Ready to get started?
        </h2>
        <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">
          Experience the simplicity and effectiveness of Medicine Calendar
          today. No registration required - just add your medications and start
          tracking.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/medicines"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Try It Now
          </Link>
          <a
            href="mailto:lavallejuanmartin@gmail.com"
            className="px-8 py-3 bg-[#333] rounded-md font-medium hover:bg-[#444] transition-all duration-300 border border-gray-700"
          >
            Contact Us
          </a>
        </div>
      </div>
    </motion.section>
  );
}
