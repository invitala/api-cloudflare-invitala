# Comandos para correr el proyecto:

Instalar dependencias:
```
npm i
```

Correr en local
```
npm run dev
```

Desplegar en un CFW:
```
npm run deploy
```

## Configuracion DB

Crear una DB en D1
```
npx wrangler d1 create cfw-plantilla
```
Una vez creada la DB se copia el resultado de lo que arroja la consola en el archivo wrangler.toml

Una vez tengamos las migraciones listas, proecedemos a enviarlas a la DB, aqui podemos hacerlo primero al entorno local y luego al D1:

comando local
```
npx wrangler d1 execute cfw-plantilla --local --file=./drizzle/migrations/0000_whole_junta.sql
```
una vez creada localmente la DB, podemos copiar su ruta de almacenamiento en la carpea wrangler/state/v3/d1 para agregarlo a nuestro cliente de MySQL en Visua Studio.

Comando para produccion:
```
npx wrangler d1 execute cfw-plantilla --remote --file=./drizzle/migrations/0000_whole_junta.sql
```

------------------------------------------------------------------------------------------------------
## Nuevo proyecto

Pasos para crear un nuevo proyecto.

Primero se debe crear un nuevo proyecto con las instrucciones de: https://hono.dev/docs/getting-started/cloudflare-workers 

Crear el proyecto y hacer un git init desde dentro del proyecto generado por: npm create hono@latest, una vez creado enlazarlo con github desktop previamente configurado con el perfil de invitaladev. 

Una vez arriba el proeyecto, invitar a los que realizaran dicho proyecto desde github.com y comenzar a programar desde el perfil personal.