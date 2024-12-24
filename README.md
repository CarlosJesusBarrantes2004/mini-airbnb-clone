# Airbnb Clone

Este proyecto es un clon de Airbnb desarrollado con el stack MERN (MongoDB, Express, React, Node.js). El proyecto consta de un backend robusto con autenticación JWT y un frontend responsive diseñado con Tailwind CSS.

## Tecnologías Utilizadas

### Backend

- Express.js
- MongoDB con Mongoose
- JWT para autenticación
- Cookie-parser para manejo de cookies
- Multer para upload de archivos
- Estructura modular (controllers, routes, middleware)

### Frontend

- React.js
- Tailwind CSS para estilos
- Context API para estado global
- React Router DOM para navegación
- Axios para peticiones HTTP

## Características Principales

### Autenticación

- Registro de usuarios
- Login con JWT
- Tokens almacenados en cookies
- Rutas protegidas

### Funcionalidades

- Listado de propiedades
- Búsqueda y filtrado
- Sistema de reservas
- Panel de usuario
- Gestión de propiedades
- Upload de imágenes

## Instalación

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Variables de Entorno

### Backend (.env)

```env
PORT=3000
MONGO_URL=tu_uri_de_mongodb
JWT_SECRET=tu_jwt_secret
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

## Estructura del Proyecto

### Backend

```
api/
├── controllers/
│   ├── auth.controller.js
│   ├── booking.controller.js
│   ├── place.Controller.js
|   └── user.controller.js
├── routes/
│   ├── auth.routes.js
│   ├── place.routes.js
|   ├── upload.routes.js
│   └── booking.routes.js
├── middlewares/
│   ├── errorhanlder.js
│   └── validateToken.js
├── models/
│   ├── User.js
│   ├── Place.js
│   └── Booking.js
|   .
|   .
|   .
└── server.js
```

### Frontend

```
client/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── hooks/
│   └── App.jsx
```

## Mejoras Realizadas sobre el Tutorial Original

- Implementación de middleware personalizado
- Mejoras en la autenticación y manejo de sesiones
- Optimización del manejo de imágenes
- Sistema de reservas mejorado
- Implementación de filtros avanzados

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir qué te gustaría cambiar.

## Basado en

Este proyecto está inspirado en el tutorial de [https://youtu.be/MpQbwtSiZ7E?si=DZxpzKArO2e9eQg_], con modificaciones y mejoras significativas en el backend y funcionalidades adicionales.
