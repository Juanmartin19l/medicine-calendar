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
