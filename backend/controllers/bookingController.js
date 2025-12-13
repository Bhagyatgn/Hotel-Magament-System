const bookingModel = require("../models/bookingModel");
const roomModel = require("../models/roomModel");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { room_id, check_in, check_out } = req.body;

    // Get room details
    const room = await roomModel.getRoomById(room_id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Check if dates are valid
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ message: "Check-out date must be after check-in date" });
    }

    // Check for booking conflicts (overlapping dates)
    const existingBookings = await bookingModel.getBookingsByRoomAndDates(room_id, check_in, check_out);
    if (existingBookings && existingBookings.length > 0) {
      return res.status(400).json({ message: "Room is not available for selected dates" });
    }

    // Calculate total price (days * price_per_night)
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const total_price = diffDays * room.price_per_night;

    // Create booking with "pending" status
    const bookingData = {
      user_id: userId,
      room_id,
      check_in,
      check_out,
      total_price,
      booking_status: "pending",
    };

    const result = await bookingModel.createBooking(bookingData);

    res.status(201).json({ message: "Booking successful", bookingId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking" });
  }
};

// Get bookings of the logged-in user
const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await bookingModel.getBookingsByUser(userId);
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// Admin: get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching all bookings" });
  }
};

// Admin: update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    await bookingModel.updateBookingStatus(bookingId, status);
    res.json({ message: "Booking status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating booking status" });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
};
