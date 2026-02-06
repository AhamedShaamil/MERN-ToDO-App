# MERN Todo App

A minimal, clean MERN stack Todo application with Express backend and React frontend.

## Project Structure

```
├── backend/
│   ├── models/
│   │   └── Todo.js          # Mongoose Todo schema
│   ├── routes/
│   │   └── todoRoutes.js    # Express route handlers
│   ├── controllers/
│   │   └── todoController.js # CRUD operations
│   └── server.js            # Express server entry point
├── src/
│   ├── App.tsx              # React frontend component
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── package.json
├── .env                     # Environment variables
└── vite.config.ts           # Vite configuration
```

## Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure `.env`:
```
MONGODB_URI=mongodb://localhost:27017/todo-app
PORT=5000
VITE_API_URL=http://localhost:5000
```

- For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/todo-app`
- Change `PORT` if needed
- `VITE_API_URL` must match your backend URL

### Running the App

Start the backend server:
```bash
npm run server
```

In another terminal, start the frontend dev server:
```bash
npm run dev
```

Visit `http://localhost:5173` (Vite default port)

### Development Mode with Auto-Reload

```bash
npm run server:dev    # Backend with watch mode
npm run dev           # Frontend with Vite dev server
```

## API Endpoints

All endpoints return JSON:

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a todo (body: `{ title: string }`)
- `PUT /api/todos/:id` - Update a todo (body: `{ title?: string, completed?: boolean }`)
- `DELETE /api/todos/:id` - Delete a todo

## Build for Production

```bash
npm run build
```

This creates an optimized frontend build in the `dist/` folder.

To run the production backend:
```bash
npm run server
```

## Stack

- **Backend:** Express.js, Mongoose, MongoDB, CORS
- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Icons:** Lucide React

## Notes

- No authentication or extra frameworks included
- Minimal dependencies for easy customization
- Fully typed TypeScript frontend
- ESLint configuration included
