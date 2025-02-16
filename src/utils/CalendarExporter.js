import { createEvents } from "ics";

export function exportToCalendar(medicines) {
  const events = medicines.flatMap((med) => {
    const startDate = new Date();
    const [startHour, startMinute] = med.startTime.split(":").map(Number);
    // Set start time
    startDate.setHours(startHour, startMinute, 0, 0);

    const eventsForMed = [];
    // Calculate the end date (not included)
    const endDate = new Date(
      startDate.getTime() + med.duration * 24 * 60 * 60 * 1000
    );

    let currentTime = new Date(startDate);
    let dayCount = 1; // Track treatment day

    // Generate events while currentTime is before endDate
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
          currentTime.getHours() + 1, // 1-hour duration
          currentTime.getMinutes(),
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

      // Move to the next interval
      currentTime.setHours(currentTime.getHours() + med.interval);

      // Check if we moved to a new day
      if (
        currentTime.getDate() !== eventsForMed[eventsForMed.length - 1].start[2]
      ) {
        dayCount++;
      }
    }

    return eventsForMed;
  });

  createEvents(events, (error, value) => {
    if (error) {
      console.error("Error generating .ics file:", error);
      return;
    }

    // Create a .ics file and trigger download
    const blob = new Blob([value], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "medications.ics";
    link.click();
    URL.revokeObjectURL(url);
  });
}
