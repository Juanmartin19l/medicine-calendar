import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6 mt-12">
      <div className="container mx-auto text-center">
        <p className="mb-2">By Juan Martin Lavalle</p>
        <p className="mb-2">© 2025 Medicine Calendar. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/Juanmartin19l"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/juan-mart%C3%ADn-lavalle/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="mailto:lavallejuanmartin@gmail.com"
            className="hover:text-white flex items-center gap-2"
          >
            <FaEnvelope size={24} />
            <span>lavallejuanmartin@gmail.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
