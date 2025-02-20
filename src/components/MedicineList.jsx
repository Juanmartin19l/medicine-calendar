import { FaTrashAlt, FaPills, FaClock, FaCalendarAlt } from "react-icons/fa";
import { animate, stagger } from "motion";

export function MedicineList({ medicines, onDelete }) {
  return (
    <div>
      <h2 className="text-2xl mb-4 text-center">Medicine List</h2>
      {medicines.length === 0 ? (
        <div className="text-center text-gray-500">
          No medications added yet. Please add some medications to see them
          listed here.
        </div>
      ) : (
        <div
          className={`grid gap-4 ${
            medicines.length > 3 ? "max-h-96 overflow-y-auto" : ""
          }`}
          style={{ scrollbarGutter: "stable" }}
        >
          {medicines.map((med, index) => (
            <div
              key={index}
              className="bg-[#444444] p-4 rounded"
              ref={(el) => {
                if (el) {
                  animate(
                    el,
                    {
                      opacity: [0, 1],
                      transform: ["translateY(20px)", "translateY(0)"],
                    },
                    { duration: 0.3, delay: stagger(0.1)[index] }
                  );
                }
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <FaPills />
                    <span className="font-semibold">Name: {med.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <FaClock />
                    <span>Interval: {med.interval} hours</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <FaCalendarAlt />
                    <span>Duration: {med.duration} days</span>
                  </div>
                </div>
                <button
                  onClick={() => onDelete(index)}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
