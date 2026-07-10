const bcrypt = require('bcrypt');
const db = require('../utils/db');
const { validateEmail, validatePassword } = require('../utils/validateInput');

const getUserProfile = (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT id, name, email, role FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]);
  });
};

const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    let hashedPassword = null;
    if (password && password.trim()) {
      if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const sql = hashedPassword
      ? 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?'
      : 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    const params = hashedPassword
      ? [name.trim(), email.trim().toLowerCase(), hashedPassword, userId]
      : [name.trim(), email.trim().toLowerCase(), userId];

    db.query(sql, params, (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already in use' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Profile updated successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Could not update profile' });
  }
};

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
