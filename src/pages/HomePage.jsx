import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO"; // Nuestro nuevo componente
import {
  FaCalendarCheck,
  FaBell,
  FaMobileAlt,
  FaPills,
  FaCalendarAlt,
  FaFileExport,
} from "react-icons/fa";

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1e1e24] to-[#222222] text-white">
      {/* SEO Optimization with our custom component */}
      <SEO
        title="Medicine Calendar - Track Your Medication Schedule"
        description="Never miss a dose again. Medicine Calendar helps you track your medication schedule, set reminders, and export to your calendar app."
        keywords="medicine tracker, medication schedule, medical calendar, health reminder"
        ogTitle="Medicine Calendar - Track Your Medication Schedule"
        ogDescription="Never miss a dose again. Medicine Calendar helps you track your medication schedule easily."
        canonical="https://yourdomain.com/"
      />

      <Header />

      <div className="flex-grow pt-24 px-4">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto py-12 md:py-20 text-center"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Never Miss a Dose Again
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Track, schedule, and export your medication calendar with ease.
            Medicine Calendar helps you stay on top of your health regimen.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/medicines"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 bg-[#333] rounded-md font-medium hover:bg-[#444] transition-all duration-300 border border-gray-700"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto py-16 px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Key Features
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<FaPills className="text-blue-400" />}
              title="Easy Tracking"
              description="Add your medications with just a few clicks. Set frequencies, doses, and start/end dates."
              delay={0.1}
            />
            <Feature
              icon={<FaBell className="text-purple-400" />}
              title="Reminder System"
              description="Export your schedule to your calendar and never forget to take your medication again."
              delay={0.3}
            />
            <Feature
              icon={<FaMobileAlt className="text-blue-400" />}
              title="Cross-Platform"
              description="Works on any device with a browser. Access your medication schedule anywhere."
              delay={0.5}
            />
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto py-16 px-4 bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-lg shadow-xl border border-gray-800/50"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <WorkflowStep
              icon={<FaPills className="text-blue-400" />}
              title="Add Medications"
              description="Enter your medication details including name, dose, and frequency."
              delay={0.1}
            />
            <WorkflowStep
              icon={<FaCalendarAlt className="text-purple-400" />}
              title="Set Schedule"
              description="Choose when to start and how long you need to take your medication."
              delay={0.3}
            />
            <WorkflowStep
              icon={<FaFileExport className="text-blue-400" />}
              title="Export Calendar"
              description="Download your personalized calendar or export it directly to your device."
              delay={0.5}
            />
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto py-16 px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Why Choose Medicine Calendar
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] p-6 rounded-lg border border-gray-800/50 shadow-lg"
            >
              <div className="space-y-4">
                <BenefitItem
                  title="Privacy First"
                  description="Your health data stays on your device - we don't store it on our servers."
                />
                <BenefitItem
                  title="Works Offline"
                  description="Once loaded, no internet connection required to manage your medications."
                />
                <BenefitItem
                  title="Simple & Intuitive"
                  description="Designed to be easy for everyone to use, regardless of technical skill."
                />
                <BenefitItem
                  title="Free to Use"
                  description="No hidden fees or premium features - everything is available to everyone."
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="bg-[#2a2a2a] rounded-lg p-6 m-4 w-full max-w-md border border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-500/20 p-2 rounded-full mr-2">
                        <FaPills className="text-blue-400" />
                      </div>
                      <h3 className="text-lg font-medium">
                        Medication Tracker
                      </h3>
                    </div>
                    <FaCalendarCheck className="text-green-500" />
                  </div>

                  <div className="space-y-3">
                    <div className="bg-[#333] p-3 rounded border border-gray-700 flex justify-between">
                      <span>Antibiotic</span>
                      <span className="text-blue-400">Every 8 hours</span>
                    </div>
                    <div className="bg-[#333] p-3 rounded border border-gray-700 flex justify-between">
                      <span>Painkiller</span>
                      <span className="text-purple-400">Every 12 hours</span>
                    </div>
                    <div className="bg-[#333] p-3 rounded border border-gray-700 flex justify-between">
                      <span>Vitamin D</span>
                      <span className="text-green-400">Once daily</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
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
      </div>

      <Footer />
    </div>
  );
}

// Feature component
function Feature({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] p-6 rounded-lg shadow-md border border-gray-800/40"
    >
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 w-16 h-16 flex items-center justify-center rounded-full mb-4 border border-gray-700/30">
        <div className="text-4xl">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-blue-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

// WorkflowStep component - Reemplaza a Step, sin números
function WorkflowStep({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 mb-4 border border-blue-500/30">
        <div className="text-3xl">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

// Benefit Item component
function BenefitItem({ title, description }) {
  return (
    <div className="flex gap-3">
      <div className="shrink-0 mt-1">
        <svg
          className="w-5 h-5 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <div>
        <h4 className="font-medium text-blue-300">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}
