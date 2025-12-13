const db = require("../utils/db");

// CREATE HOTEL
const createHotel = (hotelData, callback) => {
    const sql = `
        INSERT INTO hotels (name, city, address, latitude, longitude, rating, description, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, hotelData, callback);
};

// GET ALL HOTELS
const getAllHotels = (callback) => {
    const sql = "SELECT * FROM hotels";
    db.query(sql, callback);
};

// GET ONE HOTEL
const getHotelById = (id, callback) => {
    const sql = "SELECT * FROM hotels WHERE id = ?";
    db.query(sql, [id], callback);
};

// UPDATE HOTEL
const updateHotel = (id, hotelData, callback) => {
    const sql = `
        UPDATE hotels 
        SET name = ?, city = ?, address = ?, latitude = ?, longitude = ?, rating = ?, description = ?, image_url = ?
        WHERE id = ?
    `;
    db.query(sql, [...hotelData, id], callback);
};

// DELETE HOTEL
const deleteHotel = (id, callback) => {
    const sql = "DELETE FROM hotels WHERE id = ?";
    db.query(sql, [id], callback);
};
const getHotelsByCityAndBudget = (city, minBudget, maxBudget, callback) => {
  const sql = `
    SELECT h.*, MIN(r.price_per_night) as cheapest_room
    FROM hotels h
    JOIN rooms r ON h.id = r.hotel_id
    WHERE h.city = ? AND r.price_per_night BETWEEN ? AND ?
    GROUP BY h.id
  `;
  db.query(sql, [city, minBudget, maxBudget], callback);
};
module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
    getHotelsByCityAndBudget
};
