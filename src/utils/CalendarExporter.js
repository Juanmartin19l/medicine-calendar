import {
  generateCalendarEvents,
  createICSFile,
  generateFileName,
  getMedicinesHash,
} from "./calendarGenerator";
import { uploadFile, getFileUrl, downloadFile } from "./supabaseStorage";

// Cache for storing the last uploaded file info
let fileCache = {
  medicinesHash: null,
  fileUrl: null,
  fileName: null,
};

/**
 * Exports calendar to Supabase, using cached version if medicines haven't changed
 * @param {Array} medicines - List of medicines with their schedules
 * @returns {Promise<void>}
 */
export async function exportToCalendar(medicines) {
  try {
    if (!medicines || medicines.length === 0) {
      throw new Error("No medicines provided for calendar export");
    }

    // Generate a hash of the medicines array to detect changes
    const currentHash = getMedicinesHash(medicines);

    // If medicines haven't changed and we have a cached URL, use it
    if (currentHash === fileCache.medicinesHash && fileCache.fileUrl) {
      console.log("Using cached calendar file - no changes detected");
      await downloadFile(fileCache.fileUrl);
      return;
    }

    // Generate calendar events
    const events = generateCalendarEvents(medicines);

    if (!events || events.length === 0) {
      throw new Error("No calendar events generated from medicines");
    }

    console.log(`Generated ${events.length} calendar events`);

    // Create ICS file
    const blob = await createICSFile(events);

    if (!blob || blob.size === 0) {
      throw new Error("Generated ICS file is empty");
    }

    console.log(
      `Local ICS file created with size: ${(blob.size / 1024).toFixed(2)} KB`
    );
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

      // Update the cache
      fileCache = {
        medicinesHash: currentHash,
        fileUrl: fileUrl,
        fileName: fileName,
      };
    } else {
      console.error("Error: File URL is undefined");
    }
  } catch (error) {
    console.error("Error exporting calendar:", error);
    throw error;
  }
}

/**
 * Exports medicines to a calendar and downloads it locally
 * @param {Array} medicines - List of medicines with their schedules
 * @returns {Promise<void>}
 */
export async function exportToLocalCalendar(medicines) {
  try {
    if (!medicines || medicines.length === 0) {
      throw new Error("No medicines provided for local calendar export");
    }

    // Generate calendar events
    const events = generateCalendarEvents(medicines);

    if (!events || events.length === 0) {
      throw new Error("No calendar events generated from medicines");
    }

    console.log(
      `Generated ${events.length} calendar events for local download`
    );

    // Create ICS file
    const blob = await createICSFile(events);

    if (!blob || blob.size === 0) {
      throw new Error("Generated ICS file is empty");
    }

    console.log(
      `Local ICS file created with size: ${(blob.size / 1024).toFixed(2)} KB`
    );

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

/**
 * Clears the file cache, forcing a new upload on next export
 */
export function clearFileCache() {
  fileCache = {
    medicinesHash: null,
    fileUrl: null,
    fileName: null,
  };
}
