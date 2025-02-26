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

export async function getLastUploadedFile(bucket, folder) {
  const { data, error } = await supabase.storage.from(bucket).list(folder, {
    limit: 1,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) {
    console.error("Error fetching files:", error);
    throw error;
  }

  if (data.length === 0) {
    return null;
  }

  return data[0];
}

export async function getFileUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  if (!data || !data.publicUrl) {
    throw new Error("Failed to get public URL");
  }

  // Cambiar el protocolo de https a webcal
  const webcalUrl = data.publicUrl.replace("https://", "webcal://");

  return webcalUrl;
}

export async function downloadFile(url) {
  if (!url) {
    console.error("Invalid URL for download");
    return;
  }

  // Redirige directamente a la URL webcal
  window.location.href = url;

  // No es necesario crear un enlace y hacer clic en él cuando usamos webcal
  // El navegador o el sistema operativo se encargará de abrir la aplicación de calendario adecuada
}
