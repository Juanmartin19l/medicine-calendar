import { createEvents } from "ics";
import { uploadFile } from "./fileUploader";

export async function exportToCalendar(medicines) {
  const events = medicines.flatMap((med) => {
    const startDate = new Date(med.startTime);

    const eventsForMed = [];
    const endDate = new Date(
      startDate.getTime() + med.duration * 24 * 60 * 60 * 1000
    );

    let currentTime = new Date(startDate);
    let dayCount = 1;

    while (currentTime < endDate) {
      const eventDate = currentTime.toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      let durationText =
        med.duration > 1
          ? `📆 Treatment day: ${dayCount} of ${med.duration}`
          : `📆 Total duration: ${med.duration} day`;

      const endHours = currentTime.getHours() + 1;
      const endMinutes = currentTime.getMinutes();
      const adjustedEndHours = endHours > 23 ? 23 : endHours;
      const adjustedEndMinutes = endHours > 23 ? 59 : endMinutes;

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
          adjustedEndHours,
          adjustedEndMinutes,
        ],
        title: `💊 ${med.name} - every ${med.interval}h`,
        description: `📅 Date: ${eventDate}
⏰ Time: ${currentTime.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
💊 Medication: ${med.name}
⏳ Interval: Every ${med.interval} hours
${durationText}
✅ Remember to take it on time.`,
      });

      currentTime.setHours(currentTime.getHours() + med.interval);

      if (
        currentTime.getDate() !== eventsForMed[eventsForMed.length - 1].start[2]
      ) {
        dayCount++;
      }
    }

    // Si el intervalo es >= 24 horas, agregar una última toma al final
    if (med.interval >= 24) {
      const finalDoseTime = new Date(endDate);
      finalDoseTime.setHours(
        startDate.getHours(),
        startDate.getMinutes(),
        0,
        0
      );

      const finalEndHours = finalDoseTime.getHours() + 1;
      const finalEndMinutes = finalDoseTime.getMinutes();
      const adjustedFinalEndHours = finalEndHours > 23 ? 23 : finalEndHours;
      const adjustedFinalEndMinutes = finalEndHours > 23 ? 59 : finalEndMinutes;

      eventsForMed.push({
        start: [
          finalDoseTime.getFullYear(),
          finalDoseTime.getMonth() + 1,
          finalDoseTime.getDate(),
          finalDoseTime.getHours(),
          finalDoseTime.getMinutes(),
        ],
        end: [
          finalDoseTime.getFullYear(),
          finalDoseTime.getMonth() + 1,
          finalDoseTime.getDate(),
          adjustedFinalEndHours,
          adjustedFinalEndMinutes,
        ],
        title: `💊 ${med.name} - Final Dose`,
        description: `📅 Date: ${finalDoseTime.toLocaleDateString("en-US", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
⏰ Time: ${finalDoseTime.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
💊 Medication: ${med.name}
⏳ Final scheduled dose.
✅ Ensure you complete your treatment.`,
      });
    }

    return eventsForMed;
  });

  createEvents(events, async (error, value) => {
    if (error) {
      console.error("Error generating .ics file:", error);
      return;
    }

    const blob = new Blob([value], { type: "text/calendar" });
    const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
    const fileName = `medications_${timestamp}.ics`;
    const file = new File([blob], fileName, { type: "text/calendar" });

    try {
      await uploadFile(file, "medicine-calendar", `calendars/${file.name}`);
    } catch (uploadError) {
      console.error("Error uploading .ics file:", uploadError);
      return;
    }
  });
}
