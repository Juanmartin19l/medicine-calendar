import { createEvents } from "ics";

export function exportToCalendar(medicines) {
  const events = medicines.flatMap((med) => {
    const startDate = new Date();
    const [startHour, startMinute] = med.startTime.split(":").map(Number);

    // Establecer la hora de inicio
    startDate.setHours(startHour, startMinute, 0, 0);

    const eventsForMed = [];
    for (let day = 0; day < med.duration; day++) {
      let currentTime = new Date(startDate);
      currentTime.setDate(startDate.getDate() + day);

      // Calcular eventos para el día actual
      while (currentTime.getDate() === startDate.getDate() + day) {
        eventsForMed.push({
          start: [
            currentTime.getFullYear(),
            currentTime.getMonth() + 1,
            currentTime.getDate(),
            currentTime.getHours(),
            currentTime.getMinutes(),
          ],
          end: [
            currentTime.getFullYear(),
            currentTime.getMonth() + 1,
            currentTime.getDate(),
            currentTime.getHours() + 1, // Duración de 1 hora
            currentTime.getMinutes(),
          ],
          title: `Tomar ${med.name}`,
          description: `Tomar cada ${med.interval} horas durante ${med.duration} días.`,
        });

        // Avanzar al siguiente intervalo
        currentTime.setHours(currentTime.getHours() + med.interval);
      }
    }

    return eventsForMed;
  });

  createEvents(events, (error, value) => {
    if (error) {
      console.error("Error al generar el archivo .ics:", error);
      return;
    }

    // Crear un archivo .ics y descargarlo
    const blob = new Blob([value], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "medicamentos.ics";
    link.click();
    URL.revokeObjectURL(url); // Liberar memoria
  });
}
