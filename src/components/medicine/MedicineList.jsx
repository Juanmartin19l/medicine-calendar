import { motion, AnimatePresence } from "framer-motion";
import { MedicineCard } from "./list/MedicineCard";
import { EmptyState } from "./list/EmptyState";
import { MedicineCounter } from "./list/MedicineCounter";

/**
 * Component for displaying a list of medications with options to delete
 * @param {Array} medicines - Array of medication objects to display
 * @param {Function} onDelete - Function to handle medication deletion
 */
export function MedicineList({ medicines, onDelete }) {
  return (
    <div className="flex flex-col h-[32rem]">
      {/* List content with consistent height */}
      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          {medicines.length === 0 ? (
            <EmptyState />
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
                  {medicines.map((medicine, index) => (
                    <MedicineCard
                      key={`med-${index}`}
                      medicine={medicine}
                      onDelete={onDelete}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Counter footer - only shown when there are medications */}
      <MedicineCounter count={medicines.length} />
    </div>
  );
}
