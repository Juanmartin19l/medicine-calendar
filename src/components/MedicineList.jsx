import "./MedicineList.css";
import { FaTrashAlt, FaPills, FaClock, FaCalendarAlt } from "react-icons/fa";

export function MedicineList({ medicines, onDelete }) {
  return (
    <div className="medicine-list">
      <h2>Medicine List</h2>
      {medicines.length === 0 ? (
        <p>No medicines added.</p>
      ) : (
        <div className="medicine-grid">
          {medicines.map((med, index) => (
            <div key={index} className="medicine-item">
              <p>
                <FaPills /> <strong>Name:</strong> {med.name}
              </p>
              <p>
                <FaClock /> <strong>Interval:</strong> Every {med.interval}{" "}
                hours
              </p>
              <p>
                <FaCalendarAlt /> <strong>Duration:</strong> {med.duration} days
              </p>
              <button className="delete-button" onClick={() => onDelete(index)}>
                <FaTrashAlt /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
