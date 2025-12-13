const db = require("../utils/db");

// Create a room
const createRoom = (roomData) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO rooms (hotel_id, type, price_per_night, capacity, status, description, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      roomData.hotel_id,
      roomData.type,
      roomData.price_per_night,
      roomData.capacity,
      roomData.status || "available",
      roomData.description || null,
      roomData.image_url || null,
    ];
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get all rooms of a hotel
const getRoomsByHotelId = (hotelId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM rooms WHERE hotel_id = ?";
    db.query(sql, [hotelId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get room by ID
const getRoomById = (roomId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM rooms WHERE id = ?";
    db.query(sql, [roomId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// Update a room
const updateRoom = (roomId, roomData) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE rooms
      SET type = ?, price_per_night = ?, capacity = ?, status = ?, description = ?, image_url = ?
      WHERE id = ?
    `;
    const params = [
      roomData.type,
      roomData.price_per_night,
      roomData.capacity,
      roomData.status,
      roomData.description || null,
      roomData.image_url || null,
      roomId,
    ];
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Delete a room
const deleteRoom = (roomId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM rooms WHERE id = ?";
    db.query(sql, [roomId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get rooms by hotel and budget
const getRoomsByBudget = (hotelId, minBudget, maxBudget) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM rooms 
      WHERE hotel_id = ? 
      AND price_per_night BETWEEN ? AND ?
      AND status = 'available'
    `;
    db.query(sql, [hotelId, minBudget, maxBudget], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get all rooms (admin)
const getAllRooms = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM rooms";
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  createRoom,
  getRoomsByHotelId,
  getRoomById,
  updateRoom,
  deleteRoom,
  getRoomsByBudget,
  getAllRooms,
};
