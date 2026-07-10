# 🏨 HOTELNOVA - Hotel Management System

A modern Hotel Management and Booking System built with React, Node.js, Express, MySQL, and Docker. The system allows users to browse hotels, book rooms, and enables administrators to manage hotels, rooms, bookings, and users.


## 🚀 Features

### User
- User Registration & Login
- Browse Hotels
- View Hotel Details
- Book Rooms
- View Booking History
- Update User Profile

### Admin
- Admin Login
- Add, Edit, Delete Hotels
- Add, Edit, Delete Rooms
- Manage Bookings
- Dashboard

# 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Framer Motion
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt
- MySQL2

### Database
- MySQL 8

### DevOps
- Docker
- Docker Compose

# 📁 Project Structure

```
Hotel-Magament-System
│
├── backend
│
├── hotel-booking-frontend
│
├── docker-compose.yml
│
└── README.md

# ⚙ Prerequisites

Install:

- Node.js (v18 or higher)
- MySQL 8
- Docker Desktop
- Git

---

# 📥 Clone the Repository

```bash
git clone https://github.com/your-username/Hotel-Magament-System.git

cd Hotel-Magament-System
```

---

# 🗄 Database Setup

## Using Docker

Start MySQL

```bash
docker compose up -d mysql
```

Check running containers

```bash
docker ps
```

Enter MySQL

```bash
docker exec -it hotel_mysql mysql -u root -p
```

Select database

```sql
USE hotel_booking;
```

---

## Manual Database

Create database

```sql
CREATE DATABASE hotel_booking;
```

Import

```bash
mysql -u root -p hotel_booking < backend/setup.sql
```

---

# 🔧 Backend Setup

Navigate to backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hotel_booking

JWT_SECRET=your_secret_key
```

Run backend

```bash
npm start
```

or

```bash
node server.js
```

Backend runs on

```
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open another terminal

```bash
cd hotel-booking-frontend
```

Install packages

```bash
npm install
```

Start frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# 🌱 Seed Demo Data

Run

```bash
cd backend

node seed/seedData.js
```

This creates

- Demo Hotels
- Demo Rooms
- Admin User
- Demo User

---

# 🔑 Demo Accounts

### Admin

```
Email:
admin@example.com

Password:
admin123
```

### Demo User

```
Email:
demo@example.com

Password:
demo123
```

---

# 🐳 Run Entire Project with Docker

Build and start all services

```bash
docker compose up --build
```

Stop

```bash
docker compose down
```

Restart

```bash
docker compose restart
```

---

# 📌 API Base URL

```
http://localhost:5000/api
```

---

# 👩‍💻 Contributors

- Nethmi Bhagya
- (Add other team members)

---

# 📄 License

This project is developed for academic purposes.
