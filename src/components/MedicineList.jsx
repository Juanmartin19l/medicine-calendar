import { FaTrashAlt, FaPills, FaClock, FaCalendarAlt } from "react-icons/fa";

export function MedicineList({ medicines, onDelete }) {
  return (
    <div>
      <h2 className="text-2xl mb-4">Medicine List</h2>
      <div className="grid gap-4">
        {medicines.map((med, index) => (
          <div key={index} className="bg-[#444444] p-4 rounded">
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
    </div>
  );
}
