import {
  FaTrashAlt,
  FaPills,
  FaClock,
  FaCalendarAlt,
  FaCalendarDay,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function MedicineList({ medicines, onDelete }) {
  const formatStartTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const calculateEndDate = (startTime, durationDays) => {
    const startDate = new Date(startTime);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(endDate);
  };

  return (
    <div className="flex flex-col h-[32rem]">
      {/* List content with consistent height */}
      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          {medicines.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center py-10 text-center bg-gradient-to-b from-[#2d2d2d]/50 to-[#323232]/50 rounded-lg h-full"
            >
              <div className="bg-gray-700/30 p-4 rounded-full mb-5">
                <FaPills className="text-4xl text-purple-400/80" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-300">
                No medications added yet
              </h3>
              <p className="text-sm max-w-xs text-gray-400 px-6">
                Add your first medication using the form to start tracking your
                medication schedule.
              </p>

              <motion.div
                className="mt-8 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md px-4 py-2 text-sm"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <FaPills />
                  <span>Get started with your first medication</span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full overflow-y-auto pr-1 custom-scrollbar"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#4a5568 #2d3748",
              }}
            >
              <div className="grid gap-4 pb-2">
                <AnimatePresence>
                  {medicines.map((med, index) => (
                    <motion.div
                      key={`med-${index}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        x: -10,
                        transition: { duration: 0.2 },
                      }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="bg-gradient-to-r from-[#2d2d2d] to-[#323232] p-5 rounded-lg border border-gray-700 shadow-md hover:border-purple-500/30 transition-colors duration-300"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="bg-blue-500/20 p-1.5 rounded">
                              <FaPills className="text-blue-400" />
                            </div>
                            <h3 className="font-semibold text-lg text-white">
                              {med.name}
                            </h3>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-300">
                              <div className="bg-purple-500/20 p-1.5 rounded">
                                <FaClock className="text-purple-400" />
                              </div>
                              <div>
                                <div className="text-xs text-gray-400">
                                  Interval
                                </div>
                                <div>
                                  {med.interval === 24 ? (
                                    <span>Once daily</span>
                                  ) : med.interval === 12 ? (
                                    <span>Twice daily</span>
                                  ) : (
                                    <span>Every {med.interval} hours</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-300">
                              <div className="bg-green-500/20 p-1.5 rounded">
                                <FaCalendarAlt className="text-green-400" />
                              </div>
                              <div>
                                <div className="text-xs text-gray-400">
                                  Duration
                                </div>
                                <div>
                                  {med.duration}{" "}
                                  {med.duration === 1 ? "day" : "days"}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-300">
                              <div className="bg-amber-500/20 p-1.5 rounded">
                                <FaCalendarDay className="text-amber-400" />
                              </div>
                              <div>
                                <div className="text-xs text-gray-400">
                                  Start
                                </div>
                                <div>{formatStartTime(med.startTime)}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-300">
                              <div className="bg-red-500/20 p-1.5 rounded">
                                <FaCalendarDay className="text-red-400" />
                              </div>
                              <div>
                                <div className="text-xs text-gray-400">End</div>
                                <div>
                                  {calculateEndDate(
                                    med.startTime,
                                    med.duration
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <motion.button
                          onClick={() => onDelete(index)}
                          className="bg-red-500/10 hover:bg-red-500/80 text-red-400 hover:text-white p-2 rounded-full transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Delete ${med.name}`}
                          title={`Delete ${med.name}`}
                        >
                          <FaTrashAlt />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Counter footer - solo se muestra cuando hay medicamentos */}
      {medicines.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-3 border-t border-gray-700/30 mt-3 h-[40px] flex items-center justify-center"
        >
          <div className="text-sm text-gray-400 text-center">
            <p>
              Total: {medicines.length}{" "}
              {medicines.length === 1 ? "medication" : "medications"}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
