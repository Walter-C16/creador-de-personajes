# Creador de Personajes RPG

Aplicación web desarrollada con **React JS y Node.js** como trabajo practico de la EFA Desarrollo Web. Esta permite crear, visualizar y eliminar personajes de un hipotético juego RPG.

## Funcionalidades

- Crear hasta tres personajes.
- Guardar los personajes mediante el backend en un archivo JSON.

## Tecnologías utilizadas

**Frontend**
- React JS
- JavaScript
- HTML (JSX)
- CSS
- Create React App

**Backend**
- Node.js
- Express
- API REST
- JSON para persistencia

**Herramientas**
- npm Workspaces
- Concurrently
- Git y GitHub

## Requisitos previos

Antes de ejecutar el proyecto, instalar:

- [Node.js](https://nodejs.org/).
- npm (incluido con Node.js).
- Git.

Verificar la instalación ejecutando:

```bash
node -v
npm -v
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/creador-de-personajes.git
```

Ingresar a la carpeta del proyecto:

```bash
cd creador-de-personajes
```

También se puede descargar el repositorio como ZIP desde GitHub y descomprimirlo.

### 2. Instalar las dependencias

Desde la carpeta raíz del proyecto:

```bash
npm install
```

Gracias a npm Workspaces, este comando instala las dependencias necesarias del frontend y del backend.

### 3. Ejecutar la aplicación

Desde la raíz del proyecto:

```bash
npm start
```

Este comando utiliza **Concurrently** para iniciar ambos servidores:

| Servicio | Dirección |
|---|---|
| Frontend (React) | http://localhost:3000 |
| Backend (Express) | http://localhost:3001 |

Abrir en el navegador:

**http://localhost:3000**

La aplicación debería mostrar la pantalla principal con los tres casilleros para crear personajes.

### 4. Detener la aplicación

En la terminal donde está ejecutándose el proyecto, presionar:

`Ctrl + C`

Esto detendrá ambos servidores.

## Ejecución por separado

También es posible ejecutar cada servicio individualmente.

**Iniciar únicamente el frontend:**

```bash
npm run frontend
```

**Iniciar únicamente el backend:**

```bash
npm run backend
```

Para ejecutar ambos de esta manera, utilizar dos terminales distintas.

## Endpoints de la API

El backend expone los siguientes endpoints:

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/saludo` | Verificar el funcionamiento del servidor |
| GET | `/api/personajes` | Obtener los tres casilleros |
| POST | `/api/personajes/:indice` | Crear un personaje |
| DELETE | `/api/personajes/:indice` | Eliminar un personaje |

El parámetro `indice` identifica un casillero y admite los valores `0`, `1` y `2`.

Para verificar el funcionamiento del backend, ingresar a:

http://localhost:3001/api/personajes

Si todavía no se crearon personajes, la respuesta será:

```json
[
  null,
  null,
  null
]
```

## Estructura del proyecto

```text
creador-de-personajes/
├── backend/
│   ├── datos/
│   │   └── personajes.json
│   ├── services/
│   │   └── servicioPersonajes.js
│   ├── servidor.js
│   └── package.json
├── public/
├── src/
│   ├── assets/
│   │   └── imagenes/
│   ├── components/
│   │   ├── Inicio.jsx
│   │   ├── CasilleroPersonaje.jsx
│   │   ├── FormularioPersonaje.jsx
│   │   ├── SelectorRasgos.jsx
│   │   ├── SelectorAtributo.jsx
│   │   └── DetallePersonaje.jsx
│   ├── servicios/
│   │   └── servicioPersonajes.js
│   ├── utils/
│   │   └── imagenesPersonajes.js
│   ├── setupProxy.js
│   ├── App.js
│   └── App.css
├── package.json
├── package-lock.json
└── README.md
```
