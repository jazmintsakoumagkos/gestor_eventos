# Gestor de Eventos — Frontend

Frontend académico desarrollado con React, TypeScript, Vite y React Bootstrap para consumir la API REST del repositorio Gestor de Eventos.

## Funcionalidades

- Listado de eventos desde la API, búsqueda por nombre/lugar/descripción y filtro de eventos con cupos.
- Alta y edición de eventos con Formik y validación Yup.
- Baja con modal de confirmación.
- Acción de negocio: registrar participantes; la API actualiza las entradas disponibles.
- Navegación entre Inicio y Eventos con React Router.
- Las llamadas HTTP se centralizan en `src/services/eventosService.ts`; los tipos están en `src/types/Evento.ts`.

## Requisitos

Node.js instalado y la API del proyecto funcionando con MongoDB configurado.

## Ejecutar en local

1. En una terminal, iniciar la API desde la carpeta raíz del repositorio:

   ```bash
   npm install
   npm run dev
   ```

   La API debe estar disponible en `http://localhost:4000`.

2. En otra terminal, entrar a la carpeta del frontend e instalar dependencias:

   ```bash
   cd frontend
   npm install
   ```

3. Copiar `.env.example` como `.env` si necesitás cambiar la URL. Por defecto usa `http://localhost:4000`.

4. Iniciar Vite:

   ```bash
   npm run dev
   ```

Abrí la URL que muestra Vite (normalmente `http://localhost:5173`).

## Endpoints consumidos

- `GET /eventos`
- `GET /eventos/disponibles`
- `POST /eventos`
- `PUT /eventos/:id`
- `DELETE /eventos/:id`
- `POST /eventos/:id/registrar`

La API responde con un objeto que contiene `success`, `message` y `data`. Para el listado, `data` contiene `eventos` y `paginacion`.

> Si el backend no está encendido o MongoDB no conecta, el frontend mostrará un mensaje de error en vez de datos ficticios.
