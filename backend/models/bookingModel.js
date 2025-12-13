const db = require("../utils/db");

// Create a booking
const createBooking = (bookingData) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO bookings 
      (user_id, room_id, check_in, check_out, total_price, booking_status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      bookingData.user_id,
      bookingData.room_id,
      bookingData.check_in,
      bookingData.check_out,
      bookingData.total_price,
      bookingData.booking_status || "pending",
    ];
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get all bookings for a user
const getBookingsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT b.*, r.type AS room_type, r.price_per_night, h.name AS hotel_name, h.city
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      JOIN hotels h ON r.hotel_id = h.id
      WHERE b.user_id = ?
      ORDER BY b.check_in DESC
    `;
    db.query(sql, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get all bookings (Admin)
const getAllBookings = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT b.*, r.type AS room_type, r.price_per_night, h.name AS hotel_name, h.city, u.name AS user_name, u.email
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      JOIN hotels h ON r.hotel_id = h.id
      JOIN users u ON b.user_id = u.id
      ORDER BY b.check_in DESC
    `;
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Update booking status (e.g., confirm, cancel)
const updateBookingStatus = (bookingId, status) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE bookings
      SET booking_status = ?
      WHERE id = ?
    `;
    db.query(sql, [status, bookingId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Check for booking conflicts by date range
const getBookingsByRoomAndDates = (roomId, checkIn, checkOut) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM bookings
      WHERE room_id = ?
      AND (
        (check_in < ? AND check_out > ?)
        OR (check_in >= ? AND check_in < ?)
        OR (check_out > ? AND check_out <= ?)
      )
      AND booking_status != 'cancelled'
    `;
    db.query(sql, [roomId, checkOut, checkIn, checkIn, checkOut, checkIn, checkOut], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  createBooking,
  getBookingsByUser,
  getAllBookings,
  updateBookingStatus,
  getBookingsByRoomAndDates,
};
