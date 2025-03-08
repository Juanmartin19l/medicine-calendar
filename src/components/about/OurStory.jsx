import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

/**
 * Component displaying the company's story and mission
 */
export function OurStory() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="max-w-5xl mx-auto py-16 px-4"
    >
      <SectionTitle title="Our Story" useGradient={true} />

      <div className="grid md:grid-cols-5 gap-8">
        {/* Left column with story */}
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
              Medicine Calendar was born out of a personal need. After seeing
              family members struggle to keep track of complex medication
              schedules, we realized there had to be a better way.
            </p>
            <p className="text-gray-300 mb-4 relative z-10">
              Traditional pill boxes and paper reminders were prone to mistakes
              and didn't adapt to changing schedules. Calendar apps required too
              much manual input. We saw an opportunity to create something that
              would bridge this gap.
            </p>
            <p className="text-gray-300 relative z-10">
              Our goal was simple: create an intuitive tool that helps people
              manage their medications with minimal effort, while providing
              powerful calendar integration.
            </p>
          </motion.div>
        </div>

        {/* Right column with quote */}
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
              designed Medicine Calendar to be simple enough that anyone can use
              it, yet powerful enough to handle complex medication regimens.
            </p>

            <div className="flex items-center mt-auto relative z-10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                <span className="text-blue-400 font-bold">MC</span>
              </div>
              <div className="ml-4">
                <p className="text-white font-medium">Medicine Calendar Team</p>
                <p className="text-gray-400 text-sm">Creators</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
