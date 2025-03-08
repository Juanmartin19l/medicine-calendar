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
  FaSearch,
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#1a1a1a] backdrop-blur-sm shadow-lg shadow-blue-900/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo without hover animation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-11 h-11 rounded-xl flex items-center justify-center border border-blue-500/30 shadow-md shadow-purple-500/10"
              >
                <FaPills className="text-2xl text-blue-400" />
              </motion.div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Medicine Calendar
                </span>
                <div className="text-xs text-gray-400 -mt-1 ml-0.5">
                  Track your health easily
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/" active={location.pathname === "/"}>
              <FaHome className="mr-2 text-blue-400" />
              Home
            </NavLink>
            <NavLink
              to="/medicines"
              active={location.pathname === "/medicines"}
            >
              <FaCalendarAlt className="mr-2 text-purple-400" />
              Calendar
            </NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>
              <FaInfoCircle className="mr-2 text-green-400" />
              About
            </NavLink>

            {/* Try it button */}
            <div className="ml-3">
              <Link to="/medicines">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(91, 33, 182, 0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium py-2.5 px-5 rounded-full shadow-lg shadow-purple-900/20 transition-all duration-300 overflow-hidden group"
                >
                  <span className="relative z-10">Try it Now</span>
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </motion.button>
              </Link>
            </div>
          </nav>

          {/* Mobile menu button with improved animation */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-full ${
              isMobileMenuOpen
                ? "bg-[#1a1a1a] text-white"
                : "bg-[#232323] text-gray-400"
            } hover:text-white focus:outline-none`}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: isMobileMenuOpen ? -90 : 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: isMobileMenuOpen ? 90 : -90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={18} />
                ) : (
                  <FaBars size={18} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation with improved design */}
      <AnimatePresence mode="wait" initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#151515] border-t border-gray-800/40 shadow-lg shadow-blue-900/5 overflow-hidden"
          >
            <div className="px-3 pt-3 pb-4 space-y-1.5">
              <MobileNavLink to="/" active={location.pathname === "/"}>
                <FaHome className="mr-3 text-blue-400" /> Home
              </MobileNavLink>
              <MobileNavLink
                to="/medicines"
                active={location.pathname === "/medicines"}
              >
                <FaCalendarAlt className="mr-3 text-purple-400" /> Calendar
              </MobileNavLink>
              <MobileNavLink
                to="/about"
                active={location.pathname === "/about"}
              >
                <FaInfoCircle className="mr-3 text-green-400" /> About
              </MobileNavLink>

              {/* Try it button for mobile */}
              <div className="pt-3 mt-2 border-t border-gray-800/40">
                <Link
                  to="/medicines"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-purple-900/10"
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
      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
        active
          ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/20 shadow-sm shadow-purple-500/10"
          : "text-gray-300 hover:bg-[#232323] hover:text-white"
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
      className={`flex items-center px-3 py-3 rounded-lg text-base font-medium ${
        active
          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/20"
          : "text-gray-300 hover:bg-[#232323] hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
