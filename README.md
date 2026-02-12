# Expense Tracker

A full-stack personal expense tracker with a React + TypeScript frontend and a Node.js + Express + TypeScript backend using PostgreSQL with Prisma.

## Features

- Dashboard with total expenses, category breakdown, and bar chart
- Expenses CRUD (add, edit, delete, view)
- REST API with validation and error handling

## Setup

### Backend

1. Create a PostgreSQL database.
2. Copy backend/.env.example to backend/.env and update DATABASE_URL.
3. Install dependencies (from backend/): npm install
4. Generate Prisma client: npm run prisma:generate
5. Run migrations: npm run prisma:migrate
6. Start the API: npm run dev

### Frontend

1. Copy frontend/.env.example to frontend/.env (optional).
2. Install dependencies (from frontend/): npm install
3. Start the web app: npm run dev

The frontend expects the API at http://localhost:4000 by default.
