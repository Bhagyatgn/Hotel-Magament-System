const roomModel = require("../models/roomModel");

// Add a new room
const addRoom = async (req, res) => {
  try {
    console.log("addRoom - req.user:", req.user);
    console.log("addRoom - req.headers.authorization:", req.headers.authorization);
    
    const hotelId = req.params.hotelId;
    const roomData = { ...req.body, hotel_id: hotelId };
    const result = await roomModel.createRoom(roomData);
    res.status(201).json({ message: "Room added successfully", roomId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding room" });
  }
};

// Get all rooms of a hotel
const getRooms = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    console.log("Getting rooms for hotel ID:", hotelId);
    const rooms = await roomModel.getRoomsByHotelId(hotelId);
    console.log("Rooms found:", rooms);
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching rooms" });
  }
};

// Get rooms within budget
const getRoomsByBudget = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const minBudget = req.query.minBudget || 0;
    const maxBudget = req.query.maxBudget || 1000000;
    const rooms = await roomModel.getRoomsByBudget(hotelId, minBudget, maxBudget);
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching rooms by budget" });
  }
};

// Update a room
const updateRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    await roomModel.updateRoom(roomId, req.body);
    res.json({ message: "Room updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating room" });
  }
};

// Delete a room
const deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    await roomModel.deleteRoom(roomId);
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting room" });
  }
};

// Get room by ID
const getRoomById = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await roomModel.getRoomById(roomId);
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching room" });
  }
};

// Get all rooms (admin)
const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.getAllRooms();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching all rooms" });
  }
};

module.exports = {
  addRoom,
  getRooms,
  getRoomsByBudget,
  updateRoom,
  deleteRoom,
  getRoomById,
  getAllRooms,
};
