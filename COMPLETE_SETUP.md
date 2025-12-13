# 🚀 Hotel Management System - Complete Setup Guide

## Prerequisites

- Node.js installed
- MySQL installed and running
- Git (optional)

## Step 1: Create Database Tables

Run this SQL in your MySQL client:

```sql
CREATE DATABASE IF NOT EXISTS hotel_booking;
USE hotel_booking;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50) UNIQUE,
  password VARCHAR(255),
  role ENUM('user','admin') DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS hotels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  city VARCHAR(50),
  address VARCHAR(255),
  latitude VARCHAR(20),
  longitude VARCHAR(20),
  rating FLOAT,
  description TEXT,
  image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hotel_id INT,
  type VARCHAR(50),
  price_per_night INT,
  capacity INT,
  status ENUM('available','booked') DEFAULT 'available',
  FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  room_id INT,
  check_in DATE,
  check_out DATE,
  total_price INT,
  booking_status ENUM('pending','confirmed','canceled') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);
```

## Step 2: Setup Admin User

```powershell
cd backend
node seed/setup.js
```

This will:

- ✓ Create admin user: `admin@example.com` / `admin123`
- ✓ Verify database connection
- ✓ Display next steps

## Step 3: Start Backend Server

```powershell
cd backend
node server.js
```

Expected output:

```
[dotenv] injecting env...
✓ Database connected
Server is running on port 5000
```

## Step 4: Start Frontend (New Terminal)

```powershell
cd hotel-booking-frontend
npm start
```

The app will open at `http://localhost:3000`

## Step 5: Login as Admin

1. Go to **http://localhost:3000/admin-login**
2. Enter credentials:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`
3. Click "Sign In"
4. You'll be redirected to **Admin Dashboard**

## Features Available

### For Users

- ✓ Register new account
- ✓ Login to account
- ✓ Browse hotels
- ✓ Filter hotels by city/budget
- ✓ View hotel details
- ✓ Book rooms
- ✓ View booking history
- ✓ User profile

### For Admin

- ✓ Login to admin panel
- ✓ View dashboard with stats
- ✓ Add new hotels
- ✓ Add rooms to hotels
- ✓ View all hotels, rooms, and bookings
- ✓ Manage bookings

## Troubleshooting

### "Database Connection Failed"

- Make sure MySQL is running
- Check `.env` file has correct credentials
- Verify database `hotel_booking` exists

### "Admin Login Failed"

- Run `node seed/setup.js` again
- Check if admin user exists in database
- Clear browser cache and try again

### "Cannot connect to backend"

- Make sure backend is running on port 5000
- Check `.env` file in frontend folder
- Verify API URL: `REACT_APP_API_URL=http://localhost:5000/api`

## Default Environment Variables

### Backend (.env)

```
DB_HOST=localhost
DB_USER=root
DB_PASS=admin123
DB_NAME=hotel_booking
PORT=5000
JWT_SECRET=mySuperSecretKey123
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Admin Dashboard URL

```
http://localhost:3000/admin-login
```

**Email:** admin@example.com
**Password:** admin123

---

✅ Setup is complete! Enjoy using the Hotel Management System!
