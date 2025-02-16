export function MedicineList({ medicines, onDelete }) {
  return (
    <div className="medicine-list">
      <h2>Lista de Medicamentos</h2>
      {medicines.length === 0 ? (
        <p>No hay medicamentos agregados.</p>
      ) : (
        medicines.map((med, index) => (
          <div key={index} className="medicine-item">
            <p>
              <strong>Nombre:</strong> {med.name}
            </p>
            <p>
              <strong>Intervalo:</strong> Cada {med.interval} horas
            </p>
            <p>
              <strong>Duración:</strong> {med.duration} días
            </p>
            <button onClick={() => onDelete(index)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}
