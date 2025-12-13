const mysql = require("mysql2");
const bcrypt = require("bcrypt");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "admin123",
  database: process.env.DB_NAME || "hotel_booking",
});

async function createAdmin() {
  try {
    console.log("🔄 Creating admin user...\n");

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Insert admin user
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    
    db.query(sql, ["Admin", "admin@example.com", hashedPassword, "admin"], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          console.log("✓ Admin user already exists\n");
          console.log("📝 Login Credentials:");
          console.log("   Email: admin@example.com");
          console.log("   Password: admin123\n");
        } else {
          console.error("❌ Error:", err.message);
        }
      } else {
        console.log("✓ Admin user created successfully\n");
        console.log("📝 Login Credentials:");
        console.log("   Email: admin@example.com");
        console.log("   Password: admin123\n");
      }
      db.end(() => process.exit(0));
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createAdmin();
