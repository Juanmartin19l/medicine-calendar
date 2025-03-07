import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Helmet } from "react-helmet";

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#222222] text-white">
      {/* SEO Optimization */}
      <Helmet>
        <title>Medicine Calendar - Track Your Medication Schedule</title>
        <meta
          name="description"
          content="Never miss a dose again. Medicine Calendar helps you track your medication schedule, set reminders, and export to your calendar app."
        />
        <meta
          name="keywords"
          content="medicine tracker, medication schedule, medical calendar, health reminder"
        />
        <meta
          property="og:title"
          content="Medicine Calendar - Track Your Medication Schedule"
        />
        <meta
          property="og:description"
          content="Never miss a dose again. Medicine Calendar helps you track your medication schedule easily."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>

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
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 bg-[#333] rounded-md font-medium hover:bg-[#444] transition-all duration-300"
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
              icon="📝"
              title="Easy Tracking"
              description="Add your medications with just a few clicks. Set frequencies, doses, and start/end dates."
              delay={0.1}
            />
            <Feature
              icon="🔔"
              title="Reminder System"
              description="Export your schedule to your calendar and never forget to take your medication again."
              delay={0.3}
            />
            <Feature
              icon="📱"
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
          className="max-w-7xl mx-auto py-16 px-4 bg-[#2a2a2a] rounded-lg"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Step
              number="1"
              title="Add Medications"
              description="Enter your medication details including name, dose, and frequency."
              delay={0.1}
            />
            <Step
              number="2"
              title="Set Schedule"
              description="Choose when to start and how long you need to take your medication."
              delay={0.3}
            />
            <Step
              number="3"
              title="Export Calendar"
              description="Download your personalized calendar or export it directly to your device."
              delay={0.5}
            />
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
          <h2 className="text-3xl font-bold mb-6">
            Ready to take control of your medication schedule?
          </h2>
          <p className="text-gray-300 mb-10 text-lg">
            Join thousands who use Medicine Calendar to maintain their health
            regimen.
          </p>
          <Link
            to="/medicines"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 inline-block"
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
      className="bg-[#2a2a2a] p-6 rounded-lg"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

// Step component
function Step({ number, title, description, delay }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
