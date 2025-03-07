import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400 pt-10 pb-6">
      <div className="container mx-auto px-4">
        {/* Upper Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Medicine Calendar
              </span>
            </h3>
            <p className="mb-4">
              Your personal medication management tool, designed to help you
              stay on top of your health regimen.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Juanmartin19l"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/juan-mart%C3%ADn-lavalle/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="mailto:lavallejuanmartin@gmail.com"
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/medicines"
                  className="hover:text-white transition-colors"
                >
                  Medicine Calendar
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <p className="mb-2">Have questions or feedback?</p>
            <a
              href="mailto:lavallejuanmartin@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 mb-4"
            >
              <FaEnvelope size={16} />
              <span>lavallejuanmartin@gmail.com</span>
            </a>
            <p className="text-sm">
              We value your input and are constantly working to improve Medicine
              Calendar.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Lower Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Medicine Calendar. All rights
            reserved.
          </p>
          <div className="flex items-center">
            <FaCode className="mr-2" />
            <p>Developed with ❤️ by Juan Martin Lavalle</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
