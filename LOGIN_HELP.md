# 🔧 Hotel Management System - Login Troubleshooting Guide

## ⚠️ If Login is Failing

Follow these steps **in order**:

### Step 1: Verify MySQL Database

Open MySQL client and run:

```sql
-- Check if database exists
SHOW DATABASES;

-- Use the database
USE hotel_booking;

-- Check if users table exists
SHOW TABLES;

-- Check if admin user exists
SELECT * FROM users WHERE email='admin@example.com';
```

If the admin user doesn't exist, proceed to Step 2.

### Step 2: Create Admin User

Run this command in PowerShell from the backend folder:

```powershell
cd C:\Users\Admin\Desktop\hotel_managemet\backend
node seed/addAdmin.js
```

Expected output:

```
🔄 Creating admin user...

✓ Admin user created successfully

📝 Login Credentials:
   Email: admin@example.com
   Password: admin123
```

### Step 3: Stop All Servers

Press `Ctrl+C` in both backend and frontend terminals to stop them.

### Step 4: Clear Frontend Cache

```powershell
cd C:\Users\Admin\Desktop\hotel_managemet\hotel-booking-frontend

# Clear browser cache
# Option 1: Delete node_modules and reinstall (optional)
rm -r node_modules
npm install

# Or just clear the build
npm cache clean --force
```

### Step 5: Restart Backend

```powershell
cd C:\Users\Admin\Desktop\hotel_managemet\backend
node server.js
```

Wait for this output:

```
[dotenv] injecting env...
Server is running on port 5000
```

### Step 6: Restart Frontend (New Terminal)

```powershell
cd C:\Users\Admin\Desktop\hotel_managemet\hotel-booking-frontend
npm start
```

Wait for the browser to open at `http://localhost:3000`

### Step 7: Test Login

1. Go to **http://localhost:3000/admin-login**
2. Enter:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`
3. Click **Sign In**

---

## ❌ Common Login Errors

| Error                      | Cause                            | Solution                                     |
| -------------------------- | -------------------------------- | -------------------------------------------- |
| "User not found"           | Admin user doesn't exist in DB   | Run `node seed/addAdmin.js`                  |
| "Invalid password"         | Password hash mismatch           | Delete user and recreate with `addAdmin.js`  |
| "Cannot connect to server" | Backend not running              | Start backend with `node server.js`          |
| "Network error"            | Frontend can't reach backend API | Check REACT_APP_API_URL in frontend .env     |
| "Login failed"             | Catch-all error                  | Check browser console (F12) for more details |

---

## 🔍 Debug Checklist

- [ ] MySQL server is running
- [ ] Database `hotel_booking` exists
- [ ] Table `users` exists and has data
- [ ] Admin user `admin@example.com` exists
- [ ] Backend is running on port 5000
- [ ] Frontend is running on port 3000
- [ ] No errors in backend console
- [ ] No errors in frontend console (F12)
- [ ] Browser localStorage is enabled
- [ ] No firewall blocking ports 3000/5000

---

## 📋 Database Verification Query

Run this in MySQL to verify everything:

```sql
USE hotel_booking;

-- Check users table structure
DESCRIBE users;

-- Check if admin exists
SELECT id, name, email, role FROM users WHERE role='admin';

-- Count total users
SELECT COUNT(*) as total_users FROM users;
```

---

## 🚀 Quick Start Command (All Steps)

```powershell
# 1. Create admin
cd C:\Users\Admin\Desktop\hotel_managemet\backend
node seed/addAdmin.js

# 2. Start backend
node server.js

# 3. In new terminal: Start frontend
cd C:\Users\Admin\Desktop\hotel_managemet\hotel-booking-frontend
npm start

# 4. Go to http://localhost:3000/admin-login
# Email: admin@example.com
# Password: admin123
```

---

If issues persist, check the browser console (F12) and backend terminal for detailed error messages.
