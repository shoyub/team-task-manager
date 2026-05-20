# 🚀 Team Task Manager

A full-stack MERN application for managing team projects and tasks with role-based access control (RBAC).
Users can create projects, assign tasks, track progress, and manage team collaboration efficiently.

---

# 🌐 Live Demo

## Frontend (Vercel)

https://team-task-manager-pi-ten.vercel.app/

## Backend (Render)

https://team-task-manager-backend-b5ly.onrender.com

---

# 📌 Features

## 🔐 Authentication

* User Signup/Login
* JWT Authentication
* Protected Routes
* Secure Password Hashing

---

# 👥 Role-Based Access Control (RBAC)

## 👨‍💼 Admin

* Create/Edit/Delete Projects
* Add Members to Projects
* Create/Edit/Delete Tasks
* Manage all tasks
* View dashboard analytics

## 👨‍💻 Member

* View assigned tasks only
* Update task status
* Track project progress

---

# 📋 Project Management

* Create Projects
* Edit/Delete Projects
* Add Team Members
* View Project Members

---

# ✅ Task Management

* Create Tasks
* Assign Tasks to Members
* Edit/Delete Tasks
* Update Task Status
* Filter Tasks by Status
* Overdue Task Detection

---

# 📊 Dashboard Analytics

* Total Tasks
* Completed Tasks
* Pending Tasks
* In Progress Tasks
* Overdue Tasks

---

# 🎨 Frontend Features

* Responsive UI
* Mobile-Friendly Navbar
* Toast Notifications
* Loading States
* Modern Tailwind CSS Design
* Protected Routing
* Task Status Badges
* Empty State UI

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* React Toastify

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

## Deployment

* Frontend → Vercel
* Backend → Render

---

# 📂 Folder Structure

team-task-manager/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   └── App.jsx
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── README.md

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/krishnasairayavaram/team-task-manager.git
```

---

# 🔧 Backend Setup

```bash
cd server
npm install
```

## Create .env file inside server folder

```env
MONGO_URI=your_mongodb_atlas_url

JWT_SECRET=your_secret_key

PORT=5000
```

## Run Backend

```bash
npm start
```

---

# 💻 Frontend Setup

```bash
cd client
npm install
```

## Create .env file inside client folder

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Frontend

```bash
npm run dev
```

---

# 📡 API Endpoints

# Auth Routes

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/auth/signup |
| POST   | /api/auth/login  |

---

# Project Routes

| Method | Endpoint                            |
| ------ | ----------------------------------- |
| GET    | /api/projects                       |
| POST   | /api/projects                       |
| PUT    | /api/projects/:projectId            |
| DELETE | /api/projects/:projectId            |
| PUT    | /api/projects/:projectId/add-member |

---

# Task Routes

| Method | Endpoint                   |
| ------ | -------------------------- |
| GET    | /api/tasks                 |
| POST   | /api/tasks                 |
| PUT    | /api/tasks/:taskId         |
| DELETE | /api/tasks/:taskId         |
| PUT    | /api/tasks/:taskId/status  |
| GET    | /api/tasks/dashboard/stats |

---

# 🔐 Role Permissions

| Feature             | Admin | Member |
| ------------------- | ----- | ------ |
| Create Project      | ✅     | ❌      |
| Edit/Delete Project | ✅     | ❌      |
| Add Members         | ✅     | ❌      |
| Create Task         | ✅     | ❌      |
| Edit/Delete Task    | ✅     | ❌      |
| Update Task Status  | ✅     | ✅      |
| View Assigned Tasks | ✅     | ✅      |

---

# 📱 Responsive Design

The application is fully responsive and works across:

* Desktop
* Tablet
* Mobile Devices

---

# 🌟 Future Improvements

* Real-time notifications
* Drag & Drop Kanban Board
* Team Chat System
* File Uploads
* Dark Mode
* Activity Logs
* Email Notifications

---

# 👨‍💻 Author

## Krishna Sai Rayavaram

GitHub:
https://github.com/krishnasairayavaram

---

# 📄 License

This project was developed for educational and assignment purposes.
