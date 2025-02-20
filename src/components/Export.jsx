import { FaCalendarAlt } from "react-icons/fa";

export function Export({ medicines, exportToCalendar }) {
  return (
    <div className="mt-12 max-w-6xl mx-auto flex items-center justify-center">
      <button
        className="bg-[#4caf50] hover:bg-[#45a049] px-6 py-2 rounded flex items-center gap-2 cursor-pointer"
        onClick={() => exportToCalendar(medicines)}
      >
        <FaCalendarAlt /> Export to Calendar
      </button>
      <span className="text-sm ml-4">.ics file</span>
    </div>
  );
}
