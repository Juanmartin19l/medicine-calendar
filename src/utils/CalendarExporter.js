import {
  generateCalendarEvents,
  createICSFile,
  generateFileName,
} from "./calendarGenerator";
import { uploadFile, getFileUrl, downloadFile } from "./supabaseStorage";

export async function exportToCalendar(medicines) {
  try {
    // Generate calendar events
    const events = generateCalendarEvents(medicines);

    // Create ICS file
    const blob = await createICSFile(events);

    // Generate filename
    const fileName = generateFileName();

    // Create File object
    const file = new File([blob], fileName, { type: "text/calendar" });

    // Upload file to Supabase
    const uploadData = await uploadFile(
      file,
      "medicine-calendar",
      `calendars/${file.name}`
    );

    // Get public URL
    const fileUrl = await getFileUrl(
      "medicine-calendar",
      `calendars/${file.name}`
    );

    // Download file using the URL
    if (fileUrl) {
      await downloadFile(fileUrl);
    } else {
      console.error("Error: File URL is undefined");
    }
  } catch (error) {
    console.error("Error exporting calendar:", error);
    throw error;
  }
}

export async function exportToLocalCalendar(medicines) {
  try {
    // Generate calendar events
    const events = generateCalendarEvents(medicines);

    // Create ICS file
    const blob = await createICSFile(events);

    // Generate filename
    const fileName = generateFileName();

    // Download locally without uploading to Supabase
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
  } catch (error) {
    console.error("Error during local calendar export:", error);
    throw error;
  }
}
