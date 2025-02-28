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

      // Calculate end time (1 hour after start time)
      const endTime = new Date(currentTime.getTime());
      endTime.setHours(currentTime.getHours() + 1, currentTime.getMinutes());

      eventsForMed.push({
        start: [
          currentTime.getFullYear(),
          currentTime.getMonth() + 1,
          currentTime.getDate(),
          currentTime.getHours(),
          currentTime.getMinutes(),
        ],
        end: [
          endTime.getFullYear(),
          endTime.getMonth() + 1,
          endTime.getDate(),
          endTime.getHours(),
          endTime.getMinutes(),
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
        // Add these required fields for valid iCalendar events
        productId: "medicine-calendar/ics",
        calName: "Medicine Calendar",
        status: "CONFIRMED",
        busyStatus: "FREE",
        alarms: [
          {
            action: "display",
            description: "It's time for your medication!",
            trigger: { minutes: 10, before: true },
          },
        ],
      });

      // Move to next dosage time
      currentTime.setHours(currentTime.getHours() + med.interval);

      // Check if we've moved to a new day
      if (currentTime.getDate() !== previousDay) {
        dayCount++;
        previousDay = currentTime.getDate();
      }
    }

    // Add a final dose for medications with interval > 24 hours
    if (med.interval > 24) {
      const finalDoseTime = new Date(endDate);
      finalDoseTime.setHours(
        startDate.getHours(),
        startDate.getMinutes(),
        0,
        0
      );

      // Calculate end time for final dose
      const finalEndTime = new Date(finalDoseTime.getTime());
      finalEndTime.setHours(
        finalDoseTime.getHours() + 1,
        finalDoseTime.getMinutes()
      );

      eventsForMed.push({
        start: [
          finalDoseTime.getFullYear(),
          finalDoseTime.getMonth() + 1,
          finalDoseTime.getDate(),
          finalDoseTime.getHours(),
          finalDoseTime.getMinutes(),
        ],
        end: [
          finalEndTime.getFullYear(),
          finalEndTime.getMonth() + 1,
          finalEndTime.getDate(),
          finalEndTime.getHours(),
          finalEndTime.getMinutes(),
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
        // Add these required fields for valid iCalendar events
        productId: "medicine-calendar/ics",
        calName: "Medicine Calendar",
        status: "CONFIRMED",
        busyStatus: "FREE",
        alarms: [
          {
            action: "display",
            description: "It's time for your medication!",
            trigger: { minutes: 10, before: true },
          },
        ],
      });
    }

    return eventsForMed;
  });
}

// El resto del código se mantiene igual
export function createICSFile(events) {
  return new Promise((resolve, reject) => {
    if (!events || events.length === 0) {
      reject(new Error("No events provided for calendar"));
      return;
    }

    createEvents(events, (error, value) => {
      if (error) {
        console.error("Error generating .ics file:", error);
        reject(error);
        return;
      }

      if (!value) {
        console.error("No ICS content generated");
        reject(new Error("Failed to generate ICS content"));
        return;
      }

      const blob = new Blob([value], { type: "text/calendar;charset=utf-8" });
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

/**
 * Generates a hash from medicines array to detect changes
 * @param {Array} medicines - List of medicines
 * @returns {string} Hash value
 */
export function getMedicinesHash(medicines) {
  // Create a string representation to hash
  const stringified = JSON.stringify(
    medicines.map((med) => ({
      name: med.name,
      interval: med.interval,
      duration: med.duration,
      startTime: med.startTime,
    }))
  );

  // Simple hash function for string
  let hash = 0;
  if (stringified.length === 0) return hash.toString();

  for (let i = 0; i < stringified.length; i++) {
    const char = stringified.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash.toString();
}
