const db = require("../utils/db");
const bcrypt = require("bcrypt");

const users = [
  { name: "Admin", email: "admin@example.com", password: "admin123", role: "admin" },
  { name: "User1", email: "user1@example.com", password: "user123", role: "user" }
];

users.forEach(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [user.name, user.email, hashedPassword, user.role],
    (err, results) => {
      if (err) console.log(err);
      else console.log(`User ${user.name} added`);
    }
  );
});
