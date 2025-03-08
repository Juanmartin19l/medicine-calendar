import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import {
  FaCheckCircle,
  FaUserClock,
  FaUserNurse,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1e1e24] to-[#222222] text-white">
      {/* SEO Optimization con nuestro componente personalizado */}
      <SEO
        title="About Medicine Calendar - Our Mission and Features"
        description="Learn about Medicine Calendar, how it was created, and how it helps people manage their medication schedules effectively."
        keywords="medicine tracker, medication management, health app, medication reminder"
        ogTitle="About Medicine Calendar"
        ogDescription="Learn about Medicine Calendar, how it was created, and how it helps people manage their medication schedules."
        canonical="https://yourdomain.com/about"
      />

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

          {/* Timeline indicator - Nuevo elemento visual */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
          />
        </motion.section>

        {/* Our Story - Mejorado */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }} // Cambiado de whileInView a animate para que aparezca al cargar
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto py-16 px-4"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-2 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Story
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Columna izquierda con historia */}
            <div className="md:col-span-3">
              <motion.div
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-gradient-to-br from-[#2a2a2a] to-[#252525] p-8 rounded-lg shadow-lg border border-gray-800/30 h-full relative overflow-hidden"
              >
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>

                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-blue-400 first-letter:mr-2 first-letter:float-left text-gray-200 mb-4 relative z-10">
                  Medicine Calendar was born out of a personal need. After
                  seeing family members struggle to keep track of complex
                  medication schedules, we realized there had to be a better
                  way.
                </p>
                <p className="text-gray-300 mb-4 relative z-10">
                  Traditional pill boxes and paper reminders were prone to
                  mistakes and didn't adapt to changing schedules. Calendar apps
                  required too much manual input. We saw an opportunity to
                  create something that would bridge this gap.
                </p>
                <p className="text-gray-300 relative z-10">
                  Our goal was simple: create an intuitive tool that helps
                  people manage their medications with minimal effort, while
                  providing powerful calendar integration.
                </p>
              </motion.div>
            </div>

            {/* Columna derecha con cita */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-lg border border-blue-500/20 shadow-lg h-full flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-purple-500/10 rounded-full blur-xl"></div>

                <svg
                  className="w-12 h-12 text-blue-400/30 mb-4 relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-xl font-light text-gray-200 italic mb-6 leading-relaxed relative z-10">
                  The best health tools are the ones people actually use. We
                  designed Medicine Calendar to be simple enough that anyone can
                  use it, yet powerful enough to handle complex medication
                  regimens.
                </p>

                <div className="flex items-center mt-auto relative z-10">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                    <span className="text-blue-400 font-bold">MC</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-medium">
                      Medicine Calendar Team
                    </p>
                    <p className="text-gray-400 text-sm">Creators</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Why Choose Medicine Calendar - Rediseñado */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto py-16 px-4 bg-gradient-to-br from-[#2a2a2a] to-[#252525] rounded-lg shadow-xl border border-gray-800/40"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Why Choose Medicine Calendar
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            <FeatureDetail
              icon={<FaCheckCircle className="text-blue-400" />}
              title="Built for Ease of Use"
              description="Designed with simplicity in mind. No complicated setup or steep learning curve."
              delay={0.1}
            />
            <FeatureDetail
              icon={<FaCheckCircle className="text-purple-400" />}
              title="Privacy First"
              description="Your health data stays on your device. We don't store or track your medication information."
              delay={0.2}
            />
            <FeatureDetail
              icon={<FaCheckCircle className="text-green-400" />}
              title="Calendar Integration"
              description="Seamlessly export your medication schedule to popular calendar apps like Google Calendar, Apple Calendar, and Outlook."
              delay={0.3}
            />
            <FeatureDetail
              icon={<FaCheckCircle className="text-blue-400" />}
              title="Free to Use"
              description="Medicine Calendar is completely free, with no hidden costs or premium features."
              delay={0.4}
            />
            <FeatureDetail
              icon={<FaCheckCircle className="text-purple-400" />}
              title="Works Everywhere"
              description="Accessible on any device with a web browser. No app downloads required."
              delay={0.5}
            />
            <FeatureDetail
              icon={<FaCheckCircle className="text-green-400" />}
              title="Customizable Scheduling"
              description="Set complex medication schedules with flexible frequency options and specific timing."
              delay={0.6}
            />
          </div>
        </motion.section>

        {/* Use Cases - Actualizado con iconos y mejor diseño */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto py-16 px-4"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-3xl font-bold">
              Who Benefits from Medicine Calendar
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <UserCase
              icon={<FaUserClock />}
              color="blue"
              title="Individuals with Chronic Conditions"
              description="People managing ongoing health conditions often have complex medication regimens. Medicine Calendar helps organize multiple prescriptions across varying schedules."
              delay={0.1}
            />

            <UserCase
              icon={<FaUserNurse />}
              color="purple"
              title="Caregivers"
              description="Those caring for loved ones can keep track of medication schedules more efficiently, reducing stress and potential errors."
              delay={0.2}
            />

            <UserCase
              icon={<FaBriefcase />}
              color="green"
              title="Busy Professionals"
              description="When life gets hectic, it's easy to forget routine medications. Our calendar integration ensures you stay on track even with a packed schedule."
              delay={0.3}
            />

            <UserCase
              icon={<FaUserTie />}
              color="blue"
              title="Senior Citizens"
              description="With an interface designed for clarity and ease of use, older adults find Medicine Calendar a helpful tool for maintaining their health regimen."
              delay={0.4}
            />
          </div>
        </motion.section>

        {/* Call to Action - Mejorado */}
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
              today. No registration required - just add your medications and
              start tracking.
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
      </div>

      <Footer />
    </div>
  );
}

// Feature Detail component mejorado
function FeatureDetail({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-start gap-3 hover:bg-white/5 p-3 rounded-lg transition-colors"
    >
      <div className="shrink-0 text-xl mt-1">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}

// Nuevo componente para casos de uso
function UserCase({ icon, color, title, description, delay }) {
  const bgColor = {
    blue: "from-blue-500/10 to-blue-600/5",
    purple: "from-purple-500/10 to-purple-600/5",
    green: "from-green-500/10 to-green-600/5",
  };

  const borderColor = {
    blue: "border-blue-500/20",
    purple: "border-purple-500/20",
    green: "border-green-500/20",
  };

  const textColor = {
    blue: "text-blue-400",
    purple: "text-purple-400",
    green: "text-green-400",
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`bg-gradient-to-br from-[#2d2d2d] to-[#252525] rounded-lg p-6 border border-gray-800/40 shadow-md hover:shadow-lg transition-shadow duration-300`}
    >
      <div className={`flex items-center gap-3 mb-3`}>
        <div
          className={`p-3 rounded-full bg-gradient-to-br ${bgColor[color]} ${borderColor[color]} border`}
        >
          <div className={`text-xl ${textColor[color]}`}>{icon}</div>
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-300 pl-14">{description}</p>
    </motion.div>
  );
}
