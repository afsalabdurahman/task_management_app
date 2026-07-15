# 📋 Task Management Application (MERN Stack)

A modern **Task Management Application** built using the **MERN Stack**. The application enables users to securely manage tasks with JWT authentication, perform complete CRUD operations, receive real-time updates using Socket.IO, and visualize task statistics through interactive charts.

---

# 🚀 Features

## 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure API Access

## ✅ Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* Mark Tasks as Completed
* Task Status Management

## ⚡ Real-Time Updates

* Socket.IO Integration
* Live Task Synchronization
* Instant Task Creation, Update & Deletion

## 📊 Analytics Dashboard

* Total Tasks
* Completed Tasks
* Pending Tasks
* Overdue Tasks
* Interactive Charts

## 📱 Responsive Design

* Mobile Friendly
* Tablet Friendly
* Desktop Optimized
* Built with Tailwind CSS

---

# 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Chart.js

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO
* bcrypt

---

# 📂 Project Structure

```text
task_management_app/
│
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── socket/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/afsalabdurahman/task_management_app.git
cd task_management_app
```

---

## 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Start the backend server.

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend.

```bash
npm run dev
```

---

# 🌐 Live Demo

Frontend: **Coming Soon**

Backend API: **Coming Soon**

---

# 📡 REST API

## Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

## Tasks

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/tasks`     |
| POST   | `/api/tasks`     |
| PUT    | `/api/tasks/:id` |
| DELETE | `/api/tasks/:id` |

## Statistics

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | `/api/tasks/stats` |

---

# 📸 Screenshots

## 🏠 Landing Page

![Landing Page](./client/public/Screenshot%202026-07-03%20at%208.34.12%E2%80%AFPM.png)

---

## 📋 Dashboard

![Dashboard](./client/public/Screenshot%202026-07-03%20at%209.32.47%E2%80%AFPM.png)

---

## 📊 Analytics Dashboard

![Analytics Dashboard](./client/public/Screenshot%202026-07-03%20at%209.34.49%E2%80%AFPM.png)

---

# 🎯 Assignment Requirements Covered

* ✅ MERN Stack Application
* ✅ RESTful CRUD APIs
* ✅ MongoDB Database
* ✅ JWT Authentication
* ✅ Protected Routes
* ✅ Socket.IO Real-Time Updates
* ✅ Task Statistics API
* ✅ Charts & Data Visualization
* ✅ Responsive Design

---

# 🔮 Future Enhancements

* Email Notifications
* Task Reminder System
* File Attachments
* Dark Mode
* Team Collaboration
* Calendar View
* Drag & Drop Kanban Board

---

# 👨‍💻 Author

**Afsal KP**

GitHub: https://github.com/afsalabdurahman

---

## 📄 License

This project is licensed under the MIT License.
