import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPills,
  FaTimes,
  FaBars,
  FaCalendarAlt,
  FaInfoCircle,
  FaHome,
} from "react-icons/fa";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detect scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-[#1a1a1a]/95 to-[#212121]/95 backdrop-blur-sm shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-10 h-10 rounded-lg flex items-center justify-center border border-blue-500/20">
                <FaPills className="text-xl text-blue-400" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Medicine Calendar
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" active={location.pathname === "/"}>
              <FaHome className="mr-1" />
              Home
            </NavLink>
            <NavLink
              to="/medicines"
              active={location.pathname === "/medicines"}
            >
              <FaCalendarAlt className="mr-1" />
              Calendar
            </NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>
              <FaInfoCircle className="mr-1" />
              About
            </NavLink>

            {/* Try it button */}
            <div className="ml-6">
              <Link to="/medicines">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium py-2 px-4 rounded-md shadow-md shadow-blue-500/20 transition-all duration-300"
                >
                  Try it Now
                </motion.button>
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-gradient-to-b from-[#1a1a1a] to-[#222] border-t border-gray-700/40"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink to="/" active={location.pathname === "/"}>
                <FaHome className="mr-3" /> Home
              </MobileNavLink>
              <MobileNavLink
                to="/medicines"
                active={location.pathname === "/medicines"}
              >
                <FaCalendarAlt className="mr-3" /> Calendar
              </MobileNavLink>
              <MobileNavLink
                to="/about"
                active={location.pathname === "/about"}
              >
                <FaInfoCircle className="mr-3" /> About
              </MobileNavLink>

              {/* Try it button for mobile */}
              <div className="pt-3 mt-3 border-t border-gray-700/30">
                <Link
                  to="/medicines"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-md"
                >
                  Try it Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        active
          ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/20"
          : "text-gray-300 hover:bg-[#333]/40 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
        active
          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/20"
          : "text-gray-300 hover:bg-[#333]/40 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
