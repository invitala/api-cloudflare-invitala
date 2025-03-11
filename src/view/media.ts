import { Hono } from "hono";

type Bindings = {
  R2_BUCKET: R2Bucket;
};

const api_media = new Hono<{Bindings: Bindings}>();

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos de imagen permitidos

api_media.post('/upload_media/', async (c) => {
    try {
      const formData = await c.req.formData();
      const files = formData.getAll('files') as unknown as File[]; // Obtener todos los archivos
  
      if (!files || files.length === 0) {
        return c.json({ message: 'No se subieron archivos' }, 400);
      }
  
      const uploadResults = []; // Array para almacenar los resultados de cada archivo
  
      for (const file of files) {
        try {
          // Validar tipo de archivo
          const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
          if (!allowedMimeTypes.includes(file.type)) {
            uploadResults.push({ fileName: file.name, status: 'rejected', message: 'Tipo de archivo invalido' });
            continue; // Saltar este archivo
          }
  
          // Validar tamaño del archivo
          const maxFileSize = 20 * 1024 * 1024; // 20 MB
          if (file.size > maxFileSize) {
            uploadResults.push({ fileName: file.name, status: 'rejected', message: 'El archivo es demasiado grande ( mayor a 20 MB)' });
            continue; // Saltar este archivo
          }
  
          // Generar nombre de archivo único
          const uniqueFileName = `${Date.now()}-${file.name}`;
  
          // Convertir archivo a ArrayBuffer
          const fileContent = await file.arrayBuffer();
  
          // Subir archivo a R2 con metadatos
          await c.env.R2_BUCKET.put(uniqueFileName, fileContent, {
            httpMetadata: {
              contentType: file.type,
            },
          });
  
          uploadResults.push({ fileName: uniqueFileName, status: 'success', message: 'Archivo subido correctamente' });
        } catch (error) {
          uploadResults.push({ fileName: file.name, status: 'error', message: 'Fallo al subir el archivo', error: error.message });
        }
      }
  
      return c.json({ message: 'Proceso de subida completo', results: uploadResults });
    } catch (error) {
      return c.json({ message: 'Error subiendo los archivos', error: error.message }, 500);
    }
});

export { api_media };

