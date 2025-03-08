import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaPills,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#1a1a1a] to-[#161616] text-gray-400 pt-12 pb-6 border-t border-gray-800/40">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center border border-blue-500/20">
              <FaPills className="text-2xl text-blue-400" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Medicine Calendar
            </span>
          </div>
        </div>

        {/* Upper Footer with Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About Column */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[#1d1d1d] p-6 rounded-lg border border-gray-800/30 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <div className="bg-blue-500/20 p-2 rounded-full">
                <FaPills className="text-blue-400" />
              </div>
              <span className="text-white">About Us</span>
            </h3>
            <p className="mb-4 text-gray-300">
              Your personal medication management tool, designed to help you
              stay on top of your health regimen with ease and precision.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Juanmartin19l"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/juan-mart%C3%ADn-lavalle/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-blue-700 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="mailto:lavallejuanmartin@gmail.com"
                className="p-2 rounded-full bg-gray-800 hover:bg-green-700 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[#1d1d1d] p-6 rounded-lg border border-gray-800/30 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <div className="bg-purple-500/20 p-2 rounded-full">
                <FaCalendarAlt className="text-purple-400" />
              </div>
              <span className="text-white">Quick Links</span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 hover:text-blue-400 transition-all duration-200 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:w-2.5 transition-all duration-200"></div>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/medicines"
                  className="flex items-center gap-2 hover:text-purple-400 transition-all duration-200 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:w-2.5 transition-all duration-200"></div>
                  <span>Medicine Calendar</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center gap-2 hover:text-green-400 transition-all duration-200 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:w-2.5 transition-all duration-200"></div>
                  <span>About Us</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[#1d1d1d] p-6 rounded-lg border border-gray-800/30 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <div className="bg-green-500/20 p-2 rounded-full">
                <FaInfoCircle className="text-green-400" />
              </div>
              <span className="text-white">Contact</span>
            </h3>
            <p className="mb-3 text-gray-300">Have questions or feedback?</p>
            <a
              href="mailto:lavallejuanmartin@gmail.com"
              className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-4 py-2 rounded-md transition-colors duration-200 border border-blue-500/20 mb-4"
            >
              <FaEnvelope size={16} />
              <span>lavallejuanmartin@gmail.com</span>
            </a>
            <p className="text-sm text-gray-400 italic">
              We value your input and are constantly working to improve Medicine
              Calendar to better serve your health needs.
            </p>
          </motion.div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"></div>

        {/* Lower Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0 text-sm text-gray-500">
            &copy; {currentYear} Medicine Calendar. All rights reserved.
          </p>
          <div className="flex items-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 px-4 py-2 rounded-full border border-blue-800/20">
            <FaCode className="mr-2 text-purple-400" />
            <p className="text-sm">Developed with ❤️ by Juan Martin Lavalle</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
