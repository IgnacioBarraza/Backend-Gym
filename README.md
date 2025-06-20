# 🏋️ Backend - Gym App

Backend para una aplicación web enfocada en rutinas y ejercicios de gimnasio, construido con **Express**, **TypeScript** y **MongoDB**

---

## 📁 Estructura del Proyecto

```
src/
│
├── config/             # Configuración de DB y variables de entorno
│   └── db.ts
│   └── env.ts
│
├── models/             # Interfaces y tipos de entidades
│   └── User.ts
│   └── Excersise.ts
│
├── routes/             # Definición de rutas Express
│   └── user.routes.ts
│   └── workout.routes.ts
│
├── controllers/        # Lógica que responde a las rutas
│   └── user.controller.ts
│   └── workout.controller.ts
│
├── services/           # Lógica de negocio (validaciones, reglas)
│   └── user.service.ts
│   └── workout.service.ts
│
├── repositories/       # Acceso directo a MongoDB
│   └── user.repo.ts
│   └── workout.repo.ts
│
├── middlewares/        # Middlewares personalizados (auth, errores)
│   └── auth.ts
│   └── errorHandler.ts
│
├── utils/              # Funciones utilitarias (tokens, helpers)
│   └── token.ts
│   └── validators.ts
│
├── app.ts              # Configuración principal de la app Express
├── server.ts           # Punto de entrada del servidor
└── types/              # Tipos globales (si los necesitas)
```

---

## 🚀 Tecnologías utilizadas

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB**
- **Zod** (validaciones)
- **dotenv** (variables de entorno)
- **bcryptjs** (para contraseñas)
- **jsonwebtoken** (para autenticación)

---

## ⚙️ Configuración inicial

1. Clona el repositorio:

```bash
git clone https://github.com/IgnacioBarraza/Backend-Gym.git
cd Backend-Gym
```

2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con tu configuración:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017
DB_NAME=gymapp
JWT_SECRET=tu_clave_secreta
```

4. Compila TypeScript:

```bash
npx tsc
```

5. Inicia el servidor en desarrollo:

```bash
npm run dev
```

---

## 🧪 Comandos útiles

| Comando         | Descripción                            |
| --------------- | -------------------------------------- |
| `npm run dev`   | Ejecuta con nodemon y ts-node          |
| `npm run build` | Compila TypeScript en `/dist`          |
| `npm start`     | Corre la app desde el código compilado |

---

## 📬 Endpoints iniciales

| Método | Ruta                | Descripción     |
| ------ | ------------------- | --------------- |
| `POST` | `/api/users/login`  | Crear usuario   |
| `GET`  | `/api/users/:id`    | Obtener usuario |

*(Puedes ir agregando más rutas en `src/routes/`)*

---

## 🧠 Arquitectura general

Este backend sigue la arquitectura:

```
Route → Controller → Service → Repository → DB
```

Esto ayuda a separar responsabilidades, mantener el código limpio y facilitar el testeo y mantenimiento del sistema.

---

## 🤝 Contribuciones

Este proyecto es parte de un trabajo universitario. Siéntete libre de usar la estructura para tus propios proyectos de Express + Mongo.

---

## 🔒 Licencia

MIT © 2025