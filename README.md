# Airbnb Clone

Este proyecto es un clon de Airbnb desarrollado con el stack MERN (MongoDB, Express, React, Node.js). El proyecto consta de un backend implementando autenticación JWT y typescript y un frontend responsive diseñado con Tailwind CSS.

## Tecnologías Utilizadas

### Backend

- Express.js
- MongoDB con Mongoose
- JWT para autenticación
- Cookie-parser para manejo de cookies
- Multer para upload de archivos
- Zod para validación de datos
- Estructura modular (controllers, routes, middleware)

### Frontend

- React.js
- Tailwind CSS para estilos
- Context API para estado global
- React Router DOM para navegación

## Características Principales

### Autenticación

- Registro de usuarios
- Login con JWT
- Tokens almacenados en cookies
- Rutas protegidas

### Funcionalidades

- Listado de propiedades
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
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=dewfdefewrew
CLOUDINARY_API_KEY=2h143jrb32244r
CLOUDINARY_API_SECRET=i32jrih3rhweje23
```

### Frontend (.env)

```env
VITE_BACKEND_URL=http://localhost:3000
```

## Estructura del Proyecto

### Backend

```
api/
├── controllers/
│   ├── auth.controller.ts
│   ├── booking.controller.ts
│   ├── property.Controller.ts
|   └── user.controller.ts
├── routes/
│   ├── auth.route.ts
│   ├── property.route.ts
│   ├── index.ts
|   ├── upload.route.ts
│   └── booking.route.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.ts
├── models/
│   ├── User.ts
│   ├── Booking.ts
│   └── Property.ts
|   .
|   .
|   .
└── index.ts
```

### Frontend

```
client/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── hooks/
│   └── App.tsx
```
