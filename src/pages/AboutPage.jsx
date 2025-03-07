import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Helmet } from "react-helmet";

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#222222] text-white">
      {/* SEO Optimization */}
      <Helmet>
        <title>About Medicine Calendar - Our Mission and Features</title>
        <meta
          name="description"
          content="Learn about Medicine Calendar, how it was created, and how it helps people manage their medication schedules effectively."
        />
        <meta
          name="keywords"
          content="medicine tracker, medication management, health app, medication reminder"
        />
        <meta property="og:title" content="About Medicine Calendar" />
        <meta
          property="og:description"
          content="Learn about Medicine Calendar, how it was created, and how it helps people manage their medication schedules."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourdomain.com/about" />
      </Helmet>

      <Header />

      <div className="flex-grow pt-24 px-4">
        {/* About Header */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto py-12 md:py-16"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                About Medicine Calendar
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Our mission is to help people never miss an important medication
              again.
            </p>
          </motion.div>
        </motion.section>

        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto py-16 px-4"
        >
          <h2 className="text-3xl font-bold mb-8">Our Story</h2>

          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              Medicine Calendar was born out of a personal need. After seeing
              family members struggle to keep track of complex medication
              schedules, we realized there had to be a better way.
            </p>
            <p>
              Traditional pill boxes and paper reminders were prone to mistakes
              and didn't adapt to changing schedules. Calendar apps required too
              much manual input. We saw an opportunity to create something that
              would bridge this gap.
            </p>
            <p>
              Our goal was simple: create an intuitive tool that helps people
              manage their medications with minimal effort, while providing
              powerful calendar integration.
            </p>
          </div>
        </motion.section>

        {/* Why Choose Medicine Calendar */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto py-16 px-4 bg-[#2a2a2a] rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Why Choose Medicine Calendar
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            <FeatureDetail
              title="Built for Ease of Use"
              description="Designed with simplicity in mind. No complicated setup or steep learning curve."
              delay={0.1}
            />
            <FeatureDetail
              title="Privacy First"
              description="Your health data stays on your device. We don't store or track your medication information."
              delay={0.2}
            />
            <FeatureDetail
              title="Calendar Integration"
              description="Seamlessly export your medication schedule to popular calendar apps like Google Calendar, Apple Calendar, and Outlook."
              delay={0.3}
            />
            <FeatureDetail
              title="Free to Use"
              description="Medicine Calendar is completely free, with no hidden costs or premium features."
              delay={0.4}
            />
            <FeatureDetail
              title="Works Everywhere"
              description="Accessible on any device with a web browser. No app downloads required."
              delay={0.5}
            />
            <FeatureDetail
              title="Customizable Scheduling"
              description="Set complex medication schedules with flexible frequency options and specific timing."
              delay={0.6}
            />
          </div>
        </motion.section>

        {/* Use Cases */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto py-16 px-4"
        >
          <h2 className="text-3xl font-bold mb-8">
            Who Benefits from Medicine Calendar
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="bg-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                Individuals with Chronic Conditions
              </h3>
              <p className="text-gray-300">
                People managing ongoing health conditions often have complex
                medication regimens. Medicine Calendar helps organize multiple
                prescriptions across varying schedules.
              </p>
            </div>

            <div className="bg-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Caregivers</h3>
              <p className="text-gray-300">
                Those caring for loved ones can keep track of medication
                schedules more efficiently, reducing stress and potential
                errors.
              </p>
            </div>

            <div className="bg-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Busy Professionals</h3>
              <p className="text-gray-300">
                When life gets hectic, it's easy to forget routine medications.
                Our calendar integration ensures you stay on track even with a
                packed schedule.
              </p>
            </div>

            <div className="bg-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Senior Citizens</h3>
              <p className="text-gray-300">
                With an interface designed for clarity and ease of use, older
                adults find Medicine Calendar a helpful tool for maintaining
                their health regimen.
              </p>
            </div>
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
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-gray-300 mb-10 text-lg">
            Experience the simplicity and effectiveness of Medicine Calendar
            today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/medicines"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Try It Now
            </Link>
            <a
              href="mailto:lavallejuanmartin@gmail.com"
              className="px-8 py-3 bg-[#333] rounded-md font-medium hover:bg-[#444] transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}

// Feature Detail component
function FeatureDetail({ title, description, delay }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-2">
        <span className="text-blue-400">✓</span> {title}
      </h3>
      <p className="text-gray-300 pl-6">{description}</p>
    </motion.div>
  );
}
