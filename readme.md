# PalmMind

PalmMind is a realtime public chat application built with the MERN stack and Socket.IO. Users can register, login, and send messages in realtime. Messages are stored in MongoDB and instantly broadcasted to all connected users using io.emit(), making it a global/public chat room. The frontend listens to socket events and updates the chat UI live without refreshing the page.

---

# Prerequisites

Before starting, make sure the following tools are installed on your machine:

- Node.js (LTS Version)
- Visual Studio Code (VS Code)
- Git
- MongoDB Compass

---

# Project Structure

```bash
palm-mind/
│
├── frontend/   # React Frontend
└── backend/    # Node.js + Express Backend
```

---

# Cloning the Repository

## 1. Open Terminal

Use any terminal:

- Command Prompt
- Git Bash
- PowerShell
- VS Code Terminal

---

## 2. Navigate to Your Desired Directory

```bash
cd path/to/your/folder
```

Example:

```bash
cd Desktop
```

---

## 3. Clone the Repository

```bash
git clone https://github.com/ommanirai/palm-mind.git
```

---

## 4. Checkout Branch

```bash
git checkout master
```

---

## 5. Navigate Into the Project Folder

```bash
cd palm-mind
```

---

# Setting Up the Backend (Node.js + Express)

## 1. Navigate to Backend Directory

```bash
cd backend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create `.env` File

Inside the `backend` directory, create a file named `.env`.

Add the following environment variables:

```env
PORT=8000
DATABASE_LOCAL=mongodb://localhost:27017
JWT_SECRET=your_secret_key
```

---

## 4. Start the Backend Server

```bash
npm start
```

The backend server will run on:

```bash
http://localhost:8000
```

---

# Setting Up the Frontend (React + Vite)

## 1. Navigate to Frontend Directory

Open a new terminal and run:

```bash
cd frontend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create `.env` File

Inside the `frontend` directory, create a file named `.env`.

Add the following environment variable:

```env
VITE_API_URL=http://localhost:8000
```

---

## 4. Start the Frontend Development Server

```bash
npm run dev
```

---

## 5. Open the Application

Open your browser and visit:

```bash
http://localhost:5173
```

---

# Tech Stack

## Frontend

- React
- Vite
- JavaScript

## Backend

- Node.js
- Express.js

## Database

- MongoDB

---

# Useful Commands

## Backend

```bash
npm install
npm start
```

## Frontend

```bash
npm install
npm run dev
```

---

# Notes

- Make sure MongoDB is running locally before starting the backend server.
- Ensure both frontend and backend servers are running simultaneously.
- Use separate terminals for frontend and backend servers.

---