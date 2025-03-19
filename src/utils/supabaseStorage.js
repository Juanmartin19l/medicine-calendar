import { supabase } from "../supabase/supabaseClient";

export async function uploadFile(file, bucket, path) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (error) {
    console.error("Error uploading file:", error);
    throw error;
  }

  console.log("File uploaded successfully:", data);
  return data;
}

export async function getFileUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  if (!data || !data.publicUrl) {
    throw new Error("Failed to get public URL");
  }

  // Ensure we always return a webcal URL
  if (!data.publicUrl) {
    throw new Error("Failed to get public URL");
  }

  const webcalUrl = data.publicUrl.replace(/^https?:\/\//i, "webcal://");
  return webcalUrl;
}

export async function downloadFile(url) {
  if (!url) {
    console.error("Invalid URL for download");
    return;
  }

  window.location.href = url;
}
