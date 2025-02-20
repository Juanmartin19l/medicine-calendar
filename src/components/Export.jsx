import { FaCalendarAlt } from "react-icons/fa";

export function Export({ medicines, exportToCalendar }) {
  const isDisabled = medicines.length === 0;

  return (
    <div className="mt-12 max-w-6xl mx-auto flex items-center justify-center">
      <button
        className={`px-6 py-2 rounded flex items-center gap-2 ${
          isDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#4caf50] hover:bg-[#45a049] cursor-pointer"
        }`}
        onClick={() => !isDisabled && exportToCalendar(medicines)}
        disabled={isDisabled}
      >
        <FaCalendarAlt /> Export to Calendar
      </button>
      <span className="text-sm ml-4">.ics file</span>
    </div>
  );
}
