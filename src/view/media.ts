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
            uploadResults.push({ fileName: file.name, status: 'rejected', message: 'Tipo invalido de archivo' });
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
  
          uploadResults.push({ fileName: uniqueFileName, status: 'success', message: 'File uploaded successfully' });
        } catch (error) {
          uploadResults.push({ fileName: file.name, status: 'error', message: 'Failed to upload file', error: error.message });
        }
      }
  
      return c.json({ message: 'File upload process completed', results: uploadResults });
    } catch (error) {
      console.error('Error processing upload request:', error);
      return c.json({ message: 'Failed to process upload request', error: error.message }, 500);
    }
});

api_media.get('/list_media/', async (c) => {
  try {
    const files = await c.env.R2_BUCKET.list();
    const fileList = files.objects.map(file => ({
      key: file.key,
      size: file.size,
      lastModified: file.uploaded
    }));

    return c.json({ files: fileList });
  } catch (error) {
    return c.json({ message: 'Failed to list files', error }, 500);
  }
});


export { api_media };

