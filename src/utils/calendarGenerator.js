import { createEvents } from "ics";

export function generateCalendarEvents(medicines) {
  return medicines.flatMap((med) => {
    const startDate = new Date(med.startTime);
    const eventsForMed = [];
    const endDate = new Date(
      startDate.getTime() + med.duration * 24 * 60 * 60 * 1000
    );

    let currentTime = new Date(startDate);
    let dayCount = 1;
    let previousDay = currentTime.getDate();

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

      const endHours = Math.min(currentTime.getHours() + 1, 23);
      const endMinutes =
        currentTime.getHours() + 1 > 23 ? 59 : currentTime.getMinutes();

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
          endHours,
          endMinutes,
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

      if (currentTime.getDate() !== previousDay) {
        dayCount++;
        previousDay = currentTime.getDate();
      }
    }

    if (med.interval >= 24) {
      const finalDoseTime = new Date(endDate);
      finalDoseTime.setHours(
        startDate.getHours(),
        startDate.getMinutes(),
        0,
        0
      );

      const endHours = Math.min(finalDoseTime.getHours() + 1, 23);
      const endMinutes =
        finalDoseTime.getHours() + 1 > 23 ? 59 : finalDoseTime.getMinutes();

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
          endHours,
          endMinutes,
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
}

export function createICSFile(events) {
  return new Promise((resolve, reject) => {
    createEvents(events, (error, value) => {
      if (error) {
        console.error("Error generating .ics file:", error);
        reject(error);
        return;
      }

      const blob = new Blob([value], { type: "text/calendar" });
      resolve(blob);
    });
  });
}

export function generateFileName() {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
  return `medications_${timestamp}.ics`;
}

export function downloadICSFile(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}
