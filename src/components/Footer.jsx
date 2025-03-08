import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPills,
  FaHeart,
  FaInstagram,
  FaCode,
} from "react-icons/fa";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    { icon: <FaEnvelope />, text: "lavallejuanmartin@gmail.com" },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/Juanmartin19l",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/in/juan-martín-lavalle/",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/juan_martinlavalle/",
      label: "Instagram",
    },
  ];

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-[#111111] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/30 via-purple-500/40 to-blue-400/30"></div>
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>

      {/* Main footer content */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-2">
          {/* Brand column */}
          <motion.div
            className="col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeInUpVariant}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-10 h-10 rounded-lg flex items-center justify-center border border-blue-500/20">
                <FaPills className="text-xl text-blue-400" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Medicine Calendar
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              A personal project to help track medication schedules and never
              miss a dose.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex items-center justify-center w-9 h-9 rounded-full bg-[#232323] hover:bg-gradient-to-br from-blue-500 to-purple-500 transition-all duration-300 border border-gray-700/30"
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            className="col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeInUpVariant}
          >
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-3">
              <div className="h-5 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
              Quick Links
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

          {/* Contact column */}
          <motion.div
            className="col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeInUpVariant}
          >
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-3">
              <div className="h-5 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
              Contact
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, idx) => (
                <li key={idx} className="flex items-center text-gray-400">
                  <span className="mr-3 text-purple-400">{info.icon}</span>
                  {info.text}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="mailto:lavallejuanmartin@gmail.com"
                className="px-5 py-2.5 rounded-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-gray-200 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 inline-flex items-center"
              >
                <FaEnvelope className="mr-2" /> Contact Me
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"></div>

        {/* Lower Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0 text-sm text-gray-500">
            &copy; {currentYear} Medicine Calendar. All rights reserved.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 hover:from-blue-600/30 hover:to-purple-600/30 px-4 py-2 rounded-full border border-blue-800/20 hover:border-blue-600/40 cursor-default group"
          >
            <FaCode className="mr-2 text-purple-400 group-hover:text-purple-300" />
            <p className="text-sm">
              Developed with{" "}
              <FaHeart className="inline mx-1 text-red-500 group-hover:text-red-400 animate-pulse" />{" "}
              by Juan Martin Lavalle
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
