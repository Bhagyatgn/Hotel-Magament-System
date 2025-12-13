const db = require("../utils/db");

// Get user profile
const getUserProfile = (req, res) => {
  const userId = req.user.id; // comes from authMiddleware
  const sql = "SELECT id, name, email, role FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
};

// Update user profile
const updateUserProfile = (req, res) => {
  const userId = req.user.id;
  const { name, email, password } = req.body;

  const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
  db.query(sql, [name, email, password, userId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Profile updated successfully" });
  });
};

// Get all bookings of the user
const getUserBookings = (req, res) => {
  const userId = req.user.id;
  const sql = `
    SELECT b.id AS booking_id, b.check_in, b.check_out, b.total_price, b.booking_status,
           r.id AS room_id, r.type AS room_type, r.price_per_night,
           h.id AS hotel_id, h.name AS hotel_name, h.city
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    JOIN hotels h ON r.hotel_id = h.id
    WHERE b.user_id = ?
    ORDER BY b.check_in DESC
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserBookings,
};
